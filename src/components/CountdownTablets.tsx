import { CalendarDays, Hourglass, Snowflake, Moon } from "lucide-react";
import { Reveal } from "./Reveal";


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


const FlourishRule = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 150 12"
    className={`h-2.5 w-8 shrink-0 text-[#9e9f9f] sm:w-24 ${flip ? "-scale-x-100" : ""}`}
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <line x1="0" y1="6" x2="126" y2="6" strokeOpacity="0.5" />
    <rect x="128" y="3.5" width="5" height="5" transform="rotate(45 130.5 6)" fill="currentColor" stroke="none" opacity="0.85" />
    <circle cx="140" cy="6" r="1.4" fill="currentColor" stroke="none" opacity="0.7" />
    <circle cx="146" cy="6" r="1" fill="currentColor" stroke="none" opacity="0.5" />
  </svg>
);


const TabletFoot = () => (
  <svg viewBox="0 0 84 20" className="tab-foot" fill="none" stroke="currentColor" aria-hidden="true">
    <line x1="0" y1="6" x2="32" y2="6" strokeOpacity="0.6" />
    <rect x="38" y="2.5" width="7" height="7" transform="rotate(45 41.5 6)" strokeOpacity="0.9" />
    <line x1="51" y1="6" x2="83" y2="6" strokeOpacity="0.6" />
    <path d="M37 16.5 h9 M41.5 13.5 v6" strokeOpacity="0.7" />
  </svg>
);


export default function CountdownTablets({ time }: { time: TimeLeft }) {
  const units = [
    { label: "Days", value: time.days, Icon: CalendarDays, shape: "torn-a" },
    { label: "Hours", value: time.hours, Icon: Hourglass, shape: "torn-b" },
    { label: "Minutes", value: time.minutes, Icon: Snowflake, shape: "torn-a" },
    { label: "Seconds", value: time.seconds, Icon: Moon, shape: "torn-b" },
  ];


  return (
    <div className="mx-auto max-w-[620px] pt-6">
      <Reveal>
        <div className="mb-5 flex items-center justify-center gap-2 sm:gap-4">
          <FlourishRule />
          <h2 className="whitespace-nowrap font-cinzel text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f8f8f8] sm:text-sm sm:tracking-[0.32em]">
            Winter Descends In
          </h2>
          <FlourishRule flip />
        </div>
      </Reveal>


      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((u, i) => (
          <Reveal key={u.label} delay={i * 110} direction="drop" className="h-full">
            <div className={`tab-tablet ${u.shape} h-full`}>
              <div className="tab-inner h-full">
                <div className="tab-medal">
                  <u.Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="tab-value">{String(u.value).padStart(2, "0")}</div>
                <div className="tab-label">{u.label}</div>
                <TabletFoot />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
