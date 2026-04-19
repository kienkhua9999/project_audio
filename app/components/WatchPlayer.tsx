"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import AdBanner from "./AdBanner";

export type WatchEpisode = {
  id: number;
  episodeNumber: number;
  title: string;
  videoUrl: string;
};

type WatchPlayerProps = {
  title: string;
  viewsText: string;
  tags: string[];
  description: string;
  episodes: WatchEpisode[];
  initialEpisodeId?: number;
};

const EPISODES_PER_PAGE = 30;

function rangeLabel(start: number, end: number) {
  return `${start} - ${end}`;
}

export function WatchPlayer({
  title,
  viewsText,
  tags,
  description,
  episodes,
  initialEpisodeId,
}: WatchPlayerProps) {
  const router = useRouter();
  const activeEpisodeId = initialEpisodeId ?? episodes[0]?.id ?? 1;

  const activeEpisode = useMemo(() => {
    return episodes.find((e) => e.id === activeEpisodeId) ?? episodes[0];
  }, [episodes, activeEpisodeId]);

  const totalPages = Math.max(1, Math.ceil(episodes.length / EPISODES_PER_PAGE));

  const currentIndex = useMemo(() => {
    return episodes.findIndex((e) => e.id === activeEpisodeId);
  }, [episodes, activeEpisodeId]);

  const nextEpisode = useMemo(() => {
    return episodes[currentIndex + 1] || null;
  }, [episodes, currentIndex]);

  const episodeIndexForPagination = currentIndex !== -1 ? currentIndex : 0;
  const pageForActiveDirect = Math.floor(episodeIndexForPagination / EPISODES_PER_PAGE) + 1;
  const [activePage, setActivePage] = useState<number>(pageForActiveDirect);

  // Sync activePage when active episode changes
  useEffect(() => {
    setActivePage(pageForActiveDirect);
  }, [pageForActiveDirect]);

  const pageEpisodes = useMemo(() => {
    const startIdx = (activePage - 1) * EPISODES_PER_PAGE;
    return episodes.slice(startIdx, startIdx + EPISODES_PER_PAGE);
  }, [episodes, activePage]);

  const pageTabs = useMemo(() => {
    return Array.from({ length: totalPages }).map((_, idx) => {
      const start = idx * EPISODES_PER_PAGE + 1;
      const end = Math.min((idx + 1) * EPISODES_PER_PAGE, episodes.length);
      return { page: idx + 1, label: rangeLabel(start, end) };
    });
  }, [episodes.length, totalPages]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hlsRef = useRef<any>(null);

  // Tự động ẩn controls
  useEffect(() => {
    if (isPlaying && showControls) {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, showControls]);

  // Khởi tạo Video và HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeEpisode?.videoUrl) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isHls = activeEpisode.videoUrl.toLowerCase().includes(".m3u8");
    const formattedUrl = encodeURI(decodeURIComponent(activeEpisode.videoUrl));

    if (isHls) {
      const loadHls = async () => {
        if (typeof window !== "undefined") {
          const Hls = (window as any).Hls;
          if (Hls) {
            initHls(Hls, video, formattedUrl);
          } else {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
            script.onload = () => {
              initHls((window as any).Hls, video, formattedUrl);
            };
            document.head.appendChild(script);
          }
        }
      };

      const initHls = (Hls: any, v: HTMLVideoElement, url: string) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hlsRef.current = hls;
          hls.loadSource(url);
          hls.attachMedia(v);
        } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
          v.src = url;
          v.load();
        }
      };

      loadHls();
    } else {
      video.src = formattedUrl;
      video.load();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeEpisode?.videoUrl]);

  // Tự động chuyển tập khi kết thúc video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (nextEpisode) {
        handlePickEpisode(nextEpisode.id);
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [nextEpisode]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => {
          console.error("Play error:", e);
        });
      } else {
        videoRef.current.pause();
      }
    }
    setShowControls(true);
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 5,
        videoRef.current.duration
      );
    }
    setShowControls(true);
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
    }
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
    setShowControls(true);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current && !wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    if (!document.fullscreenElement) {
      if (wrapper?.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if ((wrapper as any).webkitRequestFullscreen) {
        (wrapper as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
    setShowControls(true);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePickEpisode = (episodeId: number) => {
    router.push(`/watch/${episodeId}`);
  };

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:min-h-[820px]">
      <div className="min-w-0 flex-1 self-stretch rounded-3xl bg-black/40 p-5 lg:h-full">
        <div className="mx-auto flex h-full w-full max-w-[480px] flex-col">
          <div 
            ref={wrapperRef}
            className="group relative aspect-[9/16] w-full max-w-full max-h-full mx-auto overflow-hidden rounded-3xl bg-black"
          >
            <video
              ref={videoRef}
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="h-full w-full rounded-3xl bg-black object-contain"
            ></video>

            <div 
              className={`absolute inset-0 z-10 cursor-pointer transition-colors duration-300 ${!isPlaying ? "bg-black/40" : (showControls ? "bg-black/20" : "bg-transparent")}`} 
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  if (showControls) togglePlay();
                  else setShowControls(true);
                }
              }}
            />

            <div className={`absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-pink-500"
                aria-label="Tiến độ video"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button type="button" onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white transition hover:text-pink-400">
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Zm9 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.522-2.333 2.727-1.617l12.18 7.32c1.18.706 1.18 2.405 0 3.111l-12.18 7.32c-1.205.716-2.727-.19-2.727-1.617V5.653Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={(e) => { e.stopPropagation(); skipBackward(); }} className="text-white hover:text-pink-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); skipForward(); }} className="text-white hover:text-pink-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-xs text-zinc-200">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-white hover:text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={`pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center transition-opacity duration-300 ${!isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
               <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/80 text-white shadow-2xl backdrop-blur-sm transition cursor-pointer pointer-events-auto hover:scale-110 hover:bg-pink-500"
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                       <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Zm9 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-10 w-10">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.522-2.333 2.727-1.617l12.18 7.32c1.18.706 1.18 2.405 0 3.111l-12.18 7.32c-1.205.716-2.727-.19-2.727-1.617V5.653Z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
            </div>

            <button type="button" onClick={() => window.history.back()} className="absolute left-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-white backdrop-blur hover:bg-black/75 transition-opacity duration-300 group-hover:opacity-100 opacity-0">✕</button>
          </div>


          {nextEpisode && (
            <button
               type="button"
               onClick={() => handlePickEpisode(nextEpisode.id)}
               className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 py-3.5 text-base font-bold text-white shadow-lg shadow-pink-600/20 transition hover:scale-[1.02] active:scale-95"
            >
               <span>Xem tiếp: Tập {nextEpisode.episodeNumber}</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
               </svg>
            </button>
          )}
        </div>
      </div>

      <aside className="flex w-full shrink-0 self-stretch flex-col rounded-3xl bg-white/5 p-5 lg:h-full lg:w-[420px] lg:overflow-y-auto">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80">❤</span>{viewsText}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80">💬</span>{viewsText}
          </span>
        </div>
        {tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/90">{t}</span>
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-sm leading-relaxed text-zinc-300 line-clamp-4">{description}</p>
        {totalPages > 1 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-300">
            {pageTabs.map((t) => (
              <button
                key={t.page}
                type="button"
                onClick={() => setActivePage(t.page)}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition ${activePage === t.page ? "bg-pink-500/20 text-pink-200" : "bg-white/5 hover:bg-white/10"}`}
              >{t.label}</button>
            ))}
            <span className="ml-auto text-zinc-400">Tập {activeEpisode?.episodeNumber ?? 1}/{episodes.length}</span>
          </div>
        ) : null}
        <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 mb-4">
          {pageEpisodes.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => handlePickEpisode(e.id)}
              className={`cursor-pointer rounded-lg px-0 py-2 text-center text-xs font-semibold transition ${e.id === activeEpisodeId ? "bg-pink-500 text-white" : "bg-white/5 text-zinc-200 hover:bg-white/10"}`}
            >{e.episodeNumber}</button>
          ))}
        </div>
      </aside>
    </section>
  );
}
