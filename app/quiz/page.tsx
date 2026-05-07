import { useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  border: string;
  bg: string;
  description: string;
  questions: Question[];
}

import { wireshark, nmap, gobuster, john, burp, sqlmap, sslscan, netcat, metasploit } from '@/components/mocks/quiz';

const categories: QuizCategory[] = [
  wireshark, nmap, gobuster, john, burp, sqlmap, sslscan, netcat, metasploit,
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState<Record<string, boolean[]>>({
    wireshark: [],
    nmap: [],
    gobuster: [],
    john: [],
    burp: [],
    sqlmap: [],
    sslscan: [],
    netcat: [],
    metasploit: [],
  });
  const [finished, setFinished] = useState(false);
  const [view, setView] = useState<'hub' | 'quiz' | 'results'>('hub');

  const category = categories.find((c) => c.id === selectedCategory);
  const questions = category?.questions ?? [];
  const q = questions[current];
  const total = questions.length;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === q.correct;
    setScores((prev) => ({
      ...prev,
      [selectedCategory!]: [...(prev[selectedCategory!] ?? []), isCorrect],
    }));
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
      setView('results');
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handlePrev = () => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScores((prev) => ({ ...prev, [selectedCategory!]: [] }));
    setFinished(false);
    setView('quiz');
  };

  const handleBackToHub = () => {
    setSelectedCategory(null);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
    setView('hub');
  };

  const correctCount = (scores[selectedCategory!] ?? []).filter(Boolean).length;

  // Hub View
  if (view === 'hub') {
    const totalAnswered = Object.values(scores).flat().length;
    const totalCorrect = Object.values(scores).flat().filter(Boolean).length;
    const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0);

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <DocHeading level={1}>Quiz Hub</DocHeading>
            <p className="text-cyber-text-muted leading-relaxed mt-3">
              Test your knowledge across all tools. Each category contains 15-17 questions with detailed explanations.
              Pick a tool below to begin.
            </p>
          </motion.div>

          {/* Overall Progress */}
          {totalAnswered > 0 && (
            <motion.div
              className="mt-6 cyber-card p-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Overall Progress</span>
                <span className="text-sm text-cyber-cyan font-mono">{totalCorrect}/{totalQuestions}</span>
              </div>
              <div className="w-full h-3 bg-cyber-bg rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyber-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 text-xs text-cyber-text-dim">
                {totalAnswered} of {totalQuestions} answered
              </div>
            </motion.div>
          )}

          {/* Category Cards */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat) => {
              const catScore = scores[cat.id] ?? [];
              const catCorrect = catScore.filter(Boolean).length;
              const catTotal = cat.questions.length;
              const isComplete = catScore.length === catTotal;

              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setView('quiz');
                  }}
                  className={`cyber-card p-6 text-left group cursor-pointer relative overflow-hidden ${isComplete ? 'border-cyber-green/30' : ''}`}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${cat.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-cyber-bg flex items-center justify-center flex-shrink-0 ${cat.color} ${cat.border} border group-hover:scale-110 transition-transform`}>
                      <i className={`${cat.icon} text-2xl`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                          {cat.name}
                        </h3>
                        {isComplete && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                            Complete
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-cyber-text-muted mt-1">{cat.description}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-cyber-bg rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${catCorrect / catTotal >= 0.7 ? 'bg-cyber-green' : 'bg-cyber-cyan'}`}
                            style={{ width: `${(catScore.length / catTotal) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-cyber-text-dim font-mono">
                          {catCorrect}/{catTotal}
                        </span>
                      </div>
                    </div>
                    <i className="ri-arrow-right-line text-cyber-text-dim group-hover:text-cyber-cyan transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>


        </div>
    );
  }

  // Results View
  if (view === 'results' && category) {
    return (
        <div className="px-6 md:px-12 lg:px-16 py-10 max-w-3xl mx-auto">
          <motion.div
            className="cyber-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-cyber-green/10 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <i className="ri-trophy-line text-4xl text-cyber-green" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white">Quiz Complete!</h2>
            <p className="mt-3 text-cyber-text-muted">
              You scored{' '}
              <span className="text-cyber-cyan font-bold text-xl">{correctCount}</span> out of{' '}
              <span className="text-white font-bold text-xl">{total}</span> on{' '}
              <span className={category.color}>{category.name}</span>
            </p>

            <motion.div
              className="mt-4 w-full max-w-xs mx-auto h-3 bg-cyber-bg rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-cyber-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${(correctCount / total) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>

            <p className="mt-3 text-sm text-cyber-text-dim">
              {correctCount >= total * 0.8 ? 'Excellent! You are a pro!' : correctCount >= total * 0.5 ? 'Good job! Keep learning.' : 'Keep studying — you will get there!'}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="px-6 py-3 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap glow-cyan"
              >
                <i className="ri-restart-line mr-2" />
                Retake Quiz
              </button>
              <button
                type="button"
                onClick={handleBackToHub}
                className="px-6 py-3 border border-cyber-border text-cyber-text-muted font-semibold rounded-lg hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-2" />
                Back to Hub
              </button>
            </div>
          </motion.div>
        </div>
    );
  }

  // Quiz View
  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4 }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={handleBackToHub}
              className="text-cyber-text-dim hover:text-cyber-cyan transition-colors text-sm flex items-center gap-1"
            >
              <i className="ri-arrow-left-line" />
              Back to Hub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg bg-cyber-bg flex items-center justify-center ${category?.color} ${category?.border} border`}>
              <i className={category?.icon} />
            </div>
            <DocHeading level={1}>{category?.name} Quiz</DocHeading>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="mt-6 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-cyber-text-dim font-mono">
            Question {current + 1} of {total}
          </span>
          <div className="flex-1 h-2 bg-cyber-bg-card rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyber-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${((current + 1) / total) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="mt-6 cyber-card p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
              {q.question}
            </h3>

            <div className="mt-6 space-y-3">
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === q.correct;
                const showCorrect = answered && isCorrect;
                const showWrong = answered && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                      showCorrect
                        ? 'border-cyber-green bg-cyber-green/10'
                        : showWrong
                          ? 'border-cyber-red bg-cyber-red/10'
                          : isSelected
                            ? 'border-cyber-cyan bg-cyber-cyan/10'
                            : 'border-cyber-border bg-cyber-bg hover:border-cyber-cyan/50'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        showCorrect
                          ? 'border-cyber-green text-cyber-green'
                          : showWrong
                            ? 'border-cyber-red text-cyber-red'
                            : isSelected
                              ? 'border-cyber-cyan text-cyber-cyan'
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
                className="mt-5 p-4 rounded-lg bg-cyber-bg border border-cyber-border"
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

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={current === 0}
            className="px-4 py-2 rounded-lg border border-cyber-border text-sm text-cyber-text-muted hover:border-cyber-cyan hover:text-cyber-cyan transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-1" />
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!answered}
            className="px-4 py-2 rounded-lg bg-cyber-cyan text-cyber-bg text-sm font-semibold hover:bg-cyber-cyan-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {current + 1 >= total ? 'Finish Quiz' : 'Next Question'}
            <i className="ri-arrow-right-line ml-1" />
          </button>
        </div>
      </div>
  );
}