import React from "react";

const Logo: React.FC<{ width?: number; height?: number }> = ({
  width = 62,
  height = 60,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 62 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M31.65 5.39999C19.77 6.79999 20.3667 30.45 22.15 42.1C24.15 52.85 28.55 38.8 28.55 38.8C28.55 38.2 29.15 43.63 28.55 49.75C27.95 55.87 22.7333 58.7 20.2 59.35H0V0H61V59.35H46.9025H41.501C36.1615 59.35 34.8277 52.9201 35.4765 44.4987C36.7313 28.2121 39.4809 4.47716 31.65 5.39999Z"
          fill="url(#paint0_linear)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="29.675"
          x2="61.0137"
          y2="29.675"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F98F41" />
          <stop offset="1" stopColor="#FED38C" />
        </linearGradient>
        <clipPath id="clip0">
          <rect width="61.0137" height="59.35" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
