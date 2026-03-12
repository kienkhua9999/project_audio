"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "../data";

type HeaderProps = {
  activeCategory: string;
};

export function Header({ activeCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between px-5 py-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400" />
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
    </header>
  );
}
