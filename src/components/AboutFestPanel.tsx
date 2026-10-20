import React from "react";

// EDIT THESE LATER: the paragraphs and the three fact tiles.
const ABOUT_TEXT = [
  "Carnaval Da Chittagong College is the grand winter fest of Chittagong College, held on December 18–19, 2026. For two days the campus becomes a realm of its own, where the Four Great Houses gather to test their wit, their craft and their courage.",
  "Four clubs, four Houses, one throne. Each House sends its champions into eight competitive segments, and every cheer, every victory and every defeat is carried into the tally of the realm, with a prize vault of over 150,000 BDT waiting for the victors.",
  "Winter is coming. Choose your House, rally your friends, and write your name in the saga.",
];

const ABOUT_FACTS = [
  { label: "Date", value: "18–19 Dec 2026" },
  { label: "Venue", value: "Chittagong College" },
  { label: "The Contest", value: "4 Houses · 8 Segments" },
];

export default function AboutFestPanel() {
  return (
    <div className="mx-auto max-w-2xl px-1 py-4 sm:py-6">
      <div className="space-y-4 text-left">
        {ABOUT_TEXT.map((text, i) => (
          <p
            key={i}
            className={`text-[17px] leading-[1.7] text-[#c9d2d2] ${
              i === 0
                ? "first-letter:float-left first-letter:mr-2 first-letter:font-cinzel first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-[#f8f8f8]"
                : ""
            }`}
            style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
          >
            {text}
          </p>
        ))}
      </div>

      <div className="my-6 h-px w-full bg-[#9e9f9f]/35" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {ABOUT_FACTS.map((f) => (
          <div key={f.label} className="about-fact">
            <div className="about-fact__label">{f.label}</div>
            <div className="about-fact__value">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
