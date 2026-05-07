import { useState } from 'react';
import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import { motion, AnimatePresence } from 'framer-motion';

interface LabTask {
  id: number;
  title: string;
  description: string;
  expectedAnswer: string;
  hint: string;
}

const tasks: LabTask[] = [
  {
    id: 1,
    title: 'Basic Capture Filter',
    description: 'You want to capture only HTTP traffic on your interface. Write the capture filter (BPF syntax).',
    expectedAnswer: 'tcp port 80',
    hint: 'Capture filters use BPF syntax. "tcp port 80" captures all TCP traffic on port 80.',
  },
  {
    id: 2,
    title: 'Display Filter for DNS',
    description: 'You have a capture with mixed traffic. Write the display filter to show only DNS packets.',
    expectedAnswer: 'dns',
    hint: 'In Wireshark display filters, typing the protocol name "dns" filters for all DNS traffic.',
  },
  {
    id: 3,
    title: 'Filter by IP Address',
    description: 'Show all packets where either the source OR destination IP is 192.168.1.10.',
    expectedAnswer: 'ip.addr==192.168.1.10',
    hint: 'ip.addr matches both source and destination. Use == for exact match.',
  },
  {
    id: 4,
    title: 'TCP SYN Flag Filter',
    description: 'Write a display filter to find packets with the SYN flag set (and no ACK).',
    expectedAnswer: 'tcp.flags.syn==1 and tcp.flags.ack==0',
    hint: 'tcp.flags.syn==1 checks the SYN flag. Add "and tcp.flags.ack==0" to exclude SYN-ACK packets.',
  },
  {
    id: 5,
    title: 'Filter Large Frames',
    description: 'You suspect exfiltration of large files. Write a display filter for frames larger than 1000 bytes.',
    expectedAnswer: 'frame.len>1000',
    hint: 'frame.len represents the total frame length in bytes.',
  },
  {
    id: 6,
    title: 'Follow TCP Stream',
    description: 'You found an interesting HTTP packet. What menu path reconstructs the full TCP conversation?',
    expectedAnswer: 'follow tcp stream',
    hint: 'Right-click a packet and select "Follow > TCP Stream" or use the menu path.',
  },
  {
    id: 7,
    title: 'Export HTTP Objects',
    description: 'You captured a file download over HTTP. What menu path lets you extract the downloaded file?',
    expectedAnswer: 'file export objects http',
    hint: 'File > Export Objects > HTTP lets you extract files transferred over HTTP.',
  },
  {
    id: 8,
    title: 'Filter by TCP Destination Port',
    description: 'Write a display filter to show only traffic destined for TCP port 443.',
    expectedAnswer: 'tcp.dstport==443',
    hint: 'Use tcp.dstport for destination port. tcp.port matches both directions.',
  },
  {
    id: 9,
    title: 'ARP Traffic Filter',
    description: 'Write the display filter to show only ARP packets in your capture.',
    expectedAnswer: 'arp',
    hint: 'Just like "dns" or "http", typing "arp" filters for all ARP traffic.',
  },
  {
    id: 10,
    title: 'Filter by Protocol and Port',
    description: 'Show only UDP traffic on port 53 (DNS). Write the display filter.',
    expectedAnswer: 'udp.port==53',
    hint: 'udp.port matches both source and destination UDP ports.',
  },
  {
    id: 11,
    title: 'Malformed Packet Detection',
    description: 'What display filter shows packets that Wireshark marked as having a bad checksum?',
    expectedAnswer: 'icmp.checksum_bad==1',
    hint: 'Wireshark marks packets with checksum errors. For ICMP specifically, use icmp.checksum_bad==1.',
  },
  {
    id: 12,
    title: 'Stop Live Capture',
    description: 'You started a capture and want to stop it using a keyboard shortcut. What is it?',
    expectedAnswer: 'ctrl+e',
    hint: 'Ctrl+E stops the current live capture. Ctrl+S saves the file.',
  },
];

