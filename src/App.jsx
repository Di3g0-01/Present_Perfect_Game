import { useState } from "react";
import { LEVELS } from "./data";
import LevelSelect from "./levels/LevelSelect";
import Level1 from "./levels/Level1";
import Level2 from "./levels/Level2";
import Level3 from "./levels/Level3";
import Level4 from "./levels/Level4";
import MagoCanvas from "./MagoCanvas";

function StarDisplay({ count }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <svg key={i} width="32" height="32" viewBox="0 0 24 24" fill={i <= count ? "#fbbf24" : "none"} stroke={i <= count ? "#fbbf24" : "#374151"} strokeWidth="1.5" style={{ filter: i <= count ? "drop-shadow(0 0 8px #fbbf24)" : "none" }}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("select");
  const [levelIdx, setLevelIdx] = useState(0);
  const [completedLevels, setCompletedLevels] = useState({});
  const [lastStars, setLastStars] = useState(0);
  const [wizardLives, setWizardLives] = useState(3);

  const level = LEVELS[levelIdx];

  function startLevel(idx) {
    setLevelIdx(idx);
    setWizardLives(3);
    setScreen("game");
  }

  function handleMistake() {
    setWizardLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setTimeout(() => setScreen("gameover"), 500);
      }
      return newLives;
    });
  }

  function retryLevel() {
    setWizardLives(3);
    setScreen("game");
  }

  function handleComplete(stars) {
    setLastStars(stars);
    setCompletedLevels((prev) => ({
      ...prev,
      [level.id]: Math.max(prev[level.id] ?? 0, stars),
    }));
    setScreen("results");
  }

  function goNext() {
    const nextIdx = levelIdx + 1;
    if (nextIdx < LEVELS.length) {
      setLevelIdx(nextIdx);
      setWizardLives(3);
      setScreen("game");
    } else {
      setScreen("select");
    }
  }

  // ── Game header ──────────────────────────────────────────────
  const GameHeader = () => (
    <div
      className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b"
      style={{
        background: `linear-gradient(to right, ${level.bgFrom}ee, ${level.bgTo}ee)`,
        borderColor: `${level.accentColor}33`,
        backdropFilter: "blur(8px)",
      }}
    >
      <button
        onClick={() => setScreen("select")}
        className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
        style={{ background: "rgba(255,255,255,.08)", color: "#9ca3af", border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Cinzel', serif" }}
      >
        ← Back
      </button>
      <div className="text-center">
        <div className="text-xs tracking-widest uppercase" style={{ color: level.accentColor, fontFamily: "'Cinzel', serif" }}>{level.subtitle}</div>
        <div className="text-sm font-bold flex justify-center gap-1 mt-1" style={{ color: "#f9fafb" }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ opacity: i < wizardLives ? 1 : 0.3, color: i < wizardLives ? "#ef4444" : "#9ca3af" }}>❤️</span>
          ))}
        </div>
      </div>
      <div className="text-xs px-3 py-1.5 rounded-lg" style={{ background: `${level.accentColor}22`, color: level.accentColor, border: `1px solid ${level.accentColor}44`, fontFamily: "'Cinzel', serif" }}>
        {level.difficulty}
      </div>
    </div>
  );

  // ── Results screen ───────────────────────────────────────────
  const ResultsScreen = () => (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8"
      style={{ background: `radial-gradient(ellipse at center, ${level.bgFrom} 0%, #000008 100%)` }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col items-center gap-6 border"
        style={{ background: "rgba(255,255,255,.04)", borderColor: `${level.accentColor}44`, boxShadow: `0 0 40px ${level.glowColor}` }}
      >
        <div className="text-5xl"></div>

        <div className="text-center">
          <h2 className="text-2xl font-black mb-1" style={{ color: "#f9fafb", fontFamily: "'Cinzel Decorative', serif" }}>
            {lastStars === 3 ? "Perfect!" : lastStars === 2 ? "Well Done!" : "You made it!"}
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,.5)", fontFamily: "'Crimson Text', serif" }}>
            {level.villain} has been defeated!
          </p>
        </div>

        <StarDisplay count={lastStars} />

        <div style={{ animation: "floatMago 2s ease-in-out infinite" }}>
          <MagoCanvas animation="grab" scale={6} fps={8} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          {levelIdx < LEVELS.length - 1 && (
            <button
              onClick={goNext}
              className="w-full py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${level.accentColor}, ${level.accentColor}88)`,
                color: "#0a0118",
                fontFamily: "'Cinzel', serif",
                boxShadow: `0 0 20px ${level.glowColor}`,
              }}
            >
              Next Level →
            </button>
          )}
          <button
            onClick={() => setScreen("select")}
            className="w-full py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(255,255,255,.08)", color: "#9ca3af", border: "1px solid rgba(255,255,255,.15)", fontFamily: "'Cinzel', serif" }}
          >
            ← Level Select
          </button>
        </div>
      </div>

      <style>{`@keyframes floatMago{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </div>
  );

  // ── Game Over Screen ─────────────────────────────────────────
  const GameOverScreen = () => (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8"
      style={{ background: `radial-gradient(ellipse at center, #3f0000 0%, #000000 100%)` }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col items-center gap-6 border"
        style={{ background: "rgba(255,255,255,.04)", borderColor: `#ef444444`, boxShadow: `0 0 40px #ef444488` }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-black mb-1" style={{ color: "#ef4444", fontFamily: "'Cinzel Decorative', serif" }}>
            You Perished!
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,.5)", fontFamily: "'Crimson Text', serif" }}>
            {level.villain} overpowered you.
          </p>
        </div>

        <div>
          <MagoCanvas animation="die" scale={6} fps={5} loop={false} />
        </div>

        <div className="flex flex-col gap-3 w-full mt-4">
          <button
            onClick={retryLevel}
            className="w-full py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, #ef4444, #7f1d1d)`,
              color: "#fff",
              fontFamily: "'Cinzel', serif",
              boxShadow: `0 0 20px #ef444488`,
            }}
          >
            Retry Level
          </button>
          <button
            onClick={() => setScreen("select")}
            className="w-full py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(255,255,255,.08)", color: "#9ca3af", border: "1px solid rgba(255,255,255,.15)", fontFamily: "'Cinzel', serif" }}
          >
            ← Level Select
          </button>
        </div>
      </div>
    </div>
  );

  // ── Game screen wrapper ──────────────────────────────────────
  const GameWrapper = () => (
    <div
      className="min-h-screen w-full"
      style={{ background: `radial-gradient(ellipse at top, ${level.bgFrom} 0%, #000008 60%)` }}
    >
      <GameHeader />
      <div className="px-4 py-2 flex flex-col items-center">
        <div className={`w-full ${levelIdx === 3 ? "max-w-[1800px]" : "max-w-3xl"}`}>
          <div className="mb-6 text-center">
            <h2 className="text-xl font-black mb-0.5" style={{ color: "#f9fafb", fontFamily: "'Cinzel', serif", textShadow: `0 0 20px ${level.glowColor}` }}>
              {level.name}
            </h2>
            <p className="text-xs italic" style={{ color: "rgba(255,255,255,.35)", fontFamily: "'Crimson Text', serif" }}>
              Defeat {level.villain} · {level.villainTitle}
            </p>
          </div>

          {levelIdx === 0 && <Level1 accentColor={level.accentColor} glowColor={level.glowColor} onComplete={handleComplete} onMistake={handleMistake} key={wizardLives} />}
          {levelIdx === 1 && <Level2 accentColor={level.accentColor} glowColor={level.glowColor} onComplete={handleComplete} onMistake={handleMistake} key={wizardLives} />}
          {levelIdx === 2 && <Level3 accentColor={level.accentColor} glowColor={level.glowColor} onComplete={handleComplete} onMistake={handleMistake} key={wizardLives} />}
          {levelIdx === 3 && <Level4 accentColor={level.accentColor} glowColor={level.glowColor} onComplete={handleComplete} onMistake={handleMistake} key={wizardLives} />}
        </div>
      </div>
    </div>
  );

  if (screen === "select") return <LevelSelect completedLevels={completedLevels} onSelectLevel={startLevel} />;
  if (screen === "results") return <ResultsScreen />;
  if (screen === "gameover") return <GameOverScreen />;
  return <GameWrapper />;
}
