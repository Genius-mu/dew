'use client';

import React from 'react';

interface DewLogoProps {
  className?: string;
  size?: number;
  color?: string; // defaults to deep forest green #0E3B2F
}

/**
 * Standalone Dew Skincare Vector Emblem.
 * Unites:
 * 1. A sculptural fluid droplet representing hydration
 * 2. An organic leaf-like spine representing botanical formulation
 * 3. Flowing concentric dermal contours suggesting healthy, resilient skin.
 * No text, wordmark, letters, or initials.
 */
export const DewLogo: React.FC<DewLogoProps> = ({
  className = '',
  size = 36,
  color = '#0E3B2F',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
      aria-label="Dew Emblem"
      role="img"
    >
      {/* Outer sculptural droplet contour with botanical leaf shoulder */}
      <path
        d="M32 4C32 4 11 25.5 11 39.5C11 51.5 20.4 60 32 60C43.6 60 53 51.5 53 39.5C53 25.5 32 4 32 4Z"
        fill={color}
      />
      {/* Sculpted negative space: flowing leaf curve and concentric hydration ripple */}
      <path
        d="M32 12C32 12 17 29.5 17 40C17 48.5 23.7 54.5 32 54.5C30 52 28.5 48.5 28.5 44C28.5 37 32 30 35 24C37.5 19 32 12 32 12Z"
        fill="#FFFFFF"
      />
      {/* Concentric botanical inner contour representing cellular skin vitality */}
      <path
        d="M34 26C31.5 31.5 29.5 37.5 29.5 42.5C29.5 48 33 52 38 51C44 49.8 47.5 44 47.5 38.5C47.5 29 36 17 34 26Z"
        fill={color}
      />
      {/* Suspended inner dew nucleus */}
      <circle cx="36.5" cy="38" r="4" fill="#FFFFFF" />
      <circle cx="36.5" cy="38" r="2.2" fill={color} />
    </svg>
  );
};

export default DewLogo;
