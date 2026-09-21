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
        style={{ background: '#0F172A' }}
      >
        <div className="bg-dark p-4 mobile-collapsed-content">
          <div className="mobile-header-info">
            <div className="mobile-brand-title">
              <Car size={24} className="text-emerald" style={{ color: '#10B981' }} />
              <h5 className="text-white h4 mb-0" style={{ color: '#FFFFFF', margin: 0 }}>Optimus Experience</h5>
            </div>
            <span className="text-muted small" style={{ color: '#94A3B8' }}>Menu de navegação e atalhos rápidos do sistema</span>
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
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} style={{ background: '#0F172A', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.8rem 0' }}>
        <div className="container navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo (esquerda) */}
          <a href="#" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div className="logo-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car className="logo-icon" size={24} style={{ color: '#10B981' }} />
            </div>
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-name" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem' }}>Optimus</span>
              <span className="brand-sub" style={{ color: '#10B981', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em' }}>EXPERIENCE</span>
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
              style={{ background: '#10B981', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="navbar-toggler-icon" style={{ display: 'flex', alignItems: 'center' }}>
                {mobileMenuOpen ? <X size={28} color="#FFFFFF" /> : <Menu size={28} color="#FFFFFF" />}
              </span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
