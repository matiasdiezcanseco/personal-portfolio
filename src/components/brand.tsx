import wordmark from "@/lib/wordmark.json";

export function Brand() {
  return (
    <svg
      className="brand-wordmark"
      viewBox={`0 0 ${wordmark.width} ${wordmark.height}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={wordmark.letters} fill="currentColor" />
      <path d={wordmark.dot} fill="var(--brand-accent, #9dbbff)" />
    </svg>
  );
}
