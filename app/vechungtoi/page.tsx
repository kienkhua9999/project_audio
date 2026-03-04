import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const coreValues = [
  {
    title: "Nội dung tuyển chọn",
    description:
      "Chúng tôi ưu tiên những bộ phim có câu chuyện cuốn hút, nhịp kể tốt và cảm xúc rõ ràng để người xem luôn tìm được nội dung đáng để dành thời gian.",
  },
  {
    title: "Trải nghiệm mượt mà",
    description:
      "Giao diện được tối ưu cho cả điện thoại và máy tính, thao tác đơn giản, dễ dùng, giúp bạn tập trung vào bộ phim thay vì phải mất thời gian làm quen.",
  },
  {
    title: "Cập nhật liên tục",
    description:
      "Chúng tôi liên tục bổ sung các tập mới, danh mục mới và thông tin liên quan để thư viện phim luôn tươi mới mỗi ngày.",
  },
  {
    title: "Lắng nghe cộng đồng",
    description:
      "Mọi góp ý của bạn đều rất quan trọng. NetChill xem phản hồi người dùng là nền tảng để cải thiện chất lượng sản phẩm lâu dài.",
  },
];

const highlights = [
  "Kho nội dung đa thể loại: tình cảm, hiện đại, cổ trang, huyền huyễn, đô thị...",
  "Gợi ý tập phim và danh sách theo chủ đề giúp khám phá nội dung nhanh hơn.",
  "Chế độ xem tối thân thiện mắt khi xem lâu, phù hợp thói quen xem ban đêm.",
  "Tốc độ tải nhanh, bố cục rõ ràng, hạn chế thao tác thừa khi chuyển tập.",
];

export default function VeChungToiPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header activeCategory="Về chúng tôi" />

      <main className="mx-auto w-full max-w-[1300px] px-4 py-8 md:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-pink-950/30 p-6 md:p-10">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-pink-300/30 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-200">
              Về chúng tôi
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              NetChill — Nền tảng xem phim ngắn, phim bộ với trải nghiệm hiện đại
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-zinc-300 md:text-base">
              NetChill được xây dựng với mong muốn mang đến một không gian giải trí chất lượng,
              nơi người xem có thể tìm thấy những bộ phim phù hợp với sở thích cá nhân chỉ trong
              vài thao tác. Chúng tôi theo đuổi triết lý thiết kế đơn giản, rõ ràng và hiệu quả:
              nội dung là trung tâm, còn giao diện là công cụ hỗ trợ để bạn tận hưởng trọn vẹn
              từng khoảnh khắc của câu chuyện.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {coreValues.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
            >
              <h2 className="text-lg font-semibold text-white">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{value.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold">Sứ mệnh của chúng tôi</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              Chúng tôi tin rằng trải nghiệm xem phim tốt không chỉ nằm ở số lượng nội dung,
              mà còn ở cách nội dung đó được sắp xếp, trình bày và đề xuất cho người dùng.
              Vì vậy, NetChill tập trung vào việc xây dựng một nền tảng dễ tiếp cận cho mọi đối tượng,
              từ người mới sử dụng đến người xem thường xuyên. Mỗi cải tiến nhỏ về tốc độ tải,
              bố cục hay khả năng điều hướng đều nhằm mục tiêu giúp bạn xem nhanh hơn, hiểu rõ hơn
              và tận hưởng tốt hơn.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              Trong tương lai, chúng tôi sẽ tiếp tục mở rộng danh mục nội dung, nâng cao chất lượng
              đề xuất cá nhân hóa và tối ưu trải nghiệm xem đa thiết bị. Mục tiêu dài hạn của NetChill
              là trở thành một điểm đến giải trí đáng tin cậy, nơi mỗi người xem đều tìm được “gu phim”
              của riêng mình.
            </p>
          </article>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">Điểm nổi bật</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Cam kết với người xem</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
            NetChill cam kết duy trì môi trường xem phim ổn định, trực quan và liên tục được cải tiến.
            Chúng tôi đặt trải nghiệm người dùng làm trọng tâm trong mọi quyết định phát triển sản phẩm:
            từ cách tổ chức danh mục, hiển thị tập phim, tối ưu luồng xem đến thiết kế giao diện dịu mắt
            khi sử dụng lâu. Đội ngũ luôn theo dõi phản hồi thực tế để nhanh chóng điều chỉnh những điểm
            chưa tối ưu và bổ sung các tính năng phù hợp với nhu cầu ngày càng đa dạng của cộng đồng.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
            Cảm ơn bạn đã đồng hành cùng NetChill. Chính sự tin tưởng và đóng góp của người xem là động lực
            lớn nhất để chúng tôi tiếp tục nâng cao chất lượng nền tảng mỗi ngày.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
