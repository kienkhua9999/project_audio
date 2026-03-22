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
    <article className="group w-full">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[16/9] h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Views luôn nằm sát mép ảnh */}
        <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-start px-3 text-[11px] text-zinc-200">
          <span className="rounded bg-black/70 px-2 py-0.5">{item.views}</span>
        </div>

        {/* Overlay chỉ hiện khi hover, đè lên views */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="mb-auto">
            <h4 className="text-sm font-bold text-white line-clamp-3 leading-snug">
              {item.title}
            </h4>
          </div>

          <div className="mt-auto flex items-center gap-2">
            <Link
              href={`/detail/${item.id}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-pink-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-pink-400"
            >
              ▶ Phát ngay
            </Link>
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-xl bg-white/20 px-3 py-2.5 text-xs text-white cursor-pointer hover:bg-white/30"
            >
              ↗
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">{item.title}</h3>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="line-clamp-1 flex-1">{item.subtitle}</span>
          <span className="ml-2 whitespace-nowrap">{item.views}</span>
        </div>
      </div>
    </article>
  );
}
