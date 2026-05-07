'use client'
import { useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1, question: "What file extension does Wireshark use for saved captures?",
    options: [".cap", ".pcapng", ".dmp", ".pkt"],
    correct: 1,
    explanation: "Wireshark's native file format is PCAPNG (PCAP Next Generation). It also supports the older PCAP format."
  },
  {
    id: 2, question: "Which display filter shows only HTTP traffic?",
    options: ["protocol==http", "http", "tcp.port==80", "frame contains HTTP"],
    correct: 1,
    explanation: "In Wireshark display filters, simply typing the protocol name 'http' filters for all HTTP traffic."
  },
  {
    id: 3, question: "What is the difference between a capture filter and a display filter?",
    options: ["There is no difference", "Capture filters use BPF syntax; display filters use Wireshark syntax", "Capture filters are slower", "Display filters must be set before capturing"],
    correct: 1,
    explanation: "Capture filters use Berkeley Packet Filter (BPF) syntax and filter at the kernel level. Display filters use Wireshark's own syntax and filter after packets are captured."
  },
  {
    id: 4, question: "Which key combination stops a live capture?",
    options: ["Ctrl+C", "Ctrl+E", "Ctrl+S", "Ctrl+X"],
    correct: 1,
    explanation: "Ctrl+E stops the current live capture in Wireshark. Ctrl+S saves the capture."
  },
  {
    id: 5, question: "What does the color red typically indicate in Wireshark's default coloring rules?",
    options: ["TCP errors or bad checksums", "Normal traffic", "DNS queries", "ARP traffic"],
    correct: 0,
    explanation: "In Wireshark's default color scheme, red typically highlights packets with errors such as bad TCP checksums or malformed packets."
  },
  {
    id: 6, question: "Which Wireshark feature allows you to reconstruct a TCP stream?",
    options: ["Statistics > Protocol Hierarchy", "Follow > TCP Stream", "Export Objects", "Name Resolution"],
    correct: 1,
    explanation: "Follow > TCP Stream reconstructs the full TCP conversation between two endpoints from the selected packet."
  },
  {
    id: 7, question: "What does the display filter 'ip.addr==192.168.1.1' match?",
    options: ["Only packets where source IP is 192.168.1.1", "Only packets where destination IP is 192.168.1.1", "Any packet where either source or destination is 192.168.1.1", "Packets in the 192.168.1.0/24 subnet"],
    correct: 2,
    explanation: "ip.addr matches both source and destination IP addresses. Use ip.src or ip.dst to match only one direction."
  },
  {
    id: 8, question: "Which protocol is commonly used for DNS queries?",
    options: ["TCP port 53 only", "UDP port 53", "TCP port 25", "UDP port 67"],
    correct: 1,
    explanation: "DNS primarily uses UDP port 53 for queries. TCP port 53 is used for zone transfers and large responses."
  },
  {
    id: 9, question: "What does TShark stand for?",
    options: ["Terminal Shark", "Text-mode Shark", "Tiny Shark", "Trace Shark"],
    correct: 1,
    explanation: "TShark is Wireshark's text-mode (command-line) counterpart for capturing and analyzing packets without a GUI."
  },
  {
    id: 10, question: "Which capture filter would capture only traffic on port 443?",
    options: ["port 443", "tcp.port==443", "http.port==443", "ip.port==443"],
    correct: 0,
    explanation: "In BPF capture filter syntax, 'port 443' captures all traffic (TCP and UDP) on port 443. tcp.port==443 is display filter syntax."
  },
  {
    id: 11, question: "What does the 'Expert Info' dialog show?",
    options: ["Packet byte details", "Errors, warnings, and notes about the capture", "Interface statistics only", "Protocol hierarchy"],
    correct: 1,
    explanation: "Expert Info provides a summary of errors, warnings, notes, and chat messages detected across all packets in the capture."
  },
  {
    id: 12, question: "Which display filter shows packets with the SYN flag set?",
    options: ["tcp.flags.syn==1", "tcp.syn", "tcp[13] & 2", "All of the above"],
    correct: 3,
    explanation: "All three expressions are valid ways to detect SYN packets in Wireshark. tcp.flags.syn==1 and tcp.syn are the most readable."
  },
  {
    id: 13, question: "What is promiscuous mode in packet capturing?",
    options: ["A mode that only captures broadcast traffic", "A mode that captures all packets on the network segment, not just those addressed to the interface", "A mode that encrypts captured data", "A mode that only captures unicast traffic"],
    correct: 1,
    explanation: "Promiscuous mode instructs the network interface to capture all packets on the wire, not just those destined for its MAC address."
  },
  {
    id: 14, question: "Which feature allows you to export files from HTTP traffic?",
    options: ["File > Export Specified Packets", "File > Export Objects > HTTP", "Statistics > HTTP", "Follow > HTTP Stream"],
    correct: 1,
    explanation: "File > Export Objects > HTTP lets you extract files transferred over HTTP from the captured traffic."
  },
  {
    id: 15, question: "What does the 'Delta' column in Wireshark represent?",
    options: ["Packet size difference", "Time relative to the previous displayed packet", "Checksum delta", "Protocol version difference"],
    correct: 1,
    explanation: "The Delta column shows the time difference between the current packet and the previous displayed packet, useful for timing analysis."
  },
  {
    id: 16, question: "Which protocol operates at the Transport layer (Layer 4) of the OSI model?",
    options: ["HTTP", "TCP", "IP", "Ethernet"],
    correct: 1,
    explanation: "TCP (Transmission Control Protocol) operates at Layer 4 (Transport). HTTP is Layer 7, IP is Layer 3, Ethernet is Layer 2."
  },
  {
    id: 17, question: "What does the display filter 'frame.len > 1000' show?",
    options: ["Frames with more than 1000 packets", "Frames larger than 1000 bytes", "Frames captured after 1000 seconds", "Frames with 1000+ errors"],
    correct: 1,
    explanation: "frame.len represents the total frame length in bytes. 'frame.len > 1000' filters for packets larger than 1000 bytes."
  },
];

