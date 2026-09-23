"use client";

import { useEffect, useRef } from "react";

export default function Particles({ active }: { active: boolean }) {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      if (!active || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let particles: Particle[] = [];

      class Particle {
         x: number;
         y: number;
         size: number;
         speedX: number;
         speedY: number;
         opacity: number;
         color: string;

         constructor(width: number, height: number) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.5 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            // Thirium blue or white
            this.color = Math.random() > 0.3 ? "164, 227, 255" : "255, 255, 255";
         }

         update(width: number, height: number) {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reset particle if it goes off screen
            if (this.y < 0) {
               this.y = height;
               this.x = Math.random() * width;
            }
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
         }

         draw(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
         }
      }

      function init() {
         if (!canvas) return;
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         
         const particleCount = Math.floor(window.innerWidth / 15);
         particles = [];
         
         for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
         }
      }

      function animate() {
         if (!ctx || !canvas) return;
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         
         particles.forEach(particle => {
            particle.update(canvas.width, canvas.height);
            particle.draw(ctx);
         });
         
         animationFrameId = requestAnimationFrame(animate);
      }

      init();
      animate();

      const handleResize = () => {
         init();
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
         cancelAnimationFrame(animationFrameId);
      };
   }, [active]);

   return (
      <canvas 
         ref={canvasRef} 
         className="pointer-events-none absolute inset-0 z-[2] opacity-60 mix-blend-screen"
      />
   );
}
