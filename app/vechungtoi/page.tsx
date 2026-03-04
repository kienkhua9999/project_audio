import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function VeChungToiPage() {
  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Về chúng tôi" />

      <main className="mx-auto w-full max-w-[120rem] px-5 py-10 md:px-8 lg:px-10">
        <h1 className="text-3xl font-bold md:text-4xl">Về chúng tôi</h1>
        <p className="mt-4 max-w-3xl text-sm text-zinc-300 md:text-base">
          Đây là trang giới thiệu về NetChill. Bạn có thể thêm thông tin về đội
          ngũ, sứ mệnh, tầm nhìn hoặc các nội dung giới thiệu khác ở đây.
        </p>
      </main>

      <Footer />
    </div>
  );
}

