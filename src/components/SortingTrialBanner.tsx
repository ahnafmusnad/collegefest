import React from 'react';


interface SortingTrialBannerProps {
  onBegin: () => void;
}


/* Filled raven silhouette for the ceremony ribbon */
const RavenMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <circle cx="7.6" cy="7.4" r="3" />
    <path d="M4.9 6.5 1.6 7.7l3.3 1.2z" />
    <path d="M6 9.4c3-.6 7 .4 9.5 3.4 2 2.4 1.5 5.1-1 6.1-3.5 1.4-7 .1-8.5-2.4-1-1.7-1-5.1 0-7.1z" />
    <path d="M14.8 13.2 22.6 15l-6.6 2.2z" />
  </svg>
);


/* Ornate corner flourish: one drawing, rotated per corner */
const CornerFlourish: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <svg viewBox="0 0 84 84" className={className} style={style} fill="none" aria-hidden="true">
    <path d="M28 4.5H78" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 28V78" stroke="currentColor" strokeWidth="1.3" />
    <path d="M30 9.5H64" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
    <path d="M9.5 30V64" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
    <path d="M78 1.5l3 3-3 3-3-3z" fill="currentColor" />
    <path d="M1.5 78l3-3 3 3-3 3z" fill="currentColor" />
    <path d="M64 7.5l2 2-2 2-2-2z" fill="currentColor" opacity="0.7" />
    <path d="M7.5 64l2-2 2 2-2 2z" fill="currentColor" opacity="0.7" />
    <path
      className="st-star"
      d="M12 1.5l2.6 7 7 2.6-7 2.6-2.6 7-2.6-7-7-2.6 7-2.6z"
      fill="currentColor"
    />
    <circle cx="12" cy="11.5" r="1.6" fill="#020a0b" />
  </svg>
);


/* Sorting Trial Banner: "The Iron Raven's Sorting Ceremony" */
export const SortingTrialBanner: React.FC<SortingTrialBannerProps> = ({ onBegin }) => {
  return (
    <section className="relative py-20 md:py-24 px-4 overflow-hidden">
      {/* checkered ceremony floor */}
      <div className="st-checker absolute inset-0" aria-hidden="true" />
      {/* ambient teal aura breathing behind the plaque */}
      <div className="st-aura absolute inset-0" aria-hidden="true" />


      <div className="relative max-w-3xl mx-auto">
        <div className="st-panel relative px-6 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20 text-center">
          {/* corner flourishes */}
          <CornerFlourish className="st-corner absolute top-1.5 left-1.5 w-12 h-12 sm:w-16 sm:h-16 text-gold" />
          <CornerFlourish
            className="st-corner absolute top-1.5 right-1.5 w-12 h-12 sm:w-16 sm:h-16 text-gold rotate-90"
            style={{ animationDelay: '1s' }}
          />
          <CornerFlourish
            className="st-corner absolute bottom-1.5 right-1.5 w-12 h-12 sm:w-16 sm:h-16 text-gold rotate-180"
            style={{ animationDelay: '2s' }}
          />
          <CornerFlourish
            className="st-corner absolute bottom-1.5 left-1.5 w-12 h-12 sm:w-16 sm:h-16 text-gold -rotate-90"
            style={{ animationDelay: '3s' }}
          />


          {/* raven ribbon straddling the top border */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-[18px] z-10">
            <div className="st-ribbon">
              <div className="st-ribbon-inner">
                <RavenMark className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gold-2 shrink-0" />
                <span className="font-cinzel text-[9px] sm:text-[11px] font-semibold tracking-[0.28em] text-bone uppercase whitespace-nowrap">
                  <span className="hidden sm:inline">Words <span className="text-gold mx-1">&diams;</span> </span>The Iron Raven&rsquo;s Sorting Ceremony
                </span>
              </div>
            </div>
          </div>


          {/* heading */}
          <div className="relative z-10">
            <h3 className="st-title font-cinzel text-[2rem] leading-[1.15] sm:text-5xl md:text-[3.4rem] font-bold text-gold-2 uppercase tracking-wide">
              Discover Your True
              <br />
              College House
            </h3>


            {/* diamond divider */}
            <div className="flex items-center justify-center gap-3 mt-5 mb-6" aria-hidden="true">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-crimson-2/70" />
              <span className="st-gem block w-2 h-2 rotate-45 border border-gold-2 bg-ink" />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-crimson-2/70" />
            </div>


            {/* the call */}
            <p className="font-garamond text-[15px] sm:text-lg leading-relaxed text-bone-dim max-w-xl mx-auto">
              Are your words sharp enough for{' '}
              <em className="text-bone not-italic font-medium">House Lannister</em>? Does your mind
              master the gears of <em className="text-bone not-italic font-medium">House Stark</em>?
              Does your soul sing with{' '}
              <em className="text-bone not-italic font-medium">House Targaryen</em>, or do you command
              armies with <em className="text-bone not-italic font-medium">House Baratheon</em>? Take
              the 3-question trial now.
            </p>


            {/* ritual button */}
            <div className="mt-9">
              <button type="button" onClick={onBegin} className="st-ritual group cursor-pointer">
                <span className="st-ritual-inner">
                  Begin the Sorting Ritual
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default SortingTrialBanner;
