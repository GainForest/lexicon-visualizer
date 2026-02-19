"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#overview", label: "Why" },
  { href: "#explorer", label: "Explorer" },
  { href: "#comparison", label: "Before & After" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10,31,10,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(74,140,74,0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{
              background: "linear-gradient(135deg, #2d5a2d, #4a8c4a)",
            }}
          >
            🌿
          </div>
          <span
            className="font-serif font-bold text-sm tracking-wide"
            style={{ color: "var(--text-primary)" }}
          >
            GainForest
          </span>
          <span
            className="text-xs hidden sm:block"
            style={{ color: "var(--text-muted)" }}
          >
            / Lexicon Evolution
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--text-secondary)", opacity: 0.8 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#explorer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "rgba(74,140,74,0.2)",
            color: "#4a8c4a",
            border: "1px solid rgba(74,140,74,0.3)",
          }}
        >
          <span>Explore →</span>
        </a>
      </div>
    </nav>
  );
}
