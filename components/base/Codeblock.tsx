import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

export default function CodeBlock({ code, language = 'bash', showLineNumbers = true, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="code-block overflow-hidden my-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyber-border bg-cyber-bg-light">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-red" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-amber" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-green" />
          </div>
          {filename && (
            <span className="ml-3 text-xs text-cyber-text-dim font-mono">{filename}</span>
          )}
          {language && !filename && (
            <span className="ml-3 text-xs text-cyber-text-dim font-mono">{language}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-cyber-text-dim hover:text-cyber-cyan transition-colors px-2 py-1 rounded"
        >
          <i className={copied ? 'ri-check-line text-cyber-green' : 'ri-file-copy-line'} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm font-mono leading-relaxed">
          {lines.map((line, idx) => (
            <div key={idx} className="flex">
              {showLineNumbers && (
                <span className="inline-block w-8 text-right pr-3 text-cyber-text-dark select-none flex-shrink-0 text-xs pt-0.5">
                  {idx + 1}
                </span>
              )}
              <span className="text-cyber-text-muted whitespace-pre">{line || ' '}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}