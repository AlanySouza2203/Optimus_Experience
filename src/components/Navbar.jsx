import React, { useState, useEffect } from 'react';
import { Car, Menu, X, ChevronRight, Headphones } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenProposal, onOpenAdmin, onOpenDriverSupport }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand">
          <div className="logo-icon-wrapper">
            <Car className="logo-icon" size={22} />
          </div>
          <div className="logo-text">
            <span className="brand-name">Optimus</span>
            <span className="brand-sub">Experience</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-menu">
          <a href="#inicio" className="nav-link">Início</a>
          <a href="#beneficios" className="nav-link">Benefícios</a>
          <a href="#veiculos" className="nav-link">Veículos</a>
          <a href="#planos" className="nav-link">Planos</a>
          <a href="#como-funciona" className="nav-link">Como funciona</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#contato" className="nav-link">Contato</a>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button 
            className="btn btn-secondary btn-sm nav-login-btn"
            onClick={onOpenAdmin}
          >
            Área Administrativa
          </button>

          <button
            className="btn btn-secondary btn-sm nav-support-btn"
            onClick={onOpenDriverSupport}
          >
            <Headphones size={16} />
            Suporte
          </button>
          
          <button 
            className="btn btn-primary btn-sm nav-cta-btn"
            onClick={onOpenProposal}
          >
            <span>Solicitar proposta</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Início</a>
            <a href="#beneficios" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
            <a href="#veiculos" onClick={() => setMobileMenuOpen(false)}>Veículos</a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)}>Planos</a>
            <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>Como funciona</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)}>Contato</a>
            <button className="mobile-support-link" onClick={() => { setMobileMenuOpen(false); onOpenDriverSupport(); }}><Headphones size={18} /> Suporte</button>
            <hr className="mobile-divider" />
            <button 
              className="btn btn-primary btn-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProposal();
              }}
            >
              Solicitar proposta <ChevronRight size={18} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
