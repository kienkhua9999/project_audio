"use client";

import Script from "next/script";

const POPUNDER_COOLDOWN_MS = 2 * 60 * 1000; // 2 phút
const POPUNDER_STORAGE_KEY = "srd_pop_last";

function triggerPopunder() {
  const now = Date.now();
  const lastFired = Number(sessionStorage.getItem(POPUNDER_STORAGE_KEY) ?? "0");

  // Nếu chưa bao giờ trigger, hoặc đã qua 2 phút → cho phép bung
  if (now - lastFired >= POPUNDER_COOLDOWN_MS) {
    sessionStorage.setItem(POPUNDER_STORAGE_KEY, String(now));
    document.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true, view: window })
    );
  }
}

export function AdsterraScripts() {
  return (
    <>
      {/* Adsterra Social Bar */}
      <Script
        src="https://pl29189843.profitablecpmratenetwork.com/a1/78/25/a17825567c402579507cffbf8f8f6264.js"
      />

      {/* Adsterra Popunder – lần đầu bung sau 1.5s, sau đó phải đợi 2 phút mới bung tiếp */}
      <Script
        src="https://pl29189841.profitablecpmratenetwork.com/44/d7/aa/44d7aaf3e4da847a35dce6a68f6ea02a.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Lần kích hoạt đầu tiên sau 1.5 giây
          setTimeout(triggerPopunder, 1500);

          // Sau đó kiểm tra mỗi 30 giây — nếu đã đủ 2 phút thì bung tiếp
          setInterval(triggerPopunder, 30_000);
        }}
      />
    </>
  );
}
