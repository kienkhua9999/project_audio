"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Episode = {
  id: number;
  seriesId: number;
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  image: string;
};

type EpisodeListProps = {
  episodes: Episode[];
  itemsPerPage?: number;
};

export function EpisodeList({ episodes, itemsPerPage = 20 }: EpisodeListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(episodes.length / itemsPerPage);

  const paginatedEpisodes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return episodes.slice(start, start + itemsPerPage);
  }, [episodes, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Chỉ hiển thị pagination nếu có hơn 20 tập
  const showPagination = episodes.length > itemsPerPage;

  return (
    <>
      <div className="space-y-4 rounded-2xl">
        {paginatedEpisodes.map((episode) => (
          <Link
            key={episode.id}
            href={`/watch/${episode.id}`}
            className="flex items-start gap-4 rounded-2xl bg-white/5 p-3 text-xs text-zinc-200 md:p-3.5 transition hover:bg-white/10 group cursor-pointer"
          >
            <div className="h-[60px] w-[110px] flex-shrink-0 overflow-hidden rounded-xl md:h-[200px] md:w-[150px]">
              <img
                src={episode.image}
                alt={episode.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1 md:gap-2">
                <h3 className="text-base font-semibold text-white md:text-[24px] group-hover:text-pink-400 transition">
                  {episode.title}
                </h3>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-zinc-200 md:px-3 md:text-[14px]">
                  {episode.duration}
                </span>
              </div>
              <p className="hidden text-[14px] leading-relaxed text-zinc-300 md:block md:text-[16px] line-clamp-2">
                {episode.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {showPagination && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center text-lg text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Trang trước"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg text-sm transition ${
                currentPage === page
                  ? "bg-white/20 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-label={`Trang ${page}`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center text-lg text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Trang tiếp theo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
