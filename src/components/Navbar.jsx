import React, { useState, useEffect } from 'react';
import { Car, Menu, X, ChevronRight, Headphones, Shield } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenProposal, onOpenAdmin, onOpenDriverSupport }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar pos-f-t ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* External Collapsible Content (pos-f-t pattern) */}
      <div 
        className={`collapse ${mobileMenuOpen ? 'show' : ''}`} 
        id="navbarToggleExternalContent"
      >
        <div className="bg-dark p-4 mobile-collapsed-content">
          <div className="mobile-header-info">
            <div className="mobile-brand-title">
              <Car size={22} className="text-emerald" />
              <h5 className="text-white h4 mb-0">Optimus Experience</h5>
            </div>
            <span className="text-muted small">Menu de navegação e atalhos rápidos do sistema</span>
          </div>

          <nav className="mobile-nav-links">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Início</a>
            <a href="#beneficios" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
            <a href="#veiculos" onClick={() => setMobileMenuOpen(false)}>Veículos</a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)}>Planos</a>
            <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>Como funciona</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)}>Contato</a>
          </nav>

          <hr className="mobile-divider" />

          <div className="mobile-actions-grid">
            <button 
              className="btn btn-outline-light btn-full"
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            >
              <Shield size={16} /> Área Administrativa
            </button>
            <button
              className="btn btn-outline-light btn-full"
              onClick={() => { setMobileMenuOpen(false); onOpenDriverSupport(); }}
            >
              <Headphones size={16} /> Suporte ao Motorista
            </button>
            <button 
              className="btn btn-primary btn-full"
              onClick={() => { setMobileMenuOpen(false); onOpenProposal(); }}
            >
              Solicitar proposta <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
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

        {/* Desktop Action Buttons */}
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

          {/* Mobile Toggler Button */}
          <button 
            className="navbar-toggler mobile-toggle" 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="navbarToggleExternalContent" 
            aria-expanded={mobileMenuOpen} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

