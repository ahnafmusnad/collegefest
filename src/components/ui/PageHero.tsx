import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';


/* Brushed-silver heading look (same as the Fest page) */
const SILVER =
  'text-gold-2 [text-shadow:0_1px_0_rgba(231,227,216,0.12),0_2px_6px_rgba(0,0,0,0.75),0_0_28px_rgba(31,138,145,0.25)]';


interface PageHeroProps {
  image: string;
  imageAlt?: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}


/**
 * Full-width page header: photo covers the whole background, text sits over it.
 * It breaks out of the page container (full screen width) and slides up under
 * the navbar, so use it as the FIRST child of a page wrapper that has pt-24.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  image,
  imageAlt = '',
  icon,
  eyebrow,
  title,
  description,
  children
}) => {
  const heroRef = useRef<HTMLElement>(null);


  const scrollDown = () => {
    heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <section
      ref={heroRef}
      className="relative left-1/2 -mt-24 flex min-h-[75vh] w-screen -translate-x-1/2 items-center justify-center overflow-hidden"
    >
      {/* Backdrop photo */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_45%,transparent_35%,rgba(2,10,11,0.85)_100%)]" />
      </div>


      {/* Torch glows */}
      <div className="animate-ember pointer-events-none absolute bottom-24 left-[12%] h-40 w-40 rounded-full bg-ember/10 blur-3xl" />
      <div
        className="animate-ember pointer-events-none absolute bottom-32 right-[12%] h-40 w-40 rounded-full bg-ember/10 blur-3xl"
        style={{ animationDelay: '1.6s' }}
      />


      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-28 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-ember/45 bg-ink-2/60 px-6 py-2.5 backdrop-blur-md">
          {icon}
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-bone">
            {eyebrow}
          </span>
        </div>


        <h1
          className={`font-cinzel animate-fade-up mt-8 text-4xl font-bold leading-[1.08] tracking-wide sm:text-6xl lg:text-[4.2rem] ${SILVER}`}
          style={{ animationDelay: '120ms' }}
        >
          {title}
        </h1>


        <p
          className="animate-fade-up mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-bone/90 sm:text-[15px]"
          style={{ animationDelay: '240ms' }}
        >
          {description}
        </p>


        {children && (
          <div
            className="animate-fade-up mt-8 flex justify-center"
            style={{ animationDelay: '340ms' }}
          >
            {children}
          </div>
        )}
      </div>


      {/* Scroll cue */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ember/80 transition-colors hover:text-ember"
      >
        <span className="flex h-9 w-9 rotate-45 items-center justify-center border border-ember/50 bg-ink-2/70 backdrop-blur-sm">
          <ChevronDown className="h-4 w-4 -rotate-45 animate-bob" />
        </span>
      </button>
    </section>
  );
};


export default PageHero;
