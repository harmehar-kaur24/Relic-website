"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ZOOM_SCALE = 2.4;

/**
 * Next.js rewrites <Image> sources to /_next/image?url=…&w=… — unwrap that so the
 * lightbox shows the original file rather than a resized thumbnail.
 */
function fullResSrc(src: string): string {
  try {
    const url = new URL(src, window.location.origin);
    if (url.pathname === "/_next/image") {
      const inner = url.searchParams.get("url");
      if (inner) return inner;
    }
  } catch {
    /* relative or malformed src — use as-is */
  }
  return src;
}

function readItem(el: Element): { src: string; alt: string } | null {
  const img = el.matches("img") ? el : el.querySelector("img");
  if (!img) return null;
  const src = img.getAttribute("src");
  if (!src) return null;
  return { src: fullResSrc(src), alt: img.getAttribute("alt") ?? "" };
}

/**
 * Group siblings into one gallery with no per-page config: walk up from the
 * clicked element until we reach an ancestor holding more than one [data-zoom],
 * which is the grid / carousel track that visually contains them.
 */
function collectGallery(el: Element): Element[] {
  let node = el.parentElement;
  while (node && node !== document.body) {
    const found = node.querySelectorAll("[data-zoom]");
    if (found.length > 1) return Array.from(found);
    node = node.parentElement;
  }
  return [el];
}

/** Zoom + cursor-pan for a single image. Keyed by src so state resets on navigate. */
function ZoomPane({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Translate so the point under the cursor stays under the cursor. rel is
  // clamped to the image box by construction, so the image can never be
  // panned past its own edges.
  const panToCursor = (clientX: number, clientY: number) => {
    const img = imgRef.current;
    if (!img) return;
    const r = img.getBoundingClientRect();
    const relX = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const relY = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    setOffset({
      x: (0.5 - relX) * r.width * (ZOOM_SCALE - 1),
      y: (0.5 - relY) * r.height * (ZOOM_SCALE - 1),
    });
  };

  return (
    <>
      <span className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-950/80 px-3 py-1.5 text-xs font-medium text-cream-100/80">
        {zoomed ? "Move to pan · click to fit" : "Click image to magnify"}
      </span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        onClick={(e) => {
          e.stopPropagation();
          if (zoomed) {
            setZoomed(false);
            setOffset({ x: 0, y: 0 });
          } else {
            panToCursor(e.clientX, e.clientY);
            setZoomed(true);
          }
        }}
        onMouseMove={(e) => {
          if (zoomed) panToCursor(e.clientX, e.clientY);
        }}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomed ? ZOOM_SCALE : 1})`,
          transition: zoomed
            ? "transform 0.08s linear"
            : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
        className={`max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl ${
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
      />
    </>
  );
}

/** Mount once per page. Any element marked data-zoom becomes click-to-enlarge. */
export default function ImageLightbox() {
  const [gallery, setGallery] = useState<Element[] | null>(null);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setGallery(null), []);

  const open = useCallback((el: Element) => {
    const items = collectGallery(el);
    const at = items.indexOf(el);
    setGallery(items);
    setIndex(at < 0 ? 0 : at);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((i) => {
        if (!gallery) return i;
        return (i + delta + gallery.length) % gallery.length;
      });
    },
    [gallery]
  );

  // Global open listeners — pointer and keyboard, so no per-image wiring.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as Element | null)?.closest?.("[data-zoom]");
      if (target) {
        event.preventDefault();
        open(target);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return;
      const active = document.activeElement?.closest?.("[data-zoom]");
      if (active) {
        event.preventDefault();
        open(active);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Overlay-only listeners: escape to close, arrows to page through the gallery.
  useEffect(() => {
    if (!gallery) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [gallery, close, step]);

  const item = gallery ? readItem(gallery[index]) : null;

  return (
    <AnimatePresence>
      {gallery && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt || "Enlarged image"}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-950/92 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-navy-900/80 text-gold-300 transition hover:border-gold-400 sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/40 bg-navy-900/80 text-gold-300 transition hover:border-gold-400 sm:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/40 bg-navy-900/80 text-gold-300 transition hover:border-gold-400 sm:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className="pointer-events-none absolute left-1/2 top-5 z-10 -translate-x-1/2 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-cream-100/70">
                {index + 1} / {gallery.length}
              </span>
            </>
          )}

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center"
          >
            <ZoomPane key={item.src} src={item.src} alt={item.alt} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
