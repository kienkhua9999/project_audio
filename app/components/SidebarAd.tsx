"use client";

import { useState } from "react";
import AdBanner from "./AdBanner";

export default function SidebarAd() {
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);

  if (!isVisible1 && !isVisible2) return null;

  return (
    <aside className="sticky top-0 hidden h-fit w-[160px] flex-shrink-0 flex-col gap-0 leading-[0] xl:flex">
      {/* First Ad */}
      {isVisible1 && (
        <div className="flex flex-col">
          <div className="flex justify-center bg-[#07090e]">
            <button
              type="button"
              onClick={() => setIsVisible1(false)}
              className="w-full bg-orange-600/80 py-1 text-[10px] font-bold uppercase text-white transition hover:bg-orange-600"
            >
              Tắt QC ✕
            </button>
          </div>
          <div className="h-[600px] w-[160px] overflow-hidden">
            <AdBanner id="cbec996c590b968b9c24a1b3f85112c3" width={160} height={600} />
          </div>
        </div>
      )}

      {/* Second Ad */}
      {isVisible2 && (
        <div className={`flex flex-col ${isVisible1 ? "-mt-16" : ""}`}>
          <div className="flex justify-center bg-[#07090e]">
            <button
              type="button"
              onClick={() => setIsVisible2(false)}
              className="w-full bg-orange-600/80 py-1 text-[10px] font-bold uppercase text-white transition hover:bg-orange-600"
            >
              Tắt QC ✕
            </button>
          </div>
          <div className="h-[600px] w-[160px] overflow-hidden">
            <AdBanner id="cbec996c590b968b9c24a1b3f85112c3" width={160} height={600} />
          </div>
        </div>
      )}
    </aside>
  );
}
