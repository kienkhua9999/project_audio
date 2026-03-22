"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";

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

  const episodeIndexForPagination = currentIndex !== -1 ? currentIndex : 0;
  const pageForActiveDirect = Math.floor(episodeIndexForPagination / EPISODES_PER_PAGE) + 1;
  const [activePage, setActivePage] = useState<number>(pageForActiveDirect);

  // Sync activePage when active episode changes to ensure we are on the right page
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
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls after a delay
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

  // HLS/Native Switching
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeEpisode?.videoUrl) return;

    const isHls = activeEpisode.videoUrl.toLowerCase().includes(".m3u8");

    if (isHls) {
      // Use dynamic import for HLS.js to avoid SSR issues
      const loadHls = async () => {
        if (typeof window !== "undefined") {
          const Hls = (window as any).Hls;
          if (Hls) {
            initHls(Hls, video, activeEpisode.videoUrl);
          } else {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
            script.onload = () => {
              initHls((window as any).Hls, video, activeEpisode.videoUrl);
            };
            document.head.appendChild(script);
          }
        }
      };

      const initHls = (Hls: any, v: HTMLVideoElement, url: string) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(v);
        } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
          v.src = url;
          v.load();
        }
      };

      loadHls();
    } else {
      // For MP4, we just ensure it's loaded. Recalling load() on src change
      video.load();
    }
  }, [activeEpisode?.videoUrl]);

  // Effect to call video.load() when the active episode changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, [activeEpisode?.id]); // Trigger when episode ID changes

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
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement?.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    setShowControls(true);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePickEpisode = (episodeId: number) => {
    router.push(`/watch/${episodeId}`);
  };

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:min-h-[820px]">
      {/* Player bên trái */}
      <div className="min-w-0 flex-1 self-stretch rounded-3xl bg-black/40 p-5 lg:h-full">
        <div className="mx-auto flex h-full w-full max-w-[480px] flex-col">
          <div 
            className="group relative aspect-[9/16] w-full max-w-full max-h-full mx-auto overflow-hidden rounded-3xl bg-black"
          >
            <video
              ref={videoRef}
              src={activeEpisode?.videoUrl && !activeEpisode.videoUrl.toLowerCase().includes(".m3u8") ? activeEpisode.videoUrl : undefined}
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="h-full w-full rounded-3xl bg-black object-contain"
            />

            {/* Overlay to handle play/pause click without conflicting with native controls */}
            <div 
              className={`absolute inset-0 z-10 cursor-pointer ${showControls ? "bg-black/20" : "bg-transparent"}`} 
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  if (showControls) {
                    togglePlay();
                  } else {
                    setShowControls(true);
                  }
                }
              }}
            />

            {/* Custom Bottom Control Bar */}
            <div className={`absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
              {/* Progress Bar */}
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="text-white transition hover:text-pink-400 cursor-pointer"
                  >
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        skipBackward();
                      }}
                      className="text-white hover:text-pink-400 cursor-pointer"
                      title="Lùi 5s"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        skipForward();
                      }}
                      className="text-white hover:text-pink-400 cursor-pointer"
                      title="Tiến 5s"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>

                  <span className="text-xs text-zinc-200">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="text-white hover:text-pink-400 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Central Play/Pause Toggle - Visible when paused or at the start */}
            <div className={`absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center transition-opacity duration-300 ${(!isPlaying || showControls) ? "opacity-100" : "opacity-0"}`}>
              {!isPlaying && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/80 text-white shadow-2xl backdrop-blur-sm transition hover:scale-110 hover:bg-pink-500 cursor-pointer"
                  aria-label="Phát video"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-10 w-10"
                  >
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.522-2.333 2.727-1.617l12.18 7.32c1.18.706 1.18 2.405 0 3.111l-12.18 7.32c-1.205.716-2.727-.19-2.727-1.617V5.653Z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="absolute left-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-white backdrop-blur hover:bg-black/75 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-label="Đóng"
              title="Đóng"
            >
              ✕
            </button>

            <div className="absolute -right-14 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = episodes.findIndex(e => e.id === activeEpisodeId);
                  if (currentIndex > 0) {
                    handlePickEpisode(episodes[currentIndex - 1].id);
                  }
                }}
                disabled={episodes.findIndex(e => e.id === activeEpisodeId) === 0}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white backdrop-blur hover:bg-gray-800 disabled:opacity-30 cursor-pointer"
                aria-label="Tập trước"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  const currentIndex = episodes.findIndex(e => e.id === activeEpisodeId);
                  if (currentIndex < episodes.length - 1) {
                    handlePickEpisode(episodes[currentIndex + 1].id);
                  }
                }}
                disabled={episodes.findIndex(e => e.id === activeEpisodeId) === episodes.length - 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white backdrop-blur hover:bg-gray-800 disabled:opacity-30 cursor-pointer"
                aria-label="Tập tiếp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 10l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel bên phải */}
      <aside className="flex w-full shrink-0 self-stretch flex-col rounded-3xl bg-white/5 p-5 lg:h-full lg:w-[420px] lg:overflow-y-auto">
        <h1 className="text-xl font-bold text-white">{title}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80">❤</span>
            {viewsText}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80">💬</span>
            {viewsText}
          </span>
        </div>

        {tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-sm leading-relaxed text-zinc-300 line-clamp-4">
          {description}
        </p>

        {/* Tabs page */}
        {totalPages > 1 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-300">
            {pageTabs.map((t) => (
              <button
                key={t.page}
                type="button"
                onClick={() => setActivePage(t.page)}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition ${
                  activePage === t.page
                    ? "bg-pink-500/20 text-pink-200"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
            <span className="ml-auto text-zinc-400">
              Tập {activeEpisode?.episodeNumber ?? 1}/{episodes.length}
            </span>
          </div>
        ) : null}

        {/* Grid episode picker */}
        <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6">
          {pageEpisodes.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => handlePickEpisode(e.id)}
              className={`cursor-pointer rounded-lg px-0 py-2 text-center text-xs font-semibold transition ${
                e.id === activeEpisodeId
                  ? "bg-pink-500 text-white"
                  : "bg-white/5 text-zinc-200 hover:bg-white/10"
              }`}
              aria-label={`Chọn tập ${e.id}`}
            >
              {e.episodeNumber}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}

