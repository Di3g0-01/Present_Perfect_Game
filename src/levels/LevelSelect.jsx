import { useEffect, useState } from "react";
import { LEVELS } from "../data";
import MagoCanvas from "../MagoCanvas";

function StarRating({ stars, max = 3, color }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < stars ? "#fbbf24" : "none"} stroke={i < stars ? "#fbbf24" : "#374151"} strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

// ── Villain SVGs ─────────────────────────────────────────────
function ForestVillain() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <ellipse cx="60" cy="145" rx="35" ry="8" fill="rgba(0,0,0,0.4)" />
      <path d="M35 120 Q60 90 85 120 L80 155 Q60 165 40 155 Z" fill="#2d5a27" />
      <circle cx="60" cy="75" r="28" fill="#3d7a32" />
      <ellipse cx="60" cy="72" rx="22" ry="20" fill="#4a9040" />
      <ellipse cx="50" cy="68" rx="7" ry="8" fill="#ff6b35" />
      <ellipse cx="70" cy="68" rx="7" ry="8" fill="#ff6b35" />
      <ellipse cx="50" cy="67" rx="4" ry="5" fill="#ffcc00" />
      <ellipse cx="70" cy="67" rx="4" ry="5" fill="#ffcc00" />
      <circle cx="50" cy="67" r="2" fill="#1a0a00" />
      <circle cx="70" cy="67" r="2" fill="#1a0a00" />
      <path d="M48 82 Q60 90 72 82" stroke="#1a0a00" strokeWidth="1.5" fill="none" />
      <path d="M40 50 Q35 30 45 25 Q50 45 60 47" fill="#2d5a27" />
      <path d="M80 50 Q85 30 75 25 Q70 45 60 47" fill="#2d5a27" />
      <path d="M40 115 Q30 130 20 125" stroke="#2d5a27" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M80 115 Q90 130 100 125" stroke="#2d5a27" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M15 108 Q10 95 20 90" stroke="#8b5e3c" strokeWidth="3" fill="none" />
      <circle cx="12" cy="86" r="6" fill="#8B0000" />
      <ellipse cx="12" cy="86" rx="3" ry="4" fill="#ff0000" opacity="0.7" />
    </svg>
  );
}
function IceVillain() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <ellipse cx="60" cy="148" rx="32" ry="7" fill="rgba(0,0,0,0.3)" />
      <path d="M35 125 Q60 105 85 125 L82 155 Q60 162 38 155 Z" fill="#1a3a5c" />
      <polygon points="60,5 70,30 95,30 75,50 82,75 60,58 38,75 45,50 25,30 50,30" fill="#7dd3fc" opacity="0.9" />
      <polygon points="60,15 67,35 87,35 72,47 78,67 60,54 42,67 48,47 33,35 53,35" fill="#bae6fd" />
      <circle cx="60" cy="90" r="26" fill="#c8e8f8" />
      <ellipse cx="52" cy="86" rx="6" ry="7" fill="#e0f2fe" />
      <ellipse cx="68" cy="86" rx="6" ry="7" fill="#e0f2fe" />
      <ellipse cx="52" cy="85" rx="4" ry="5" fill="#bae6fd" />
      <ellipse cx="68" cy="85" rx="4" ry="5" fill="#bae6fd" />
      <circle cx="52" cy="85" r="2.5" fill="#0c4a6e" />
      <circle cx="68" cy="85" r="2.5" fill="#0c4a6e" />
      <circle cx="52.8" cy="84.2" r="0.8" fill="white" />
      <circle cx="68.8" cy="84.2" r="0.8" fill="white" />
      <path d="M53 98 Q60 103 67 98" stroke="#0c4a6e" strokeWidth="1.5" fill="none" />
      <path d="M40 118 L22 130" stroke="#1a3a5c" strokeWidth="7" strokeLinecap="round" />
      <path d="M80 118 L98 130" stroke="#1a3a5c" strokeWidth="7" strokeLinecap="round" />
      <polygon points="98,125 108,115 112,130 102,135" fill="#bae6fd" />
      <line x1="105" y1="120" x2="105" y2="132" stroke="white" strokeWidth="1" />
      <line x1="99" y1="126" x2="111" y2="126" stroke="white" strokeWidth="1" />
    </svg>
  );
}
function LavaVillain() {
  return (
    <svg viewBox="0 0 120 170" className="w-full h-full">
      <ellipse cx="60" cy="155" rx="38" ry="9" fill="rgba(0,0,0,0.5)" />
      <path d="M30 128 Q60 108 90 128 L86 158 Q60 168 34 158 Z" fill="#7c1d0a" />
      <path d="M55 35 L60 10 L65 35 L70 20 L72 40 L78 28 L75 48 L80 42 L74 58 L82 55 L72 68 L48 68 L38 55 L46 58 L40 42 L45 48 L42 28 L48 40 L50 20 Z" fill="#ff4500" />
      <circle cx="60" cy="95" r="30" fill="#8b1a08" />
      <ellipse cx="60" cy="92" rx="24" ry="22" fill="#a52010" />
      <path d="M40 78 Q45 65 55 70 Q50 78 40 78Z" fill="#ff4500" />
      <path d="M80 78 Q75 65 65 70 Q70 78 80 78Z" fill="#ff4500" />
      <ellipse cx="51" cy="88" rx="7" ry="8" fill="#ff6b00" />
      <ellipse cx="69" cy="88" rx="7" ry="8" fill="#ff6b00" />
      <circle cx="51" cy="87" r="3" fill="#1a0000" />
      <circle cx="69" cy="87" r="3" fill="#1a0000" />
      <path d="M47 102 L53 106 L60 103 L67 106 L73 102" stroke="#ff4500" strokeWidth="2" fill="none" />
      <path d="M44 78 Q38 88 30 118" stroke="#7c1d0a" strokeWidth="8" strokeLinecap="round" />
      <path d="M76 78 Q82 88 90 118" stroke="#7c1d0a" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
function DarkVillain() {
  return (
    <svg viewBox="0 0 120 170" className="w-full h-full">
      <ellipse cx="60" cy="158" rx="40" ry="9" fill="rgba(0,0,0,0.6)" />
      <path d="M25 130 Q30 100 60 95 Q90 100 95 130 L88 160 Q60 170 32 160 Z" fill="#1a0535" />
      <path d="M60 10 L72 40 L100 35 L78 55 L88 82 L60 65 L32 82 L42 55 L20 35 L48 40 Z" fill="#7c3aed" />
      <path d="M60 18 L70 42 L94 38 L75 55 L84 76 L60 62 L36 76 L45 55 L26 38 L50 42 Z" fill="#a855f7" />
      <circle cx="60" cy="98" r="32" fill="#0d0120" />
      <ellipse cx="60" cy="95" rx="26" ry="24" fill="#1a0535" />
      <ellipse cx="51" cy="90" rx="8" ry="9" fill="#2e0060" />
      <ellipse cx="69" cy="90" rx="8" ry="9" fill="#2e0060" />
      <ellipse cx="51" cy="89" rx="5" ry="6" fill="#7c3aed" />
      <ellipse cx="69" cy="89" rx="5" ry="6" fill="#7c3aed" />
      <circle cx="51" cy="89" r="3" fill="#0d0120" />
      <circle cx="69" cy="89" r="3" fill="#0d0120" />
      <circle cx="52" cy="88" r="1.2" fill="#e9d5ff" />
      <circle cx="70" cy="88" r="1.2" fill="#e9d5ff" />
      <path d="M48 104 Q55 108 60 105 Q65 108 72 104" stroke="#7c3aed" strokeWidth="2" fill="none" />
      <path d="M42 108 L20 130" stroke="#1a0535" strokeWidth="9" strokeLinecap="round" />
      <path d="M78 108 L100 130" stroke="#1a0535" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

const VILLAIN_SVGS = [ForestVillain, IceVillain, LavaVillain, DarkVillain];

export default function LevelSelect({ completedLevels, onSelectLevel }) {
  const [stars, setStars] = useState([]);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    setStars(Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
    })));
  }, []);

  const totalStars = Object.values(completedLevels).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "radial-gradient(ellipse at top, #1e0540 0%, #0a0118 45%, #000008 100%)" }}>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.9;transform:scale(1.4)} }
        @keyframes floatMago { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(6px,-4px)} }
        @keyframes cardHover { to{box-shadow:0 0 40px var(--glow), 0 24px 48px rgba(0,0,0,.7)} }
      `}</style>

      {stars.map((s) => (
        <div key={s.id} className="absolute rounded-full pointer-events-none" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: "white", animation: `twinkle ${2 + s.delay}s ${s.delay}s infinite ease-in-out` }} />
      ))}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#7c3aed,transparent)", filter: "blur(70px)", animation: "drift 9s ease-in-out infinite" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle,#1d4ed8,transparent)", filter: "blur(60px)", animation: "drift 11s ease-in-out infinite reverse" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-3" style={{ animation: "floatMago 3s ease-in-out infinite" }}>
            <MagoCanvas animation="walk" scale={7} fps={10} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-wider mb-1" style={{ color: "#f9fafb", fontFamily: "'Cinzel Decorative', serif", textShadow: "0 0 30px rgba(167,139,250,.5), 0 0 60px rgba(124,58,237,.3)" }}>
            Arcanus
          </h1>
          <h2 className="text-sm tracking-[0.4em] uppercase mb-4" style={{ color: "#a78bfa", fontFamily: "'Cinzel', serif" }}>
            The Wizard's Path
          </h2>

          <div className="flex gap-8">
            {[
              { label: "Stars", value: `${totalStars}/12`, color: "#fbbf24" },
              { label: "Completed", value: `${Object.keys(completedLevels).length}/4`, color: "#4ade80" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-black" style={{ color: s.color, fontFamily: "'Cinzel Decorative', serif", textShadow: `0 0 12px ${s.color}66` }}>{s.value}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,.3)", fontFamily: "'Cinzel', serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 w-full">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,.5))" }} />
          <div className="text-xs tracking-[.3em] uppercase" style={{ color: "#7c3aed", fontFamily: "'Cinzel', serif" }}>✦ Select Level ✦</div>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(124,58,237,.5))" }} />
        </div>

        {/* Level cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {LEVELS.map((level, i) => {
            const Villain = VILLAIN_SVGS[i];
            const levelStars = completedLevels[level.id] ?? 0;
            const completed = level.id in completedLevels;
            const locked = false; // i > 0 && !(LEVELS[i - 1].id in completedLevels) && !completed;
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={level.id}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => !locked && onSelectLevel(i)}
                className="relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300"
                style={{
                  background: `linear-gradient(160deg, ${level.bgFrom} 0%, ${level.bgTo} 100%)`,
                  borderColor: isHovered && !locked ? level.accentColor : "rgba(255,255,255,.08)",
                  borderWidth: "1px",
                  boxShadow: isHovered && !locked ? `0 0 28px ${level.glowColor}, 0 16px 32px rgba(0,0,0,.6)` : "0 8px 24px rgba(0,0,0,.5)",
                  transform: isHovered && !locked ? "scale(1.03) translateY(-4px)" : "scale(1)",
                  cursor: locked ? "not-allowed" : "pointer",
                }}
              >
                {locked && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,.65)", backdropFilter: "blur(2px)" }}>
                    <div className="text-4xl mb-2">🔒</div>
                    <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#6b7280", fontFamily: "'Cinzel', serif" }}>Locked</p>
                  </div>
                )}

                <div className="p-4 flex flex-col h-full relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs tracking-widest uppercase font-semibold block" style={{ color: level.accentColor, fontFamily: "'Cinzel', serif" }}>{level.subtitle}</span>
                      <h3 className="text-sm font-bold leading-tight mt-0.5" style={{ color: "#f9fafb", fontFamily: "'Cinzel', serif" }}>{level.name}</h3>
                    </div>
                    {completed && <StarRating stars={levelStars} color={level.accentColor} />}
                  </div>

                  <div className="flex justify-center my-2" style={{ height: "90px" }}>
                    <div className="relative" style={{ width: "75px" }}>
                      <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${level.glowColor} 0%, transparent 70%)`, filter: "blur(6px)" }} />
                      <Villain />
                    </div>
                  </div>

                  <div className="text-center mb-2">
                    <p className="text-xs font-bold" style={{ color: level.accentColor, fontFamily: "'Cinzel', serif" }}>{level.villain}</p>
                  </div>

                  <div className="mt-auto px-2 py-1.5 rounded-lg text-center" style={{ background: `${level.accentColor}15`, border: `1px solid ${level.accentColor}30` }}>
                    <span className="text-xs font-semibold" style={{ color: level.accentColor, fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.08em" }}>
                      {level.topic}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