export default function WiresharkQuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const total = questions.length;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setAnswers((prev) => [...prev, idx === q.correct]);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setFinished(false);
  };

  const correctCount = answers.filter(Boolean).length;

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-3xl mx-auto">
          <motion.div className="cyber-card p-8 md:p-12 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <div className="w-20 h-20 rounded-full bg-cyber-green/10 flex items-center justify-center mx-auto mb-6">
              <i className="ri-trophy-line text-4xl text-cyber-green" />
            </div>
            <h2 className="text-3xl font-bold text-white">Quiz Complete!</h2>
            <p className="mt-3 text-cyber-text-muted">
              You scored <span className="text-cyber-cyan font-bold text-xl">{correctCount}/{total}</span> ({pct}%)
            </p>
            <div className="mt-4 w-full max-w-xs mx-auto h-3 bg-cyber-bg rounded-full overflow-hidden">
              <motion.div className="h-full bg-cyber-cyan" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
            </div>
            <p className="mt-3 text-sm text-cyber-text-dim">
              {pct >= 80 ? 'Excellent! You are ready for the lab exercises.' : pct >= 50 ? 'Good progress! Review the module and try again.' : 'Keep studying — retake the quiz after reviewing.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={handleRestart} className="px-6 py-3 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap glow-cyan">
                <i className="ri-restart-line mr-2" /> Retake Quiz
              </button>
              <a href="/wireshark-lab" className="px-6 py-3 bg-cyber-green text-cyber-bg font-semibold rounded-lg hover:bg-cyber-green-dim transition-all whitespace-nowrap">
                <i className="ri-flask-line mr-2" /> Go to Lab
              </a>
            </div>
          </motion.div>
        </div>
    );
  }

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber text-xs font-medium font-mono mb-4">
            <i className="ri-questionnaire-line" /> Wireshark Quiz
          </div>
          <DocHeading level={1}>Wireshark Knowledge Check</DocHeading>
          <p className="text-cyber-text-muted mt-3">Test your understanding of packet analysis, filters, protocols, and Wireshark features.</p>
        </motion.div>

        <motion.div className="mt-6 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="text-sm text-cyber-text-dim font-mono">Question {current + 1} of {total}</span>
          <div className="flex-1 h-2 bg-cyber-bg-card rounded-full overflow-hidden">
            <motion.div className="h-full bg-cyber-amber" initial={{ width: 0 }} animate={{ width: `${((current + 1) / total) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={current} className="mt-6 cyber-card p-6 md:p-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h3 className="text-lg md:text-xl font-semibold text-white leading-relaxed">{q.question}</h3>
            <div className="mt-6 space-y-3">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correct;
                const showCorrect = answered && isCorrect;
                const showWrong = answered && selected === idx && !isCorrect;
                const isSelected = selected === idx;
                return (
                  <button key={idx} type="button" onClick={() => handleAnswer(idx)} disabled={answered}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${showCorrect ? 'border-cyber-green bg-cyber-green/10' : showWrong ? 'border-cyber-red bg-cyber-red/10' : isSelected ? 'border-cyber-amber bg-cyber-amber/10' : 'border-cyber-border bg-cyber-bg hover:border-cyber-amber/50'}`}>
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${showCorrect ? 'border-cyber-green text-cyber-green' : showWrong ? 'border-cyber-red text-cyber-red' : isSelected ? 'border-cyber-amber text-cyber-amber' : 'border-cyber-border text-cyber-text-dim'}`}>
                      {showCorrect ? <i className="ri-check-line" /> : showWrong ? <i className="ri-close-line" /> : String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-sm ${showCorrect ? 'text-cyber-green' : showWrong ? 'text-cyber-red' : 'text-cyber-text-muted'}`}>{opt}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.div className="mt-5 p-4 rounded-lg bg-cyber-bg border border-cyber-border" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <p className="text-sm text-cyber-text-muted leading-relaxed"><span className="text-cyber-amber font-semibold">Explanation: </span>{q.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-end">
          {answered && (
            <button type="button" onClick={handleNext} className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
              {current + 1 >= total ? 'Finish Quiz' : 'Next Question'} <i className="ri-arrow-right-line ml-1" />
            </button>
          )}
        </div>
      </div>
  );
}
