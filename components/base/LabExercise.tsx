import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LabTask {
  id: number;
  title: string;
  description: string;
  command?: string;
  expectedAnswer?: string;
  hint?: string;
}

interface LabExerciseProps {
  title: string;
  tasks: LabTask[];
}

export default function LabExercise({ title, tasks }: LabExerciseProps) {
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

    let correct = false;
    if (task.expectedAnswer) {
      const normalizedInput = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
      const normalizedExpected = task.expectedAnswer.toLowerCase().replace(/\s+/g, ' ');
      correct = normalizedInput === normalizedExpected || normalizedInput.includes(normalizedExpected);
    }

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
      <div className="cyber-card p-6 md:p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-cyber-cyan/10 flex items-center justify-center mx-auto mb-4">
          <i className="ri-flask-line text-3xl text-cyber-cyan" />
        </div>
        <h3 className="text-xl font-bold text-white">Lab Complete!</h3>
        <p className="mt-2 text-cyber-text-muted">
          You completed <span className="text-cyber-cyan font-bold text-lg">{correctCount}/{total}</span> tasks correctly
        </p>
        <div className="mt-4 w-full max-w-xs mx-auto h-2.5 bg-cyber-bg rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyber-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-3 text-sm text-cyber-text-dim">
          {pct >= 80 ? 'Great work! You have mastered these concepts.' : pct >= 50 ? 'Nice effort! Review the incorrect tasks and try again.' : 'Keep practicing — hands-on repetition builds expertise.'}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 px-5 py-2.5 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap"
        >
          <i className="ri-restart-line mr-2" />
          Restart Lab
        </button>
      </div>
    );
  }

  return (
    <div className="cyber-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan">
          <i className="ri-flask-line" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-cyber-text-dim font-mono ml-auto">
          Task {current + 1} / {total}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-cyber-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-1">
            <span className="text-[10px] font-semibold tracking-wider text-cyber-text-dim uppercase">
              Task {task.id}
            </span>
          </div>
          <h4 className="text-base font-semibold text-white mb-3">{task.title}</h4>
          <p className="text-sm text-cyber-text-muted leading-relaxed mb-4">
            {task.description}
          </p>

          {task.command && (
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-3 mb-4">
              <span className="text-[10px] text-cyber-text-dim font-mono uppercase tracking-wider">Reference Command</span>
              <pre className="mt-1 text-sm font-mono text-cyber-green">{task.command}</pre>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-semibold text-white block">
              Your Answer / Command
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
              disabled={submitted}
              className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan disabled:opacity-50"
              placeholder="Type the exact command or answer..."
            />

{submitted && (
               <motion.div
                 className={`p-3 rounded-lg border ${results?.[current]?.correct ? 'border-cyber-green bg-cyber-green/10' : 'border-cyber-red bg-cyber-red/10'}`}
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
               >
                 <div className="flex items-center gap-2">
                   <i className={results?.[current]?.correct ? 'ri-check-line text-cyber-green' : 'ri-close-line text-cyber-red'} />
                   <span className={`text-sm font-semibold ${results?.[current]?.correct ? 'text-cyber-green' : 'text-cyber-red'}`}>
                     {results?.[current]?.correct ? 'Correct!' : 'Not quite right'}
                   </span>
                 </div>
                 {!results?.[current]?.correct && task.expectedAnswer && (
                  <p className="text-xs text-cyber-text-dim mt-1">
                    Expected: <span className="text-cyber-cyan font-mono">{task.expectedAnswer}</span>
                  </p>
                )}
              </motion.div>
            )}

            {task.hint && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-cyber-amber hover:text-cyber-amber/80 transition-colors flex items-center gap-1"
                >
                  <i className={showHint ? 'ri-eye-off-line' : 'ri-lightbulb-line'} />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      className="mt-2 p-3 rounded-lg border border-cyber-amber/20 bg-cyber-amber/5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-xs text-cyber-amber">{task.hint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="mt-5 flex justify-between">
            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap ml-auto"
              >
                {current + 1 >= total ? 'Finish Lab' : 'Next Task'}
                <i className="ri-arrow-right-line ml-1" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}