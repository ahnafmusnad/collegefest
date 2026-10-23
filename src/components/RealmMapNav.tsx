import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Map as MapIcon,
  List,
  Plus,
  Minus,
  Crosshair,
  CalendarDays,
  MapPin,
  Coins,
  Users,
} from 'lucide-react';
import { PageType } from '../types';
import {
  REALM_NODES,
  REALM_ROADS,
  FOUR_KEEP_MARKERS,
  MAP_ASPECT,
  nodeByPage,
  roadPath,
} from '../data/realmMap';
import { FEST_METADATA, SOCIAL_LINKS } from '../data/festData';
import Button from './ui/Button';
import { NavIcon, SocialGlyph } from './ui/Glyphs';

interface Plane {
  w: number;
  h: number;
  ox: number;
  oy: number;
  cw: number;
  ch: number;
}

const MIN_S = 1;
const MAX_S = 4;

/** Regnal numerals for the great list. */
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

interface RealmMapNavProps {
  open: boolean;
  onClose: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

/**
 * THE ROYAL MAP — the site navigation rendered as an explorable,
 * Game-of-Thrones style chart of the realm. Every nav entry is a seat on
 * the map; travellers pan, pinch-zoom and tap a seat to journey there.
 */
export const RealmMapNav: React.FC<RealmMapNavProps> = ({
  open,
  onClose,
  currentPage,
  onNavigate,
}) => {
  const [view, setView] = useState<'map' | 'list'>('list');
  const [selected, setSelected] = useState<PageType>(currentPage);
  const [t, setT] = useState({ x: 0, y: 0, s: 1 });
  const [smooth, setSmooth] = useState(true);
  const [plane, setPlane] = useState<Plane | null>(null);
  const planeRef = useRef<Plane | null>(null);
  const [cartoucheKey, setCartoucheKey] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; mid: { x: number; y: number }; start: { x: number; y: number; s: number } } | null>(null);
  const dragMoved = useRef(false);
  const mapEntered = useRef(false);

