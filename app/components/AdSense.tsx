"use client";

import { useEffect } from "react";

type AdSenseProps = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: "true" | "false";
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSense({ 
  slot, 
  format = "auto", 
  responsive = "true", 
  className = "", 
  style = {} 
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]);

  return (
    <div className={`adsense-container overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-9470172813725144" // THAY THẾ ID CỦA BẠN TẠI ĐÂY
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
