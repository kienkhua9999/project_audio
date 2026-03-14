"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "../data";

type HeaderProps = {
  activeCategory: string;
};

export function Header({ activeCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBottomAds, setShowBottomAds] = useState(true);
  const adInjected = useRef(false);

  const getHref = (category: string) => {
    switch (category) {
      case "Trang chủ":
        return "/";
      case "Phim bộ":
        return "/phimbo";
      case "Tin tức":
        return "/tintuc";
      case "Về chúng tôi":
        return "/vechungtoi";
      default:
        return "#";
    }
  };

  useEffect(() => {
    if (adInjected.current) return;

    const injectScripts = (selector: string, key: string, width: number, height: number) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      nodes.forEach((node) => {
        if (node.querySelector("script")) return;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
  atOptions = {
    'key' : '${key}',
    'format' : 'iframe',
    'height' : ${height},
    'width' : ${width},
    'params' : {}
  };
`;
        const invoke = document.createElement("script");
        invoke.type = "text/javascript";
        invoke.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
        node.appendChild(script);
        node.appendChild(invoke);
      });
    };

    injectScripts("[data-ad-slot=\"desktop\"]", "9e8ee2cfb56287b0e7bb83a8a0d0b922", 468, 60);
    injectScripts("[data-ad-slot=\"mobile\"]", "d85056a55adf2565c57f2d5feb6679d9", 320, 50);

    adInjected.current = true;
  }, []);

  return (
    <>
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-3 px-5 py-3 md:px-8 lg:px-10">
          <div className="grid w-full gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`ad-top-desktop-${index}`}
                data-ad-slot="desktop"
                className="hidden h-[60px] w-full overflow-hidden rounded border border-white/10 bg-black/40 lg:block"
              />
            ))}
          </div>

          <div className="grid w-full grid-cols-2 gap-3 lg:hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`ad-top-mobile-${index}`}
                data-ad-slot="mobile"
                className="h-[50px] w-full overflow-hidden rounded border border-white/10 bg-black/40"
              />
            ))}
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
                <img src="/logo1.png" alt="NetChill Logo" className="h-10 w-auto object-contain" />
                NetChill
              </Link>

              <nav className="hidden items-center gap-8 text-sm font-semibold tracking-tight text-zinc-300 md:flex lg:text-base">
                {categories.slice(0, 4).map((item) => (
                  <Link
                    key={item}
                    href={getHref(item)}
                    className={`transition hover:text-white ${
                      item === activeCategory ? "text-pink-400" : ""
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden w-full max-w-[200px] items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 md:flex lg:max-w-xs">
                <input
                  placeholder="Tìm kiếm..."
                  className="w-full bg-transparent text-xs text-white placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white md:hidden"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {showBottomAds ? (
        <div className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[120rem] items-center gap-3 px-5 py-2 md:px-8 lg:px-10">
            <div className="grid w-full gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`ad-bottom-desktop-${index}`}
                  data-ad-slot="desktop"
                  className="hidden h-[60px] w-full overflow-hidden rounded border border-white/10 bg-black/40 lg:block"
                />
              ))}
            </div>

            <div className="grid w-full grid-cols-2 gap-3 lg:hidden">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`ad-bottom-mobile-${index}`}
                  data-ad-slot="mobile"
                  className="h-[50px] w-full overflow-hidden rounded border border-white/10 bg-black/40"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowBottomAds(false)}
              className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm text-white/70 hover:text-white"
              aria-label="Đóng quảng cáo"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 p-5 md:hidden">
          <div className="mb-6 flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2">
            <input
              placeholder="Tìm kiếm phim..."
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <nav className="flex flex-col gap-4">
            {categories.slice(0, 4).map((item) => (
              <Link
                key={item}
                href={getHref(item)}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-semibold transition ${
                  item === activeCategory ? "text-pink-400" : "text-zinc-300"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