  /* ------------------------------------------------------- geometry ---- */
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    if (!cw || !ch) return;
    const ca = cw / ch;
    let w: number, h: number, ox: number, oy: number;
    if (ca < MAP_ASPECT) {
      h = ch;
      w = ch * MAP_ASPECT;
      ox = (cw - w) / 2;
      oy = 0;
    } else {
      w = cw;
      h = cw / MAP_ASPECT;
      ox = 0;
      oy = (ch - h) / 2;
    }
    planeRef.current = { w, h, ox, oy, cw, ch };
    setPlane(planeRef.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    measure();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, view, measure]);

  const clampT = useCallback(
    (x: number, y: number, s: number, p: Plane) => {
      const minX = p.cw - (p.ox + p.w) * s;
      const maxX = -p.ox * s;
      const minY = p.ch - (p.oy + p.h) * s;
      const maxY = -p.oy * s;
      return {
        x: Math.min(maxX, Math.max(minX, x)),
        y: Math.min(maxY, Math.max(minY, y)),
        s,
      };
    },
    []
  );

  const focusOn = useCallback(
    (page: PageType, s = 1.85) => {
      const p = planeRef.current;
      if (!p) return;
      const node = nodeByPage(page);
      const px = p.ox + (node.x / 100) * p.w;
      const py = p.oy + (node.y / 100) * p.h;
      const next = clampT(p.cw / 2 - s * px, p.ch / 2 - s * py, s, p);
      setSmooth(true);
      setT(next);
    },
    [clampT]
  );

  /* Every opening lands on THE LIST first, the chart waits inside. */
  useEffect(() => {
    if (!open) {
      mapEntered.current = false;
      return;
    }
    setSelected(currentPage);
    setCartoucheKey((k) => k + 1);
    setView('list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Cinematic entrance on the chart: open wide, then glide to the traveller's seat. */
  useEffect(() => {
    if (!open || view !== 'map') return;
    if (!mapEntered.current) {
      mapEntered.current = true;
      setSmooth(false);
      setT({ x: 0, y: 0, s: 1 });
      window.setTimeout(() => focusOn(currentPage, 1.55), 160);
    } else {
      focusOn(currentPage, Math.max(t.s, 1.4));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, view]);

  /* Lock page scroll behind the chart. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  /* ----------------------------------------------------- gestures ---- */
  const zoomAt = useCallback(
    (cx: number, cy: number, factor: number) => {
      const p = planeRef.current;
      if (!p) return;
      setSmooth(false);
      setT((v) => {
        const s = Math.min(MAX_S, Math.max(MIN_S, v.s * factor));
        if (s === v.s) return v;
        const wx = (cx - v.x) / v.s;
        const wy = (cy - v.y) / v.s;
        return clampT(cx - wx * s, cy - wy * s, s, p);
      });
    },
    [clampT]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragMoved.current = false;
    if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      pinch.current = {
        dist: Math.hypot(p1.x - p2.x, p1.y - p2.y),
        mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
        start: { ...t },
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    const p = planeRef.current;
    if (!prev || !p) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved.current = true;
      setSmooth(false);
      setT((v) => clampT(v.x + dx, v.y + dy, v.s, p));
    } else if (pointers.current.size === 2 && pinch.current) {
      const [p1, p2] = [...pointers.current.values()];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      const rect = containerRef.current?.getBoundingClientRect();
      const rx = rect?.left ?? 0;
      const ry = rect?.top ?? 0;
      const st = pinch.current.start;
      const s = Math.min(MAX_S, Math.max(MIN_S, (st.s * dist) / Math.max(24, pinch.current.dist)));
      const wx = (pinch.current.mid.x - rx - st.x) / st.s;
      const wy = (pinch.current.mid.y - ry - st.y) / st.s;
      dragMoved.current = true;
      setSmooth(false);
      setT(clampT(mid.x - rx - wx * s, mid.y - ry - wy * s, s, p));
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    zoomAt(e.clientX - rect.left, e.clientY - rect.top, Math.exp(-e.deltaY * 0.0016));
  };

  const onDoubleTap = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = planeRef.current;
    if (!p) return;
    const next = t.s > 2 ? 1 : 2.4;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setSmooth(true);
    const wx = (cx - t.x) / t.s;
    const wy = (cy - t.y) / t.s;
    setT(clampT(cx - wx * next, cy - wy * next, next, p));
  };

  /* -------------------------------------------------------- actions ---- */
  const selectNode = (page: PageType) => {
    if (dragMoved.current) return;
    setSelected(page);
    setCartoucheKey((k) => k + 1);
    focusOn(page, Math.max(t.s, 1.85));
  };

  const travel = (page: PageType) => {
    onClose();
    onNavigate(page);
  };

  const s = t.s;
  const selectedNode = nodeByPage(selected);
  const currentNode = nodeByPage(currentPage);
  const isHere = selected === currentPage;

  const journeyPath = useMemo(() => {
    if (isHere || view !== 'map') return null;
    const a = currentNode;
    const b = selectedNode;
    const cx = (a.x + b.x) / 2 + (a.y + b.y > 100 ? 6 : -6);
    const cy = (a.y + b.y) / 2 - 10;
    return roadPath(a, b, cx, cy);
  }, [isHere, view, currentNode, selectedNode]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fadeIn" role="dialog" aria-modal="true" aria-label="Site menu — the royal map of the realm">
      {/* ============================ THE CHART ============================ */}
      {view === 'map' && (
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-hidden bg-[#02090a] touch-none select-none cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onWheel={onWheel}
          onDoubleClick={onDoubleTap}
        >
          {/* transformed world */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${s})`,
              transformOrigin: '0 0',
              transition: smooth ? 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
          >
            {plane && (
              <div
                className="absolute"
                style={{ left: plane.ox, top: plane.oy, width: plane.w, height: plane.h }}
              >
                <img
                  src="/images/realm-map.webp"
                  alt="Hand-drawn royal chart of the realm of Carnaval"
                  className="absolute inset-0 h-full w-full"
                  draggable={false}
                />
                {/* cold northern haze + sea sheen baked over the artwork */}
                <div className="realm-tint absolute inset-0 pointer-events-none" />

                {/* ------------ roads, sea routes & keeps (SVG plane) ------------ */}
                <svg
                  className="absolute inset-0 h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {REALM_ROADS.map((r) => {
                    const a = nodeByPage(r.a);
                    const b = nodeByPage(r.b);
                    return (
                      <path
                        key={`${r.a}-${r.b}`}
                        d={roadPath(a, b, r.cx, r.cy)}
                        fill="none"
                        stroke={r.kind === 'road' ? 'rgba(216,196,146,0.55)' : 'rgba(146,196,201,0.45)'}
                        strokeWidth={0.32 / s}
                        strokeDasharray={r.kind === 'road' ? `${1 / s} ${0.75 / s}` : `${0.35 / s} ${0.85 / s}`}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* the four great keeps — they blaze when the Houses are chosen */}
                  {FOUR_KEEP_MARKERS.map((k, i) => (
                    <g
                      key={k.house}
                      className={`keep-sigil ${selected === 'clubs' ? 'keep-sigil--on' : ''}`}
                      style={{ animationDelay: `${i * 160}ms` }}
                    >
                      <circle
                        cx={k.x}
                        cy={k.y}
                        r={(selected === 'clubs' ? 1.5 : 0.75) / s}
                        fill={selected === 'clubs' ? 'rgba(232,180,78,0.22)' : 'rgba(232,180,78,0.10)'}
                        stroke="rgba(232,180,78,0.75)"
                        strokeWidth={0.16 / s}
                      />
                      <circle cx={k.x} cy={k.y} r={0.28 / s} fill="#e8b44e" />
                    </g>
                  ))}

                  {/* the traveller's journey: current seat -> chosen seat */}
                  {journeyPath && (
                    <>
                      <path d={journeyPath} fill="none" stroke="rgba(232,180,78,0.28)" strokeWidth={1.1 / s} strokeLinecap="round" />
                      <path
                        d={journeyPath}
                        fill="none"
                        stroke="#f4cf7a"
                        strokeWidth={0.42 / s}
                        strokeLinecap="round"
                        strokeDasharray={`${1.6 / s} ${1.1 / s}`}
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from={`${2.7 / s}`}
                          to="0"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <g>
                        <circle r={0.9 / s} fill="rgba(244,207,122,0.25)" />
                        <circle r={0.34 / s} fill="#f8e3ae" />
                        <animateMotion dur="4.5s" repeatCount="indefinite" path={journeyPath} />
                      </g>
                    </>
                  )}
                </svg>

                {/* ------------------------- realm pins ------------------------- */}
                {REALM_NODES.map((n) => {
                  const active = selected === n.page;
                  const here = currentPage === n.page;
                  return (
                    <button
                      key={n.page}
                      type="button"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        dragMoved.current = false;
                      }}
                      onPointerUp={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectNode(n.page);
                      }}
                      onDoubleClick={(e) => e.stopPropagation()}
                      data-anchor={n.anchor}
                      className={`realm-pin ${active ? 'realm-pin--active' : ''}`}
                      style={{
                        left: `${n.x}%`,
                        top: `${n.y}%`,
                        transform: `translate(-50%, -50%) scale(${1 / s})`,
                      }}
                      aria-label={`${n.name} — ${n.alias}`}
                    >
                      <span className="realm-pin__pulse" aria-hidden="true" />
                      <span className="realm-pin__gem" aria-hidden="true">
                        <svg viewBox="0 0 40 40" className="realm-pin__diamond">
                          <path d="M20 1 L34 20 L20 39 L6 20 Z" />
                          <path d="M20 7 L29 20 L20 33 L11 20 Z" />
                        </svg>
                        <NavIcon name={n.icon} className="realm-pin__icon" />
                      </span>
                  <span className={`realm-pin__label realm-pin__label--${n.anchor}`}>
                    <em>{n.name}</em>
                    <small>{n.alias}</small>
                  </span>
                      {here && <span className="realm-pin__here">You are here</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* drifting mist above the chart */}
          <div className="realm-mist realm-mist--a pointer-events-none" aria-hidden="true" />
          <div className="realm-mist realm-mist--b pointer-events-none" aria-hidden="true" />
          {/* vignette + gilded frame */}
          <div className="realm-vignette pointer-events-none" aria-hidden="true" />
          <div className="realm-frame pointer-events-none" aria-hidden="true">
            <svg className="realm-frame__corner realm-frame__corner--tl" viewBox="0 0 60 60" aria-hidden="true"><path d="M2 58 V18 Q2 2 18 2 H58 M8 50 V22 Q8 8 22 8 H50" fill="none" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="2.4" fill="currentColor" /></svg>
            <svg className="realm-frame__corner realm-frame__corner--tr" viewBox="0 0 60 60" aria-hidden="true"><path d="M2 58 V18 Q2 2 18 2 H58 M8 50 V22 Q8 8 22 8 H50" fill="none" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="2.4" fill="currentColor" /></svg>
            <svg className="realm-frame__corner realm-frame__corner--bl" viewBox="0 0 60 60" aria-hidden="true"><path d="M2 58 V18 Q2 2 18 2 H58 M8 50 V22 Q8 8 22 8 H50" fill="none" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="2.4" fill="currentColor" /></svg>
            <svg className="realm-frame__corner realm-frame__corner--br" viewBox="0 0 60 60" aria-hidden="true"><path d="M2 58 V18 Q2 2 18 2 H58 M8 50 V22 Q8 8 22 8 H50" fill="none" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="2.4" fill="currentColor" /></svg>
          </div>

          {/* zoom controls */}
          <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex flex-col gap-2">
            <button type="button" className="map-ctl" onClick={() => zoomAt((plane?.cw ?? 0) / 2, (plane?.ch ?? 0) / 2, 1.35)} aria-label="Zoom in"><Plus className="h-4 w-4" /></button>
            <button type="button" className="map-ctl" onClick={() => zoomAt((plane?.cw ?? 0) / 2, (plane?.ch ?? 0) / 2, 1 / 1.35)} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
            <button type="button" className="map-ctl" onClick={() => focusOn(selected, 1.6)} aria-label="Recenter on selection"><Crosshair className="h-4 w-4" /></button>
          </div>

          {/* compass + league scale */}
          <div className="pointer-events-none absolute bottom-3 right-3 z-20 hidden sm:flex flex-col items-end gap-2">
            <svg viewBox="0 0 64 64" className="map-compass h-14 w-14" style={{ transform: `rotate(${t.x * 0.04}deg)` }} aria-hidden="true">
              <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
              <path d="M32 4 L36 28 L32 32 L28 28 Z" fill="currentColor" />
              <path d="M32 60 L36 36 L32 32 L28 36 Z" fill="currentColor" opacity="0.5" />
              <path d="M4 32 L28 28 L32 32 L28 36 Z" fill="currentColor" opacity="0.5" />
              <path d="M60 32 L36 28 L32 32 L36 36 Z" fill="currentColor" opacity="0.5" />
              <circle cx="32" cy="32" r="2.4" fill="currentColor" />
            </svg>
            <div className="map-scale text-[9px] uppercase tracking-[0.22em] text-bone-dim font-cinzel">
              <span className="map-scale__bar" style={{ width: `${Math.round(72 / s)}px` }} />
              1 league
            </div>
          </div>
        </div>
      )}

      {/* ============================ LIST VIEW — THE KING'S MENU ============================ */}
      {view === 'list' && (
        <div className="absolute inset-0 overflow-hidden bg-ink">
          {/* ghosted royal chart + winter atmosphere behind the list */}
          <img
            src="/images/realm-map.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="menu-backdrop-img"
          />
          <div className="realm-tint absolute inset-0 pointer-events-none" />
          <div className="realm-mist realm-mist--a pointer-events-none" aria-hidden="true" />
          <div className="realm-mist realm-mist--b pointer-events-none" aria-hidden="true" />
          <div className="realm-vignette pointer-events-none" aria-hidden="true" />


          <div className="relative z-10 h-full overflow-y-auto overscroll-contain">
            <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 pb-5 pt-24 sm:px-8 lg:px-12 lg:pt-28">
              {/* eyebrow */}
              <div className="animate-fade-up mb-6 lg:mb-9">
                <div className="flex items-center gap-4">
                  <span className="hidden h-px w-12 bg-gradient-to-r from-transparent via-crimson-2/80 to-crimson-2/80 sm:block" aria-hidden="true" />
                  <span className="menu-eyebrow-gem" aria-hidden="true" />
                  <div className="leading-none">
                    <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-2/90 sm:text-[11px]">
                      The King&rsquo;s Menu
                    </p>
                    <p className="mt-1.5 text-[12px] italic tracking-wide text-bone-dim">
                      Choose thy realm — every road leads to glory
                    </p>
                  </div>
                </div>
              </div>


              <div className="grid flex-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_360px]">
                {/* ------------------- THE GREAT LIST ------------------- */}
                <nav aria-label="Primary">
                  <ul>
                    {REALM_NODES.map((item, index) => {
                      const isActive = currentPage === item.page;
                      return (
                        <li key={item.page}>
                          <button
                            type="button"
                            style={{ animationDelay: `${140 + index * 80}ms` }}
                            onClick={() => travel(item.page)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`menu-row group ${isActive ? 'menu-row--active' : ''}`}
                          >
                            <span className="menu-row__numeral" aria-hidden="true">
                              {ROMAN[index]}
                            </span>
                            <span className="min-w-0">
                              <span className="menu-row__alias">
                                {item.name}
                                {item.kind === 'sea' && (
                                  <em className="menu-row__sea">across the narrow sea</em>
                                )}
                              </span>
                              <span className="menu-row__name">{item.alias}</span>
                              <span className="menu-row__blurb">{item.blurb}</span>
                              {isActive && (
                                <span className="menu-row__here">
                                  <i aria-hidden="true" />
                                  You are here
                                </span>
                              )}
                            </span>
                            <span className="menu-row__sigil" aria-hidden="true">
                              <span className="menu-row__sigil-ring" />
                              <NavIcon name={item.icon} className="h-[17px] w-[17px] sm:h-5 sm:w-5" />
                            </span>
                            <span className="menu-row__rule" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>


                {/* ------------------- THE COURT PANEL ------------------- */}
                <aside
                  className="menu-court animate-fade-up hidden lg:block"
                  style={{ animationDelay: '360ms' }}
                  aria-label="The court — fest details"
                >
                  <svg className="menu-court__corner menu-court__corner--tl" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 13 V5 Q1 1 5 1 H13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                  <svg className="menu-court__corner menu-court__corner--tr" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 13 V5 Q1 1 5 1 H13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                  <svg className="menu-court__corner menu-court__corner--bl" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 13 V5 Q1 1 5 1 H13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                  <svg className="menu-court__corner menu-court__corner--br" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 13 V5 Q1 1 5 1 H13" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>


                  <div className="p-6 xl:p-7">
                    {/* crest & house */}
                    <div className="flex items-center gap-4">
                      <img src="/images/college-crest.webp" alt="Chittagong College crest" className="h-14 w-auto" />
                      <div className="leading-tight">
                        <p className="font-cinzel-dec text-[15px] font-bold tracking-[0.08em] text-gold-2">
                          The Court of Carnaval
                        </p>
                        <p className="mt-1 font-cinzel text-[8.5px] uppercase tracking-[0.3em] text-bone-dim">
                          Da Chittagong College
                        </p>
                        <p className="mt-1.5 inline-block border border-crimson/50 bg-crimson/10 px-2 py-0.5 font-cinzel text-[8px] uppercase tracking-[0.24em] text-[#8fd4d9]">
                          {FEST_METADATA.edition}
                        </p>
                      </div>
                    </div>


                    {/* the proclamation facts */}
                    <dl className="mt-6 space-y-4 border-t border-iron/50 pt-6">
                      <div className="flex gap-3.5">
                        <CalendarDays className="mt-0.5 h-4 w-4 flex-none text-ember" aria-hidden="true" />
                        <div>
                          <dt className="font-cinzel text-[8.5px] uppercase tracking-[0.28em] text-ash">When the ravens fly</dt>
                          <dd className="mt-1 text-[13px] font-medium text-bone">{FEST_METADATA.dates}</dd>
                        </div>
                      </div>
                      <div className="flex gap-3.5">
                        <MapPin className="mt-0.5 h-4 w-4 flex-none text-ember" aria-hidden="true" />
                        <div>
                          <dt className="font-cinzel text-[8.5px] uppercase tracking-[0.28em] text-ash">The Red Citadel</dt>
                          <dd className="mt-1 text-[13px] font-medium leading-snug text-bone">{FEST_METADATA.venue}</dd>
                        </div>
                      </div>
                      <div className="flex gap-3.5">
                        <Coins className="mt-0.5 h-4 w-4 flex-none text-ember" aria-hidden="true" />
                        <div>
                          <dt className="font-cinzel text-[8.5px] uppercase tracking-[0.28em] text-ash">The royal purse</dt>
                          <dd className="mt-1 text-[13px] font-medium text-bone">{FEST_METADATA.totalPrizePool} in prize gold</dd>
                        </div>
                      </div>
                      <div className="flex gap-3.5">
                        <Users className="mt-0.5 h-4 w-4 flex-none text-ember" aria-hidden="true" />
                        <div>
                          <dt className="font-cinzel text-[8.5px] uppercase tracking-[0.28em] text-ash">Banners sworn</dt>
                          <dd className="mt-1 text-[13px] font-medium text-bone">{FEST_METADATA.expectedFootfall}</dd>
                        </div>
                      </div>
                    </dl>


                    {/* actions */}
                    <div className="mt-6 space-y-2.5 border-t border-iron/50 pt-6">
                      <Button href={FEST_METADATA.tickifyLink} external className="w-full" onClick={onClose}>
                        Register on Tickify
                      </Button>
                      <button
                        type="button"
                        onClick={() => setView('map')}
                        className="menu-maplink w-full"
                      >
                        <MapIcon className="h-4 w-4" aria-hidden="true" />
                        Unfurl the Royal Map
                      </button>
                    </div>


                    {/* follow */}
                    <div className="mt-6 border-t border-iron/50 pt-5">
                      <p className="font-cinzel text-[8.5px] uppercase tracking-[0.3em] text-ash">Follow the Carnaval</p>
                      <div className="mt-3 flex items-center gap-2.5">
                        {SOCIAL_LINKS.map((soc) => (
                          <a
                            key={soc.name}
                            href={soc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={soc.name}
                            title={soc.name}
                            className="menu-social"
                          >
                            <SocialGlyph icon={soc.icon} className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>


              {/* ------------------- BOTTOM STRIP ------------------- */}
              <div
                className="animate-fade-up mt-8 border-t border-iron/50 pb-2 pt-5"
                style={{ animationDelay: '520ms' }}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <p className="font-cinzel text-[9px] uppercase leading-relaxed tracking-[0.3em] text-ash">
                    Winter is Coming <span className="text-iron">◆</span> Carnaval Da Chittagong College{' '}
                    <span className="text-iron">◆</span> MMXXVI
                  </p>


                  {/* compact actions — the court panel is hidden below lg */}
                  <div className="flex flex-wrap items-center gap-2.5 lg:hidden">
                    <Button size="sm" href={FEST_METADATA.tickifyLink} external onClick={onClose}>
                      Register Now
                    </Button>
                    <button
                      type="button"
                      onClick={() => setView('map')}
                      className="menu-maplink menu-maplink--sm"
                    >
                      <MapIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      Royal Map
                    </button>
                    <span className="mx-1 hidden h-6 w-px bg-iron/60 sm:block" aria-hidden="true" />
                    <div className="flex items-center gap-2">
                      {SOCIAL_LINKS.map((soc) => (
                        <a
                          key={soc.name}
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={soc.name}
                          title={soc.name}
                          className="menu-social menu-social--sm"
                        >
                          <SocialGlyph icon={soc.icon} className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>


                  {/* desktop: only the socials echo down here */}
                  <div className="hidden items-center gap-2.5 lg:flex">
                    {SOCIAL_LINKS.map((soc) => (
                      <a
                        key={soc.name}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={soc.name}
                        title={soc.name}
                        className="menu-social menu-social--sm"
                      >
                        <SocialGlyph icon={soc.icon} className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================ TOP BAR ============================ */}
      <div className="absolute inset-x-0 top-0 z-30 border-b border-gold/15 bg-gradient-to-b from-[#02090a]/95 via-[#02090a]/80 to-transparent px-3 pb-6 pt-3 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/images/college-crest.webp" alt="" className="h-9 w-auto sm:h-10" />
            <div className="min-w-0 leading-none">
              <p className="font-cinzel-dec text-sm sm:text-base font-bold tracking-[0.14em] text-gold-2 truncate">
                {view === 'list' ? "The King's Menu" : 'The Royal Map'}
              </p>
              <p className="mt-1 font-cinzel text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-bone-dim truncate">
                {view === 'list' ? 'Six realms · one crown · choose thy road' : 'Chart your course through Carnaval'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg border border-iron/70 bg-ink-2/70 p-0.5 backdrop-blur">
              <button
                type="button"
                onClick={() => setView('map')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-cinzel text-[10px] uppercase tracking-[0.16em] transition-colors ${view === 'map' ? 'bg-crimson/30 text-gold-2' : 'text-bone-dim hover:text-white'}`}
              >
                <MapIcon className="h-3.5 w-3.5" /> Map
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-cinzel text-[10px] uppercase tracking-[0.16em] transition-colors ${view === 'list' ? 'bg-crimson/30 text-gold-2' : 'text-bone-dim hover:text-white'}`}
              >
                <List className="h-3.5 w-3.5" /> List
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close the royal map"
              className="ghost-btn round-btn flex h-9 w-9 items-center justify-center border border-gold/50 text-gold-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================ CARTOUCHE ============================ */}
      {view === 'map' && (
        <div key={cartoucheKey} className="absolute inset-x-0 bottom-0 z-30 px-3 pb-3 sm:px-5 sm:pb-5 animate-fade-up">
          <div className="mx-auto w-full max-w-xl">
            <div className="cartouche relative overflow-hidden rounded-xl border border-gold/25 p-4 backdrop-blur-md sm:p-5">
              <div className="cartouche__edge pointer-events-none" aria-hidden="true" />
              <div className="flex items-start gap-3.5">
                <div className={`relative mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${isHere ? 'border-gold/70 bg-crimson/25 text-gold-2' : 'border-iron/70 bg-ink-3/70 text-gold'}`}>
                  <NavIcon name={selectedNode.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <h3 className="font-cinzel-dec text-lg font-bold leading-tight text-gold-2 sm:text-xl">{selectedNode.name}</h3>
                    <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffd98a]">{selectedNode.alias}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-bone sm:text-sm">{selectedNode.blurb}</p>
                  {isHere && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-gold/50 bg-crimson/20 px-2.5 py-1 font-cinzel text-[9px] uppercase tracking-[0.18em] text-gold-2">
                        Your current seat
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <Button className="flex-1" onClick={() => (isHere ? onClose() : travel(selectedNode.page))}>
                  {isHere ? 'Return to the Court' : `Travel to ${selectedNode.name}`}
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ghost-btn border border-iron/70 px-4 py-2.5 font-cinzel text-[10px] uppercase tracking-[0.18em] text-gold-2"
                >
                  Stay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealmMapNav;