export default function WiresharkLabPage() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, { correct: boolean; answer: string }>>();
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const task = tasks[current];
  const total = tasks.length;

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    setSubmitted(true);
    const normalizedInput = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedExpected = task.expectedAnswer.toLowerCase().replace(/\s+/g, ' ');
    const correct = normalizedInput === normalizedExpected || normalizedInput.includes(normalizedExpected);
    setResults((prev) => ({ ...prev, [current]: { correct, answer: userAnswer.trim() } }));
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setUserAnswer('');
    setSubmitted(false);
    setShowHint(false);
  };

  const handleRestart = () => {
    setCurrent(0);
    setUserAnswer('');
    setSubmitted(false);
    setResults({});
    setShowHint(false);
    setFinished(false);
  };

  const correctCount = Object.values(results ?? {}).filter((r) => r.correct).length;

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <Layout>
        <div className="px-6 md:px-12 lg:px-16 py-10 max-w-3xl mx-auto">
          <motion.div className="cyber-card p-8 md:p-12 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 flex items-center justify-center mx-auto mb-6">
              <i className="ri-flask-line text-4xl text-cyber-cyan" />
            </div>
            <h2 className="text-3xl font-bold text-white">Lab Complete!</h2>
            <p className="mt-3 text-cyber-text-muted">
              You completed <span className="text-cyber-cyan font-bold text-xl">{correctCount}/{total}</span> tasks correctly
            </p>
            <div className="mt-4 w-full max-w-xs mx-auto h-3 bg-cyber-bg rounded-full overflow-hidden">
              <motion.div className="h-full bg-cyber-cyan" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="mt-3 text-sm text-cyber-text-dim">
              {pct >= 80 ? 'Great work! You have mastered these concepts.' : pct >= 50 ? 'Nice effort! Review the incorrect tasks and try again.' : 'Keep practicing — hands-on repetition builds expertise.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={handleRestart} className="px-6 py-3 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap glow-cyan">
                <i className="ri-restart-line mr-2" /> Restart Lab
              </button>
              <a href="/wireshark-quiz" className="px-6 py-3 border border-cyber-amber text-cyber-amber font-semibold rounded-lg hover:bg-cyber-amber/10 transition-all whitespace-nowrap">
                <i className="ri-questionnaire-line mr-2" /> Back to Quiz
              </a>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-medium font-mono mb-4">
            <i className="ri-flask-line" /> Wireshark Lab
          </div>
          <DocHeading level={1}>Wireshark Hands-On Lab</DocHeading>
          <p className="text-cyber-text-muted mt-3">Apply your knowledge by typing the exact filters, commands, and menu paths for each scenario.</p>
        </motion.div>

        <motion.div className="mt-6 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="text-sm text-cyber-text-dim font-mono">Task {current + 1} of {total}</span>
          <div className="flex-1 h-2 bg-cyber-bg-card rounded-full overflow-hidden">
            <motion.div className="h-full bg-cyber-cyan" initial={{ width: 0 }} animate={{ width: `${((current + 1) / total) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={current} className="mt-6 cyber-card p-6 md:p-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="mb-1">
              <span className="text-[10px] font-semibold tracking-wider text-cyber-text-dim uppercase">Task {task.id}</span>
            </div>
            <h4 className="text-base font-semibold text-white mb-3">{task.title}</h4>
            <p className="text-sm text-cyber-text-muted leading-relaxed mb-4">{task.description}</p>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-white block">Your Answer</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
                disabled={submitted}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan disabled:opacity-50"
                placeholder="Type the exact filter, command, or menu path..."
              />

              {submitted && (
                <motion.div className={`p-3 rounded-lg border ${results[current]?.correct ? 'border-cyber-green bg-cyber-green/10' : 'border-cyber-red bg-cyber-red/10'}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <div className="flex items-center gap-2">
                    <i className={results[current]?.correct ? 'ri-check-line text-cyber-green' : 'ri-close-line text-cyber-red'} />
                    <span className={`text-sm font-semibold ${results[current]?.correct ? 'text-cyber-green' : 'text-cyber-red'}`}>{results[current]?.correct ? 'Correct!' : 'Not quite right'}</span>
                  </div>
                  {!results[current]?.correct && (
                    <p className="text-xs text-cyber-text-dim mt-1">Expected: <span className="text-cyber-cyan font-mono">{task.expectedAnswer}</span></p>
                  )}
                </motion.div>
              )}

              <div>
                <button type="button" onClick={() => setShowHint(!showHint)} className="text-xs text-cyber-amber hover:text-cyber-amber/80 transition-colors flex items-center gap-1">
                  <i className={showHint ? 'ri-eye-off-line' : 'ri-lightbulb-line'} /> {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div className="mt-2 p-3 rounded-lg border border-cyber-amber/20 bg-cyber-amber/5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <p className="text-xs text-cyber-amber">{task.hint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 flex justify-between">
              {!submitted ? (
                <button type="button" onClick={handleSubmit} disabled={!userAnswer.trim()} className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
                  Submit Answer
                </button>
              ) : (
                <button type="button" onClick={handleNext} className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap ml-auto">
                  {current + 1 >= total ? 'Finish Lab' : 'Next Task'} <i className="ri-arrow-right-line ml-1" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}