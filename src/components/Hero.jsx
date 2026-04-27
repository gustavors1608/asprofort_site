import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle, ShieldCheck, Zap, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOJA_URL = 'https://loja.asprofort.com';

// ---------------------------------------------------------------------------
// Corneta rotation angle (degrees) — matches reference mockup ~160° CCW
// ---------------------------------------------------------------------------
const CORNETA_ROTATION_DEG = 160;
const CORNETA_ROTATION_RAD = CORNETA_ROTATION_DEG * (Math.PI / 180);

// ---------------------------------------------------------------------------
// Spray Particle — emitted FROM the opening outward (original behavior)
// ---------------------------------------------------------------------------
const SPRAY_BASE_ANGLE = 160 * (Math.PI / 180);
const SPRAY_CONE_SPREAD = 20 * (Math.PI / 180);

class SprayParticle {
  constructor(ox, oy) { this.reset(ox, oy); }

  reset(ox, oy) {
    this.x = ox + (Math.random() - 0.5) * 14;
    this.y = oy + (Math.random() - 0.5) * 20;
    const angle = SPRAY_BASE_ANGLE + (Math.random() - 0.5) * SPRAY_CONE_SPREAD * 2;

    const r = Math.random();
    if (r < 0.75) {
      const spd = Math.random() * 15 + 5;
      this.vx = Math.cos(angle) * spd;
      this.vy = Math.sin(angle) * spd;
      this.size = Math.random() * .8 + 0.5;
      this.maxOp = Math.random() * 0.25 + 0.70;
      this.maxLife = 38 + Math.random() * 32;
      this.tier = 0;
    } else if (r < 0.89) {
      const spd = Math.random() * 5 + 2.5;
      this.vx = Math.cos(angle) * spd;
      this.vy = Math.sin(angle) * spd;
      this.size = Math.random() * 4 + 2.5;
      this.maxOp = Math.random() * 0.28 + 0.18;
      this.maxLife = 60 + Math.random() * 60;
      this.tier = 1;
    } else {
      const spd = Math.random() * 2.5 + 7;
      this.vx = Math.cos(angle) * spd;
      this.vy = Math.sin(angle) * spd;
      this.size = Math.random() * 14 + 8;
      this.maxOp = Math.random() * 0.14 + 0.06;
      this.maxLife = 100 + Math.random() * 100;
      this.tier = 2;
    }

    this.life = 0;
    this.opacity = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.991;
    this.vy *= 0.991;
    this.life++;

    const p = this.life / this.maxLife;
    if (p < 0.10) this.opacity = this.maxOp * (p / 0.10);
    else if (p > 0.55) this.opacity = this.maxOp * (1 - (p - 0.55) / 0.45);
    else this.opacity = this.maxOp;
  }

  dead() { return this.life >= this.maxLife; }

  draw(ctx) {
    if (this.tier === 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,242,255,${this.opacity})`;
      ctx.fill();
    } else {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      const inner = this.tier === 1
        ? `rgba(255,255,255,${this.opacity})`
        : `rgba(220,228,255,${this.opacity})`;
      g.addColorStop(0, inner);
      g.addColorStop(0.4, `rgba(255,255,255,${this.opacity * 0.5})`);
      g.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }
}

// ---------------------------------------------------------------------------
// Suction Particle — spawns far away and gets PULLED toward the target point
// ---------------------------------------------------------------------------
class SuctionParticle {
  constructor(tx, ty, canvasW, canvasH) { this.reset(tx, ty, canvasW, canvasH); }

  reset(tx, ty, canvasW, canvasH) {
    // Spawn in a wide arc in front of the opening (opposite of spray direction)
    // Spray goes upper-left (160°), so suction pulls from lower-right area
    const spawnAngle = SPRAY_BASE_ANGLE + Math.PI + (Math.random() - 0.5) * Math.PI * 0.7;
    const spawnDist = 180 + Math.random() * 340;

    this.x = tx + Math.cos(spawnAngle) * spawnDist;
    this.y = ty + Math.sin(spawnAngle) * spawnDist;

    // Target point (where particles get sucked to)
    this.tx = tx;
    this.ty = ty;

    this.vx = 0;
    this.vy = 0;

    // Acceleration toward target — varies per tier
    const r = Math.random();
    if (r < 0.75) {
      // Small bright dots — fast suction
      this.size = Math.random() * .6 + 0.4;
      this.maxOp = Math.random() * 0.3 + 0.65;
      this.maxLife = 50 + Math.random() * 40;
      this.accel = 0.12 + Math.random() * 0.28;
      this.tier = 0;
    } else if (r < 0.85) {
      // Medium droplets
      this.size = Math.random() * 1.5 + 1.5;
      this.maxOp = Math.random() * 0.25 + 0.30;
      this.maxLife = 70 + Math.random() * 50;
      this.accel = 0.08 + Math.random() * 0.06;
      this.tier = 1;
    } else {
      // Large vapor — slow drift
      this.size = Math.random() * 10 + 5;
      this.maxOp = Math.random() * 0.12 + 0.05;
      this.maxLife = 100 + Math.random() * 80;
      this.accel = 0.04 + Math.random() * 0.04;
      this.tier = 2;
    }

    this.life = 0;
    this.opacity = 0;
  }

  update() {
    // Vector toward target
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Accelerate toward target (gets faster as it approaches)
    const pull = this.accel * (1 + 2 / (dist * 0.01 + 1));
    this.vx += (dx / dist) * pull;
    this.vy += (dy / dist) * pull;

    // Slight damping so it doesn't oscillate
    this.vx *= 0.96;
    this.vy *= 0.96;

    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    // Fade in at start, fade out near target
    const p = this.life / this.maxLife;
    const distFade = Math.min(dist / 60, 1); // fade out as it reaches target
    if (p < 0.15) this.opacity = this.maxOp * (p / 0.15) * distFade;
    else if (p > 0.7) this.opacity = this.maxOp * (1 - (p - 0.7) / 0.3) * distFade;
    else this.opacity = this.maxOp * distFade;

    // Die if reached target or expired
    if (dist < 12) this.life = this.maxLife;
  }

  dead() { return this.life >= this.maxLife; }

  draw(ctx) {
    if (this.opacity <= 0.001) return;
    if (this.tier === 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,242,255,${this.opacity})`;
      ctx.fill();
    } else {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      const inner = this.tier === 1
        ? `rgba(255,255,255,${this.opacity})`
        : `rgba(200,210,240,${this.opacity})`;
      g.addColorStop(0, inner);
      g.addColorStop(0.4, `rgba(255,255,255,${this.opacity * 0.4})`);
      g.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }
}

