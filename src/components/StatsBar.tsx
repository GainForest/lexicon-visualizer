"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 18, label: "Lexicons Enriched", suffix: "" },
  { value: 150, label: "New Fields Added", suffix: "+" },
  { value: 7, label: "New Lexicons Created", suffix: "" },
  { value: 0, label: "Breaking Changes", suffix: "" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration, active]);

  return count;
}

function StatItem({
  value,
  label,
  suffix,
  active,
  delay,
}: {
  value: number;
  label: string;
  suffix: string;
  active: boolean;
  delay: number;
}) {
  const [localActive, setLocalActive] = useState(false);
  const count = useCountUp(value, 1500, localActive);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setLocalActive(true), delay);
      return () => clearTimeout(timer);
    }
  }, [active, delay]);

  return (
    <div className="flex flex-col items-center gap-2 px-8 py-6">
      <div
        className="font-serif text-5xl md:text-6xl font-bold tabular-nums"
        style={{
          background: "linear-gradient(135deg, #4a8c4a, #c9a84c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="text-sm tracking-wide text-center"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-4 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--forest-dark), var(--forest-mid))",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #4a8c4a 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c9a84c 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
          style={{ borderColor: "var(--border-subtle)" }}>
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              active={active}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
