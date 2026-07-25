import { useEffect, useRef } from "react";

export default function AnimatedCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const shapes = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 18 + Math.random() * 40,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      type: ["triangle", "circle", "ring", "hex", "square"][i % 5],
      opacity: 0.06 + Math.random() * 0.1,
    }));

    const poly = (x, y, r, sides, rot) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2;
        if (i === 0) ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
        else ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.rotation += s.rotSpeed;

        if (s.x < -s.size) s.x = canvas.width + s.size;
        if (s.x > canvas.width + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = canvas.height + s.size;
        if (s.y > canvas.height + s.size) s.y = -s.size;

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 1.2;

        if (s.type === "circle") {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.type === "ring") {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.type === "triangle") {
          poly(s.x, s.y, s.size, 3, s.rotation);
          ctx.stroke();
        } else if (s.type === "hex") {
          poly(s.x, s.y, s.size, 6, s.rotation);
          ctx.stroke();
        } else {
          poly(s.x, s.y, s.size, 4, s.rotation);
          ctx.stroke();
        }

        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
