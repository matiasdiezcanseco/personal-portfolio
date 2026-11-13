import { wordmarkPath } from "@/lib/brand";

export function Brand() {
  return (
    <svg
      className="brand-wordmark"
      viewBox="0 0 80 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={wordmarkPath}
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="76" cy="23" r="2.5" fill="var(--brand-accent, #9dbbff)" />
    </svg>
  );
}
