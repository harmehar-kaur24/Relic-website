"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  left: { x: -36 },
  right: { x: 36 },
  none: {},
};

/** Reveal anyway after this long, even if the viewport observer never fires. */
const FAILSAFE_MS = 1200;

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [failsafe, setFailsafe] = useState(false);

  /*
   * Safety net. This used to be a bare `whileInView`, which meant the content
   * sat at opacity:0 forever whenever the viewport observer failed to fire —
   * and it does fail: inside an offscreen or zero-sized container, under
   * heavy paint load, or when many observed nodes are registered at once.
   * The relic grid hit exactly this and the whole gallery was invisible.
   *
   * An entrance animation must never be the reason content cannot be read, so
   * after FAILSAFE_MS we reveal regardless. The worst case is that the fade is
   * skipped; the content is always shown.
   */
  useEffect(() => {
    const timer = setTimeout(() => setFailsafe(true), FAILSAFE_MS);
    return () => clearTimeout(timer);
  }, []);

  const shown = inView || failsafe;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={
        shown ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }
      }
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
