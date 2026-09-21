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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pos-f-t">
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

      {/* Navbar Header Bar - Exibe EXCLUSIVAMENTE a Logo (esquerda) e o ícone (≡) (direita) */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo (esquerda) */}
          <a href="#" className="navbar-brand">
            <div className="logo-icon-wrapper">
              <Car className="logo-icon" size={22} />
            </div>
            <div className="logo-text">
              <span className="brand-name">Optimus</span>
              <span className="brand-sub">Experience</span>
            </div>
          </a>

          {/* Ícone de 3 barrinhas (≡) (direita) */}
          <div className="nav-actions">
            <button 
              className="navbar-toggler" 
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
    </div>
  );
}
