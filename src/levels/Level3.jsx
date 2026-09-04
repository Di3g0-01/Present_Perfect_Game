import { useState } from "react";
import { LEVEL3_ITEMS } from "../data";
import { motion, AnimatePresence } from 'framer-motion';
import MagoCanvas from "../MagoCanvas";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ── Ignaros the Fire Demon ───────────────────────────────────
function FireDemon({
  lives,
  isHit,
  isDying,
  isDead,
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Lives */}
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              fontSize: "1.5rem",
              filter: i <= lives ? "drop-shadow(0 0 8px #fb923c)" : "grayscale(1) opacity(0.25)",
              transform: isHit && i === lives ? "scale(1.5)" : "scale(1)",
              transition: "all 0.3s ease",
              lineHeight: 1,
            }}
          >
            {i <= lives ? "❤️" : "🖤"}
          </div>
        ))}
      </div>

      <div
        style={{
          animation: isDying
            ? "villainDie 1.3s ease-in forwards"
            : isHit
            ? "villainHit 0.35s ease"
            : lives <= 1
            ? "demonRage 0.5s ease-in-out infinite"
            : "villainFloat 2.8s ease-in-out infinite",
          transformOrigin: "bottom center",
          filter: isDead ? "grayscale(1) opacity(0)" : isHit ? "brightness(3) saturate(0.5)" : "none",
        }}
      >
        <svg width="155" height="205" viewBox="0 0 155 205" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow / lava pool */}
          <ellipse cx="77" cy="200" rx="48" ry="8" fill="rgba(180,40,0,0.4)" />
          <ellipse cx="77" cy="200" rx="36" ry="5" fill="rgba(255,80,0,0.25)" />

          {/* Tail */}
          <path d="M95 165 Q115 175 120 165 Q128 148 115 140 Q105 135 108 148 Q110 158 100 162 Z" fill="#8b1a08" />
          <path d="M117 137 L122 128 L125 140 Z" fill="#ff4500" />

          {/* Legs */}
          <path d="M54 148 Q48 168 44 192" stroke="#7c1d0a" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M100 148 Q106 168 110 192" stroke="#7c1d0a" strokeWidth="16" strokeLinecap="round" fill="none" />
          {/* Hooves */}
          <ellipse cx="43" cy="193" rx="10" ry="6" fill="#4a0a00" />
          <ellipse cx="110" cy="193" rx="10" ry="6" fill="#4a0a00" />

          {/* Body */}
          <ellipse cx="77" cy="118" rx="38" ry="38" fill="#8b1a08" />
          <ellipse cx="77" cy="115" rx="30" ry="30" fill="#a52010" />
          {/* Lava cracks on body */}
          <path d="M65 105 Q70 115 68 125" stroke="#ff6600" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M82 108 Q86 118 84 128" stroke="#ff8800" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M72 120 Q80 116 88 122" stroke="#ffaa00" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Left arm */}
          <path d="M40 105 Q20 118 15 142" stroke="#8b1a08" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M40 105 Q20 118 15 142" stroke="#a52010" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Left claws */}
          <path d="M15 142 L6 150 M15 142 L13 155 M15 142 L22 152" stroke="#4a0a00" strokeWidth="3.5" strokeLinecap="round" />

          {/* Right arm — holding lava boulder */}
          <path d="M114 105 Q134 115 138 136" stroke="#8b1a08" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M114 105 Q134 115 138 136" stroke="#a52010" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Boulder */}
          <circle cx="140" cy="130" r="16" fill="#5c1a08" />
          <circle cx="140" cy="130" r="12" fill="#7c2210" />
          {/* Lava in boulder */}
          <path d="M133 126 Q140 120 147 126 Q143 134 140 136 Q137 134 133 126Z" fill="#ff4500" opacity="0.8" />
          <path d="M136 130 Q140 124 144 130" stroke="#ff8800" strokeWidth="2" fill="none" opacity="0.9" />

          {/* Neck */}
          <rect x="63" y="82" width="28" height="18" rx="9" fill="#8b1a08" />

          {/* Head */}
          <ellipse cx="77" cy="66" rx="34" ry="30" fill="#8b1a08" />
          <ellipse cx="77" cy="63" rx="27" ry="24" fill="#a52010" />

          {/* Horns — flame-shaped */}
          <path d="M50 48 Q42 18 55 8 Q58 30 66 42 Z" fill="#7c1d0a" />
          <path d="M50 48 Q44 22 54 14 Q56 32 62 42 Z" fill="#ff4500" opacity="0.7" />
          <path d="M104 48 Q112 18 99 8 Q96 30 88 42 Z" fill="#7c1d0a" />
          <path d="M104 48 Q110 22 100 14 Q98 32 92 42 Z" fill="#ff4500" opacity="0.7" />
          {/* Flame tips */}
          <path d="M55 8 Q58 2 62 6 Q60 10 57 12 Z" fill="#ffcc00" />
          <path d="M99 8 Q96 2 92 6 Q94 10 97 12 Z" fill="#ffcc00" />

          {/* Eyes — glowing */}
          <ellipse cx="65" cy="60" rx="9" ry="10" fill="#ff2200" />
          <ellipse cx="89" cy="60" rx="9" ry="10" fill="#ff2200" />
          <ellipse cx="65" cy="60" rx="6" ry="7" fill="#ff8800" />
          <ellipse cx="89" cy="60" rx="6" ry="7" fill="#ff8800" />
          <circle cx="65" cy="61" r="3.5" fill="#ffcc00" />
          <circle cx="89" cy="61" r="3.5" fill="#ffcc00" />
          <circle cx="64" cy="60" r="1.5" fill="white" />
          <circle cx="88" cy="60" r="1.5" fill="white" />
          {/* Eye glow */}
          <circle cx="65" cy="60" r="11" fill="#ff4500" opacity="0.15" style={{ animation: "eyeGlow 1s ease-in-out infinite" }} />
          <circle cx="89" cy="60" r="11" fill="#ff4500" opacity="0.15" style={{ animation: "eyeGlow 1s ease-in-out infinite 0.5s" }} />

          {/* Brows */}
          <path d={lives <= 2 ? "M54 48 Q65 42 70 47" : "M56 50 Q65 45 70 49"} stroke="#4a0a00" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={lives <= 2 ? "M84 47 Q89 42 100 48" : "M84 49 Q89 45 98 50"} stroke="#4a0a00" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <ellipse cx="77" cy="72" rx="5" ry="4" fill="#7c1d0a" />
          <circle cx="74" cy="72" r="2" fill="#4a0a00" />
          <circle cx="80" cy="72" r="2" fill="#4a0a00" />

          {/* Mouth / fangs */}
          <path d="M63 80 Q77 90 91 80" stroke="#4a0a00" strokeWidth="2" fill="none" />
          <path d="M67 80 L64 92" stroke="#e8e8d0" strokeWidth="4" strokeLinecap="round" />
          <path d="M74 82 L72 92" stroke="#e8e8d0" strokeWidth="3" strokeLinecap="round" />
          <path d="M87 80 L90 92" stroke="#e8e8d0" strokeWidth="4" strokeLinecap="round" />

          {/* Fire particles around head */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={55 + i * 22}
              cy={30 + (i % 2) * 8}
              r={2 + i}
              fill="#ff6600"
              opacity="0.7"
              style={{ animation: `fireDrift ${0.8 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
            />
          ))}

          {/* Rage flames when 1 life */}
          {lives === 1 && (
            <>
              <path d="M30 95 Q24 80 32 72 Q36 88 40 94 Z" fill="#ff4500" opacity="0.8" style={{ animation: "fireDrift 0.6s ease-in-out infinite" }} />
              <path d="M120 95 Q126 80 118 72 Q114 88 110 94 Z" fill="#ff4500" opacity="0.8" style={{ animation: "fireDrift 0.6s ease-in-out infinite 0.3s" }} />
            </>
          )}

          {/* Death X eyes */}
          {isDying && (
            <>
              <line x1="58" y1="53" x2="72" y2="67" stroke="#fff" strokeWidth="3" />
              <line x1="72" y1="53" x2="58" y2="67" stroke="#fff" strokeWidth="3" />
              <line x1="82" y1="53" x2="96" y2="67" stroke="#fff" strokeWidth="3" />
              <line x1="96" y1="53" x2="82" y2="67" stroke="#fff" strokeWidth="3" />
            </>
          )}

          {/* Hit sparks */}
          {isHit && (
            <>
              <text x="15" y="55" fontSize="16" style={{ animation: "floatStar 0.4s ease" }}>*</text>
              <text x="110" y="50" fontSize="16" style={{ animation: "floatStar 0.4s ease 0.1s" }}>*</text>
              <text x="65" y="15" fontSize="14" style={{ animation: "floatStar 0.4s ease 0.05s" }}>*</text>
            </>
          )}
        </svg>
      </div>

      <div className="mt-1 text-center">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#fb923c", fontFamily: "'Cinzel', serif" }}>
          {isDying ? "Defeated!" : lives === 1 ? "! Enraged!" : "Ignaros"}
        </p>
        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Crimson Text', serif" }}>
          {isDying ? "The magma cools..." : "Demon of Eternal Magma"}
        </p>
      </div>
    </div>
  );
}

export default function Level3({ accentColor, glowColor, onComplete, onMistake }) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  
  const [magoAnim, setMagoAnim] = useState("walk");
  const [sparkyMessage, setSparkyMessage] = useState("");
  const [isSparkyControlled, setIsSparkyControlled] = useState(false);

  // 4 lives, 8 questions → lose 1 life every 2 correct answers
  const [beastLives, setBeastLives] = useState(4);
  const [beastHit, setBeastHit] = useState(false);
  const [beastDying, setBeastDying] = useState(false);
  const [beastDead, setBeastDead] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const item = LEVEL3_ITEMS[idx];
  const isLast = idx === LEVEL3_ITEMS.length - 1;
  const [before, after] = item.sentence.split("___");
  const isCorrect = chosen === item.answer;

  async function pick(val) {
    if (chosen !== null || isSparkyControlled) return;
    setChosen(val);
    if (val === item.answer) {
      setMagoAnim("cast");
      setSparkyMessage("Correct!");
      setIsSparkyControlled(true);

      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);

      if (newCorrect % 2 === 0) {
        setBeastHit(true);
        const newLives = beastLives - 1;
        setBeastLives(newLives);

        if (newLives <= 0) {
          setBeastDying(true);
          await sleep(1300);
          setBeastDead(true);
        } else {
          await sleep(350);
          setBeastHit(false);
        }
      }

      await sleep(1000);
      setMagoAnim("walk");
      setSparkyMessage("");
      setIsSparkyControlled(false);
    } else {
      setMistakes((m) => m + 1);
      setSparkyMessage("Oops! Try again.");
      setIsSparkyControlled(true);
      if (onMistake) onMistake();
      
      await sleep(1500);
      setSparkyMessage("");
      setChosen(null);
      setIsSparkyControlled(false);
    }
  }

  function next() {
    if (isLast) {
      setTimeout(() => {
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        onComplete(stars);
      }, beastDying ? 1400 : 200);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      setSparkyMessage("");
    }
  }

  function btnStyle(val) {
    if (chosen === null) return { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)", color: "#e5e7eb" };
    if (val === item.answer) return { bg: "rgba(251,146,60,0.2)", border: "#fb923c", color: "#fb923c" };
    if (val === chosen) return { bg: "rgba(239,68,68,0.2)", border: "#ef4444", color: "#ef4444" };
    return { bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" };
  }

  const forStyle = btnStyle("for");
  const sinceStyle = btnStyle("since");

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4">
      <style>{`
        @keyframes villainFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes villainHit { 0%{transform:translateX(0) scale(1)} 25%{transform:translateX(-14px) scale(1.1)} 50%{transform:translateX(14px) scale(0.95)} 75%{transform:translateX(-8px)} 100%{transform:translateX(0) scale(1)} }
        @keyframes demonRage { 0%,100%{transform:rotate(-3deg) scale(1.04)} 50%{transform:rotate(3deg) scale(1.06)} }
        @keyframes villainDie { 0%{transform:rotate(0) scale(1);opacity:1} 25%{transform:rotate(-20deg) scale(1.1)} 50%{transform:rotate(30deg) translateY(20px) scale(0.8);opacity:0.7} 80%{transform:translateY(50px) scale(0.3);opacity:0.2} 100%{transform:translateY(70px) scale(0);opacity:0} }
        @keyframes floatStar { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-24px) scale(0.4);opacity:0} }
        @keyframes eyeGlow { 0%,100%{opacity:0.1} 50%{opacity:0.35} }
        @keyframes fireDrift { 0%,100%{transform:translateY(0) scale(1);opacity:0.6} 50%{transform:translateY(-6px) scale(1.3);opacity:0.9} }
      `}</style>

      {/* Progress */}
      <div className="flex items-center justify-between w-full">
        <div className="text-xs tracking-widest uppercase" style={{ color: accentColor, fontFamily: "'Cinzel', serif" }}>
          {idx + 1} / {LEVEL3_ITEMS.length}
        </div>
        <div className="flex gap-1">
          {LEVEL3_ITEMS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < idx ? accentColor : i === idx ? accentColor : "rgba(255,255,255,0.15)", opacity: i <= idx ? 1 : 0.4 }} />
          ))}
        </div>
      </div>

      {/* Instruction */}
      <div className="text-center">
        <p className="font-bold text-sm mb-0.5" style={{ color: "#f9fafb", fontFamily: "'Cinzel', serif" }}>
          Choose <span style={{ color: accentColor }}>FOR</span> or <span style={{ color: "#c084fc" }}>SINCE</span>
        </p>
        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Crimson Text', serif" }}>{item.context}</p>
      </div>

      {/* Battle arena */}
      <div
        className="w-full rounded-2xl p-4 flex items-end justify-between gap-4 relative overflow-hidden mt-2"
        style={{
          background: "linear-gradient(160deg, #2d0a00 0%, #4a1200 100%)",
          border: `1px solid ${accentColor}33`,
          minHeight: "260px",
        }}
      >
        {/* Lava glow floor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: "linear-gradient(to top, rgba(255,69,0,0.3), transparent)" }} />
          {[18, 55, 82].map((x, i) => (
            <div key={i} className="absolute bottom-0" style={{ left: `${x}%` }}>
              <svg width="18" height="26" viewBox="0 0 18 26">
                <polygon points="9,0 16,26 2,26" fill="#ff4500" opacity={0.3 + i * 0.1} />
              </svg>
            </div>
          ))}
        </div>

        {/* Wizard (player) */}
        <div className="flex flex-col items-center gap-1 relative z-10 w-full md:w-1/3 pt-8">
          <div className="text-xs tracking-widest uppercase mb-1" style={{ color: accentColor, fontFamily: "'Cinzel', serif" }}>You</div>
          <div className="flex justify-center h-48 w-full relative pointer-events-none mt-4">
            <MagoCanvas animation={magoAnim} scale={6} fps={10} />
            
            {/* Side message bubble */}
            <AnimatePresence>
              {sparkyMessage && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-[80%] top-1/4 max-w-[150px] p-2 text-xs rounded-xl border border-white/20 shadow-xl z-50 text-center pointer-events-auto"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#f8fafc',
                  }}
                >
                  {sparkyMessage}
                  <div className="absolute top-1/2 -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-slate-800 border-b-[6px] border-b-transparent -translate-y-1/2"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* VS */}
        <div className="hidden md:flex flex-col items-center gap-1 relative z-10 mb-8 w-1/3">
          <div className="text-2xl font-black" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Cinzel Decorative', serif" }}>VS</div>
        </div>

        {/* Fire Demon */}
        <div className="relative z-10 w-full md:w-1/3 flex justify-center">
          <FireDemon lives={beastLives} isHit={beastHit} isDying={beastDying} isDead={beastDead} />
        </div>
      </div>

      {/* Sentence */}
      <div className="w-full rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <p className="text-lg leading-relaxed" style={{ color: "#f9fafb", fontFamily: "'Crimson Text', serif", fontSize: "1.1rem" }}>
          {before}
          <span
            className="inline-block mx-1 px-3 py-0.5 rounded-lg font-bold min-w-16 text-center transition-all duration-300"
            style={{
              background: chosen ? (isCorrect ? "rgba(251,146,60,0.2)" : "rgba(239,68,68,0.2)") : `${accentColor}22`,
              border: `2px solid ${chosen ? (isCorrect ? "#fb923c" : "#ef4444") : accentColor}`,
              color: chosen ? (isCorrect ? "#fb923c" : "#ef4444") : accentColor,
              fontFamily: "'Cinzel', serif",
            }}
          >
            {chosen ?? "___"}
          </span>
          {after}
        </p>
      </div>

      {/* FOR / SINCE buttons */}
      <div className="flex gap-4 w-full max-w-xs">
        {(["for", "since"]).map((val) => {
          const s = val === "for" ? forStyle : sinceStyle;
          return (
            <button
              key={val}
              onClick={() => pick(val)}
              disabled={chosen !== null || isSparkyControlled}
              className="flex-1 py-4 rounded-2xl text-xl font-black tracking-widest uppercase transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
              style={{
                background: s.bg,
                border: `2px solid ${s.border}`,
                color: s.color,
                fontFamily: "'Cinzel', serif",
                boxShadow: chosen === null ? `0 0 15px ${accentColor}33` : "none",
              }}
            >
              {val.toUpperCase()}
            </button>
          );
        })}
      </div>

      {chosen !== null && isCorrect && (
        <button
          onClick={next}
          className="px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
            color: "#0a0118",
            fontFamily: "'Cinzel', serif",
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        >
          {isLast ? "Finish" : "Next →"}
        </button>
      )}
    </div>
  );
}
