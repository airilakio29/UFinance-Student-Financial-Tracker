import React, { useEffect, useRef } from 'react';

/**
 * GlitterBackground renders subtle, sparkling gem-like particles 
 * and ambient green lighting behind the UI.
 */
export default function GlitterBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle gems array
    const particlesCount = 45;
    const particles = [];
    const colors = [
      '#10B981', // Emerald
      '#52B788', // Sage
      '#A7F3D0', // Mint
      '#34D399', // Bright Mint
      '#FBBF24', // Subtle Gold Crystal
      '#D8F3DC'  // Pale Sage
    ];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        sides: Math.random() > 0.4 ? 4 : 6 // Diamond/gem shape
      });
    }

    const drawGem = (ctx, x, y, radius, sides, color, alpha) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;

      // Draw diamond / gem star shape
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Outer sparkle glow
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha * 0.25;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle background green ambient radial gradients
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 10, width * 0.2, height * 0.3, 450);
      grad1.addColorStop(0, 'rgba(82, 183, 136, 0.08)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 10, width * 0.8, height * 0.7, 500);
      grad2.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render glittering gemstone particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Twinkle pulse effect
        p.alpha += p.twinkleSpeed;
        if (p.alpha > 0.75 || p.alpha < 0.1) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        drawGem(ctx, p.x, p.y, p.radius, p.sides, p.color, Math.max(0.05, p.alpha));
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="glitter-canvas-container">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
