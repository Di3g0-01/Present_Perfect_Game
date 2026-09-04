// ============================================================
// MAGO 2D - Sprite Animator
// Uso: new MagoSprite(canvas, opciones)
// Animaciones: 'walk', 'grab', 'release'
// ============================================================

const MAGO_PALETTE = {
  robe:   '#5533aa',
  robeD:  '#3a1f7a',
  skin:   '#f0c080',
  skinD:  '#d4945a',
  hat:    '#2a1a5e',
  hatB:   '#7755cc',
  staff:  '#8b5e2a',
  staffG: '#44eeaa',
  staffR: '#ff6633',
  belt:   '#c0a020',
  beard:  '#e8e8e8',
  eye:    '#222222',
};

// Frames: { legL, legR, armL, armR, lean, staffX, staffY, glow }
export const MAGO_ANIMATIONS = {
  walk: [
    { legL:-1, legR: 0, armL: 1, armR:-1, lean: 0, staffX:12, staffY:6, glow:'#44eeaa' },
    { legL: 0, legR:-1, armL: 0, armR: 0, lean: 0, staffX:12, staffY:7, glow:'#44eeaa' },
    { legL: 1, legR: 0, armL:-1, armR: 1, lean: 0, staffX:12, staffY:6, glow:'#44eeaa' },
    { legL: 0, legR: 1, armL: 0, armR: 0, lean: 0, staffX:12, staffY:5, glow:'#44eeaa' },
  ],
  grab: [
    { legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, staffX:12, staffY:6, glow:'#44eeaa' },
    { legL: 0, legR: 0, armL: 0, armR:-2, lean: 1, staffX:13, staffY:4, glow:'#88ffcc' },
    { legL: 0, legR: 0, armL: 0, armR:-3, lean: 1, staffX:14, staffY:2, glow:'#ccffee' },
    { legL: 0, legR: 0, armL: 0, armR:-3, lean: 1, staffX:14, staffY:2, glow:'#ffffff' },
    { legL: 0, legR: 0, armL: 0, armR:-2, lean: 1, staffX:13, staffY:3, glow:'#66ddaa' },
    { legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, staffX:12, staffY:5, glow:'#44eeaa' },
  ],
  release: [
    { legL: 0, legR: 0, armL:-1, armR:-1, lean: 0, staffX:12, staffY:5, glow:'#ff6633' },
    { legL:-1, legR: 1, armL:-2, armR:-3, lean:-1, staffX:13, staffY:3, glow:'#ff9955' },
    { legL:-1, legR: 1, armL:-3, armR:-4, lean:-1, staffX:14, staffY:1, glow:'#ffcc66' },
    { legL: 0, legR: 0, armL:-2, armR:-3, lean:-1, staffX:13, staffY:2, glow:'#ffee88' },
    { legL: 0, legR: 0, armL:-1, armR:-1, lean: 0, staffX:12, staffY:4, glow:'#ff8844' },
    { legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, staffX:12, staffY:6, glow:'#ff6633' },
  ],
  die: [
    { legL: 0, legR: 0, armL:-1, armR:-1, lean: 0, staffX:12, staffY:6, glow:'#ff0000' },
    { legL:-1, legR: 1, armL:-2, armR:-2, lean: 1, staffX:14, staffY:8, glow:'#aa0000' },
    { legL:-2, legR: 2, armL:-3, armR:-3, lean: 2, staffX:16, staffY:12, glow:'#550000' },
    { legL:-3, legR: 3, armL:-4, armR:-4, lean: 3, staffX:18, staffY:16, glow:null },
  ],
};

// ── Dibuja un pixel ──────────────────────────────────────────
function _dot(ctx, x, y, color, size = 1) {
  if (!color) return;
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
}

// ── Dibuja una línea píxel a píxel ──────────────────────────
function _line(ctx, x1, y1, x2, y2, color) {
  const dx = x2 - x1, dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    _dot(ctx, Math.round(x1 + dx * t), Math.round(y1 + dy * t), color);
  }
}

