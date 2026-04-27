"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  const parallaxX = mounted ? (mousePos.x / window.innerWidth - 0.5) * 30 : 0;
  const parallaxY = mounted ? (mousePos.y / window.innerHeight - 0.5) * 30 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .nf-root {
          font-family: 'Space Mono', monospace;
          background: #020408;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: none;
        }

        .cursor {
          width: 12px;
          height: 12px;
          background: #00ffb3;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
        }
        .cursor-ring {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(0,255,179,0.4);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.12s ease-out;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,255,179,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,179,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 8s ease-in-out infinite;
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .glow-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,179,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #00ffb3;
          border-radius: 50%;
          opacity: 0;
          animation: floatUp var(--dur) ease-in var(--delay) infinite;
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0) scale(1); }
          20% { opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-120vh) scale(0); }
        }

        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 40px;
        }

        .error-code {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(160px, 25vw, 320px);
          line-height: 0.85;
          letter-spacing: -4px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,255,179,0.25);
          position: relative;
          display: block;
          user-select: none;
        }
        .error-code::before {
          content: '404';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00ffb3 0%, #0088ff 50%, #ff00aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.9;
        }

        .glitch .error-code::after {
          content: '404';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff00aa, #0088ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glitchAnim 0.2s steps(2) forwards;
          clip-path: polygon(0 30%, 100% 30%, 100% 60%, 0 60%);
        }
        @keyframes glitchAnim {
          0% { transform: translate(-5px, 2px); }
          25% { transform: translate(5px, -2px); }
          50% { transform: translate(-3px, 4px); }
          75% { transform: translate(3px, -4px); }
          100% { transform: translate(0); }
        }

        .scanline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00ffb3, transparent);
          animation: scan 4s linear infinite;
          opacity: 0.35;
          pointer-events: none;
          z-index: 5;
        }
        @keyframes scan {
          0% { top: -5px; }
          100% { top: 100vh; }
        }

        .divider {
          width: 200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffb3, transparent);
          margin: 16px auto;
        }

        .tagline {
          font-size: 11px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: #00ffb3;
          opacity: 0.7;
          margin-bottom: 8px;
          animation: fadeUp 1s ease 0.3s both;
        }

        .message {
          font-size: clamp(13px, 1.8vw, 16px);
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          max-width: 400px;
          margin: 0 auto 40px;
          animation: fadeUp 1s ease 0.5s both;
        }
        .message em {
          color: #00ffb3;
          font-style: normal;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-home {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          background: transparent;
          border: 1px solid rgba(0,255,179,0.5);
          color: #00ffb3;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeUp 1s ease 0.7s both;
        }
        .btn-home::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,179,0.15), transparent);
          transition: left 0.4s ease;
        }
        .btn-home:hover::before { left: 100%; }
        .btn-home:hover {
          border-color: #00ffb3;
          color: #020408;
          background: #00ffb3;
          box-shadow: 0 0 30px rgba(0,255,179,0.4), 0 0 60px rgba(0,255,179,0.15);
        }
        .btn-home:hover .arrow { transform: translateX(5px); }
        .arrow { transition: transform 0.3s ease; display: inline-block; }

        .corner {
          position: absolute;
          width: 28px;
          height: 28px;
          opacity: 0.45;
        }
        .corner-tl { top: 28px; left: 28px; border-top: 1px solid #00ffb3; border-left: 1px solid #00ffb3; }
        .corner-tr { top: 28px; right: 28px; border-top: 1px solid #00ffb3; border-right: 1px solid #00ffb3; }
        .corner-bl { bottom: 28px; left: 28px; border-bottom: 1px solid #00ffb3; border-left: 1px solid #00ffb3; }
        .corner-br { bottom: 28px; right: 28px; border-bottom: 1px solid #00ffb3; border-right: 1px solid #00ffb3; }

        .status-bar {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 18px;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(0,255,179,0.3);
          white-space: nowrap;
        }
        .status-dot {
          width: 5px;
          height: 5px;
          background: #00ffb3;
          border-radius: 50%;
          animation: blink 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }

        .circuit {
          position: absolute;
          opacity: 0.1;
          pointer-events: none;
        }
      `}</style>

      <div className="nf-root">
        {/* Custom cursor */}
        {mounted && (
          <>
            <div
              className="cursor"
              style={{ left: mousePos.x, top: mousePos.y }}
            />
            <div
              className="cursor-ring"
              style={{ left: mousePos.x, top: mousePos.y }}
            />
          </>
        )}

        {/* Background grid */}
        <div className="grid-bg" />

        {/* Mouse glow */}
        {mounted && (
          <div
            className="glow-orb"
            style={{ left: mousePos.x - 300, top: mousePos.y - 300 }}
          />
        )}

        {/* Scan line */}
        <div className="scanline" />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              "--dur": `${4 + (i % 5)}s`,
              "--delay": `${(i * 0.4) % 5}s`,
            }}
          />
        ))}

        {/* Corner decorations */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Circuit SVG */}
        <svg
          className="circuit"
          style={{ top: 0, left: 0 }}
          width="280"
          height="280"
          viewBox="0 0 280 280"
        >
          <path
            d="M20 80 L80 80 L80 40 L160 40"
            stroke="#00ffb3"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="80" cy="80" r="3" fill="#00ffb3" />
          <circle
            cx="160"
            cy="40"
            r="4"
            fill="none"
            stroke="#00ffb3"
            strokeWidth="1"
          />
          <path
            d="M40 140 L40 200 L100 200"
            stroke="#00ffb3"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="40" cy="140" r="2" fill="#00ffb3" />
        </svg>
        <svg
          className="circuit"
          style={{ bottom: 0, right: 0 }}
          width="280"
          height="280"
          viewBox="0 0 280 280"
        >
          <path
            d="M260 80 L200 80 L200 40 L120 40"
            stroke="#00ffb3"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="200" cy="80" r="3" fill="#00ffb3" />
          <path
            d="M240 180 L240 220 L180 220 L180 260"
            stroke="#00ffb3"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Main content */}
        <div
          className={`content ${glitchActive ? "glitch" : ""}`}
          style={{
            transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <p className="tagline">Error // System</p>

          <span className="error-code">404</span>

          <div className="divider" />

          <p className="message">
            The page you&apos;re looking for has <em>vanished</em> into the
            void.
            <br />
            It may have been moved, deleted, or never existed.
          </p>

          <Link href="/" className="btn-home">
            <span>↩</span>
            <span>Return Home</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Status bar */}
        <div className="status-bar">
          <div className="status-dot" />
          <span>STATUS: 404</span>
          <span>/</span>
          <span>PAGE NOT FOUND</span>
          <span>/</span>
          <span>SYS_ERR_0x404</span>
        </div>
      </div>
    </>
  );
}
