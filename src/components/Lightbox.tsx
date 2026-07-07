"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ZOOM_SCALE = 2.4;
const DRAG_THRESHOLD = 6; // px of movement before a press counts as a drag, not a click

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const pointer = useRef({
    down: false,
    moved: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });

  // Maximum distance the image can be panned before its edge reaches the
  // viewport edge — keeps the image from being dragged off into empty space.
  const clamp = useCallback((x: number, y: number) => {
    const img = imgRef.current;
    if (!img) return { x, y };
    // offsetWidth/Height are the laid-out (unscaled) dimensions.
    const maxX = Math.max(0, (img.offsetWidth * ZOOM_SCALE - window.innerWidth) / 2);
    const maxY = Math.max(0, (img.offsetHeight * ZOOM_SCALE - window.innerHeight) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    pointer.current = {
      down: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      baseX: offset.x,
      baseY: offset.y,
    };
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    const p = pointer.current;
    if (!p.down || !zoomed) return;
    const dx = event.clientX - p.startX;
    const dy = event.clientY - p.startY;
    if (!p.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      p.moved = true;
      setDragging(true);
    }
    if (p.moved) {
      setOffset(clamp(p.baseX + dx, p.baseY + dy));
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    const p = pointer.current;
    p.down = false;
    setDragging(false);
    if (p.moved) return; // it was a pan, not a click — don't toggle

    if (zoomed) {
      setZoomed(false);
      setOffset({ x: 0, y: 0 });
      return;
    }

    // Zoom in toward the clicked point so it stays under the cursor.
    const img = imgRef.current;
    if (img) {
      const rect = img.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const target = clamp(
        -(event.clientX - cx) * (ZOOM_SCALE - 1),
        -(event.clientY - cy) * (ZOOM_SCALE - 1)
      );
      setOffset(target);
    }
    setZoomed(true);
  };

  return (
    <>
      {!zoomed && (
        <span className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-950/80 px-3 py-1.5 text-xs font-medium text-cream-100/80">
          Click to zoom · drag to pan
        </span>
      )}

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex h-full w-full items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={(event) => event.stopPropagation()}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomed ? ZOOM_SCALE : 1})`,
            transition: dragging ? "none" : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
          className={`max-h-full max-w-full touch-none select-none rounded-lg object-contain shadow-2xl ${
            zoomed
              ? dragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
          }`}
        />
      </motion.div>
    </>
  );
}

export default function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-950/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-navy-900/80 text-gold-300 transition hover:border-gold-400 sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <ZoomableImage key={src} src={src} alt={alt} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
