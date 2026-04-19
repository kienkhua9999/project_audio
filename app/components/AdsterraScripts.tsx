"use client";

import { useEffect } from "react";
import Script from "next/script";

const COOLDOWN_KEY = "srd_pop_last";
const COOLDOWN_MS = 2 * 60 * 1000; // 2 phút

export function AdsterraScripts() {
  useEffect(() => {
    const handleClick = () => {
      const now = Date.now();
      const last = Number(sessionStorage.getItem(COOLDOWN_KEY) ?? "0");

      if (now - last >= COOLDOWN_MS) {
        sessionStorage.setItem(COOLDOWN_KEY, String(now));
        // Mở popunder (window.open phải được gọi trong click handler thật)
        window.open(window.location.href, "_blank");
      }
    };

    // Dùng capture: true để bắt click trước Adsterra
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return (
    <>
      {/* Adsterra Social Bar */}
      <Script
        src="https://pl29189843.profitablecpmratenetwork.com/a1/78/25/a17825567c402579507cffbf8f8f6264.js"
        strategy="afterInteractive"
      />

      {/* Adsterra Popunder – mở khi click lần đầu, cooldown 2 phút */}
      <Script
        src="https://pl29189841.profitablecpmratenetwork.com/44/d7/aa/44d7aaf3e4da847a35dce6a68f6ea02a.js"
        strategy="afterInteractive"
      />
    </>
  );
}
