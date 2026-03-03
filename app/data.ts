export type VideoItem = {
  id: number;
  title: string;
  subtitle: string;
  views: string;
  duration: string;
  image: string;
  tag?: string;
};

export type VideoSectionData = {
  id: number;
  title: string;
  items: VideoItem[];
};

export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  background: string;
  tag?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Giao Ước Với Quỷ Quản Gia",
    subtitle: "Nữ cường • Tát vóo mặt",
    cta: "Phát ngay",
    background:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80",
    tag: "HOT",
  },
  {
    id: 2,
    title: "Ta Tu Tiên Chỉ Nhận Nữ Đồ",
    subtitle: "Tiên hiệp • Anime • Độc quyền",
    cta: "Phát ngay",
    background:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1800&q=80",
    tag: "ĐỘC QUYỀN",
  },
  {
    id: 3,
    title: "Chân Tình Như Ánh Đom Đóm",
    subtitle: "Hiện đại • Trưởng thành",
    cta: "Phát ngay",
    background:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1800&q=80",
    tag: "MỚI",
  },
  {
    id: 4,
    title: "Hệ Thống Ngự Thú Mạnh Nhất",
    subtitle: "Tái sinh • Hệ thống",
    cta: "Phát ngay",
    background:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1800&q=80",
    tag: "HOT",
  },
  {
    id: 5,
    title: "Rắn Gian Xảo Hóa Bạo Long",
    subtitle: "Huyền huyễn • Tranh đấu",
    cta: "Phát ngay",
    background:
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=1800&q=80",
    tag: "XU HƯỚNG",
  },
  {
    id: 6,
    title: "Đệ Nhất Phá Gia",
    subtitle: "Ngược tra • Trở lại của kẻ mạnh",
    cta: "Phát ngay",
    background:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1800&q=80",
    tag: "ĐỀ CỬ",
  },
];

export const categories = [
  "Trang chủ",
  "Phim bộ",
  "Lồng tiếng",
  "Tình cảm",
  "Anime",
  "Xuyên không",
  "Huyền huyễn",
];

