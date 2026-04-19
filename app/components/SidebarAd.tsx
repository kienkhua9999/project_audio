"use client";

import { useState } from "react";
import AdBanner from "./AdBanner";

export default function SidebarAd() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    // Trả về một khối rỗng để giữ nguyên khoảng trống layout, tránh bị xộc xệch
    return <aside className="hidden w-[300px] flex-shrink-0 xl:block"></aside>;
  }

  return (
    <aside className="sticky top-20 hidden h-fit w-[300px] flex-shrink-0 flex-col items-center xl:flex">
      {/* Vùng Tiêu đề & Nút tắt */}
      <div className="mb-4 flex w-full items-center justify-between px-2">
        <button 
          onClick={() => setIsVisible(false)}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-zinc-400 transition-colors hover:bg-pink-500 hover:text-white"
          title="Tắt quảng cáo"
        >
          ✕
        </button>
      </div>

      {/* Quảng cáo 1: 160x300 */}
      <div className="mb-6 flex justify-center">
        <AdBanner 
          id={process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_ID || "YOUR_ID_HERE"} 
          width={160} 
          height={300} 
        />
      </div>
      
      {/* Quảng cáo 2: 300x250 */}
      <div className="flex justify-center">
        <AdBanner 
          id={process.env.NEXT_PUBLIC_ADSTERRA_PLAYER_ID || "YOUR_ID_HERE"} 
          width={300} 
          height={250} 
        />
      </div>
    </aside>
  );
}
