"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Enable stagger animation for direct children */
  stagger?: boolean;
  /** Stagger delay between children (ms), default 60 */
  staggerDelay?: number;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  stagger = false,
  staggerDelay = 60,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("fade-in-visible");

          // Stagger children
          if (stagger) {
            const children = el.querySelectorAll<HTMLElement>(".stagger-child");
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add("visible");
              }, i * staggerDelay);
            });
          }

          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, staggerDelay]);

  return (
    <div
      ref={ref}
      className={`fade-in-hidden ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