// ── Dibuja un frame del mago ─────────────────────────────────
export function drawMagoFrame(ctx, frame, offsetX = 0, offsetY = 0) {
  const C = MAGO_PALETTE;
  const { legL, legR, armL, armR, lean, staffX, staffY, glow } = frame;
  const x = offsetX, y = offsetY;

  // Sombrero
  _dot(ctx, x+6,      y+0, C.hat,  4);
  _dot(ctx, x+5,      y+1, C.hat,  6);
  _dot(ctx, x+6,      y+2, C.hatB, 4);
  _dot(ctx, x+7,      y+3, C.hatB, 2);
  _dot(ctx, x+6+lean, y+4, C.hatB, 3);

  // Cabeza
  _dot(ctx, x+5+lean, y+5, C.skin, 6);
  _dot(ctx, x+5+lean, y+6, C.skin, 6);

  // Ojos
  _dot(ctx, x+6+lean, y+5, C.eye);
  _dot(ctx, x+9+lean, y+5, C.eye);

  // Barba
  _dot(ctx, x+5+lean, y+7, C.beard, 6);
  _dot(ctx, x+6+lean, y+8, C.beard, 4);

  // Cuerpo (túnica)
  _dot(ctx, x+4, y+9,  C.robe,  8);
  _dot(ctx, x+3, y+10, C.robe,  10);
  _dot(ctx, x+3, y+11, C.robe,  10);
  _dot(ctx, x+3, y+12, C.robeD, 10);

  // Cinturón
  _dot(ctx, x+4, y+12, C.belt, 8);

  // Falda
  _dot(ctx, x+2, y+13, C.robe, 12);
  _dot(ctx, x+2, y+14, C.robe, 12);

  // Piernas
  _dot(ctx, x+5+legL, y+15, C.robeD, 2);
  _dot(ctx, x+9+legR, y+15, C.robeD, 2);

  // Brazo izquierdo
  _dot(ctx, x+3, y+9+armL,  C.robe, 2);
  _dot(ctx, x+3, y+10+armL, C.skin, 2);

  // Brazo derecho
  _dot(ctx, x+11, y+9+armR,  C.robe, 2);
  _dot(ctx, x+11, y+10+armR, C.skin, 2);

  // Bastón
  const sx = x + staffX, sy = y + staffY;
  _line(ctx, sx, sy + 1, sx, sy + 8, C.staff);

  // Orbe brillante
  _dot(ctx, sx,   sy,   glow, 2);
  _dot(ctx, sx+1, sy-1, glow, 1);
}

// ============================================================
// CLASE PRINCIPAL
// ============================================================
export class MagoSprite {
  constructor(canvas, options = {}) {
    this.canvas    = canvas;
    this.ctx       = canvas.getContext('2d');
    this.animation = options.animation || 'walk';
    this.fps       = options.fps       || 10;
    this.scale     = options.scale     || 3;
    this.loop      = options.loop !== undefined ? options.loop : true;
    this.onEnd     = options.onEnd     || null;

    this.SPRITE_W  = 16;
    this.SPRITE_H  = 24;

    this._frameIdx  = 0;
    this._interval  = null;
    this._running   = false;

    // Ajustar tamaño del canvas al sprite escalado
    this.canvas.width  = this.SPRITE_W * this.scale;
    this.canvas.height = this.SPRITE_H * this.scale;
    this.ctx.imageSmoothingEnabled = false;

    this.play();
  }

  // ── Cambiar animación ──────────────────────────────────────
  setAnimation(name) {
    if (!MAGO_ANIMATIONS[name]) {
      console.warn(`[MagoSprite] Animación desconocida: "${name}". Usa: walk, grab, release`);
      return;
    }
    if (this.animation === name) return;
    this.animation = name;
    this._frameIdx = 0;
    if (this._running) { this.stop(); this.play(); }
  }

  // ── Iniciar reproducción ───────────────────────────────────
  play() {
    if (this._running) return;
    this._running = true;
    this._render();
    this._interval = setInterval(() => {
      const frames = MAGO_ANIMATIONS[this.animation];
      this._frameIdx++;
      if (this._frameIdx >= frames.length) {
        if (this.loop) {
          this._frameIdx = 0;
        } else {
          this._frameIdx = frames.length - 1;
          this.stop();
          if (typeof this.onEnd === 'function') this.onEnd();
          return;
        }
      }
      this._render();
    }, 1000 / this.fps);
  }

  // ── Pausar ─────────────────────────────────────────────────
  stop() {
    clearInterval(this._interval);
    this._running = false;
  }

  // ── Ir a un frame específico ───────────────────────────────
  gotoFrame(index) {
    const frames = MAGO_ANIMATIONS[this.animation];
    this._frameIdx = Math.max(0, Math.min(index, frames.length - 1));
    this._render();
  }

  // ── Obtener frame actual ───────────────────────────────────
  get currentFrame() { return this._frameIdx; }
  get totalFrames()  { return MAGO_ANIMATIONS[this.animation].length; }

  // ── Renderizar ─────────────────────────────────────────────
  _render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);
    const frame = MAGO_ANIMATIONS[this.animation][this._frameIdx];
    drawMagoFrame(this.ctx, frame, 0, 0);
    this.ctx.restore();
  }
}
