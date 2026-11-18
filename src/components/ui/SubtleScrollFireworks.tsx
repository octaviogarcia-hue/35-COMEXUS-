import { useEffect, useRef } from 'react';

/**
 * SubtleScrollFireworks
 * ─────────────────────
 * A lightweight <canvas> that releases slow, soft fireworks ONLY while the
 * visitor scrolls. Nothing fires on load, and the animation loop sleeps
 * whenever no particle is alive, so it costs nothing while idle.
 *
 * • scope="hero" — fires only inside the first screen (Gala Overview).
 * • scope="page" — fires anywhere on the page (Alumni Showcase). It arms
 *   `armDelay` ms after mount and then waits for a real gesture (wheel, touch,
 *   scroll keys), so the automatic jump of a QR deep link never sets it off.
 *
 * • Palette: Champagne #C9A66B · Ivory #F3EBDD · subtle Sky Blue #00A9E0 accents
 * • Fewer particles on small / touch screens; DPR capped at 2
 * • Renders nothing at all when `prefers-reduced-motion: reduce`
 */

const CHAMPAGNE = [201, 166, 107] as const;
const IVORY = [243, 235, 221] as const;
const SKY = [0, 169, 224] as const;

type RGB = readonly [number, number, number];

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0 → 1
  decay: number;
  size: number;
  color: RGB;
  twinkle: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: RGB;
}

interface Props {
  /** Disable completely. */
  enabled?: boolean;
  /** Where scrolling may release fireworks. */
  scope?: 'hero' | 'page';
  /** Fraction of the viewport height that counts as “Hero” (scope="hero"). */
  heroFraction?: number;
  /** Quiet period after mount before scroll is listened to (ms). */
  armDelay?: number;
  className?: string;
}

const SCROLL_KEYS = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Spacebar']);

function pickColor(): RGB {
  const r = Math.random();
  if (r < 0.55) return CHAMPAGNE;
  if (r < 0.88) return IVORY;
  return SKY; // sparing accent
}

export default function SubtleScrollFireworks({
  enabled = true,
  scope = 'hero',
  heroFraction = 1,
  armDelay = 0,
  className = 'fixed inset-0 z-0 pointer-events-none opacity-65',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduce?.matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];
    let raf = 0;
    let running = false;
    let lastBurst = 0;
    let lastY = window.scrollY;
    let accumulated = 0;
    // scope="page": silent until the quiet period ends AND the guest scrolls by hand.
    const gated = scope === 'page';
    let armed = !gated && armDelay <= 0;
    let userIntent = !gated;
    let w = 0;
    let h = 0;

    const isSmall = () => window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (x: number, y: number, base: RGB) => {
      const count = isSmall() ? 26 : 48;
      const speed = isSmall() ? 1.25 : 1.6;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.25;
        const v = speed * (0.55 + Math.random() * 0.6);
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 1,
          decay: 0.006 + Math.random() * 0.006,
          size: 0.8 + Math.random() * 1.4,
          color: Math.random() < 0.7 ? base : pickColor(),
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    const launch = () => {
      const x = w * (0.12 + Math.random() * 0.76);
      rockets.push({
        x,
        y: h + 10,
        vy: -(isSmall() ? 4.2 : 5) - Math.random() * 1.2,
        targetY: h * (0.14 + Math.random() * 0.32),
        color: pickColor(),
      });
      start();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.985;
        const [cr, cg, cb] = r.color;
        const grad = ctx.createLinearGradient(r.x, r.y, r.x, r.y + 28);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},0.75)`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x, r.y + 28);
        ctx.stroke();
        if (r.y <= r.targetY || r.vy > -1.2) {
          burst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vx *= 0.982;
        s.vy = s.vy * 0.982 + 0.018; // gentle gravity
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        s.twinkle += 0.2;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const alpha = Math.max(0, s.life) * (0.65 + 0.35 * Math.sin(s.twinkle));
        const [cr, cg, cb] = s.color;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.6 + s.life * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      if (sparks.length || rockets.length) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        ctx.clearRect(0, 0, w, h);
      }
    };

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }

    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastY);
      lastY = y;
      if (!armed || !userIntent) {
        accumulated = 0;
        return;
      }
      // scope="hero": only inside the first screen.
      if (scope === 'hero' && y > window.innerHeight * heroFraction) {
        accumulated = 0;
        return;
      }
      accumulated += delta;
      const now = performance.now();
      const minGap = isSmall() ? 900 : 650;
      const maxAlive = isSmall() ? 2 : 3;
      if (accumulated > 60 && now - lastBurst > minGap && rockets.length < maxAlive) {
        accumulated = 0;
        lastBurst = now;
        launch();
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else if (sparks.length || rockets.length) {
        start();
      }
    };

    const onIntent = (e: Event) => {
      if (!armed) return;
      if (e instanceof KeyboardEvent && !SCROLL_KEYS.has(e.key)) return;
      userIntent = true;
      lastY = window.scrollY;
    };
    const intentEvents = ['wheel', 'touchmove', 'keydown'] as const;

    const armTimer = armed
      ? 0
      : window.setTimeout(() => {
          armed = true;
          lastY = window.scrollY; // discard whatever the automatic landing scrolled
          accumulated = 0;
        }, armDelay);

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (gated) intentEvents.forEach((ev) => window.addEventListener(ev, onIntent, { passive: true }));

    return () => {
      window.clearTimeout(armTimer);
      if (gated) intentEvents.forEach((ev) => window.removeEventListener(ev, onIntent));
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, scope, heroFraction, armDelay]);

  if (!enabled) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
