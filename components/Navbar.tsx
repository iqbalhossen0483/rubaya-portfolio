"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-7 lg:px-16 py-4 bg-[rgba(246,248,246,0.96)] backdrop-blur-[10px] border-b border-border-custom transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(26,58,42,0.1)]" : "shadow-none"
      }`}
    >
      <div className="font-serif text-[1.1rem] font-bold text-accent tracking-[0.01em]">
        Rubaya <span className="italic font-light">Nasrin</span>
      </div>
      <ul className="hidden md:flex gap-6 lg:gap-10 list-none">
        {["about", "experience", "events", "gallery", "impact", "contact"].map(
          (item) => (
            <li key={item}>
              <Link
                href={`#${item}`}
                className="font-sans text-[0.85rem] font-bold tracking-[0.09em] uppercase text-text-mid hover:text-accent transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