// ---------------------------------------------------------------------------
// Shared helper: compute emitter point from corneta ref
// ---------------------------------------------------------------------------
function computeEmitter(cornetaEl, canvasEl) {
  if (!canvasEl) return { x: 200, y: 340 };

  if (cornetaEl) {
    const cr = cornetaEl.getBoundingClientRect();
    const cv = canvasEl.getBoundingClientRect();

    const cx = cr.left - cv.left + cr.width * 0.5;
    const cy = cr.top - cv.top + cr.height * 0.5;

    const relX = -cr.width * -0.05;
    const relY = 0.9;

    const cos = Math.cos(CORNETA_ROTATION_RAD);
    const sin = Math.sin(CORNETA_ROTATION_RAD);
    return {
      x: cx + relX * cos - relY * sin,
      y: cy + relX * sin + relY * cos,
    };
  }

  return {
    x: canvasEl.width * 0.25,
    y: canvasEl.height * 0.42,
  };
}

// ---------------------------------------------------------------------------
// Spray Canvas — particles emitted OUTWARD from the opening (on top of front)
// ---------------------------------------------------------------------------
const SprayCanvas = ({ cornetaRef, zIndex }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], raf: null });

  const getEmitter = useCallback(() => {
    return computeEmitter(cornetaRef.current, canvasRef.current);
  }, [cornetaRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    const MAX = 380;
    const RATE = 11;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const FRAME_MS = 1000 / 30;
    let lastTime = 0;

    const tick = (now) => {
      state.raf = requestAnimationFrame(tick);
      if (now - lastTime < FRAME_MS) return;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: ox, y: oy } = getEmitter();

      for (let i = 0; i < RATE && state.particles.length < MAX; i++) {
        state.particles.push(new SprayParticle(ox, oy));
      }

      state.particles = state.particles.filter(p => {
        p.update();
        if (p.dead()) return false;
        p.draw(ctx);
        return true;
      });

      while (state.particles.length < MAX) {
        state.particles.push(new SprayParticle(ox, oy));
      }
    };

    state.raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(state.raf); ro.disconnect(); };
  }, [getEmitter]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    />
  );
};

