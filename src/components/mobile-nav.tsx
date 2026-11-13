"use client";

import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { PortfolioContent } from "@/lib/content";

type Labels = Pick<
  PortfolioContent["ui"],
  "menu" | "menuTitle" | "navigation" | "close"
>;

export function MobileNav({
  labels,
  links,
}: {
  labels: Labels;
  links: { id: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const navigationTarget = useRef<string | null>(null);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="mobile-menu-toggle"
          variant="outline"
          size="icon"
          aria-label={labels.menu}
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="mobile-sheet"
        side="right"
        closeLabel={labels.close}
        onCloseAutoFocus={(event) => {
          const id = navigationTarget.current;
          navigationTarget.current = null;
          if (!id) return;

          // Restoring focus to the hamburger would scroll away from the anchor.
          event.preventDefault();
          document
            .getElementById(id)
            ?.querySelector("h2")
            ?.focus({ preventScroll: true });
        }}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{labels.menuTitle}</SheetTitle>
          <SheetDescription className="sr-only">
            {labels.navigation}
          </SheetDescription>
        </SheetHeader>
        <nav aria-label={labels.navigation} className="sheet-links">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                navigationTarget.current = id;
                setOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
