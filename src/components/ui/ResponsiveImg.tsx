import React from 'react';

/* ============================================================
   RESPONSIVE IMG
   ------------------------------------------------------------
   Drop-in replacement for <img> that generates a srcSet from
   width variants produced by generate-responsive-images.mjs.

   Usage:
     <ResponsiveImg
       src="/images/hero-castle.webp"
       alt="Castle hero"
       sizes="(max-width: 640px) 100vw, 1200px"
       widths={[480, 800, 1200, 1600]}
       loading="lazy"
       decoding="async"
       className="..."
     />

   The `src` without a width is the fallback for browsers that
   don't understand srcSet (and for the largest size when no
   variant matches).
   ============================================================ */

interface ResponsiveImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Base image path (e.g. "/images/hero-castle.webp"). Variants
     are expected at "/images/hero-castle.480.webp", etc. */
  src: string;
  /** Widths to include in srcSet. Default: [480, 800, 1200, 1600] */
  widths?: number[];
  /** CSS sizes attribute. Required for srcSet to work well. */
  sizes?: string;
}

function webpNameFor(src: string, width: number): string {
  return src.replace(/\.webp$/i, '') + `.${width}.webp`;
}

export const ResponsiveImg: React.FC<ResponsiveImgProps> = ({
  src,
  alt = '',
  widths = [480, 800, 1200, 1600],
  sizes,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) => {
  const srcSet = widths
    .filter((w) => w > 0)
    .map((w) => `${webpNameFor(src, w)} ${w}w`)
    .join(', ');

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      {...rest}
    />
  );
};

export default ResponsiveImg;
