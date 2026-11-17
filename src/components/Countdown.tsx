interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Digit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div>
      <span className="block overflow-hidden h-[1.05em] font-body text-5xl md:text-6xl leading-none text-bone tabular-nums">
        <span key={v} className="block digit-in">{v}</span>
      </span>
      <span className="mt-2 block font-display text-xs tracking-[0.2em] uppercase text-ash">{label}</span>
    </div>
  );
}

export default function Countdown({ time }: { time: CountdownTime }) {
  return (
    <div className="border-t border-bone/20 pt-6">
      <p className="font-display text-sm tracking-[0.2em] uppercase text-gold mb-5">Gates open in</p>
      <div className="grid grid-cols-4 gap-4">
        <Digit value={time.days} label="Days" />
        <Digit value={time.hours} label="Hours" />
        <Digit value={time.minutes} label="Min" />
        <Digit value={time.seconds} label="Sec" />
      </div>
    </div>
  );
}
