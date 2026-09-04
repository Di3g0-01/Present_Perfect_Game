import { useState, useEffect } from "react";
import { LEVEL1_SENTENCES } from "../data";
import { motion, AnimatePresence } from 'framer-motion';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const NOOP = () => {};

import MagoCanvas from "../MagoCanvas";

// ── Forest Beast SVG ─────────────────────────────────────────
function ForestBeast({
  lives,
  isHit,
  isDead,
  isDying,
}) {
  const hitColor = isHit ? "#ff4444" : "none";

  return (
    <div className="relative flex flex-col items-center">
      {/* Lives hearts */}
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              fontSize: "1.5rem",
              filter: i <= lives ? "drop-shadow(0 0 8px #ef4444)" : "grayscale(1) opacity(0.3)",
              transform: isHit && i === lives ? "scale(1.5)" : "scale(1)",
              transition: "all 0.3s ease",
              lineHeight: 1,
            }}
          >
            {i <= lives ? "❤️" : "🖤"}
          </div>
        ))}
      </div>

      {/* Beast SVG */}
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

          {/* Body / trunk */}
          <path d="M42 130 Q38 145 35 180 L55 180 Q58 160 60 148 Q70 155 80 155 Q90 155 100 148 Q102 160 105 180 L125 180 Q122 145 118 130 Z" fill="#2d5a20" />
          <path d="M42 130 Q38 145 35 180 L55 180 Q58 160 60 148 Q70 155 80 155 Q90 155 100 148 Q102 160 105 180 L125 180 Q122 145 118 130 Z" fill="url(#scalePattern)" opacity="0.4" />

          {/* Belt / waist */}
          <rect x="48" y="128" width="64" height="10" rx="4" fill="#5c3a1a" />
          <rect x="72" y="126" width="16" height="14" rx="3" fill="#8b6914" />
          <circle cx="80" cy="133" r="4" fill="#c8a020" />

          {/* Chest */}
          <ellipse cx="80" cy="108" rx="36" ry="32" fill="#3d7a2a" />
          <ellipse cx="80" cy="105" rx="28" ry="24" fill="#4a9035" />
          {/* Chest scars */}
          <path d="M68 98 L74 112" stroke="#2d5a20" strokeWidth="2" opacity="0.7" />
          <path d="M86 95 L90 108" stroke="#2d5a20" strokeWidth="1.5" opacity="0.6" />

          {/* Left arm */}
          <path d="M44 100 Q22 112 18 138" stroke="#3d7a2a" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M44 100 Q22 112 18 138" stroke="#4a9035" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Left claws */}
          <path d="M18 138 L10 148 M18 138 L16 152 M18 138 L24 150" stroke="#c8c8c8" strokeWidth="3" strokeLinecap="round" />

          {/* Right arm (holding club) */}
          <path d="M116 100 Q138 112 142 130" stroke="#3d7a2a" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M116 100 Q138 112 142 130" stroke="#4a9035" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Club */}
          <rect x="138" y="118" width="10" height="40" rx="5" fill="#6b3a12" transform="rotate(20 143 138)" />
          <ellipse cx="148" cy="115" rx="12" ry="14" fill="#8b5a20" transform="rotate(20 148 115)" />
          {/* Club spikes */}
          <path d="M142 105 L138 97" stroke="#c8a020" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M150 106 L153 97" stroke="#c8a020" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M155 114 L163 112" stroke="#c8a020" strokeWidth="2.5" strokeLinecap="round" />

          {/* Neck */}
          <rect x="68" y="78" width="24" height="18" rx="8" fill="#3d7a2a" />

          {/* Head */}
          <ellipse cx="80" cy="62" rx="34" ry="30" fill="#3d7a2a" />
          <ellipse cx="80" cy="60" rx="28" ry="25" fill="#4a9035" />

          {/* Ears / horns */}
          <path d="M46 48 Q38 28 50 20 Q56 40 58 50 Z" fill="#2d5a20" />
          <path d="M114 48 Q122 28 110 20 Q104 40 102 50 Z" fill="#2d5a20" />
          <path d="M50 44 Q44 30 52 24 Q56 38 56 46 Z" fill="#5a8a40" opacity="0.6" />
          <path d="M110 44 Q116 30 108 24 Q104 38 104 46 Z" fill="#5a8a40" opacity="0.6" />

          {/* Eyes */}
          <ellipse cx="66" cy="56" rx="9" ry="10" fill="#ff6b00" />
          <ellipse cx="94" cy="56" rx="9" ry="10" fill="#ff6b00" />
          <ellipse cx="66" cy="56" rx="6" ry="7" fill="#ffaa00" />
          <ellipse cx="94" cy="56" rx="6" ry="7" fill="#ffaa00" />
          <circle cx="66" cy="57" r="4" fill="#1a0800" />
          <circle cx="94" cy="57" r="4" fill="#1a0800" />
          <circle cx="64.5" cy="55.5" r="1.5" fill="white" />
          <circle cx="92.5" cy="55.5" r="1.5" fill="white" />
          {/* Angry brows (more angled when fewer lives) */}
          <path
            d={lives <= 2 ? "M56 45 Q66 40 72 44" : "M58 47 Q66 43 72 46"}
            stroke="#1a3a10"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={lives <= 2 ? "M88 44 Q94 40 104 45" : "M88 46 Q94 43 102 47"}
            stroke="#1a3a10"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Nose */}
          <ellipse cx="80" cy="66" rx="6" ry="4" fill="#2d5a20" />
          <circle cx="77" cy="66" r="2" fill="#1a3a10" />
          <circle cx="83" cy="66" r="2" fill="#1a3a10" />

          {/* Mouth / tusks */}
          <path d="M66 76 Q80 84 94 76" stroke="#1a3a10" strokeWidth="2" fill="none" />
          <path d="M70 76 L67 86" stroke="#e8e8d0" strokeWidth="4" strokeLinecap="round" />
          <path d="M90 76 L93 86" stroke="#e8e8d0" strokeWidth="4" strokeLinecap="round" />

          {/* Moss / fur details */}
          <path d="M58 88 Q52 82 56 76" stroke="#5a8a40" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M102 88 Q108 82 104 76" stroke="#5a8a40" strokeWidth="2" fill="none" opacity="0.7" />

          {/* Hit effect stars */}
          {isHit && (
            <g style={{ animation: "spin 0.4s linear" }}>
              {["*", "*", "*"].map((_, i) => (
                <text key={i} x={50 + i * 30} y={20} fontSize="16" textAnchor="middle" style={{ animation: `floatStar 0.4s ease ${i * 0.1}s` }}>
                  *
                </text>
              ))}
            </g>
          )}

          {/* Death X eyes */}
          {isDying && (
            <>
              <line x1="60" y1="50" x2="72" y2="62" stroke="white" strokeWidth="3" />
              <line x1="72" y1="50" x2="60" y2="62" stroke="white" strokeWidth="3" />
              <line x1="88" y1="50" x2="100" y2="62" stroke="white" strokeWidth="3" />
              <line x1="100" y1="50" x2="88" y2="62" stroke="white" strokeWidth="3" />
            </>
          )}

          <defs>
            <pattern id="scalePattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="5" fill="none" stroke="#2d5a20" strokeWidth="1" />
            </pattern>
          </defs>
        </svg>
      </div>

      {/* Beast name */}
      <div className="mt-2 text-center">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4ade80", fontFamily: "'Cinzel', serif" }}>
          {isDying ? "Defeated!" : lives <= 1 ? "! Enraged!" : "Goblin Shaman"}
        </p>
        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Crimson Text', serif" }}>
          {isDying ? "The forest is free..." : "Lord of the Mushrooms"}
        </p>
      </div>
    </div>
  );
}

