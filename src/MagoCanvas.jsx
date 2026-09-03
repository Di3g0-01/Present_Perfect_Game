import { useEffect, useRef } from "react";

const P = {
  robe:   "#5533aa",
  robeD:  "#3a1f7a",
  skin:   "#f0c080",
  skinD:  "#d4945a",
  hat:    "#2a1a5e",
  hatB:   "#7755cc",
  staff:  "#8b5e2a",
  staffG: "#44eeaa",
  staffR: "#ff6633",
  belt:   "#c0a020",
  beard:  "#e8e8e8",
  eye:    "#222222",
};

const ANIMS = {
  walk: [
    { legL:-1, legR: 0, armL: 1, armR:-1, lean: 0, staffX:12, staffY:6, glow:"#44eeaa" },
    { legL: 0, legR:-1, armL: 0, armR: 0, lean: 0, staffX:12, staffY:7, glow:"#44eeaa" },
    { legL: 1, legR: 0, armL:-1, armR: 1, lean: 0, staffX:12, staffY:6, glow:"#44eeaa" },
    { legL: 0, legR: 1, armL: 0, armR: 0, lean: 0, staffX:12, staffY:5, glow:"#44eeaa" },
  ],
  grab: [
    { legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, staffX:12, staffY:6, glow:"#44eeaa" },
    { legL: 0, legR: 0, armL: 0, armR:-2, lean: 1, staffX:13, staffY:4, glow:"#88ffcc" },
    { legL: 0, legR: 0, armL: 0, armR:-3, lean: 1, staffX:14, staffY:2, glow:"#ccffee" },
    { legL: 0, legR: 0, armL: 0, armR:-3, lean: 1, staffX:14, staffY:2, glow:"#ffffff" },
    { legL: 0, legR: 0, armL: 0, armR:-2, lean: 1, staffX:13, staffY:3, glow:"#66ddaa" },
    { legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, staffX:12, staffY:5, glow:"#44eeaa" },
  ],
  release: [
    { legL: 0, legR: 0, armL:-1, armR:-1, lean: 0, staffX:12, staffY:5, glow:"#ff6633" },
    { legL:-1, legR: 1, armL:-2, armR:-3, lean:-1, staffX:13, staffY:3, glow:"#ff9955" },
    { legL:-1, legR: 1, armL:-3, armR:-4, lean:-1, staffX:14, staffY:1, glow:"#ffcc66" },
    { legL: 0, legR: 0, armL:-2, armR:-3, lean:-1, staffX:13, staffY:2, glow:"#ffee88" },
    { legL: 0, legR: 0, armL:-1, armR:-1, lean: 0, staffX:12, staffY:4, glow:"#ff8844" },
    { legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, staffX:12, staffY:6, glow:"#ff6633" },
  ],
};

function dot(ctx, x, y, color, size = 1) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
}

function line(ctx, x1, y1, x2, y2, color) {
  const dx = x2 - x1, dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    dot(ctx, Math.round(x1 + dx * t), Math.round(y1 + dy * t), color);
  }
}

function drawFrame(ctx, f, ox = 0, oy = 0) {
  const x = ox, y = oy;
  const { legL, legR, armL, armR, lean, staffX, staffY, glow } = f;

  dot(ctx, x+6,      y+0, P.hat,  4);
  dot(ctx, x+5,      y+1, P.hat,  6);
  dot(ctx, x+6,      y+2, P.hatB, 4);
  dot(ctx, x+7,      y+3, P.hatB, 2);
  dot(ctx, x+6+lean, y+4, P.hatB, 3);

  dot(ctx, x+5+lean, y+5, P.skin, 6);
  dot(ctx, x+5+lean, y+6, P.skin, 6);

  dot(ctx, x+6+lean, y+5, P.eye);
  dot(ctx, x+9+lean, y+5, P.eye);

  dot(ctx, x+5+lean, y+7, P.beard, 6);
  dot(ctx, x+6+lean, y+8, P.beard, 4);

  dot(ctx, x+4, y+9,  P.robe,  8);
  dot(ctx, x+3, y+10, P.robe,  10);
  dot(ctx, x+3, y+11, P.robe,  10);
  dot(ctx, x+3, y+12, P.robeD, 10);
  dot(ctx, x+4, y+12, P.belt,  8);
  dot(ctx, x+2, y+13, P.robe,  12);
  dot(ctx, x+2, y+14, P.robe,  12);

  dot(ctx, x+5+legL, y+15, P.robeD, 2);
  dot(ctx, x+9+legR, y+15, P.robeD, 2);

  dot(ctx, x+3, y+9+armL,  P.robe, 2);
  dot(ctx, x+3, y+10+armL, P.skin, 2);
  dot(ctx, x+11, y+9+armR,  P.robe, 2);
  dot(ctx, x+11, y+10+armR, P.skin, 2);

  const sx = x + staffX, sy = y + staffY;
  line(ctx, sx, sy + 1, sx, sy + 8, P.staff);
  dot(ctx, sx,   sy,   glow, 2);
  dot(ctx, sx+1, sy-1, glow, 1);
}

export default function MagoCanvas({ animation = "walk", scale = 5, fps = 10, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = 16 * scale;
    canvas.height = 24 * scale;
    ctx.imageSmoothingEnabled = false;

    let frameIdx = 0;
    let running = true;

    function render() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);
      drawFrame(ctx, ANIMS[animation][frameIdx], 0, 0);
      ctx.restore();
    }

    render();
    const id = setInterval(() => {
      frameIdx = (frameIdx + 1) % ANIMS[animation].length;
      render();
    }, 1000 / fps);

    return () => { running = false; clearInterval(id); };
  }, [animation, scale, fps]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
