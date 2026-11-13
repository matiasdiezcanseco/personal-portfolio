"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { PortfolioContent } from "@/lib/content";

export function SelectedWork({ items }: { items: PortfolioContent["work"] }) {
  return (
    <Accordion type="multiple" defaultValue={["reliability"]} className="work">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="work-item">
          <AccordionTrigger className="work-trigger">
            <span>
              <span className="work-title">{item.title}</span>
              <span className="detail-label">{item.label}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="work-content" forceMount>
            {item.paragraphs.map((paragraph) => (
              <p className="description" key={paragraph}>
                {paragraph}
              </p>
            ))}
            {item.tags.length > 0 && (
              <div className="tags">
                {item.tags.map((tag) => (
                  <Badge variant="secondary" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
