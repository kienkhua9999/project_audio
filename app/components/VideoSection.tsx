"use client";

import { useMemo, useState } from "react";
import type { VideoSectionData } from "../data";
import { VideoCard } from "./VideoCard";

type VideoSectionProps = {
  section: VideoSectionData;
};

const ITEMS_PER_SLIDE = 6;

export function VideoSection({ section }: VideoSectionProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(section.items.length / ITEMS_PER_SLIDE);

  const visibleItems = useMemo(() => {
    const start = page * ITEMS_PER_SLIDE;
    return section.items.slice(start, start + ITEMS_PER_SLIDE);
  }, [page, section.items]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <section className="mx-auto mt-12 w-full max-w-[120rem] px-5 md:px-8 lg:px-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {visibleItems.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>

        <button
          onClick={() => canPrev && setPage((prev) => prev - 1)}
          disabled={!canPrev}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xl text-white backdrop-blur-md transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-20"
          aria-label="Trang trước"
        >
          <span className="-mt-0.5">‹</span>
        </button>

        <button
          onClick={() => canNext && setPage((prev) => prev + 1)}
          disabled={!canNext}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xl text-white backdrop-blur-md transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-20"
          aria-label="Trang tiếp theo"
        >
          <span className="-mt-0.5">›</span>
        </button>
      </div>

      {totalPages > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={`${section.id}-${index}`}
              onClick={() => setPage(index)}
              className={`h-2.5 rounded-full transition-all ${
                page === index ? "w-8 bg-white" : "w-2.5 bg-white/40"
              }`}
              aria-label={`Trang ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
