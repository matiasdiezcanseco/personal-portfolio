"use client";

import { useEffect, useState } from "react";

export function SectionIndex({
  links,
  context,
  note,
  label,
}: {
  links: { id: string; label: string }[];
  context: string;
  note: string;
  label: string;
}) {
  const [active, setActive] = useState("about");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      let current = links[0].id;
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [links]);
  return (
    <aside className="index" aria-label={label}>
      <p>{context}</p>
      <nav>
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <p className="side-note">{note}</p>
    </aside>
  );
}
