import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';

export const NavigationBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Letter', href: '#letter' },
    { label: 'Memories', href: '#memories' },
    { label: 'Special', href: '#reasons' },
    { label: 'Make a Wish', href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-midnight-950/80 backdrop-blur-xl border-b border-gold-500/15 shadow-xl shadow-black/30'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-cream-100 hover:text-gold-300 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-gold-400/40 bg-midnight-900/60 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-serif italic text-lg tracking-wider text-gold-200">
            {birthdayData.personName}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-cream-200/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gold-300 transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full glass-panel border border-gold-500/30 text-cream-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-6 rounded-2xl bg-midnight-900/95 backdrop-blur-2xl border border-gold-500/30 shadow-2xl flex flex-col gap-4 text-center z-50 animate-in fade-in zoom-in-95 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-cream-100 hover:text-gold-300 py-2 border-b border-gold-500/10 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
