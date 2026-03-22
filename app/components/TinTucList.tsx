"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  views: number;
  tags: string[];
};

type NewsItemProps = {
  newsItems: NewsItem[];
};

export default function TinTucList({ newsItems }: NewsItemProps) {
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedItem]);

  return (
    <>
      <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {newsItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer"
          >
            <article className="h-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.04] transition-colors hover:border-white/10 hover:bg-white/[0.06]">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {item.tags && item.tags.length > 0 && (
                  <span className="absolute left-3 top-3 rounded-full bg-fuchsia-500 px-2.5 py-1 text-[10px] font-semibold text-white">
                    {item.tags[0]}
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-xs text-zinc-400">
                  {item.views.toLocaleString()} lượt xem
                </p>

                <h2 className="mt-2 line-clamp-2 text-[20px] font-semibold leading-tight text-zinc-100 transition-colors group-hover:text-fuchsia-400">
                  {item.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            </article>
          </div>
        ))}
      </section>

      {/* Modern Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedItem(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e14] shadow-2xl transition-all duration-300 animate-in fade-in zoom-in slide-in-from-bottom-5">
            {/* Header / Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              ✕
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="aspect-[21/9] w-full object-cover"
            />

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                {selectedItem.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-400 border border-fuchsia-500/20">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-zinc-500">• {selectedItem.views.toLocaleString()} lượt xem</span>
              </div>

              {/* Title links to Movie Detail as requested */}
              <Link
                href={`/detail/${selectedItem.id}`}
                className="block text-2xl font-bold text-white hover:text-fuchsia-400 transition-colors md:text-3xl"
              >
                {selectedItem.title}
              </Link>

              <div className="mt-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                  {selectedItem.description}
                </p>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  Đóng
                </button>
                <Link
                  href={`/detail/${selectedItem.id}`}
                  className="rounded-xl bg-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:bg-fuchsia-400 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Xem phim ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
