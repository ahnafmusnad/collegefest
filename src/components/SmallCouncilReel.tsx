import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SMALL_COUNCIL } from "../data/festData";


const getInitials = (name: string) =>
  name
    .replace(/^(Prof\.|Dr\.|Md\.)\s+/i, "")
    .split(" ")
    .filter((w) => w.length > 1)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


/**
 * SMALL COUNCIL — endless center-focus reel.
 * Members are rendered 3 times in a row. When the user stops scrolling
 * outside the middle copy, we silently jump by exactly one copy width,
 * so the reel never ends and never looks empty on either side.
 * Photos: set `image` on a member in festData.ts (e.g. "/images/council/name.jpg").
 */
export default function SmallCouncilReel() {
  const members = SMALL_COUNCIL;
  const N = members.length;
  const items = [0, 1, 2].flatMap((copy) => members.map((m) => ({ m, copy })));


  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idleTimer = useRef(0);
  const jumping = useRef(false);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const activeRef = useRef(N);
  /* index the user asked for (middle copy) — kept so a recenter that fires
     mid-flight still lands on the intended member */
  const intentRef = useRef({ index: -1, at: 0 });
  /* suppress nearest-index updates while a smooth scroll is running */
  const smoothUntil = useRef(0);
  const [active, setActive] = useState(N);
  const [dragging, setDragging] = useState(false);


  const updateActive = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);


  const nearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return activeRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slideRefs.current.forEach((s, i) => {
      if (!s) return;
      const c = s.offsetLeft + s.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, []);


  /* pixel offset that centers a slide inside the visible track */
  const offsetFor = useCallback((i: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[i];
    if (!track || !slide) return null;
    return slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
  }, []);


  /**
   * Center a slide. Every request is mapped onto the MIDDLE copy of the reel,
   * so a member is never left stranded in the first/third copy.
   */
  const scrollToIndex = useCallback(
    (i: number, smooth = true) => {
      const track = trackRef.current;
      const clamped = Math.max(0, Math.min(3 * N - 1, i));
      const target = clamped % N + N; // middle copy of the same member
      const left = offsetFor(target);
      if (!track || left === null) return;
      if (smooth) {
        intentRef.current = { index: target, at: Date.now() };
        smoothUntil.current = Date.now() + 900;
        updateActive(target);
      }
      track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    },
    [N, offsetFor, updateActive]
  );


  useEffect(() => {
    const track = trackRef.current;
    if (!track || N === 0) return;
    let raf = 0;


    const recenter = () => {
      if (drag.current.down || jumping.current) return;
      const track = trackRef.current;
      if (!track) return;

      /* If the user asked for a specific member, honour that request —
         even when the jump happens while a smooth scroll is still running. */
      const intent = intentRef.current;
      const fresh = intent.index >= 0 && Date.now() - intent.at < 2000;

      let targetIdx: number;
      if (fresh) {
        targetIdx = (intent.index % N) + N;
      } else {
        const best = nearestIndex();
        if (best >= N && best < 2 * N) return; // already in the middle copy
        targetIdx = best < N ? best + N : best - N;
      }
      if (targetIdx < 0 || targetIdx >= 3 * N) return;

      const left = offsetFor(targetIdx);
      if (left === null) return;

      jumping.current = true;
      track.dataset.free = "1"; // turn snapping off during the jump
      track.scrollTo({ left, behavior: "auto" });
      updateActive(targetIdx);
      intentRef.current = { index: -1, at: 0 };
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          delete track.dataset.free;
          jumping.current = false;
        })
      );
    };


    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!jumping.current && Date.now() > smoothUntil.current) {
          updateActive(nearestIndex());
        }
      });
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(recenter, 150);
    };


    track.addEventListener("scroll", onScroll, { passive: true });
    const t = window.setTimeout(() => {
      scrollToIndex(N, false);
      updateActive(N);
    }, 80);
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer.current);
      window.clearTimeout(t);
    };
  }, [N, nearestIndex, offsetFor, scrollToIndex, updateActive]);


  /* Mouse drag-to-scroll (touch uses native pan + snap) */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.moved = false;
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.dataset.free = "1";
    track.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const wasDrag = drag.current.moved;
    drag.current.down = false;
    setDragging(false);
    delete track.dataset.free;
    if (!wasDrag) {
      /* Plain click: pointer capture swallows the button's own click event,
         so we resolve the card under the cursor ourselves and center it. */
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const slide = el ? el.closest<HTMLElement>("[data-council-index]") : null;
      const idx = slide ? Number(slide.dataset.councilIndex) : NaN;
      if (!Number.isNaN(idx)) {
        scrollToIndex(idx);
        return;
      }
    }
    const best = nearestIndex();
    window.setTimeout(() => scrollToIndex(best), 10);
  };


  if (N === 0) return null;


  const realIndex = active % N;
  const member = members[realIndex];


  return (
    <section id="council" className="relative py-16 md:py-24 overflow-hidden">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.13] pointer-events-none"
        style={{
          backgroundImage: "url(/images/college-winter-citadel.jpg)",
          maskImage: "radial-gradient(90% 80% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(90% 80% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] rounded-full bg-crimson/10 blur-[120px] pointer-events-none" />


      <div className="relative z-10">
        {/* header */}
        <div className="text-center px-6">
          <p className="font-cinzel text-[11px] tracking-[0.5em] uppercase text-crimson-2">
            Those Who Guide the Realm
          </p>
          <div className="mt-4 flex items-center justify-center gap-5">
            <span className="h-px w-14 md:w-24 bg-gradient-to-r from-transparent to-iron" />
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-[0.28em] text-gold-2 uppercase">
              Small Council
            </h2>
            <span className="h-px w-14 md:w-24 bg-gradient-to-l from-transparent to-iron" />
          </div>
          <p className="font-garamond italic text-bone-dim mt-4 max-w-xl mx-auto">
            Drag the reel or use the arrows to meet the hands that steer the Carnaval.
          </p>
        </div>


        {/* carousel */}
        <div className="relative mt-10 md:mt-14">
          <div
            ref={trackRef}
            className={`council-track relative overflow-x-auto no-scrollbar select-none ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="flex items-center gap-5 md:gap-12 w-max py-6">
              {items.map(({ m, copy }, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={`${m.id}-${copy}`}
                    data-council-index={i}
                    ref={(el) => {
                      slideRefs.current[i] = el;
                    }}
                    className="council-slide flex flex-col items-center shrink-0"
                  >
                    {/* connector label */}
                    <div
                      className={`h-[86px] flex flex-col items-center justify-end transition-all duration-500 ${
                        isActive ? "opacity-100" : "opacity-45"
                      }`}
                    >
                      <span
                        className={`font-cinzel text-[9px] leading-relaxed tracking-[0.22em] uppercase text-center max-w-[150px] md:max-w-[200px] transition-colors duration-500 ${
                          isActive
                            ? "text-gold-2 border border-gold-2/50 bg-ink/60 px-2.5 py-1.5 shadow-[0_0_24px_-6px_rgba(248,248,248,0.35)]"
                            : "text-ash"
                        }`}
                      >
                        {m.name}
                      </span>
                      <span
                        className={`w-px transition-all duration-500 ${
                          isActive ? "h-8 bg-gold-2/70" : "h-5 bg-iron/70"
                        }`}
                      />
                    </div>


                    {/* portrait card */}
                    <button
                      type="button"
                      tabIndex={copy === 1 ? 0 : -1}
                      onClick={() => {
                        if (!drag.current.moved) scrollToIndex(i);
                      }}
                      aria-label={`Center ${m.name}`}
                      className={`group relative w-[180px] h-[270px] md:w-[232px] md:h-[348px] shrink-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                        isActive
                          ? "scale-[1.03] md:scale-110 z-10 shadow-[0_0_60px_-12px_rgba(23,104,110,0.65)]"
                          : "scale-[0.9] md:scale-[0.92] opacity-50 hover:opacity-75"
                      }`}
                      style={{
                        background: "#020a0b url(/images/council-card-frame.webp) center / 100% 100% no-repeat",
                      }}
                    >
                      {m.image ? (
                        /* photo goes inside the frame's circle ring */
                        <img
                          src={m.image}
                          alt={m.name}
                          loading="lazy"
                          draggable={false}
                          className={`absolute left-1/2 top-[45.2%] -translate-x-1/2 -translate-y-1/2 w-[66%] aspect-square rounded-full object-cover border transition-colors duration-500 ${
                            isActive ? "border-gold-2/50" : "border-iron/40"
                          }`}
                        />
                      ) : (
                        /* monogram, centred exactly on the frame's circle ring */
                        <span
                          className={`absolute left-0 right-0 top-[45.2%] -translate-y-1/2 flex items-center justify-center font-cinzel-dec text-6xl md:text-7xl leading-none transition-all duration-500 ${
                            isActive
                              ? "text-gold-2 drop-shadow-[0_0_22px_rgba(248,248,248,0.35)]"
                              : "text-iron"
                          }`}
                        >
                          {getInitials(m.name)}
                        </span>
                      )}


                      {/* sheen */}
                      <span className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(248,248,248,0.12),transparent_60%)]" />


                      {/* tag chip: kept inside the frame's safe area, clear of the bottom ornaments */}
                      <span
                        className={`absolute bottom-[16%] left-[14%] right-[14%] text-center font-cinzel text-[8px] md:text-[9px] leading-snug tracking-[0.14em] uppercase px-2 py-1.5 border backdrop-blur-sm transition-colors duration-500 ${
                          isActive
                            ? "border-gold-2/40 bg-ink/80 text-bone"
                            : "border-iron/50 bg-ink/60 text-bone-dim"
                        }`}
                      >
                        {m.houseAllegiance}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>


          {/* edge fades */}
          <div className="absolute inset-y-0 left-0 w-10 md:w-32 bg-gradient-to-r from-ink to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-10 md:w-32 bg-gradient-to-l from-ink to-transparent pointer-events-none z-20" />
        </div>


        {/* detail + controls */}
        <div className="mt-8 md:mt-10 px-6">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-5 md:gap-8">
            <button
              type="button"
              onClick={() => scrollToIndex(activeRef.current - 1)}
              aria-label="Previous council member"
              className="shrink-0 w-11 h-11 border border-iron/70 text-bone-dim hover:text-gold-2 hover:border-gold-2/60 transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_20px_-6px_rgba(23,104,110,0.7)]"
            >
              <ChevronLeft size={18} />
            </button>


            <div key={member.id} className="animate-fadeIn text-center min-w-0">
              <p className="font-cinzel text-[10px] md:text-xs tracking-[0.42em] uppercase text-crimson-2">
                {member.gotTitle}
              </p>
              <h3 className="font-cinzel text-xl md:text-[26px] font-semibold text-gold-2 mt-2 leading-snug">
                {member.name}
              </h3>
              <p className="font-garamond italic text-bone-dim mt-1.5 text-sm md:text-base">
                “{member.houseAllegiance}”
              </p>
            </div>


            <button
              type="button"
              onClick={() => scrollToIndex(activeRef.current + 1)}
              aria-label="Next council member"
              className="shrink-0 w-11 h-11 border border-iron/70 text-bone-dim hover:text-gold-2 hover:border-gold-2/60 transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_20px_-6px_rgba(23,104,110,0.7)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>


          {/* progress */}
          <div className="max-w-xs mx-auto mt-7 flex items-center gap-4">
            <span className="font-cinzel text-[10px] tracking-[0.3em] text-bone-dim tabular-nums">
              {String(realIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px bg-iron/50 relative overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-gold-2/80 transition-all duration-500 ease-out"
                style={{ width: `${((realIndex + 1) / N) * 100}%` }}
              />
            </div>
            <span className="font-cinzel text-[10px] tracking-[0.3em] text-ash tabular-nums">
              {String(N).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
