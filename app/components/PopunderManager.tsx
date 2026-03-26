"use client";

import { useEffect } from "react";

const POPUNDER_SRC =
  "https://pl28850045.effectivegatecpm.com/fb/6f/87/fb6f87d26b7d7e4d1afc6f8ee65d73c5.js";

const SESSION_KEY = "pu_count"; // số lần đã hiện trong session
const MAX_PER_SESSION = 2;

// Random 3–5 phút (tính bằng ms)
function randomDelay() {
  return (Math.random() * 2 + 3) * 60 * 1000; // 3–5 phút
}

function getCount(): number {
  try {
    return parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

function incrementCount() {
  try {
    sessionStorage.setItem(SESSION_KEY, String(getCount() + 1));
  } catch {}
}

function triggerPopunder() {
  const count = getCount();
  if (count >= MAX_PER_SESSION) return;

  // Inject script động để kích hoạt popunder
  const script = document.createElement("script");
  script.src = POPUNDER_SRC;
  script.async = true;
  document.body.appendChild(script);

  incrementCount();
}

export default function PopunderManager() {
  useEffect(() => {
    const count = getCount();

    if (count >= MAX_PER_SESSION) return;

    // Lần 1: bật ngay
    if (count === 0) {
      triggerPopunder();

      // Lần 2: lên lịch sau 3–5 phút
      const delay = randomDelay();
      const timer = setTimeout(() => {
        triggerPopunder();
      }, delay);

      return () => clearTimeout(timer);
    }

    // Trường hợp: user reload giữa session, count = 1 → lên lịch lần 2 tiếp
    if (count === 1) {
      const delay = randomDelay();
      const timer = setTimeout(() => {
        triggerPopunder();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
