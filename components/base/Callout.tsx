import type { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'danger' | 'tip';

interface CalloutProps {
  type: CalloutType;
  children: ReactNode;
  title?: string;
  className?: string;
}

const styles: Record<CalloutType, { border: string; icon: string; iconColor: string; bg: string; titleColor: string; text: string }> = {
  info: {
    border: 'border-l-cyber-cyan',
    icon: 'ri-information-line',
    iconColor: 'text-cyber-cyan',
    bg: 'bg-blue-400/40',
    titleColor: 'text-cyber-text',
    text: 'text-cyber-text',
  },
  warning: {
    border: 'border-l-cyber-amber',
    icon: 'ri-alert-line',
    iconColor: 'text-cyber-amber',
    bg: 'bg-amber-500/70',
    titleColor: 'text-cyber-text',
    text: 'text-cyber-text',
  },
  danger: {
    border: 'border-l-cyber-red',
    icon: 'ri-error-warning-line',
    iconColor: 'text-cyber-red',
    bg: 'bg-red-400/40',
    titleColor: 'text-cyber-text',
    text: 'text-cyber-text',
  },
  tip: {
    border: 'border-l-cyber-green',
    icon: 'ri-lightbulb-line',
    iconColor: 'text-cyber-green',
    bg: 'bg-green-400/40',
    titleColor: 'text-cyber-text',
    text: 'text-cyber-text',
  },
};

export default function Callout({ type, children, title, className }: CalloutProps) {
  const style = styles[type];
  const defaultTitle = type === 'info' ? 'Info' : type === 'warning' ? 'Warning' : type === 'danger' ? 'Important' : 'Tip';

    return (
      <div className={`my-6 rounded-lg border-l-[3px] ${style.border} ${style.bg} p-4 ${className || ''}`}>
       <div className="flex items-start gap-3">
         <div className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 ${style.iconColor}`}>
           <i className={style.icon} />
         </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${style.titleColor} mb-1`}>
              {title || defaultTitle}
            </p>
            <div className={`text-sm ${style.text} leading-relaxed`}>{children}</div>
          </div>
       </div>
     </div>
   );
}