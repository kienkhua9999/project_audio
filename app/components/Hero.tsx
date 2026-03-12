"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { HeroSlide } from "../data";

type HeroProps = {
  slides: HeroSlide[];
  autoPlayMs?: number;
};

export function Hero({ slides, autoPlayMs = 5500 }: HeroProps) {
  const safeSlides = useMemo(() => slides.filter((item) => item.background), [slides]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % safeSlides.length);
    }, autoPlayMs);

    return () => clearInterval(timer);
  }, [safeSlides.length, autoPlayMs]);

  if (!safeSlides.length) return null;

  const activeSlide = safeSlides[current];

  return (
    <section className="relative h-[90vh] min-h-[650px] w-full overflow-hidden">
      {safeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-in-out will-change-[opacity] ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.background})` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-transparent to-black/20" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[120rem] flex-col justify-end px-5 pb-14 md:px-8 md:pb-16 lg:px-10">
        <div className="max-w-xl space-y-4">
          {activeSlide.tag ? (
            <span className="inline-flex w-fit rounded-full bg-pink-600 px-3 py-1 text-xs font-semibold tracking-wide text-white">
              {activeSlide.tag}
            </span>
          ) : null}

          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            {activeSlide.title}
          </h1>
          <p className="text-sm text-zinc-200 md:text-base">{activeSlide.subtitle}</p>

          <Link
            href={`/detail/${activeSlide.id}`}
            className="inline-flex w-fit items-center gap-3 rounded-2xl bg-pink-500 px-6 py-3 text-lg font-bold text-white shadow-xl shadow-pink-500/40 transition hover:scale-[1.02] hover:bg-pink-400 md:px-10 md:py-4 md:text-xl"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              ▶
            </span>
            {activeSlide.cta}
          </Link>
        </div>

        <div className="absolute bottom-10 right-5 z-20 flex items-center gap-2 md:right-8 lg:right-10">
          {safeSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                index === current ? "w-10 bg-white" : "w-2.5 bg-white/45 hover:bg-white/80"
              }`}
              aria-label={`Chuyển đến slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
