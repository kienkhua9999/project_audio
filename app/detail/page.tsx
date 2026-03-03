"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const PER_PAGE = 20;

const episodes = Array.from({ length: 70 }, (_, i) => ({
  id: i + 1,
  title: `Tập ${i + 1}-Hệ Thống Ngự Thú Mạnh Nhất`,
  description:
    "Lâm Mặc - con riêng bị nhà họ Lâm ruồng bỏ - thức tỉnh năng lực ngự thú toàn hệ hiếm có. Nhưng vì nghèo, ngay cả thú cấp thấp nhất cũng chê hắn, người xung quanh cho rằng hắn chỉ là kẻ vô dụng.",
  thumb: `https://picsum.photos/seed/episode-${i + 1}/140/84`,
}));

export default function DetailPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(episodes.length / PER_PAGE);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return episodes.slice(start, start + PER_PAGE);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      <Header activeCategory="Phim bộ" />

      <main className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-3 md:px-6">
        <p className="mb-4 text-[11px] text-zinc-500">Trang chủ &gt; Phim bộ &gt; Hệ thống ngự thú mạnh nhất</p>

        <section className="border-b border-white/10 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <Image
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80"
                alt="Hệ Thống Ngự Thú Mạnh Nhất"
                width={92}
                height={128}
                className="h-[128px] w-[92px] rounded-md object-cover"
              />

              <div>
                <h1 className="text-[38px] font-extrabold leading-tight">Hệ Thống Ngự Thú Mạnh Nhất</h1>

                <div className="mt-2 flex items-center gap-4 text-sm text-zinc-300">
                  <span>❤ 4.9K</span>
                  <span>💬 39.5K</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  {["Tái sinh", "Hệ thống", "Hiện đại"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="rounded bg-gradient-to-r from-pink-500 to-orange-400 px-8 py-2 text-sm font-semibold">
                    ▶ Đi xem
                  </button>
                  <button className="rounded border border-white/15 bg-white/[0.02] px-8 py-2 text-sm text-zinc-200">
                    ⬇ Tải APP
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-2">
              {["f", "x", "ig", "⛓"].map((s) => (
                <button key={s} className="h-6 w-6 rounded-full bg-white/10 text-[11px] text-zinc-200">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-zinc-400">
            Lâm Mặc - con riêng bị nhà họ Lâm ruồng bỏ - thức tỉnh năng lực ngự thú toàn hệ hiếm có. Nhưng vì nghèo, ngay cả thú cấp thấp nhất cũng chê hắn, người xung quanh cho rằng hắn chỉ là kẻ vô dụng.
            Câu hỏi đặt ra: liệu cậu có thể thay đổi số phận và bước lên đỉnh cao mới hay không?
          </p>
        </section>

        <section className="pt-3">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
            <span>Toàn tập</span>
            <span>Tổng 70 tập</span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {pageItems.map((item) => (
              <article key={item.id} className="flex gap-3 py-3">
                <Image
                  src={item.thumb}
                  alt={item.title}
                  width={140}
                  height={84}
                  className="h-[74px] w-[122px] rounded-sm object-cover"
                />

                <div className="min-w-0">
                  <h3 className="line-clamp-1 text-[28px] font-bold leading-tight md:text-[20px]">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-300">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 hover:text-white"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const active = p === page;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-6 min-w-6 px-2 ${active ? "rounded bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-1 hover:text-white"
            >
              ›
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
