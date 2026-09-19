import React, { useEffect, useRef } from 'react';

/**
 * GlitterBackground renders a vibrant green textured background 
 * scattered with colorful 3D faceted gemstones, rhinestones, crystal butterflies, 
 * and sparkling diamonds inspired by the reference image.
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

    // Vibrant gem color palette from reference image
    const gemPalettes = [
      { name: 'ruby', main: '#E74C3C', light: '#FFA39E', dark: '#900C3F', highlight: '#FFF' },
      { name: 'sapphire', main: '#00A8FF', light: '#7ED6DF', dark: '#0984E3', highlight: '#FFF' },
      { name: 'gold', main: '#F39C12', light: '#FFEAA7', dark: '#D35400', highlight: '#FFF' },
      { name: 'emerald', main: '#2ECC71', light: '#55EFC4', dark: '#10AC84', highlight: '#FFF' },
      { name: 'pink', main: '#FF007F', light: '#FF9FF3', dark: '#C71585', highlight: '#FFF' },
      { name: 'amethyst', main: '#9B59B6', light: '#D6A2E8', dark: '#6C5CE7', highlight: '#FFF' },
      { name: 'diamond', main: '#E2E8F0', light: '#FFFFFF', dark: '#94A3B8', highlight: '#FFF' }
    ];

    const stonesCount = 55;
    const stones = [];

    for (let i = 0; i < stonesCount; i++) {
      const palette = gemPalettes[Math.floor(Math.random() * gemPalettes.length)];
      const type = Math.random() > 0.82 ? 'butterfly' : Math.random() > 0.7 ? 'star' : 'rhinestone';
      
      stones.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 6.5 + 4.5, // 5px to 11px rhinestone size
        palette,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    // Helper to draw realistic 3D faceted round rhinestone
    const drawRhinestone = (ctx, x, y, radius, palette, pulseAlpha) => {
      ctx.save();
      ctx.translate(x, y);

      // 1. Soft 3D drop shadow
      ctx.beginPath();
      ctx.arc(2, 3, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 20, 10, 0.35)';
      ctx.fill();

      // 2. Base gem circle gradient
      const baseGrad = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, radius * 0.1, 0, 0, radius);
      baseGrad.addColorStop(0, palette.light);
      baseGrad.addColorStop(0.5, palette.main);
      baseGrad.addColorStop(1, palette.dark);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();

      // 3. Facet pattern (inner star lines for gem reflections)
      ctx.beginPath();
      const facets = 8;
      for (let i = 0; i < facets; i++) {
        const angle = (i * 2 * Math.PI) / facets;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * (radius * 0.85), Math.sin(angle) * (radius * 0.85));
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner table facet octagonal ring
      ctx.beginPath();
      for (let i = 0; i < facets; i++) {
        const angle = (i * 2 * Math.PI) / facets;
        const px = Math.cos(angle) * (radius * 0.45);
        const py = Math.sin(angle) * (radius * 0.45);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();

      // 4. Bright 3D specular glare highlight
      ctx.beginPath();
      ctx.arc(-radius * 0.35, -radius * 0.35, radius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.75 + Math.sin(pulseAlpha) * 0.2})`;
      ctx.fill();

      // Extra tiny glare dot
      ctx.beginPath();
      ctx.arc(radius * 0.3, radius * 0.3, radius * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      ctx.restore();
    };

    // Helper to draw silver/crystal butterfly gem
    const drawButterfly = (ctx, x, y, radius, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Drop shadow
      ctx.fillStyle = 'rgba(0, 20, 10, 0.3)';
      ctx.beginPath();
      ctx.ellipse(2, 3, radius * 1.1, radius * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left & right wings gradient
      const wingGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      wingGrad.addColorStop(0, '#FFFFFF');
      wingGrad.addColorStop(0.5, '#D1D5DB');
      wingGrad.addColorStop(1, '#9CA3AF');

      // Left wing
      ctx.beginPath();
      ctx.ellipse(-radius * 0.5, -radius * 0.2, radius * 0.6, radius * 0.45, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = wingGrad;
      ctx.fill();
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Right wing
      ctx.beginPath();
      ctx.ellipse(radius * 0.5, -radius * 0.2, radius * 0.6, radius * 0.45, Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = wingGrad;
      ctx.fill();
      ctx.stroke();

      // Lower wings
      ctx.beginPath();
      ctx.ellipse(-radius * 0.4, radius * 0.4, radius * 0.4, radius * 0.3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(radius * 0.4, radius * 0.4, radius * 0.4, radius * 0.3, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center body gem
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.15, radius * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#4B5563';
      ctx.fill();

      ctx.restore();
    };

    // Helper to draw sparkling 4-point crystal star
    const drawStar = (ctx, x, y, radius) => {
      ctx.save();
      ctx.translate(x, y);

      ctx.beginPath();
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(0, radius * 1.5);
        ctx.lineTo(radius * 0.2, radius * 0.2);
      }
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Base emerald green gradient canvas
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#1FA35D');
      bgGrad.addColorStop(0.5, '#23B168');
      bgGrad.addColorStop(1, '#1A8F51');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle felt green texture overlay
      const textureGrad = ctx.createRadialGradient(width * 0.5, height * 0.4, 50, width * 0.5, height * 0.4, width * 0.7);
      textureGrad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      textureGrad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
      ctx.fillStyle = textureGrad;
      ctx.fillRect(0, 0, width, height);

      // Render all scattered 3D glittery gemstones
      stones.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        s.pulse += s.pulseSpeed;

        // Screen wrap
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        if (s.type === 'rhinestone') {
          drawRhinestone(ctx, s.x, s.y, s.radius, s.palette, s.pulse);
        } else if (s.type === 'butterfly') {
          drawButterfly(ctx, s.x, s.y, s.radius, s.rotation);
        } else {
          drawStar(ctx, s.x, s.y, s.radius * 0.8);
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
