'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ModuleQuizProps {
  title: string;
  questions: QuizQuestion[];
}

export default function ModuleQuiz({ title, questions }: ModuleQuizProps) {
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
      <div className="cyber-card p-6 md:p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-cyber-green/10 flex items-center justify-center mx-auto mb-4">
          <i className="ri-trophy-line text-3xl text-cyber-green" />
        </div>
        <h3 className="text-xl font-bold text-white">Quiz Complete!</h3>
        <p className="mt-2 text-cyber-text-muted">
          You scored <span className="text-cyber-cyan font-bold text-lg">{correctCount}/{total}</span> ({pct}%)
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
          {pct >= 80 ? 'Excellent! You are ready for the lab exercises.' : pct >= 50 ? 'Good progress! Review the module and try again.' : 'Keep studying — retake the quiz after reviewing.'}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 px-5 py-2.5 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap"
        >
          <i className="ri-restart-line mr-2" />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="cyber-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyber-amber/10 flex items-center justify-center text-cyber-amber">
          <i className="ri-questionnaire-line" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-cyber-text-dim font-mono ml-auto">
          {current + 1} / {total}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-cyber-amber"
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
          <h4 className="text-base font-semibold text-white leading-relaxed mb-5">
            {q.question}
          </h4>

          <div className="space-y-2.5">
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.correct;
              const showCorrect = answered && isCorrect;
              const showWrong = answered && selected === idx && !isCorrect;
              const isSelected = selected === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                    showCorrect
                      ? 'border-cyber-green bg-cyber-green/10'
                      : showWrong
                        ? 'border-cyber-red bg-cyber-red/10'
                        : isSelected
                          ? 'border-cyber-amber bg-cyber-amber/10'
                          : 'border-cyber-border bg-cyber-bg hover:border-cyber-amber/50'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      showCorrect
                        ? 'border-cyber-green text-cyber-green'
                        : showWrong
                          ? 'border-cyber-red text-cyber-red'
                          : isSelected
                            ? 'border-cyber-amber text-cyber-amber'
                            : 'border-cyber-border text-cyber-text-dim'
                    }`}
                  >
                    {showCorrect ? (
                      <i className="ri-check-line" />
                    ) : showWrong ? (
                      <i className="ri-close-line" />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className={`text-sm ${showCorrect ? 'text-cyber-green' : showWrong ? 'text-cyber-red' : 'text-cyber-text-muted'}`}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div
              className="mt-4 p-4 rounded-lg bg-cyber-bg border border-cyber-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <p className="text-sm text-cyber-text-muted leading-relaxed">
                <span className="text-cyber-amber font-semibold">Explanation: </span>
                {q.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {answered && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-lg bg-cyber-amber text-cyber-bg text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap"
          >
            {current + 1 >= total ? 'Finish Quiz' : 'Next Question'}
            <i className="ri-arrow-right-line ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}