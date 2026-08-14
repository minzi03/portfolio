/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target number to count up to */
  target: number;
  /** Suffix to append (e.g., "+", "M+") */
  suffix?: string;
  /** Duration in ms */
  duration?: number;
  /** Decimal places to show during animation */
  decimals?: number;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function formatNumber(value: number, decimals: number): string {
  if (decimals === 0) return Math.round(value).toLocaleString();
  return value.toFixed(decimals);
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1400,
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion — show final value immediately
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(`${formatNumber(target, decimals)}${suffix}`);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = easedProgress * target;

            setDisplayValue(`${formatNumber(currentValue, decimals)}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration, decimals, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums" aria-live="polite" aria-atomic="true">
      {displayValue}
    </span>
  );
}
