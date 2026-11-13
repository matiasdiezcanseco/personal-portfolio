"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 820px)");
    let previousY = Math.max(0, window.scrollY);
    let frame = 0;

    const update = () => {
      frame = 0;
      // Clamp overscroll on mobile so bouncing at the top cannot hide the menu.
      const y = Math.max(
        0,
        Math.min(
          window.scrollY,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      if (!mobile.matches || y <= (header.current?.offsetHeight ?? 0)) {
        setHidden(false);
        previousY = y;
      } else if (Math.abs(y - previousY) >= 10) {
        setHidden(y > previousY);
        previousY = y;
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    mobile.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      mobile.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={header}
      className="site-header"
      data-hidden={hidden}
      onFocusCapture={() => setHidden(false)}
    >
      {children}
    </header>
  );
}
