
// EDIT THESE LATER: the paragraphs.
const ABOUT_TEXT = [
  "Carnaval Da Chittagong College is the grand winter fest of Chittagong College, held on December 18–19, 2026.",
  "Four Houses, eight segments, and a prize vault of over 150,000 BDT waiting for the victors.",
  "Winter is coming. Choose your House, and write your name in the saga.",
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
                ? "first-letter:float-left first-letter:mr-2 first-letter:font-cinzel first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-[#e7e3d8]"
                : ""
            }`}
            style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
          >
            {text}
          </p>
        ))}
      </div>

      <div className="my-6 h-px w-full bg-[#9e9f9f]/35" />
    </div>
  );
}
