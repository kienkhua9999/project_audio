"use client";

import Script from "next/script";

export function AdsterraScripts() {
  return (
    <>
      {/* Adsterra Social Bar */}
      <Script
        src="https://pl29189843.profitablecpmratenetwork.com/a1/78/25/a17825567c402579507cffbf8f8f6264.js"
      />

      {/* Adsterra Popunder – tự mở tab quảng cáo khi người dùng click lần đầu */}
      <Script
        src="https://pl29189841.profitablecpmratenetwork.com/44/d7/aa/44d7aaf3e4da847a35dce6a68f6ea02a.js"
        strategy="afterInteractive"
      />
    </>
  );
}
