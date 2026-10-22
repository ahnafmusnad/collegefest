import React from 'react';




/**
 * "Chronicler's rule" eyebrow — the shared page-header rubric.
 *
 * Icon-free by design: the ornament lives in the line itself. Two fading
 * silver hairlines, each capped with a softly pulsing ember diamond, bracket
 * the rubric text set in italic EB Garamond small caps.
 */
export const EyebrowRule: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`inline-flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
    {/* Left rule: hairline fading in from nothing, diamond at the inner end */}
    <span aria-hidden="true" className="flex items-center gap-2.5">
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-iron/70 to-gold-2/60 sm:w-20" />
      <span className="animate-glow-pulse h-1.5 w-1.5 rotate-45 border border-ember/90 bg-ink-3" />
    </span>


    {/* The rubric line — italic Garamond, letterspaced */}
    <span className="font-garamond text-xs font-medium uppercase italic tracking-[0.3em] text-gold-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.8),0_0_18px_rgba(23,104,110,0.4)] sm:text-sm">
      {children}
    </span>


    {/* Right rule: mirrored */}
    <span aria-hidden="true" className="flex items-center gap-2.5">
      <span className="animate-glow-pulse h-1.5 w-1.5 rotate-45 border border-ember/90 bg-ink-3" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent via-iron/70 to-gold-2/60 sm:w-20" />
    </span>
  </div>
);




export default EyebrowRule;
