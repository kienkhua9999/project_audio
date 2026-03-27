"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdSenseProps = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  layoutKey?: string;
  responsive?: "true" | "false";
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSense({ 
  slot, 
  format = "auto", 
  layoutKey,
  responsive = "true", 
  className = "", 
  style = {} 
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !adRef.current) return;
    if (adRef.current.getAttribute("data-ad-status") === "filled") return;

    const currentAdRef = adRef.current;
    
    // Chỉ kích hoạt khi quảng cáo thực sự lọt vào màn hình người dùng
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && currentAdRef.getAttribute("data-ad-status") !== "filled") {
          
          // Đợi thêm một chút để layout trình duyệt hoàn toàn ổn định
          setTimeout(() => {
            const width = currentAdRef.offsetWidth;
            
            // Nếu vẫn là 0 thì tiếp tục đợi đợt sau (Intersection sẽ trigger lại)
            if (width === 0) return;
            if (format === "fluid" && width < 250) return;

            try {
              currentAdRef.setAttribute("data-ad-status", "filled");
              
              // Thực thi trong microtask để ưu tiên Render trước
              Promise.resolve().then(() => {
                try {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                  // Lỗi vặt ở đây không bao giờ làm sập app
                }
              });
              
              // Đã load thành công thì ngừng theo dõi vĩnh viễn
              observer.unobserve(currentAdRef);
            } catch (err) {
              // Fail-safe
            }
          }, 600);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(currentAdRef);

    return () => {
      if (currentAdRef) observer.unobserve(currentAdRef);
      observer.disconnect();
    };
  }, [slot, format]);

  return (
    <div className={`adsense-container w-full min-h-[100px] overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: "block", 
          width: "100%", 
          minWidth: "100px", 
          minHeight: "50px",
          ...style 
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