// ---------------------------------------------------------------------------
// Suction Canvas — particles PULLED toward the opening (between layers)
// ---------------------------------------------------------------------------
const SuctionCanvas = ({ cornetaRef, zIndex }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], raf: null });

  const getEmitter = useCallback(() => {
    return computeEmitter(cornetaRef.current, canvasRef.current);
  }, [cornetaRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    const MAX = 260;
    const RATE = 7;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const FRAME_MS = 1000 / 30;
    let lastTime = 0;

    const tick = (now) => {
      state.raf = requestAnimationFrame(tick);
      if (now - lastTime < FRAME_MS) return;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: tx, y: ty } = getEmitter();

      for (let i = 0; i < RATE && state.particles.length < MAX; i++) {
        state.particles.push(new SuctionParticle(tx, ty, canvas.width, canvas.height));
      }

      state.particles = state.particles.filter(p => {
        p.update();
        if (p.dead()) return false;
        p.draw(ctx);
        return true;
      });

      while (state.particles.length < MAX) {
        state.particles.push(new SuctionParticle(tx, ty, canvas.width, canvas.height));
      }
    };

    state.raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(state.raf); ro.disconnect(); };
  }, [getEmitter]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    />
  );
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
const Hero = () => {
  const cornetaRef = useRef(null);

  const handleOpenLoja = () =>
    window.open(LOJA_URL, '_blank', 'noopener,noreferrer');

  const handleWhatsApp = () =>
    window.open(
      'https://wa.me/5555999713752?text=Ol%C3%A1%2C%20vi%20no%20site%20e%20tenho%20interesse%20em%20um%20produto%2C%20pode%20me%20ajudar%3F',
      '_blank', 'noopener,noreferrer'
    );

  // Shared style for both corneta images (same size/position/rotation)
  const cornetaStyle = {
    width: '88%',
    maxWidth: '540px',
    transform: `rotate(${CORNETA_ROTATION_DEG}deg) scale(1.05)`,
    filter: 'drop-shadow(0 4px 32px rgba(230,57,70,0.30)) drop-shadow(0 0 80px rgba(230,57,70,0.12))',
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background radial glow aligned with corneta position */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 55% at 30% 48%, rgba(230,57,70,0.08) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER STACK:
            z2  = back corneta image (original, with background)
            z3  = suction canvas (particles pulled IN — between layers)
            z5  = front corneta image (no background, overlaps particles)
            z6  = spray canvas (particles emitted OUT — on top of everything)
          ═══════════════════════════════════════════════════════════════════ */}


      {/* Layout */}
      <div className="relative z-10 w-full container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-24 lg:py-0">

          {/* ── LEFT: corneta (2 layers) ──────────────────────────── */}
          <motion.div
            className="w-full lg:w-[54%] flex items-center justify-center relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Soft glow behind the corneta body */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '60%', paddingBottom: '60%',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(230,57,70,0.14) 0%, transparent 68%)',
                filter: 'blur(40px)',
                zIndex: 1,
              }}
            />

            {/* Corneta layer wrapper */}
            <div
              className="relative select-none flex items-center justify-center"
              style={{
                width: '88%',
                maxWidth: '540px',
              }}
            >
              {/* 1. BACK LAYER — original corneta (z-index 1) */}
              <div style={{ transform: `rotate(${CORNETA_ROTATION_DEG}deg) scale(1.05)`, zIndex: 1 }} className="relative w-full">
                <img
                  ref={cornetaRef}
                  src="/corneta_hero.png"
                  alt="Corneta de admissão Asprofort — velocity stack com sistema Asprolock"
                  draggable={false}
                  fetchpriority="high"
                  className="block w-full h-auto"
                  style={{
                    filter: 'drop-shadow(0 4px 32px rgba(230,57,70,0.30)) drop-shadow(0 0 80px rgba(230,57,70,0.12))',
                  }}
                />
              </div>

              {/* 2. PARTICLE LAYERS (z-index 2 e 3) — Expandidos para não serem cortados pelo wrapper */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: '200vw',
                  height: '200vh',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2
                }}
              >
                <SuctionCanvas cornetaRef={cornetaRef} zIndex={1} />
                <SprayCanvas cornetaRef={cornetaRef} zIndex={2} />
              </div>

              {/* 3. FRONT LAYER — corneta sem fundo (z-index 4) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ transform: `rotate(${CORNETA_ROTATION_DEG}deg) scale(1.05)`, zIndex: 4 }}
              >
                <img
                  src="/corneta_hero_front.png"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="w-full h-full object-contain"

                />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: text ─────────────────────────────────────── */}
          <div className="w-full lg:w-[46%] flex flex-col items-center lg:items-start text-center lg:text-left">

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[4.2rem] xl:text-7xl font-black leading-[1.05] mb-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white block">Calculada pra</span>
              <span className="text-white block">gerar potência.</span>
              <span className="block mt-1" style={{ color: '#E63946' }}>
                Asprolock. Não<br />solta. Nunca.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Cornetas de admissão com encaixe milimétrico para carburadores e TBI.
              Fixação mecânica com parafusos inox. Sem degrau interno. Feito pra pista.
            </motion.p>

            {/* Microdiferenciais */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { icon: <ShieldCheck size={13} />, label: 'Asprolock System' },
                { icon: <Zap size={13} />, label: 'Sem degrau interno' },
                { icon: <Droplets size={13} />, label: 'Gasolina, etanol e metanol' },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-gray-300 border border-red-500/30 bg-black/50 px-3 py-1.5 rounded-full"
                >
                  <span style={{ color: '#E63946' }}>{icon}</span>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-5 items-center lg:items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              <Button
                onClick={handleOpenLoja}
                className="btn-racing px-8 py-4 text-base font-bold flex items-center gap-2.5 min-w-[190px]"
              >
                <ShoppingBag size={20} />
                Comprar na Loja
              </Button>

              <div className="flex flex-col items-center gap-1">
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="border-2 text-base font-bold flex items-center gap-2.5 min-w-[190px] transition-all duration-300 px-8 py-3.5"
                  style={{ borderColor: '#E63946', color: '#E63946' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E63946'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#E63946'; }}
                >
                  <MessageCircle size={20} />
                  Falar no WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-9 border-2 rounded-full flex justify-center"
          style={{ borderColor: 'rgba(230,57,70,0.6)' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2.5 rounded-full mt-1.5"
            style={{ backgroundColor: '#E63946' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
