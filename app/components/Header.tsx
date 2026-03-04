import Link from "next/link";
import { categories } from "../data";

type HeaderProps = {
  activeCategory: string;
};

export function Header({ activeCategory }: HeaderProps) {
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between px-5 py-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400" />
            NetChill
          </div>
          <nav className="hidden items-center gap-10 text-3xl font-bold tracking-tight text-zinc-300 md:flex lg:text-xl">
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

        <div className="hidden w-full max-w-xs items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 md:flex">
          <input
            placeholder="Tìm kiếm phim, diễn viên..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-400 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}
