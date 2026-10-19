import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Back to top"
        title="Back to top"
        className="w-12 h-12 flex items-center justify-center rounded-xl border border-gold/50 bg-ink-2/90 text-gold-2 backdrop-blur-sm transition-colors hover:text-white hover:border-gold hover:bg-ink-3 btn-shine"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};
