"use client";

import { useEffect, useRef } from "react";

type AdBannerProps = {
  id: string;
  width: number;
  height: number;
  className?: string;
};

export default function AdBanner({ id, width, height, className }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = "";

    // Create iframe to isolate the ad script and its global atOptions variable
    const iframe = document.createElement("iframe");
    iframe.width = width.toString();
    iframe.height = height.toString();
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.display = "block";
    iframe.style.verticalAlign = "top";
    
    containerRef.current.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <html>
          <body style="margin:0;padding:0;overflow:hidden;background:transparent;">
            <script type="text/javascript">
              atOptions = {
                'key' : '${id}',
                'format' : 'iframe',
                'height' : ${height},
                'width' : ${width},
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/${id}/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [id, width, height]);

  return (
    <div 
      ref={containerRef} 
      className={`${className} overflow-hidden block leading-none`}
      style={{ width: width, height: height }}
    />
  );
}
