"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 220);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScrollTop = () => {
    const startY = window.scrollY;
    const duration = 1100;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      window.scrollTo(0, startY * (1 - eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <footer className="relative mt-16 border-t border-white/10 bg-zinc-900/80 py-14 text-zinc-300">
      <div className="mx-auto grid w-full max-w-[120rem] grid-cols-2 gap-10 px-5 md:grid-cols-3 md:px-8 lg:grid-cols-5 lg:px-10">
        <div>
          <h3 className="mb-4 text-3xl font-semibold text-white">Về chúng tôi</h3>
          <ul className="space-y-3 text-lg text-zinc-400">
            <li>Điều khoản dịch vụ</li>
            <li>Chính sách Quyền riêng tư</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-3xl font-semibold text-white">Liên hệ</h3>
          <ul className="space-y-3 text-lg text-zinc-400">
            <li>support@netchill.com</li>
            <li>business@netchill.com</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-3xl font-semibold text-white">Cộng đồng</h3>
          <div className="flex gap-3">
            {["f", "▶", "◎", "♪"].map((item) => (
              <button
                key={item}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-zinc-300 hover:bg-white/20 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-3xl font-semibold text-white">Tập</h3>
          <ul className="space-y-2 text-lg text-zinc-400">
            <li>Phục thù</li>
            <li>Chiến thần</li>
            <li>Tìm người thân</li>
            <li>Phụ nữ độc lập</li>
            <li>Tái hợp</li>
            <li>Phim hấp dẫn</li>
            <li>Phim hot</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-3xl font-semibold text-white">Tải APP</h3>
          <div className="w-fit rounded-2xl bg-white p-3">
            <div className="grid h-36 w-36 grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-3 w-3 ${idx % 3 === 0 || idx % 5 === 0 ? "bg-black" : "bg-white"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[120rem] border-t border-white/10 px-5 pt-5 text-center text-lg text-zinc-500 md:px-8 lg:px-10">
        NetChill | All Rights Reserved | 2026 NETCHILL PTE. LTD.
      </div>

      <button
        type="button"
        onClick={handleScrollTop}
        className={`fixed bottom-10 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-3xl font-bold text-white shadow-lg shadow-pink-500/40 transition-all duration-300 hover:bg-pink-400 cursor-pointer ${
          showScrollTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Lên đầu trang"
      >
        ↑
      </button>
    </footer>
  );
}
