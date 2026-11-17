export default function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 text-gold/70 max-w-7xl mx-auto px-5 md:px-10 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" /></svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}
