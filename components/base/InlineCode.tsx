import type { ReactNode } from 'react';

interface InlineCodeProps {
  children: ReactNode;
}

export default function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-cyber-bg-card border border-cyber-border text-cyber-cyan font-mono text-sm">
      {children}
    </code>
  );
}