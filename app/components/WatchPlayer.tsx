"use client";

import { useMemo, useState } from "react";

export type WatchEpisode = {
  id: number;
  title: string;
  videoUrl: string;
};

type WatchPlayerProps = {
  title: string;
  viewsText: string;
  tags: string[];
  description: string;
  episodes: WatchEpisode[];
  initialEpisodeId?: number;
};

const EPISODES_PER_PAGE = 30;

function rangeLabel(start: number, end: number) {
  return `${start} - ${end}`;
}

export function WatchPlayer({
  title,
  viewsText,
  tags,
  description,
  episodes,
  initialEpisodeId,
}: WatchPlayerProps) {
  const safeInitial = initialEpisodeId ?? episodes[0]?.id ?? 1;
  const [activeEpisodeId, setActiveEpisodeId] = useState<number>(safeInitial);

  const activeEpisode = useMemo(() => {
    return episodes.find((e) => e.id === activeEpisodeId) ?? episodes[0];
  }, [episodes, activeEpisodeId]);

  const totalPages = Math.max(1, Math.ceil(episodes.length / EPISODES_PER_PAGE));
  const pageForActive = Math.min(
    totalPages,
    Math.max(1, Math.ceil(activeEpisodeId / EPISODES_PER_PAGE)),
  );
  const [activePage, setActivePage] = useState<number>(pageForActive);

  const pageEpisodes = useMemo(() => {
    const startIdx = (activePage - 1) * EPISODES_PER_PAGE;
    return episodes.slice(startIdx, startIdx + EPISODES_PER_PAGE);
  }, [episodes, activePage]);

  const pageTabs = useMemo(() => {
    return Array.from({ length: totalPages }).map((_, idx) => {
      const start = idx * EPISODES_PER_PAGE + 1;
      const end = Math.min((idx + 1) * EPISODES_PER_PAGE, episodes.length);
      return { page: idx + 1, label: rangeLabel(start, end) };
    });
  }, [episodes.length, totalPages]);

  const handlePickEpisode = (episodeId: number) => {
    setActiveEpisodeId(episodeId);
  };

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:min-h-[820px]">
      {/* Player bên trái */}
      <div className="min-w-0 flex-1 self-stretch rounded-3xl bg-black/40 p-5 lg:h-full">
        <div className="mx-auto flex h-full w-full max-w-[420px] flex-col">
          <div className="relative rounded-3xl bg-black">
            <video
              key={activeEpisode?.videoUrl}
              src={activeEpisode?.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="aspect-9/16 w-full rounded-3xl bg-black object-cover"
            />

            <button
              type="button"
              onClick={() => window.history.back()}
              className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-white backdrop-blur hover:bg-black/75 cursor-pointer"
              aria-label="Đóng"
              title="Đóng"
            >
              ✕
            </button>

            <div className="absolute -right-14 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
              <button
                type="button"
                onClick={() => {
                  const prev = Math.max(1, activeEpisodeId - 1);
                  setActiveEpisodeId(prev);
                  setActivePage(Math.ceil(prev / EPISODES_PER_PAGE));
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white backdrop-blur hover:bg-gray-800 cursor-pointer"
                aria-label="Tập trước"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = Math.min(episodes.length, activeEpisodeId + 1);
                  setActiveEpisodeId(next);
                  setActivePage(Math.ceil(next / EPISODES_PER_PAGE));
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white backdrop-blur hover:bg-gray-800 cursor-pointer"
                aria-label="Tập tiếp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 10l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel bên phải */}
      <aside className="flex w-full shrink-0 self-stretch flex-col rounded-3xl bg-white/5 p-5 lg:h-full lg:w-[420px] lg:overflow-y-auto">
        <h1 className="text-xl font-bold text-white">{title}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80">❤</span>
            {viewsText}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80">💬</span>
            {viewsText}
          </span>
        </div>

        {tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-sm leading-relaxed text-zinc-300 line-clamp-4">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-3">
          {["f", "X", "◎", "⛓"].map((icon) => (
            <button
              key={icon}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/55 cursor-pointer"
              aria-label="Chia sẻ"
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Tabs page */}
        {totalPages > 1 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-300">
            {pageTabs.map((t) => (
              <button
                key={t.page}
                type="button"
                onClick={() => setActivePage(t.page)}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition ${
                  activePage === t.page
                    ? "bg-pink-500/20 text-pink-200"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
            <span className="ml-auto text-zinc-400">
              Tập {activeEpisodeId}/{episodes.length}
            </span>
          </div>
        ) : null}

        {/* Grid episode picker */}
        <div className="mt-4 grid grid-cols-6 gap-2">
          {pageEpisodes.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => handlePickEpisode(e.id)}
              className={`cursor-pointer rounded-lg px-0 py-2 text-center text-xs font-semibold transition ${
                e.id === activeEpisodeId
                  ? "bg-pink-500 text-white"
                  : "bg-white/5 text-zinc-200 hover:bg-white/10"
              }`}
              aria-label={`Chọn tập ${e.id}`}
            >
              {e.id}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}

