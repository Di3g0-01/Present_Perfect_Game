import { useState, useEffect } from "react";
import { LEVEL2_QUESTIONS } from "../data";
import { motion, AnimatePresence } from 'framer-motion';
import MagoCanvas from "../MagoCanvas";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ── Permafrost Witch ─────────────────────────────────────────
function IceWitch({
  lives,
  isHit,
  isDead,
  isDying,
}) {
  const hitColor = isHit ? "#60a5fa" : "none";

  return (
    <div className="relative flex flex-col items-center">
      {/* Lives hearts */}
      <div className="flex gap-2 mb-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              fontSize: "1.4rem",
              filter: i <= lives ? "drop-shadow(0 0 6px #60a5fa)" : "grayscale(1) opacity(0.3)",
              transform: isHit && i === lives ? "scale(1.4)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          >
            {i <= lives ? "💙" : "🖤"}
          </div>
        ))}
      </div>

      {/* Witch SVG */}
      <div
        style={{
          animation: isDying
            ? "beastDie 1.2s ease-in forwards"
            : isHit
            ? "beastHit 0.35s ease"
            : lives <= 1
            ? "beastAngry 0.6s ease-in-out infinite"
            : "beastIdle 2.5s ease-in-out infinite",
          filter: isHit ? "brightness(2) saturate(3)" : isDead ? "grayscale(1) opacity(0)" : "none",
          transformOrigin: "bottom center",
        }}
      >
        <svg width="160" height="200" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
          {/* Hit overlay */}
          {isHit && <rect x="0" y="0" width="160" height="200" fill={hitColor} opacity="0.25" rx="10" />}

          {/* Shadow */}
          <ellipse cx="80" cy="192" rx="50" ry="9" fill="rgba(0,0,0,0.35)" />

          {/* Cloak/Body */}
          <path d="M80 50 L30 180 L130 180 Z" fill="#1e3a8a" />
          <path d="M80 50 L30 180 L130 180 Z" fill="url(#icePattern)" opacity="0.5" />
          
          {/* Cloak trim */}
          <path d="M30 180 Q80 170 130 180" stroke="#60a5fa" strokeWidth="6" fill="none" />
          <path d="M40 140 Q80 150 120 140" stroke="#3b82f6" strokeWidth="4" fill="none" />

          {/* Shoulders */}
          <ellipse cx="80" cy="80" rx="30" ry="15" fill="#1e40af" />

          {/* Left arm holding ice staff */}
          <path d="M55 85 Q30 110 35 140" stroke="#1e3a8a" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M55 85 Q30 110 35 140" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" fill="none" />
          
          {/* Ice Staff */}
          <rect x="25" y="60" width="6" height="100" fill="#94a3b8" transform="rotate(-15 28 110)" />
          <polygon points="20,50 35,50 28,30" fill="#60a5fa" transform="rotate(-15 28 50)" />
          <polygon points="20,50 35,50 28,70" fill="#3b82f6" transform="rotate(-15 28 50)" />
          
          {/* Staff glow */}
          <circle cx="15" cy="50" r="15" fill="#93c5fd" opacity="0.4" />

          {/* Right arm casting */}
          <path d="M105 85 Q130 110 125 140" stroke="#1e3a8a" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M105 85 Q130 110 125 140" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" fill="none" />
          
          {/* Hand/magic glow */}
          <circle cx="125" cy="145" r="8" fill="#bfdbfe" />
          <circle cx="125" cy="145" r="14" fill="#60a5fa" opacity="0.5" />

          {/* Head/Hood */}
          <path d="M55 70 Q80 20 105 70 Z" fill="#0f172a" />
          <ellipse cx="80" cy="65" rx="18" ry="22" fill="#0f172a" />
          
          {/* Glowing Eyes */}
          <ellipse cx="72" cy="62" rx="4" ry="2" fill="#93c5fd" />
          <ellipse cx="88" cy="62" rx="4" ry="2" fill="#93c5fd" />
          
          {/* Ice Crown */}
          <polygon points="65,40 70,25 75,40" fill="#60a5fa" />
          <polygon points="75,40 80,20 85,40" fill="#93c5fd" />
          <polygon points="85,40 90,25 95,40" fill="#60a5fa" />

          <defs>
            <pattern id="icePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>
        </svg>
      </div>

      {/* Witch name */}
      <div className="mt-2 text-center">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#60a5fa", fontFamily: "'Cinzel', serif" }}>
          {isDying ? "Melted!" : lives <= 1 ? "⚠ Blizzard Warning!" : "Permafrost Witch"}
        </p>
        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Crimson Text', serif" }}>
          {isDying ? "The freeze lifts..." : "Mistress of the Cold"}
        </p>
      </div>
    </div>
  );
}

