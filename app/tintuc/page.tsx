import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function TinTucPage() {
  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Tin tức" />

      <main className="mx-auto w-full max-w-[120rem] px-5 py-10 md:px-8 lg:px-10">
        <h1 className="text-3xl font-bold md:text-4xl">Tin tức</h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 md:text-base">
          Đây là trang Tin tức. Bạn có thể hiển thị tin mới, bài viết hoặc thông
          báo liên quan đến nền tảng tại đây.
        </p>
      </main>

      <Footer />
    </div>
  );
}

