import type { ReactNode } from 'react';

interface DocHeadingProps {
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  id?: string;
}

export default function DocHeading({ level, children, id }: DocHeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

  const classes = {
    1: 'text-3xl md:text-4xl font-bold text-white mb-8 pb-4 border-b border-cyber-border',
    2: 'text-xl md:text-2xl font-bold text-white mt-12 mb-5 pb-2 border-l-[3px] border-cyber-cyan pl-4',
    3: 'text-lg md:text-xl font-semibold text-cyber-text mt-8 mb-4',
    4: 'text-base font-semibold text-white mt-6 mb-3',
  };

  return (
    <Tag id={id} className={classes[level]}>
      {children}
    </Tag>
  );
}