export const sections: VideoSectionData[] = [
  {
    id: 1,
    title: "Phim ngắn hot",
    items: [
      { id: 101, title: "Giao Ước Với Quỷ Quản Gia", subtitle: "Nữ cường • Kỳ ảo", views: "1.2M lượt xem", duration: "01:22", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80", tag: "HOT" },
      { id: 102, title: "Hệ Thống Ngự Thú Mạnh Nhất", subtitle: "Tái sinh • Hệ thống", views: "980K lượt xem", duration: "02:10", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80" },
      { id: 103, title: "Rắn Gian Xảo Hóa Bạo Long", subtitle: "Huyền huyễn • Tranh đấu", views: "842K lượt xem", duration: "01:56", image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=900&q=80" },
      { id: 104, title: "Đệ Nhất Phá Gia", subtitle: "Ngược tra • Trở lại", views: "730K lượt xem", duration: "01:35", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80" },
      { id: 105, title: "Ta Tu Tiên Chỉ Nhận Nữ Đồ", subtitle: "Tiên hiệp • Anime", views: "1.6M lượt xem", duration: "03:06", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=900&q=80", tag: "ĐỘC QUYỀN" },
      { id: 106, title: "Hồng Nhan Bá Đạo", subtitle: "Cổ trang • Tình cảm", views: "655K lượt xem", duration: "01:48", image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80" },
      { id: 107, title: "Võ Thần Trở Lại", subtitle: "Hành động • Võ hiệp", views: "792K lượt xem", duration: "02:02", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80" },
      { id: 108, title: "Một Đêm Định Mệnh", subtitle: "Hiện đại • Tổng tài", views: "523K lượt xem", duration: "01:27", image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80" },
      { id: 109, title: "Bí Mật Trên Mây", subtitle: "Trinh thám • Tâm lý", views: "447K lượt xem", duration: "02:14", image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=900&q=80" },
      { id: 110, title: "Đêm Không Ánh Trăng", subtitle: "Kinh dị • Siêu nhiên", views: "389K lượt xem", duration: "01:42", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80" },
      { id: 111, title: "Nghịch Thiên Cải Mệnh", subtitle: "Xuyên không • Huyền huyễn", views: "910K lượt xem", duration: "02:30", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80" },
      { id: 112, title: "Yêu Em Từ Cái Nhìn Đầu", subtitle: "Thanh xuân • Hài", views: "611K lượt xem", duration: "01:33", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80" },
      { id: 113, title: "Lưỡi Dao Đêm", subtitle: "Hành động • Báo thù", views: "568K lượt xem", duration: "01:58", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80" },
      { id: 114, title: "Hẹn Ước Cuối Cùng", subtitle: "Bi kịch • Tình cảm", views: "474K lượt xem", duration: "01:46", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80" }
    ],
  },
  {
    id: 2,
    title: "Phim bộ mới cập nhật",
    items: [
      { id: 201, title: "Bảy Ngày Yêu Em", subtitle: "Tình cảm • Hiện đại", views: "460K lượt xem", duration: "12 tập", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80" },
      { id: 202, title: "Thời Không Mật Mã", subtitle: "Khoa học • Bí ẩn", views: "525K lượt xem", duration: "16 tập", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80" },
      { id: 203, title: "Sát Thủ Vương Phi", subtitle: "Cổ trang • Hành động", views: "890K lượt xem", duration: "20 tập", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=900&q=80" },
      { id: 204, title: "Nhật Ký Người Máy", subtitle: "Viễn tưởng • Tâm lý", views: "332K lượt xem", duration: "10 tập", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80" },
      { id: 205, title: "Lời Hứa Dưới Mưa", subtitle: "Tình cảm • Chữa lành", views: "407K lượt xem", duration: "14 tập", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80" },
      { id: 206, title: "Mật Mã Bóng Tối", subtitle: "Hình sự • Tội phạm", views: "378K lượt xem", duration: "18 tập", image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=900&q=80" },
      { id: 207, title: "Chuyện Tình Học Đường", subtitle: "Thanh xuân • Hài", views: "699K lượt xem", duration: "24 tập", image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80" },
      { id: 208, title: "Thành Phố Không Ngủ", subtitle: "Tâm lý • Đô thị", views: "355K lượt xem", duration: "13 tập", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80" },
      { id: 209, title: "Kẻ Thứ Ba", subtitle: "Gia đình • Drama", views: "588K lượt xem", duration: "22 tập", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80" },
      { id: 210, title: "Lần Đầu Làm Mẹ", subtitle: "Gia đình • Cảm động", views: "292K lượt xem", duration: "11 tập", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=900&q=80" },
      { id: 211, title: "Mùa Hè Năm Ấy", subtitle: "Thanh xuân • Hoài niệm", views: "431K lượt xem", duration: "15 tập", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80" },
      { id: 212, title: "Bí Ẩn Trên Đảo", subtitle: "Phiêu lưu • Sinh tồn", views: "366K lượt xem", duration: "9 tập", image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=900&q=80" },
      { id: 213, title: "Tình Yêu Sau Ly Hôn", subtitle: "Trưởng thành • Tình cảm", views: "501K lượt xem", duration: "17 tập", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80" },
      { id: 214, title: "Kịch Bản Cuộc Đời", subtitle: "Nghề nghiệp • Động lực", views: "327K lượt xem", duration: "12 tập", image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80" }
    ],
  },
  {
    id: 3,
    title: "Phim lồng tiếng",
    items: [
      { id: 201, title: "Bảy Ngày Yêu Em", subtitle: "Tình cảm • Hiện đại", views: "460K lượt xem", duration: "12 tập", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80" },
      { id: 202, title: "Thời Không Mật Mã", subtitle: "Khoa học • Bí ẩn", views: "525K lượt xem", duration: "16 tập", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80" },
      { id: 203, title: "Sát Thủ Vương Phi", subtitle: "Cổ trang • Hành động", views: "890K lượt xem", duration: "20 tập", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=900&q=80" },
      { id: 204, title: "Nhật Ký Người Máy", subtitle: "Viễn tưởng • Tâm lý", views: "332K lượt xem", duration: "10 tập", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80" },
      { id: 205, title: "Lời Hứa Dưới Mưa", subtitle: "Tình cảm • Chữa lành", views: "407K lượt xem", duration: "14 tập", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80" },
      { id: 206, title: "Mật Mã Bóng Tối", subtitle: "Hình sự • Tội phạm", views: "378K lượt xem", duration: "18 tập", image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=900&q=80" },
      { id: 207, title: "Chuyện Tình Học Đường", subtitle: "Thanh xuân • Hài", views: "699K lượt xem", duration: "24 tập", image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80" },
      { id: 208, title: "Thành Phố Không Ngủ", subtitle: "Tâm lý • Đô thị", views: "355K lượt xem", duration: "13 tập", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80" },
      { id: 209, title: "Kẻ Thứ Ba", subtitle: "Gia đình • Drama", views: "588K lượt xem", duration: "22 tập", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80" },
      { id: 210, title: "Lần Đầu Làm Mẹ", subtitle: "Gia đình • Cảm động", views: "292K lượt xem", duration: "11 tập", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=900&q=80" },
      { id: 211, title: "Mùa Hè Năm Ấy", subtitle: "Thanh xuân • Hoài niệm", views: "431K lượt xem", duration: "15 tập", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80" },
      { id: 212, title: "Bí Ẩn Trên Đảo", subtitle: "Phiêu lưu • Sinh tồn", views: "366K lượt xem", duration: "9 tập", image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=900&q=80" },
      { id: 213, title: "Tình Yêu Sau Ly Hôn", subtitle: "Trưởng thành • Tình cảm", views: "501K lượt xem", duration: "17 tập", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80" },
      { id: 214, title: "Kịch Bản Cuộc Đời", subtitle: "Nghề nghiệp • Động lực", views: "327K lượt xem", duration: "12 tập", image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80" }
    ],
  },
  {
    id: 4,
    title: "Phim tình cảm",
    items: [
      { id: 201, title: "Bảy Ngày Yêu Em", subtitle: "Tình cảm • Hiện đại", views: "460K lượt xem", duration: "12 tập", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80" },
      { id: 202, title: "Thời Không Mật Mã", subtitle: "Khoa học • Bí ẩn", views: "525K lượt xem", duration: "16 tập", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80" },
      { id: 203, title: "Sát Thủ Vương Phi", subtitle: "Cổ trang • Hành động", views: "890K lượt xem", duration: "20 tập", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=900&q=80" },
      { id: 204, title: "Nhật Ký Người Máy", subtitle: "Viễn tưởng • Tâm lý", views: "332K lượt xem", duration: "10 tập", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80" },
      { id: 205, title: "Lời Hứa Dưới Mưa", subtitle: "Tình cảm • Chữa lành", views: "407K lượt xem", duration: "14 tập", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80" },
      { id: 206, title: "Mật Mã Bóng Tối", subtitle: "Hình sự • Tội phạm", views: "378K lượt xem", duration: "18 tập", image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=900&q=80" },
      { id: 207, title: "Chuyện Tình Học Đường", subtitle: "Thanh xuân • Hài", views: "699K lượt xem", duration: "24 tập", image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80" },
      { id: 208, title: "Thành Phố Không Ngủ", subtitle: "Tâm lý • Đô thị", views: "355K lượt xem", duration: "13 tập", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80" },
      { id: 209, title: "Kẻ Thứ Ba", subtitle: "Gia đình • Drama", views: "588K lượt xem", duration: "22 tập", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80" },
      { id: 210, title: "Lần Đầu Làm Mẹ", subtitle: "Gia đình • Cảm động", views: "292K lượt xem", duration: "11 tập", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=900&q=80" },
      { id: 211, title: "Mùa Hè Năm Ấy", subtitle: "Thanh xuân • Hoài niệm", views: "431K lượt xem", duration: "15 tập", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80" },
      { id: 212, title: "Bí Ẩn Trên Đảo", subtitle: "Phiêu lưu • Sinh tồn", views: "366K lượt xem", duration: "9 tập", image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=900&q=80" },
      { id: 213, title: "Tình Yêu Sau Ly Hôn", subtitle: "Trưởng thành • Tình cảm", views: "501K lượt xem", duration: "17 tập", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80" },
      { id: 214, title: "Kịch Bản Cuộc Đời", subtitle: "Nghề nghiệp • Động lực", views: "327K lượt xem", duration: "12 tập", image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80" }
    ],
  },
];
