"use client";

import AdSense from "./AdSense";

export default function SidebarAd() {
  return (
    <aside className="sticky top-20 hidden h-fit w-[300px] flex-shrink-0 flex-col gap-4 xl:flex">
      {/* Banner dọc hái ra tiền (300x600) */}
      <div className="rounded-xl bg-white/5 p-2 backdrop-blur-sm border border-white/10">
        <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-zinc-500">Quảng cáo</p>
        <AdSense 
          slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT!} 
          format="vertical" 
          style={{ width: "300px", height: "600px" }}
        />
      </div>
      
      {/* Thêm một banner nhỏ nếu sidebar quá dài */}
      <div className="rounded-xl bg-white/5 p-2 backdrop-blur-sm border border-white/10">
        <AdSense slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT!} format="auto" />
      </div>
    </aside>
  );
}
