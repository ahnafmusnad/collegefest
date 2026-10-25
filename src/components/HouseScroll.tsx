import React from "react";
import { ArrowRight } from "lucide-react";

interface HouseScrollProps {
  logo: string;
  name: string;
  shortName: string;
  houseName: string;
  motto: string;
  lore: string;
  cheerCount: number;
  cheered: boolean;
  tilt?: string;
  onCheer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onViewLore: () => void;
}

export default function HouseScroll({
  logo,
  name,
  shortName,
  houseName,
  motto,
  lore,
  cheerCount,
  cheered,
  tilt = "",
  onCheer,
  onViewLore,
}: HouseScrollProps) {
  return (
    <article
      onClick={onViewLore}
      className={`house-scroll group relative flex h-full cursor-pointer flex-col ${tilt}`}
    >
      <img src={logo} alt={`${name} logo`} loading="lazy" className="hs-logo" />

      <h3 className="hs-name">{shortName}</h3>
      <p className="hs-house">{houseName}</p>
      <p className="hs-fullname">{name.split("(")[0]}</p>
      <div className="hs-rule" />

      <p className="hs-serif hs-motto">“{motto}”</p>
      <p className="hs-serif hs-lore">{lore}</p>

      <div className="hs-footer">
        <button
          type="button"
          onClick={onCheer}
          className={`hs-cheer ${cheered ? "is-cheered" : ""}`}
        >
          Cheer ({cheerCount})
        </button>
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
