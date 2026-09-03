import { useState, useEffect } from "react";
import { LEVEL4_PAIRS } from "../data";
import { motion, AnimatePresence } from 'framer-motion';
import MagoCanvas from "../MagoCanvas";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Morthadeus the Dark Sorcerer ─────────────────────────────
function DarkSorcerer({
  lives,
  isHit,
  isDying,
  isDead,
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Lives */}
      <div className="flex gap-1.5 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              fontSize: "1.2rem",
              filter: i <= lives ? "drop-shadow(0 0 6px #a855f7)" : "grayscale(1) opacity(0.2)",
              transform: isHit && i === lives ? "scale(1.5)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          >
            {i <= lives ? "💜" : "🩶"}
          </div>
        ))}
      </div>

      <div
        style={{
          animation: isDying
            ? "villainDie 1.4s ease-in forwards"
            : isHit
            ? "villainHit 0.35s ease"
            : lives <= 1
            ? "sorcererRage 0.6s ease-in-out infinite"
            : "sorcererFloat 3.5s ease-in-out infinite",
          transformOrigin: "bottom center",
          filter: isDead ? "grayscale(1) opacity(0)" : isHit ? "brightness(3) hue-rotate(60deg)" : "none",
        }}
      >
        <svg width="155" height="215" viewBox="0 0 155 215" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="77" cy="208" rx="44" ry="8" fill="rgba(60,0,100,0.5)" />

          {/* Robe / body */}
          <path d="M38 138 Q28 165 22 205 L55 205 Q58 178 62 160 Q70 170 77 170 Q84 170 93 160 Q97 178 100 205 L132 205 Q126 165 116 138 Z" fill="#1a0535" />
          {/* Robe shadow folds */}
          <path d="M50 145 Q44 170 40 200" stroke="#2e0060" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M104 145 Q110 170 114 200" stroke="#2e0060" strokeWidth="3" fill="none" opacity="0.6" />
          {/* Robe hem spikes */}
          {[26, 40, 55, 68, 80, 93, 106, 118].map((x, i) => (
            <polygon key={i} points={`${x},205 ${x + 5},205 ${x + 2.5},${212 + (i % 3) * 5}`} fill="#7c3aed" opacity="0.6" />
          ))}

          {/* Belt / sash */}
          <rect x="50" y="132" width="54" height="11" rx="5" fill="#2e0060" />
          <ellipse cx="77" cy="137" rx="10" ry="7" fill="#7c3aed" />
          <ellipse cx="77" cy="137" rx="6" ry="4" fill="#a855f7" />
          <circle cx="77" cy="137" r="2.5" fill="#e9d5ff" />

          {/* Body */}
          <ellipse cx="77" cy="112" rx="34" ry="30" fill="#1a0535" />
          <ellipse cx="77" cy="109" rx="26" ry="23" fill="#2e0060" />
          {/* Arcane runes on chest */}
          <text x="67" y="108" fontSize="10" fill="#7c3aed" opacity="0.8" fontFamily="serif">ᚠ</text>
          <text x="77" y="118" fontSize="9" fill="#a855f7" opacity="0.7" fontFamily="serif">᚜</text>
          <text x="58" y="118" fontSize="8" fill="#7c3aed" opacity="0.6" fontFamily="serif">ᚢ</text>

          {/* Left arm — shadow tendrils */}
          <path d="M44 108 Q22 122 16 148" stroke="#1a0535" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M44 108 Q22 122 16 148" stroke="#2e0060" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Tendril fingers */}
          <path d="M16 148 Q8 152 6 162" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M16 148 Q12 158 14 168" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M16 148 Q20 156 18 168" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Right arm — dark orb */}
          <path d="M110 108 Q132 118 136 140" stroke="#1a0535" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M110 108 Q132 118 136 140" stroke="#2e0060" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Dark orb */}
          <circle cx="138" cy="136" r="16" fill="#0d0120" />
          <circle cx="138" cy="136" r="12" fill="#1a0535" />
          <circle cx="138" cy="136" r="7" fill="#2e0060" style={{ animation: "orbPulse 1.5s ease-in-out infinite" }} />
          <circle cx="138" cy="136" r="4" fill="#7c3aed" />
          <circle cx="138" cy="136" r="2" fill="#e9d5ff" opacity="0.9" />
          {/* Orb orbit rings */}
          <ellipse cx="138" cy="136" rx="14" ry="5" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.4" style={{ animation: "orbRing 2s linear infinite" }} />
          <ellipse cx="138" cy="136" rx="5" ry="14" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3" style={{ animation: "orbRing 2s linear infinite reverse" }} />

          {/* Neck */}
          <rect x="65" y="84" width="24" height="18" rx="8" fill="#1a0535" />

          {/* Head */}
          <ellipse cx="77" cy="68" rx="30" ry="28" fill="#0d0120" />
          <ellipse cx="77" cy="65" rx="24" ry="22" fill="#1a0535" />

          {/* Crown of shadows */}
          {[55, 64, 77, 90, 99].map((x, i) => (
            <path key={i} d={`M${x} 42 L${x + 2} 30 L${x + 4} 42`} fill="#7c3aed" opacity={0.6 + (i === 2 ? 0.4 : 0)} />
          ))}
          <ellipse cx="77" cy="42" rx="24" ry="5" fill="#2e0060" />
          {/* Center crown gem */}
          <polygon points="77,26 82,36 72,36" fill="#a855f7" />
          <polygon points="77,28 81,36 73,36" fill="#e9d5ff" opacity="0.7" />

          {/* Hood / cowl shadow */}
          <path d="M47 55 Q50 42 77 38 Q104 42 107 55 Q100 48 77 46 Q54 48 47 55Z" fill="#0d0120" opacity="0.7" />

          {/* Eyes — glowing purple */}
          <ellipse cx="66" cy="63" rx="8" ry="9" fill="#2e0060" />
          <ellipse cx="88" cy="63" rx="8" ry="9" fill="#2e0060" />
          <ellipse cx="66" cy="63" rx="5" ry="6" fill="#7c3aed" />
          <ellipse cx="88" cy="63" rx="5" ry="6" fill="#7c3aed" />
          <circle cx="66" cy="64" r="3" fill="#0d0120" />
          <circle cx="88" cy="64" r="3" fill="#0d0120" />
          <circle cx="65" cy="63" r="1.2" fill="#e9d5ff" />
          <circle cx="87" cy="63" r="1.2" fill="#e9d5ff" />
          {/* Eye glow auras */}
          <circle cx="66" cy="63" r="10" fill="#7c3aed" opacity="0.12" style={{ animation: "eyeGlow 1.2s ease-in-out infinite" }} />
          <circle cx="88" cy="63" r="10" fill="#7c3aed" opacity="0.12" style={{ animation: "eyeGlow 1.2s ease-in-out infinite 0.6s" }} />

          {/* Brows */}
          <path d={lives <= 2 ? "M56 53 Q66 47 70 52" : "M57 55 Q66 50 70 54"} stroke="#0d0120" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d={lives <= 2 ? "M84 52 Q88 47 98 53" : "M84 54 Q88 50 97 55"} stroke="#0d0120" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Nose — barely visible */}
          <path d="M77 70 L74 76 L80 76" stroke="#2e0060" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Mouth — sinister grin */}
          <path d={lives <= 2 ? "M64 80 Q77 88 90 80" : "M66 80 Q77 85 88 80"} stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Shadow tendrils background (ambient) */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${30 + i * 45} 200 Q${20 + i * 48} ${170 - i * 10} ${35 + i * 40} 155`}
              stroke="#7c3aed"
              strokeWidth={1.5 - i * 0.3}
              fill="none"
              opacity={0.2 + i * 0.1}
              style={{ animation: `tendrilWave ${1.5 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` }}
            />
          ))}

          {/* Rage effect */}
          {lives === 1 && (
            <>
              <circle cx="77" cy="68" r="35" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.3" style={{ animation: "ragePulse 0.5s ease-in-out infinite" }} />
              <circle cx="77" cy="68" r="44" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.15" style={{ animation: "ragePulse 0.5s ease-in-out infinite 0.25s" }} />
            </>
          )}

          {/* Death X eyes */}
          {isDying && (
            <>
              <line x1="59" y1="56" x2="73" y2="70" stroke="#e9d5ff" strokeWidth="3" />
              <line x1="73" y1="56" x2="59" y2="70" stroke="#e9d5ff" strokeWidth="3" />
              <line x1="81" y1="56" x2="95" y2="70" stroke="#e9d5ff" strokeWidth="3" />
              <line x1="95" y1="56" x2="81" y2="70" stroke="#e9d5ff" strokeWidth="3" />
            </>
          )}

          {/* Hit particles */}
          {isHit && (
            <>
              <text x="18" y="55" fontSize="15" style={{ animation: "floatStar 0.4s ease" }}>💜</text>
              <text x="112" y="48" fontSize="15" style={{ animation: "floatStar 0.4s ease 0.1s" }}>✨</text>
              <text x="66" y="16" fontSize="13" style={{ animation: "floatStar 0.4s ease 0.05s" }}>💫</text>
            </>
          )}
        </svg>
      </div>

      <div className="mt-1 text-center">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#c084fc", fontFamily: "'Cinzel', serif" }}>
          {isDying ? "Defeated!" : lives === 1 ? "⚠ His power surges!" : "Morthadeus"}
        </p>
        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Crimson Text', serif" }}>
          {isDying ? "Darkness retreats..." : "Supreme Lord of Shadows"}
        </p>
      </div>
    </div>
  );
}

export default function Level4({ accentColor, glowColor, onComplete }) {
  const [shuffledPairs, setShuffledPairs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wordMistakes, setWordMistakes] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  
  const [magoAnim, setMagoAnim] = useState("walk");
  const [sparkyMessage, setSparkyMessage] = useState("");
  const [isSparkyControlled, setIsSparkyControlled] = useState(false);
  const [done, setDone] = useState(false);

  // 5 lives, 10 pairs → 1 life per 2 correct matches (we will calculate dynamically)
  const [beastLives, setBeastLives] = useState(5);
  const [beastHit, setBeastHit] = useState(false);
  const [beastDying, setBeastDying] = useState(false);
  const [beastDead, setBeastDead] = useState(false);

  useEffect(() => {
    setShuffledPairs(shuffle(LEVEL4_PAIRS));
  }, []);

  const currentPair = shuffledPairs[currentIndex];
  const maxMistakes = 6;

  // Hangman Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (done || isSparkyControlled || !currentPair) return;
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        guessLetter(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guessedLetters, isSparkyControlled, done, currentPair]);

  async function guessLetter(letter) {
    if (guessedLetters.has(letter) || isSparkyControlled || done || !currentPair) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    const wordUpper = currentPair.word.toUpperCase();
    
    if (!wordUpper.includes(letter)) {
      // Wrong guess
      const newMistakes = wordMistakes + 1;
      setWordMistakes(newMistakes);
      setTotalMistakes(m => m + 1);
      
      setMagoAnim("release");
      setSparkyMessage("Wrong!");
      setIsSparkyControlled(true);
      await sleep(800);
      setMagoAnim("walk");
      setSparkyMessage("");
      
      if (newMistakes >= maxMistakes) {
        // Failed the word
        await handleWordComplete(false, newGuessed);
      } else {
        setIsSparkyControlled(false);
      }
    } else {
      // Correct guess
      setMagoAnim("grab");
      setSparkyMessage("Good!");
      setIsSparkyControlled(true);
      await sleep(500);
      setMagoAnim("walk");
      setSparkyMessage("");
      
      // Check if word is complete
      const isComplete = Array.from(wordUpper).every(char => 
        !/^[A-Z]$/.test(char) || newGuessed.has(char)
      );
      
      if (isComplete) {
        await handleWordComplete(true, newGuessed);
      } else {
        setIsSparkyControlled(false);
      }
    }
  }

  async function handleWordComplete(success, finalGuessed) {
    setIsSparkyControlled(true);
    setMagoAnim(success ? "grab" : "release");
    setSparkyMessage(success ? "Word Complete!" : "Word Failed!");
    
    await sleep(1500);
    
    // Boss damage logic
    const pairsCompleted = currentIndex + 1;
    const matchesPerLife = Math.ceil(shuffledPairs.length / 5);
    
    if (pairsCompleted % matchesPerLife === 0 || pairsCompleted === shuffledPairs.length) {
      const newLives = pairsCompleted === shuffledPairs.length ? 0 : beastLives - 1;
      setBeastHit(true);
      await sleep(400);
      setBeastHit(false);

      if (newLives <= 0) {
        setBeastLives(0);
        await sleep(600);
        setBeastDying(true);
      } else {
        setBeastLives(newLives);
      }
    }
    
    if (pairsCompleted === shuffledPairs.length) {
      setTimeout(() => {
        setBeastDead(true);
        setDone(true);
        // Star calculation: adjust based on total mistakes across all words
        // 17 words * 6 max mistakes = 102 possible mistakes.
        // Let's say 0-5 mistakes = 3 stars, 6-15 = 2 stars, >15 = 1 star
        const stars = totalMistakes <= 5 ? 3 : totalMistakes <= 15 ? 2 : 1;
        onComplete(stars);
      }, beastDying ? 1600 : 900);
    } else {
      // Next word
      setCurrentIndex(currentIndex + 1);
      setGuessedLetters(new Set());
      setWordMistakes(0);
      setMagoAnim("walk");
      setSparkyMessage("");
      setIsSparkyControlled(false);
    }
  }

  const renderWord = () => {
    if (!currentPair) return null;
    const wordUpper = currentPair.word.toUpperCase();
    return (
      <div className="flex flex-wrap justify-center gap-2 my-4">
        {Array.from(wordUpper).map((char, idx) => {
          const isLetter = /^[A-Z]$/.test(char);
          const isRevealed = !isLetter || guessedLetters.has(char) || wordMistakes >= maxMistakes;
          const isFailedReveal = isLetter && !guessedLetters.has(char) && wordMistakes >= maxMistakes;
          
          if (char === " ") {
            return <div key={idx} className="w-4"></div>;
          }

          return (
            <div 
              key={idx} 
              className={`flex items-center justify-center w-8 h-10 md:w-10 md:h-12 text-xl md:text-2xl font-bold rounded shadow border border-purple-500/30 ${
                isRevealed ? "bg-purple-900/50 text-purple-100" : "bg-purple-900/10"
              }`}
              style={{
                fontFamily: "'Cinzel', serif",
                textShadow: isFailedReveal ? "0 0 10px red" : "none",
                color: isFailedReveal ? "#ef4444" : "#e9d5ff",
                borderBottomWidth: "3px" // to look like a placeholder
              }}
            >
              {isRevealed ? char : ""}
            </div>
          );
        })}
      </div>
    );
  };

  const renderKeyboard = () => {
    const rows = [
      "QWERTYUIOP".split(""),
      "ASDFGHJKL".split(""),
      "ZXCVBNM".split("")
    ];
    return (
      <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto mt-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1 sm:gap-2">
            {row.map(key => {
              const isGuessed = guessedLetters.has(key);
              const isWrong = isGuessed && currentPair && !currentPair.word.toUpperCase().includes(key);
              const isCorrect = isGuessed && currentPair && currentPair.word.toUpperCase().includes(key);
              
              let bgClass = "bg-purple-900/30 hover:bg-purple-800/50 text-purple-100";
              if (isCorrect) bgClass = "bg-green-700/50 text-green-200 border-green-500/50";
              else if (isWrong) bgClass = "bg-red-900/50 text-red-200 border-red-500/50 opacity-50";

              return (
                <button
                  key={key}
                  onClick={() => guessLetter(key)}
                  disabled={isGuessed || isSparkyControlled || done}
                  className={`w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center font-bold text-lg rounded border border-purple-500/20 transition-all ${bgClass} disabled:cursor-not-allowed`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full mx-auto px-2">
      <style>{`
        @keyframes sorcererFloat { 0%,100%{transform:translateY(0) rotate(0.5deg)} 50%{transform:translateY(-9px) rotate(-0.5deg)} }
        @keyframes villainHit { 0%{transform:translateX(0) scale(1)} 25%{transform:translateX(-14px) scale(1.1)} 50%{transform:translateX(14px) scale(0.95)} 75%{transform:translateX(-8px)} 100%{transform:translateX(0) scale(1)} }
        @keyframes sorcererRage { 0%,100%{transform:scale(1.02) rotate(-1deg)} 50%{transform:scale(1.05) rotate(1deg)} }
        @keyframes villainDie { 0%{transform:rotate(0) scale(1);opacity:1} 25%{transform:rotate(-18deg) scale(1.08)} 50%{transform:rotate(25deg) translateY(18px) scale(0.75);opacity:0.7} 80%{transform:translateY(52px) scale(0.25);opacity:0.15} 100%{transform:translateY(70px) scale(0);opacity:0} }
        @keyframes floatStar { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-26px) scale(0.3);opacity:0} }
        @keyframes eyeGlow { 0%,100%{opacity:0.1} 50%{opacity:0.3} }
        @keyframes orbPulse { 0%,100%{r:7;opacity:0.9} 50%{r:9;opacity:1} }
        @keyframes orbRing { to{transform:rotate(360deg)} }
        @keyframes tendrilWave { 0%,100%{d:path("M30 200 Q20 170 35 155")} 50%{d:path("M30 200 Q25 168 40 152")} }
        @keyframes ragePulse { 0%,100%{opacity:0.15} 50%{opacity:0.4} }
      `}</style>

      {/* Progress */}
      <div className="w-full max-w-3xl flex justify-between items-center px-4 mb-2">
        <div className="text-xs tracking-widest uppercase" style={{ color: accentColor, fontFamily: "'Cinzel', serif" }}>
          Guess the vocabulary
        </div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cinzel', serif" }}>
          Word {currentIndex + 1} / {shuffledPairs.length || 0}
        </div>
      </div>

      {/* Battle arena */}
      <div
        className="w-full max-w-3xl mx-auto rounded-2xl p-2 flex items-end justify-between gap-4 relative overflow-hidden mt-0"
        style={{
          background: "linear-gradient(160deg, #1a0a2e 0%, #2d0d4e 100%)",
          border: `1px solid ${accentColor}33`,
          minHeight: "140px",
        }}
      >
        {/* Dark tower background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />
          {[10, 50, 85].map((x, i) => (
            <div key={i} className="absolute" style={{ left: `${x}%`, top: "10%" }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <polygon points="7,0 8.5,5 14,5 9.5,8 11,14 7,10.5 3,14 4.5,8 0,5 5.5,5" fill="#7c3aed" opacity="0.3" />
              </svg>
            </div>
          ))}
        </div>

        {/* Wizard (player) */}
        <div className="flex flex-col items-center gap-1 relative z-10 w-full md:w-1/3 pt-2">
          <div className="text-xs tracking-widest uppercase mb-1" style={{ color: accentColor, fontFamily: "'Cinzel', serif" }}>You</div>
          <div className="flex justify-center h-32 w-full relative pointer-events-none mt-2">
            <MagoCanvas animation={magoAnim} scale={4.5} fps={10} />
            
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
        <div className="hidden md:flex flex-col items-center gap-1 relative z-10 mb-2 w-1/3">
          <div className="text-2xl font-black" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Cinzel Decorative', serif" }}>VS</div>
        </div>

        {/* Dark Sorcerer */}
        <div className="relative z-10 w-full md:w-1/3 flex justify-center" style={{ transform: "scale(0.75)", transformOrigin: "bottom center" }}>
          <DarkSorcerer lives={beastLives} isHit={beastHit} isDying={beastDying} isDead={beastDead} />
        </div>
      </div>

      {/* Hangman Area */}
      {currentPair && (
        <div className="w-full max-w-4xl mx-auto mt-2 px-4 py-3 bg-purple-900/10 rounded-2xl border border-purple-500/20">
          
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Cinzel', serif" }}>
              Mistakes: <span className={wordMistakes >= maxMistakes ? "text-red-400 font-bold" : "text-white"}>{wordMistakes} / {maxMistakes}</span>
            </div>
            
            {/* Hangman visual indicator - small dots for mistakes */}
            <div className="flex gap-1">
              {[...Array(maxMistakes)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full ${i < wordMistakes ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-gray-700/50'}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center p-2 bg-purple-950/40 rounded-xl border border-purple-500/10 min-h-[60px] flex items-center justify-center">
            <h3 className="text-lg md:text-xl font-medium" style={{ fontFamily: "'Crimson Text', serif", color: "#f3e8ff", lineHeight: "1.4" }}>
              "{currentPair.definition}"
            </h3>
          </div>
          
          {renderWord()}
          
          {renderKeyboard()}
        </div>
      )}

      {/* Progress bar (Overall) */}
      <div className="w-full max-w-3xl mt-3 bg-gray-800/40 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / Math.max(1, shuffledPairs.length)) * 100}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, boxShadow: `0 0 8px ${glowColor}` }}
        />
      </div>
    </div>
  );
}
