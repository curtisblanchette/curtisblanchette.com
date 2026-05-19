"use client";

import { useState } from "react";
import { VIDEOS, type LearningVideo } from "@/content/data/videos";

/**
 * Learning Centre — a 90s "Knowledge Network" video showcase.
 *
 * Renders a grid of VHS-tape-styled cards keyed off /public/videos/.
 * Each live card is a click-to-play surface: the poster is replaced by
 * an inline native <video controls autoplay> on first interaction, so
 * the page itself never streams bytes the visitor didn't ask for.
 *
 * "Soon" cards render as placeholder tape spines so the section reads
 * as a series even when only one video has shipped.
 *
 * Direct styling lives in src/styles/cb-site-kit/components.css under
 * the .cb-learn-* namespace.
 */
export function LearningCentre() {
  return (
    <div className="cb-learn">
      <div className="cb-learn__grid">
        {VIDEOS.map((v) => (
          <VideoCard key={v.slug} video={v} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: LearningVideo }) {
  const [playing, setPlaying] = useState(false);

  if (video.status === "soon") {
    return (
      <article className="cb-learn-card cb-learn-card--soon" aria-label="Coming soon">
        <div className="cb-learn-card__screen">
          <div className="cb-learn-card__static" aria-hidden />
          <div className="cb-learn-card__signal" aria-hidden>
            <span>NO</span>
            <span>SIGNAL</span>
          </div>
        </div>
        <div className="cb-learn-card__label">
          <div className="cb-learn-card__spine">
            <span className="cb-learn-card__vol">VOL. {video.volume}</span>
            <span className="cb-learn-card__topic">{video.topic}</span>
          </div>
          <h3 className="cb-learn-card__title">
            {renderTitleWithItalic(video.title, video.italic)}
          </h3>
          <p className="cb-learn-card__summary">{video.summary}</p>
          <p className="cb-learn-card__meta">
            <span>{video.duration}</span>
            <span aria-hidden>·</span>
            <span>{video.recorded}</span>
          </p>
        </div>
      </article>
    );
  }

  const mp4 = `/videos/${video.slug}.mp4`;
  const poster = `/videos/${video.slug}.poster.jpg`;

  return (
    <article className="cb-learn-card" aria-label={video.title}>
      <div className="cb-learn-card__screen">
        {!playing ? (
          <button
            type="button"
            className="cb-learn-card__play"
            onClick={() => setPlaying(true)}
            aria-label={`Play "${video.title}"`}
          >
            {/* Poster as a background image rather than <img> so we can
                stack the scanline overlay above without a wrapper. */}
            <span
              className="cb-learn-card__poster"
              style={{ backgroundImage: `url("${poster}")` }}
              aria-hidden
            />
            <span className="cb-learn-card__scanline" aria-hidden />
            <span className="cb-learn-card__chrome" aria-hidden>
              <span className="cb-learn-card__rec">
                <i /> REC
              </span>
              <span className="cb-learn-card__tc">CH 04 · 60Hz</span>
            </span>
            <span className="cb-learn-card__playbtn" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M6 4l14 8-14 8V4z" />
              </svg>
            </span>
          </button>
        ) : (
          <video
            className="cb-learn-card__video"
            src={mp4}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            Your browser does not support HTML5 video.
          </video>
        )}
      </div>

      <div className="cb-learn-card__label">
        <div className="cb-learn-card__spine">
          <span className="cb-learn-card__vol">VOL. {video.volume}</span>
          <span className="cb-learn-card__topic">{video.topic}</span>
        </div>
        <h3 className="cb-learn-card__title">
          {renderTitleWithItalic(video.title, video.italic)}
        </h3>
        <p className="cb-learn-card__summary">{video.summary}</p>
        <p className="cb-learn-card__meta">
          <span>{video.duration}</span>
          <span aria-hidden>·</span>
          <span>{video.recorded}</span>
          {video.linkedin && (
            <>
              <span aria-hidden>·</span>
              <a
                href={video.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cb-learn-card__discuss"
              >
                Discuss <span className="cb-arrow">↗</span>
              </a>
            </>
          )}
        </p>
      </div>
    </article>
  );
}

/**
 * Mirror of the project-row helper: wrap the italic substring in <em>
 * so the kit's PP Eiko italic rule lights up.
 */
function renderTitleWithItalic(title: string, italic?: string) {
  if (!italic) return title;
  const idx = title.toLowerCase().indexOf(italic.toLowerCase());
  if (idx === -1) return <>{title}</>;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + italic.length);
  const after = title.slice(idx + italic.length);
  return (
    <>
      {before}
      <em>{match}</em>
      {after}
    </>
  );
}
