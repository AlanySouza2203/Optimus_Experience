import React from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import './Hero.css';

export default function Hero({ onOpenProposal }) {
  return (
    <section id="inicio" className="hero-section">
      <div className="ambient-glow-top"></div>
      
      <div className="container hero-container">
        {/* Left Column Text & CTAs */}
        <div className="hero-content">
          <div className="badge-status hero-badge">
            <span className="dot"></span>
            <span>Frota disponível para motoristas de aplicativo</span>
          </div>

          <h1 className="hero-title">
            Alugue seu <span className="gradient-green">carro</span> e comece a <span className="gradient-green">rodar hoje</span>
          </h1>

          <p className="hero-subtitle">
            Veículos 100% aprovados por <strong>Uber, 99 e inDrive</strong>. Planos flexíveis semanais, quinzenais e mensais com manutenção e proteção total inclusas. Sem burocracia.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-hero" onClick={onOpenProposal}>
              <span>Solicitar proposta</span>
              <ArrowRight size={18} />
            </button>

            <a href="#veiculos" className="btn btn-secondary btn-hero">
              Ver veículos
            </a>
          </div>

          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck className="trust-icon" size={18} />
              <span>Proteção veicular inclusa</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <div className="rating-stars">
                <Star className="star-fill" size={16} />
                <span className="rating-num">4.9/5</span>
              </div>
              <span className="rating-count">(1.200+ avaliações)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
