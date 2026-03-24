"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdBanner from "./AdBanner";
import { categories } from "../data";

type HeaderProps = {
  activeCategory: string;
};

const topDesktopKeys = [
  "9e8ee2cfb56287b0e7bb83a8a0d0b922",
  "9e8ee2cfb56287b0e7bb83a8a0d0b922",
  "9e8ee2cfb56287b0e7bb83a8a0d0b922",
  "9e8ee2cfb56287b0e7bb83a8a0d0b922",
];

const topMobileKeys = [
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
];

const bottomDesktopKeys = [
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
];

const bottomMobileKeys = [
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
  "d85056a55adf2565c57f2d5feb6679d9",
];

export function Header({ activeCategory }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBottomAds, setShowBottomAds] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(`/phimbo?search=${encodeURIComponent(searchValue.trim())}`);
      setIsMenuOpen(false);
    }
  };

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
    <>
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-3 px-5 py-3 md:px-8 lg:px-10">
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

            {/* Banner ad next to menu */}
            <div className="hidden h-[60px] w-[468px] items-center justify-center overflow-hidden lg:flex">
              <AdBanner id="9e8ee2cfb56287b0e7bb83a8a0d0b922" width={468} height={60} />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden w-full max-w-[200px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 md:flex lg:max-w-xs">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Tìm kiếm phim..."
                  className="w-full bg-transparent text-xs text-white placeholder:text-zinc-400 focus:outline-none"
                />
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 text-zinc-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
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

      {/* Ads Below Menu */}
      <div className="mx-auto w-full max-w-[120rem] px-5 py-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            {topDesktopKeys.slice(0, 4).map((key, index) => (
              <div
                key={`ad-under-menu-${index}`}
                className="hidden h-[60px] w-[468px] items-center justify-center overflow-hidden lg:flex"
              >
                <AdBanner id={key} width={468} height={60} />
              </div>
            ))}
          </div>
          
          {/* Mobile version of ads below menu */}
          <div className="grid grid-cols-1 gap-1 lg:hidden">
            {topMobileKeys.slice(0, 2).map((key, index) => (
              <div
                key={`ad-under-menu-mobile-${index}`}
                className="flex h-[50px] w-[320px] items-center justify-center overflow-hidden"
              >
                <AdBanner id={key} width={320} height={50} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Fixed Bottom Ads Container */}
      {showBottomAds && (
        <div className="fixed bottom-0 left-0 right-0 z-[100]">
          <div className="mx-auto flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowBottomAds(false)}
              className="flex items-center gap-1 rounded bg-orange-500 px-3 py-0.5 text-[10px] font-bold uppercase text-white hover:bg-orange-600"
            >
              Tắt QC ✕
            </button>

            {/* Desktop Fixed Ads: 2x2 cluster, no gaps */}
            <div className="hidden max-w-[936px] flex-wrap items-start justify-center leading-[0] lg:flex">
              {bottomDesktopKeys.map((key, index) => (
                <div
                  key={`ad-fixed-bottom-${index}`}
                  className="h-[60px] w-[468px] overflow-hidden"
                >
                  <AdBanner id={key} width={468} height={60} />
                </div>
              ))}
            </div>

            {/* Mobile Fixed Ads: 2x2 cluster, no gaps */}
            <div className="flex flex-wrap items-center justify-center leading-[0] lg:hidden">
              {bottomMobileKeys.slice(0, 4).map((key, index) => (
                <div
                  key={`ad-fixed-bottom-mobile-${index}`}
                  className="h-[50px] w-[160px] overflow-hidden"
                >
                  <AdBanner id={key} width={160} height={50} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 p-5 md:hidden">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Tìm kiếm phim..."
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-400 focus:outline-none"
            />
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 text-zinc-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
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
