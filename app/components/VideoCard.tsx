import Link from "next/link";
import type { VideoItem } from "../data";

type VideoCardProps = {
  item: VideoItem;
};

export function VideoCard({ item }: VideoCardProps) {
  return (
    <article className="group min-w-[210px] max-w-[260px] flex-1">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[3/4] h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-300">
            <span>{item.views}</span>
            <span className="rounded bg-black/40 px-2 py-0.5">{item.duration}</span>
          </div>

          {item.tag ? (
            <span className="inline-block rounded bg-pink-500 px-2 py-0.5 text-[10px] font-semibold text-white">
              {item.tag}
            </span>
          ) : null}

          <div className="mt-3 flex items-center gap-2">
            <Link
              href={`/watch/${item.id}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-pink-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              ▶ Phát ngay
            </Link>
            <button className="rounded-xl bg-white/20 px-3 py-2 text-sm text-white">↗</button>
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