export default function Level2({ accentColor, glowColor, onComplete }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  
  // Beast state
  const [beastLives, setBeastLives] = useState(3);
  const [beastHit, setBeastHit] = useState(false);
  const [beastDying, setBeastDying] = useState(false);
  const [beastDead, setBeastDead] = useState(false);

  // Mago state
  const [magoAnim, setMagoAnim] = useState("walk");
  const [sparkyMessage, setSparkyMessage] = useState("");
  const [isSparkyControlled, setIsSparkyControlled] = useState(false);

  const q = LEVEL2_QUESTIONS[qIdx];
  const isLast = qIdx === LEVEL2_QUESTIONS.length - 1;
  const isCorrect = selected === q.correct;

  useEffect(() => {
    setSparkyMessage("");
    setMagoAnim("walk");
  }, [qIdx]);

  async function pick(idx) {
    if (selected !== null || isSparkyControlled) return;
    setSelected(idx);
    setIsSparkyControlled(true);
    
    if (idx === q.correct) {
      setMagoAnim("grab");
      await sleep(300);
      setSparkyMessage(q.explanation);
      setMagoAnim("walk");
      
      // Hit the beast
      const newLives = beastLives - 1;
      setBeastHit(true);
      await sleep(400);
      setBeastHit(false);
      
      if (newLives <= 0) {
        setBeastLives(0);
        await sleep(600);
        setBeastDying(true);
        await sleep(1400);
        setBeastDead(true);
        setIsSparkyControlled(false);
      } else {
        setBeastLives(newLives);
        await sleep(600);
        setIsSparkyControlled(false);
      }
    } else {
      setMagoAnim("release");
      setSparkyMessage("Not quite... try again!");
      setMistakes((m) => m + 1);
      if (onMistake) onMistake();
      await sleep(1400);
      setMagoAnim("walk");
      setSparkyMessage("");
      setSelected(null);
      setIsSparkyControlled(false);
    }
  }

  function next() {
    if (isLast) {
      const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
      onComplete(stars);
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
    }
  }

  const optionColors = (idx) => {
    if (selected === null) return { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", color: "#e5e7eb" };
    if (idx === q.correct) return { bg: "rgba(74,222,128,0.15)", border: "#4ade8066", color: "#4ade80" };
    if (idx === selected && idx !== q.correct) return { bg: "rgba(239,68,68,0.15)", border: "#ef444466", color: "#ef4444" };
    return { bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" };
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 z-10 relative">
      <style>{`
        @keyframes beastIdle {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes beastHit {
          0% { transform: translateX(0) scale(1); }
          20% { transform: translateX(-12px) scale(1.1); filter: brightness(3) saturate(5); }
          40% { transform: translateX(12px) scale(0.95); }
          60% { transform: translateX(-8px) scale(1.05); }
          80% { transform: translateX(6px) scale(1); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes beastAngry {
          0%,100% { transform: translateY(0) rotate(-2deg) scale(1.02); }
          50% { transform: translateY(-4px) rotate(2deg) scale(1.03); }
        }
        @keyframes beastDie {
          0% { transform: rotate(0deg) scale(1); opacity: 1; }
          20% { transform: rotate(-15deg) scale(1.1); opacity: 1; }
          40% { transform: rotate(25deg) scale(0.9); opacity: 0.8; }
          60% { transform: rotate(-10deg) translateY(20px) scale(0.7); opacity: 0.5; }
          80% { transform: rotate(5deg) translateY(40px) scale(0.4); opacity: 0.2; }
          100% { transform: rotate(0deg) translateY(60px) scale(0); opacity: 0; }
        }
      `}</style>
      
      <div className="flex items-center justify-between w-full">
        <div className="text-xs tracking-widest uppercase font-bold" style={{ color: accentColor, fontFamily: "'Cinzel', serif" }}>
          Question {qIdx + 1} of {LEVEL2_QUESTIONS.length}
        </div>
        <div className="flex gap-1">
          {LEVEL2_QUESTIONS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i < qIdx ? accentColor : i === qIdx ? accentColor : "rgba(255,255,255,0.15)", opacity: i <= qIdx ? 1 : 0.4 }} />
          ))}
        </div>
      </div>

      <div className="text-center mb-2">
        <p className="text-lg font-bold mb-1 text-gray-50">
          {q.question}
        </p>
      </div>

      {/* Battle arena */}
      <div
        className="w-full rounded-2xl p-4 flex flex-col md:flex-row items-end justify-between gap-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0b1a2e 0%, #152c4e 100%)",
          border: `1px solid ${accentColor}33`,
          minHeight: "260px",
        }}
      >
        {/* Ice background details */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[15, 70, 85].map((x, i) => (
            <div key={i} className="absolute bottom-0" style={{ left: `${x}%` }}>
              <svg width="30" height="40" viewBox="0 0 30 40">
                <polygon points="15,5 25,40 5,40" fill="#3b82f6" opacity="0.3" />
                <polygon points="15,15 20,40 10,40" fill="#93c5fd" opacity="0.4" />
              </svg>
            </div>
          ))}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, rgba(96,165,250,0.05) 0%, transparent 70%)" }} />
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

        {/* Beast */}
        <div className="relative z-10 w-full md:w-1/3 flex justify-center">
          <IceWitch lives={beastLives} isHit={beastHit} isDead={beastDead} isDying={beastDying} />
        </div>
      </div>

      {/* Options */}
      <div className="w-full grid grid-cols-1 gap-3 relative z-30">
        {q.options.map((opt, i) => {
          const c = optionColors(i);
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={selected !== null || isSparkyControlled}
              className="w-full px-5 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 hover:scale-[1.01] disabled:cursor-not-allowed flex items-center justify-between"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontFamily: "'Crimson Text', serif", fontSize: "1rem" }}
            >
              <div>
                <span className="mr-3 text-xs opacity-60 font-sans">{String.fromCharCode(65 + i)})</span>
                {opt}
              </div>
              <div>
                {selected !== null && i === q.correct && <span className="font-sans">✓</span>}
                {selected === i && i !== q.correct && <span className="font-sans">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && isCorrect && (
        <button
          onClick={next}
          className="px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 mt-2"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
            color: "#0a0118",
            fontFamily: "'Cinzel', serif",
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        >
          {isLast ? "⚡ Finish" : "⚡ Next →"}
        </button>
      )}
    </div>
  );
}
