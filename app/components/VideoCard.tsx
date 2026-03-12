"use client";

import Link from "next/link";
import { useCallback } from "react";
import type { VideoItem } from "../data";

type VideoCardProps = {
  item: VideoItem;
};

export function VideoCard({ item }: VideoCardProps) {
  const handleCopyLink = useCallback(async () => {
    const relativeUrl = `/detail/${item.id}`;
    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${relativeUrl}`
        : relativeUrl;

    try {
      await navigator.clipboard.writeText(fullUrl);
    } catch {
      // Fallback: không làm gì nếu copy thất bại
    }
  }, [item.id]);
  return (
    <article className="group w-full md:max-w-[260px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[3/4] h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Views luôn nằm sát mép ảnh */}
        <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-start px-3 text-[11px] text-zinc-200">
          <span className="rounded bg-black/70 px-2 py-0.5">{item.views}</span>
        </div>

        {/* Overlay chỉ hiện khi hover, đè lên views */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="text-[11px] text-zinc-300">
            <span>{item.views}</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Link
              href={`/detail/${item.id}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-pink-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              ▶ Phát ngay
            </Link>
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-xl bg-white/20 px-3 py-2 text-sm text-white cursor-pointer hover:bg-white/30"
            >
              ↗
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1 font-semibold text-white">{item.title}</h3>
        <p className="line-clamp-1 text-sm text-zinc-400">{item.subtitle}</p>
      </div>
    </article>
  );
}
