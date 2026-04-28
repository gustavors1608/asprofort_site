import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Início',   id: 'inicio'   },
  { name: 'Sobre',    id: 'sobre'    },
  { name: 'Catálogo', id: 'catalogo' },
  { name: 'Contato',  id: 'contato'  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      style={{ animation: 'hdr-slide-down 0.6s ease-out forwards' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            style={{ transition: 'transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onClick={() => scrollToSection('inicio')}
          >
            <img
              src="/asprofort_branco_bg.webp"
              alt="Asprofort — Cornetas e Acessórios de Alta Performance"
              className="h-5 w-auto"
              width="120"
              height="20"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-red-500 font-medium transition-colors duration-300 text-lg
                           hover:scale-110 active:scale-95"
                style={{ transition: 'color 0.3s, transform 0.2s' }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation — CSS transition, sem framer-motion */}
        <div
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-red-500/20"
          style={{
            maxHeight: isMobileMenuOpen ? '300px' : '0',
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: 'max-height 0.3s ease, opacity 0.2s ease',
          }}
        >
          <nav className="py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-white hover:text-red-500 hover:bg-red-500/10 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
