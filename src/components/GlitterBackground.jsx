import React, { useEffect, useRef } from 'react';

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

    const moneyItems = [];
    const moneyCount = 35;

    const createMoney = (yOverride) => ({
      x: Math.random() * width,
      y: yOverride !== undefined ? yOverride : -40 - Math.random() * height * 0.5,
      size: Math.random() * 22 + 14,
      type: Math.random() > 0.4 ? 'coin' : 'bill',
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      vy: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      wobbleAmp: Math.random() * 30 + 10,
      wobbleOffset: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.35 + 0.45,
      shimmer: Math.random() * Math.PI * 2,
      shimmerSpeed: Math.random() * 0.04 + 0.02
    });

    for (let i = 0; i < moneyCount; i++) {
      moneyItems.push(createMoney());
    }

    const drawCoin = (ctx, x, y, radius, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(0);

      ctx.globalAlpha = alpha;

      const grad = ctx.createRadialGradient(-radius * 0.25, -radius * 0.25, radius * 0.1, 0, 0, radius);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.4, '#E8DEF5');
      grad.addColorStop(0.8, '#624873');
      grad.addColorStop(1, '#4A3657');

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
      ctx.font = `bold ${radius * 0.85}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, 1);

      const sparkle = Math.sin(Date.now() * 0.003 + x * 0.1) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkle * alpha * 0.8})`;
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const drawBill = (ctx, x, y, size, rotation, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      const w = size * 1.8;
      const h = size * 0.9;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, 4);
      ctx.fill();

      ctx.strokeStyle = '#624873';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6, 3);
      ctx.stroke();

      ctx.fillStyle = '#624873';
      ctx.font = `bold ${h * 0.5}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, 0);

      ctx.strokeStyle = 'rgba(98, 72, 115, 0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        const lx = -w / 2 + (w / 4) * i;
        ctx.beginPath();
        ctx.moveTo(lx, -h / 2 + 3);
        ctx.lineTo(lx, h / 2 - 3);
        ctx.stroke();
      }

      const sparkle = Math.sin(Date.now() * 0.002 + y * 0.08) * 0.5 + 0.5;
      ctx.globalAlpha = alpha * sparkle * 0.6;
      ctx.beginPath();
      ctx.arc(w / 2 - 4, -h / 2 + 4, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const drawSparkle = (ctx, x, y, size, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.2, -size * 0.2);
      ctx.lineTo(size, 0);
      ctx.lineTo(size * 0.2, size * 0.2);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.2, size * 0.2);
      ctx.lineTo(-size, 0);
      ctx.lineTo(-size * 0.2, -size * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#624873');
      bgGrad.addColorStop(0.5, '#4A3657');
      bgGrad.addColorStop(1, '#3D2E4A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const glowGrad = ctx.createRadialGradient(width * 0.3, height * 0.2, 0, width * 0.3, height * 0.2, width * 0.6);
      glowGrad.addColorStop(0, 'rgba(232, 222, 245, 0.12)');
      glowGrad.addColorStop(1, 'rgba(232, 222, 245, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      const glow2 = ctx.createRadialGradient(width * 0.75, height * 0.6, 0, width * 0.75, height * 0.6, width * 0.4);
      glow2.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      glow2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      moneyItems.forEach(item => {
        item.y += item.vy;
        item.x += item.vx + Math.sin(item.wobbleOffset) * 0.3;
        item.wobbleOffset += item.wobbleSpeed;
        item.rotation += item.rotSpeed;
        item.shimmer += item.shimmerSpeed;

        if (item.y > height + 60) {
          Object.assign(item, createMoney(-40));
        }
        if (item.x < -60) item.x = width + 60;
        if (item.x > width + 60) item.x = -60;

        const shimmerAlpha = Math.sin(item.shimmer) * 0.15 + 0.85;

        if (item.type === 'coin') {
          drawCoin(ctx, item.x, item.y, item.size * 0.5, item.alpha * shimmerAlpha);
        } else {
          drawBill(ctx, item.x, item.y, item.size, item.rotation, item.alpha * shimmerAlpha);
        }

        if (Math.sin(item.shimmer * 2) > 0.92) {
          drawSparkle(ctx, item.x + item.size * 0.6, item.y - item.size * 0.6, 3, item.alpha * 0.5);
        }
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