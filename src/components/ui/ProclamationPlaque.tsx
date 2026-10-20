import React from 'react';


/* Small four-point sparkle star used at the inner ends of the plaque */
const Sparkle: React.FC<{ className?: string; delay?: string }> = ({ className = '', delay = '0s' }) => (
  <span className={`absolute top-1/2 -translate-y-1/2 ${className}`}>
    <svg
      viewBox="0 0 28 28"
      className="plaque-sparkle block h-auto w-full"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <path
        d="M14 1.5 Q15.8 11.2 26.5 14 Q15.8 16.8 14 26.5 Q12.2 16.8 1.5 14 Q12.2 11.2 14 1.5 Z"
        fill="rgba(70,207,221,0.22)"
        stroke="#8ce8f2"
        strokeWidth="1.1"
      />
      <path
        d="M14 7 Q14.9 12.6 21 14 Q14.9 15.4 14 21 Q13.1 15.4 7 14 Q13.1 12.6 14 7 Z"
        fill="rgba(140,232,242,0.55)"
        stroke="none"
      />
    </svg>
  </span>
);


interface ProclamationPlaqueProps {
  title?: string;
  className?: string;
}


export const ProclamationPlaque: React.FC<ProclamationPlaqueProps> = ({
  title = 'Chittagong College • December 18–19, 2026',
  className = '',
}) => {
  return (
    <div className={`proclamation-plaque relative mx-auto w-[min(92vw,640px)] select-none ${className}`}>
      {/* soft ambient halo behind the frame */}
      <div className="absolute inset-0 -z-10 scale-110 bg-[radial-gradient(ellipse_at_center,rgba(46,169,184,0.18)_0%,transparent_70%)] blur-md plaque-halo" />


      <div className="relative h-[72px] sm:h-[92px] md:h-[104px]">
        {/* ---------- stretched heraldic outline ---------- */}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible plaque-frame"
          viewBox="0 0 880 150"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="plaque-surface" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(10,42,47,0.72)" />
              <stop offset="50%" stopColor="rgba(5,26,29,0.82)" />
              <stop offset="100%" stopColor="rgba(9,38,43,0.72)" />
            </linearGradient>
          </defs>


          {/* outer ogee outline with pointed flared ends */}
          <path
            d="M 122 45
               L 758 45
               C 790 45 799 51 811 61
               C 825 71 846 73 872 75
               C 846 77 825 79 811 89
               C 799 99 790 105 758 105
               L 122 105
               C 90 105 81 99 69 89
               C 55 79 34 77 8 75
               C 34 73 55 71 69 61
               C 81 51 90 45 122 45 Z"
            fill="url(#plaque-surface)"
            stroke="#46cfdd"
            strokeWidth="1.6"
          />


          {/* inner twin border line */}
          <path
            d="M 128 53
               L 752 53
               C 780 53 788 58 799 67
               C 811 76 828 73.8 852 75
               C 828 76.2 811 74 799 83
               C 788 92 780 97 752 97
               L 128 97
               C 100 97 92 92 81 83
               C 69 74 52 76.2 28 75
               C 52 73.8 69 76 81 67
               C 92 58 100 53 128 53 Z"
            fill="none"
            stroke="#2fa9b8"
            strokeWidth="1"
            opacity="0.8"
          />


          {/* tiny notch diamonds on the border (corners + two along each long edge) */}
          {[
            [122, 45],
            [310, 45],
            [570, 45],
            [758, 45],
            [122, 105],
            [310, 105],
            [570, 105],
            [758, 105],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M ${x} ${y - 4.5} L ${x + 4.5} ${y} L ${x} ${y + 4.5} L ${x - 4.5} ${y} Z`}
              fill="#04211f"
              stroke="#7fe3ee"
              strokeWidth="1"
            />
          ))}


          {/* fine horizontal accent threads just inside the ends */}
          <line x1="40" y1="75" x2="96" y2="75" stroke="#46cfdd" strokeWidth="0.8" opacity="0.5" />
          <line x1="784" y1="75" x2="840" y2="75" stroke="#46cfdd" strokeWidth="0.8" opacity="0.5" />
        </svg>


        {/* ---------- end sparkles ---------- */}
        <Sparkle className="left-[6.5%] w-4 sm:w-5" delay="0s" />
        <Sparkle className="right-[6.5%] w-4 sm:w-5" delay="1.4s" />


        {/* ---------- proclamation text ---------- */}
        <div className="absolute inset-0 flex items-center justify-center px-[10%] sm:px-[13%]">
          <span className="plaque-text whitespace-nowrap font-cinzel text-center text-[7px] font-semibold uppercase leading-none tracking-[0.12em] text-[#eaf7f8] sm:text-[11px] sm:tracking-[0.2em] md:text-[13px]">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};


export default ProclamationPlaque;
