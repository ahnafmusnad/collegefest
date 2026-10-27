import { ArrowRight, Globe, Landmark } from "lucide-react";

interface HouseScrollProps {
  logo: string;
  name: string;
  houseName: string;
  motto: string;
  lore: string;
  links: { facebook: string; website: string };
  tilt?: string;
  onViewLore: () => void;
}

export default function HouseScroll({
  logo,
  name,
  houseName,
  motto,
  lore,
  links,
  tilt = "",
  onViewLore,
}: HouseScrollProps) {
  return (
    <article
      onClick={onViewLore}
      className={`house-scroll group relative flex h-full cursor-pointer flex-col ${tilt}`}
    >
      <img src={logo} alt={`${name} logo`} loading="lazy" className="hs-logo" />

      <h3 className="hs-name">{name.split("(")[0]}</h3>
      <p className="hs-house">{houseName}</p>
      <div className="hs-rule" />

      <p className="hs-serif hs-motto">“{motto}”</p>
      <p className="hs-serif hs-lore">{lore}</p>

      <div className="hs-footer">
        {/* social gates of the house */}
        <span className="hs-gates" onClick={(e) => e.stopPropagation()}>
          {links.facebook && (
            <a
              href={links.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit the ${name} Facebook gate`}
              title="Visit their Facebook gate"
              className="hs-gate"
            >
              <Landmark className="h-3.5 w-3.5" />
            </a>
          )}
          {links.website && (
            <a
              href={links.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit the ${name} website`}
              title="Visit their website"
              className="hs-gate"
            >
              <Globe className="h-3.5 w-3.5" />
            </a>
          )}
          {!links.facebook && !links.website && (
            <span className="hs-gate hs-gate--muted" title="Gates not yet proclaimed">
              <Landmark className="h-3.5 w-3.5" />
            </span>
          )}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewLore();
          }}
          className="hs-link"
        >
          <span>View Lore</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
}