const Level1 = ({ 
  accentColor, 
  glowColor, 
  onComplete,
  onMistake
}) => {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [pool, setPool] = useState([]);
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [built, setBuilt] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(false);
  const [feedback, setFeedback] = useState("idle");

  // Beast state
  const [beastLives, setBeastLives] = useState(4);
  const [beastHit, setBeastHit] = useState(false);
  const [beastDying, setBeastDying] = useState(false);
  const [beastDead, setBeastDead] = useState(false);

  const [magoAnim, setMagoAnim] = useState("walk");
  const [sparkyMessage, setSparkyMessage] = useState('');
  const [isSparkyControlled, setIsSparkyControlled] = useState(false);

  const sentence = LEVEL1_SENTENCES[sentenceIdx];
  const isLast = sentenceIdx === LEVEL1_SENTENCES.length - 1;

  useEffect(() => {
    setPool(shuffle(sentence.words));
    setBuilt([]);
    setSelectedSequence([]);
    setFeedback("idle");
    setMagoAnim("walk");
    setSparkyMessage("Select the words in order to build the sentence!");
  }, [sentenceIdx]);

  const toggleWord = (idx) => {
    if (isAnimating || feedback !== "idle") return;
    setSelectedSequence(seq => {
      if (seq.includes(idx)) {
        return seq.filter(i => i !== idx);
      } else {
        return [...seq, idx];
      }
    });
  };

  const removeBuiltWord = (idx) => {
    // If we wanted to allow removing from the built array directly, but since we build it during animation,
    // we probably shouldn't let them interact with the built array.
  };

  const checkAnswer = async () => {
    setIsAnimating(true);
    setIsSparkyControlled(true);

    let currentBuilt = [];
    
    // First, clear any built words just in case
    setBuilt([]);

    for (let i = 0; i < selectedSequence.length; i++) {
      const poolIdx = selectedSequence[i];
      const word = pool[poolIdx];
      const wordEl = document.querySelector(`[data-pool-word="${poolIdx}"]`);
      if (wordEl) {
        setMagoAnim('walk'); // Simulate moving
        await sleep(600);
        setMagoAnim('grab');
        await sleep(300);
        
        currentBuilt = [...currentBuilt, word];
        setBuilt(currentBuilt);
        
        setMagoAnim('walk');
      }
    }
    
    await sleep(600);

    const answer = currentBuilt.join(" ");
    const correct = sentence.words.join(" ");

    if (answer === correct) {
      setFeedback("correct");
      setMagoAnim('walk');
      setSparkyMessage("Perfect! You've mastered it!");
      
      // Hit the beast
      const newLives = beastLives - 1;
      setBeastHit(true);
      await sleep(400);
      setBeastHit(false);
      
      // Let the player clearly see "Correct!" before advancing
      await sleep(1800);

      if (newLives <= 0) {
        setBeastLives(0);
        await sleep(600);
        setBeastDying(true);
        await sleep(1400);
        setBeastDead(true);
        setIsSparkyControlled(false);
        setIsAnimating(false);
        
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        onComplete(stars);
      } else {
        setBeastLives(newLives);
        setFeedback("idle");
        setSparkyMessage("");
        setIsSparkyControlled(false);
        setIsAnimating(false);
        setSentenceIdx(i => i + 1);
      }
    } else {
      setFeedback("wrong");
      setMistakes(m => m + 1);
      if (onMistake) onMistake();
      setMagoAnim('release');
      setSparkyMessage("Not quite... try again!");
      setShake(true);
      
      // Let the player clearly see "Incorrect!" before resetting
      await sleep(2000);
      
      setShake(false);
      setFeedback("idle");
      setMagoAnim('walk');
      setSparkyMessage("Select the words in order to build the sentence!");
      setIsSparkyControlled(false);
      setIsAnimating(false);
      
      setPool(shuffle(sentence.words));
      setBuilt([]);
      setSelectedSequence([]);
    }
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
        @keyframes floatStar {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-20px) scale(0.5); opacity: 0; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="flex items-center justify-between w-full">
        <div className="text-xs tracking-widest uppercase font-bold" style={{ color: accentColor }}>
          Sentence {sentenceIdx + 1} of {LEVEL1_SENTENCES.length}
        </div>
        <div className="flex gap-1">
          {LEVEL1_SENTENCES.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i < sentenceIdx ? accentColor : i === sentenceIdx ? accentColor : "rgba(255,255,255,0.15)", opacity: i <= sentenceIdx ? 1 : 0.4 }} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg font-bold mb-1 text-gray-50">
          Arrange the sentence — deal a blow!
        </p>
        <p className="text-xs italic text-gray-400">
          {sentence.hint}
        </p>
      </div>

      {/* Battle arena */}
      <div
        className="w-full rounded-2xl p-4 flex flex-col md:flex-row items-end justify-between gap-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f2d1a 0%, #1a4a2e 100%)",
          border: `1px solid ${accentColor}33`,
          minHeight: "260px",
        }}
      >
        {/* Forest background details */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[12, 75, 88].map((x, i) => (
            <div key={i} className="absolute bottom-0" style={{ left: `${x}%` }}>
              <svg width="28" height="48" viewBox="0 0 28 48">
                <polygon points="14,2 26,28 2,28" fill="#1a4a2e" opacity="0.8" />
                <polygon points="14,10 24,36 4,36" fill="#2d5a27" opacity="0.7" />
                <rect x="11" y="36" width="6" height="12" fill="#5c3317" opacity="0.5" />
              </svg>
            </div>
          ))}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, rgba(74,222,128,0.05) 0%, transparent 70%)" }} />
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
                  className="absolute left-[80%] top-1/4 max-w-[150px] p-2 text-xs rounded-xl border border-white/20 shadow-xl z-50 text-center"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#f8fafc',
                  }}
                >
                  {sparkyMessage}
                  {/* Arrow pointing left to the mago */}
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
          <ForestBeast lives={beastLives} isHit={beastHit} isDead={beastDead} isDying={beastDying} />
        </div>
      </div>

      <div
        className="w-full min-h-[4rem] rounded-xl border-2 flex flex-wrap gap-2 p-4 transition-all duration-300"
        style={{
          borderColor: feedback === "correct" ? "#4ade80" : feedback === "wrong" ? "#ef4444" : `${accentColor}44`,
          background: "rgba(255,255,255,0.04)",
          transform: shake ? "translateX(5px)" : "none",
        }}
      >
        {built.length === 0 && (
          <span className="text-sm text-gray-500 italic">
            Wizard will build the sentence here...
          </span>
        )}
        <AnimatePresence>
          {built.map((word, i) => (
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key={`built-${word}-${i}`}
              className="px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-150"
              style={{
                background: feedback === "correct" ? "rgba(74,222,128,0.2)" : feedback === "wrong" ? "rgba(239,68,68,0.2)" : `${accentColor}22`,
                border: `1px solid ${feedback === "correct" ? "#4ade8066" : feedback === "wrong" ? "#ef444466" : `${accentColor}44`}`,
                color: feedback === "correct" ? "#4ade80" : feedback === "wrong" ? "#ef4444" : accentColor,
              }}
            >
              {word}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full flex flex-wrap gap-2 justify-center min-h-[3rem]">
        <AnimatePresence>
          {pool.map((word, i) => {
            const seqIndex = selectedSequence.indexOf(i);
            const isSelected = seqIndex !== -1;
            const isPlaced = isSelected && seqIndex < built.length;
            
            if (isPlaced) return null;

            return (
            <motion.button
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key={`pool-${word}-${i}`}
              data-pool-word={i}
              onClick={() => toggleWord(i)}
              disabled={isAnimating || feedback !== "idle"}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 hover:scale-105 active:scale-95 relative"
              style={{
                background: isSelected ? `${accentColor}44` : "rgba(255,255,255,0.08)",
                border: `1px solid ${isSelected ? accentColor : "rgba(255,255,255,0.15)"}`,
                color: isSelected ? accentColor : "#e5e7eb",
                opacity: (isAnimating || feedback !== "idle") ? 0.5 : 1,
              }}
            >
              {isSelected && (
                <div 
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shadow-md"
                  style={{ backgroundColor: accentColor, color: '#fff' }}
                >
                  {seqIndex + 1}
                </div>
              )}
              {word}
            </motion.button>
          )})}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(feedback === "correct" || feedback === "wrong") && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              className="flex flex-col items-center gap-3 px-10 py-8 rounded-3xl shadow-2xl"
              style={{
                background: feedback === "correct"
                  ? "rgba(20, 60, 20, 0.97)"
                  : "rgba(60, 10, 10, 0.97)",
                border: `3px solid ${feedback === "correct" ? "#4ade80" : "#ef4444"}`,
                boxShadow: `0 0 60px ${feedback === "correct" ? "#4ade8066" : "#ef444466"}`,
              }}
            >
              <span className="text-6xl">{feedback === "correct" ? "✓" : "✗"}</span>
              <span
                className="text-2xl font-black tracking-wide"
                style={{
                  color: feedback === "correct" ? "#4ade80" : "#ef4444",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                {feedback === "correct" ? "Correct!" : "Incorrect!"}
              </span>
              <span className="text-sm text-gray-300">
                {feedback === "correct" ? "Well done! Moving on..." : "Try again..."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={checkAnswer}
        disabled={selectedSequence.length !== pool.length || isAnimating || feedback !== "idle"}
        className="px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
          color: "#0a0118",
          boxShadow: `0 0 20px ${glowColor}`,
        }}
      >
        {isAnimating ? 'Checking...' : 'Check Answer'}
      </button>
    </div>
  );
};

export default Level1;
