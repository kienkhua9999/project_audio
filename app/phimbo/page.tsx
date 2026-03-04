import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function PhimBoPage() {
  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Phim bộ" />

      <main className="mx-auto w-full max-w-[120rem] px-5 py-10 md:px-8 lg:px-10">
        <h1 className="text-3xl font-bold md:text-4xl">Phim bộ</h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 md:text-base">
          Đây là trang Phim bộ. Bạn có thể hiển thị danh sách các bộ phim dài
          tập hoặc nội dung liên quan ở đây.
        </p>
      </main>

      <Footer />
    </div>
  );
}

