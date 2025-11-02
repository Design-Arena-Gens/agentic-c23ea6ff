'use client';

import { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isListening: boolean;
  isProcessing: boolean;
}

export default function VoiceVisualizer({ isListening, isProcessing }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    let animationId: number;
    let bars: Array<{ height: number, targetHeight: number, speed: number }> = [];
    const barCount = 40;

    for (let i = 0; i < barCount; i++) {
      bars.push({
        height: 10,
        targetHeight: 10,
        speed: 0.3 + Math.random() * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width / 2, height / 2);

      const barWidth = (width / 2) / barCount;
      const centerY = height / 4;

      bars.forEach((bar, i) => {
        if (isListening || isProcessing) {
          bar.targetHeight = 20 + Math.random() * 80;
        } else {
          bar.targetHeight = 10 + Math.random() * 20;
        }

        bar.height += (bar.targetHeight - bar.height) * bar.speed;

        const gradient = ctx.createLinearGradient(0, centerY - bar.height / 2, 0, centerY + bar.height / 2);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.8)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth + 2,
          centerY - bar.height / 2,
          barWidth - 4,
          bar.height
        );
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isListening, isProcessing]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-48 rounded-lg"
        style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`text-6xl transition-all duration-300 ${isListening || isProcessing ? 'scale-110 opacity-100' : 'opacity-50'}`}>
          {isProcessing ? '🔄' : isListening ? '🎤' : '💤'}
        </div>
      </div>
    </div>
  );
}
