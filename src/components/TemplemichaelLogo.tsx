import React from 'react';

interface TemplemichaelLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TemplemichaelLogo: React.FC<TemplemichaelLogoProps> = ({
  className = '',
  showText = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-9',
    md: 'w-12 h-14',
    lg: 'w-20 h-24',
    xl: 'w-32 h-36',
  };

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 drop-shadow-[0_4px_12px_rgba(201,151,24,0.35)]`}>
        <img
          src="/templemichael-college-logo.svg"
          alt="Templemichael College Crest"
          className="w-full h-full object-contain filter drop-shadow"
          loading="eager"
        />
      </div>
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-display-brutal font-black text-sm tracking-wider text-white uppercase leading-tight">
            Templemichael
          </span>
          <span className="font-mono text-[10px] text-[#ccff00] font-bold tracking-widest uppercase">
            College • Tennis Club
          </span>
          <span className="text-[9px] font-mono text-slate-400">
            Longford N39 DA02
          </span>
        </div>
      )}
    </div>
  );
};
