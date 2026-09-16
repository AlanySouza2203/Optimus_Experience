import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import './Plans.css';

const vehiclePriceCatalog = [499, 729, 749, 749, 799, 829, 850];

const getPriceBand = () => {
  const sorted = [...vehiclePriceCatalog].sort((a, b) => a - b);
  return {
    lowest: sorted[0],
    medium: sorted[Math.floor(sorted.length / 2)] ?? sorted[0],
    highest: sorted[sorted.length - 1]
  };
};

const { lowest, medium, highest } = getPriceBand();

const weeklyBase = lowest;
const fortnightlyPrice = Number(((weeklyBase * (15 / 7)) * 0.92).toFixed(2));
const monthlyPrice = Number(((weeklyBase * 4) * 0.95).toFixed(2));

const plansData = [
  {
    planType: 'Semanal',
    name: 'Plano Semanal',
    subtitle: `Base no veículo mais barato (${lowest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`,
    price: weeklyBase.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    unit: '/semana',
    badge: null,
    features: [
      'Renovação semanal flexível',
      'Manutenção básica inclusa',
      'Suporte 24h',
      'App do motorista',
      'Checklist digital de entrega'
    ],
    recommended: false,
    ctaText: 'Assinar plano'
  },
  {
    planType: 'Quinzenal',
    name: 'Plano Quinzenal',
    subtitle: `Base no valor médio da frota (${medium.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`,
    price: fortnightlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    unit: '/15 dias',
    badge: 'Mais popular',
    features: [
      'Tudo do plano semanal',
      'Proteção veicular inclusa',
      'Substituição em caso de pane',
      'Desconto de 8% vs. semanal',
      'Prioridade na fila de veículos'
    ],
    recommended: true,
    ctaText: 'Assinar plano'
  },
  {
    planType: 'Mensal',
    name: 'Plano Mensal',
    subtitle: `Base no valor mais alto (${highest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`,
    price: monthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    unit: '/mês',
    badge: null,
    features: [
      'Tudo do plano quinzenal',
      'Manutenção programada inclusa',
      '1 lavagem por semana',
      'Desconto de 5% vs. 4 semanas',
      'Gestão de documentos inclusa'
    ],
    recommended: false,
    ctaText: 'Assinar plano'
  }
];

export default function Plans({ onOpenProposal }) {
  return (
    <section id="planos" className="section plans-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Escolha o período que <span className="gradient-green">cabe na sua rotina</span>
          </h2>
          <p className="section-subtitle">
            Faixa de referência da frota: menor R${' '}
            {lowest.toLocaleString('pt-BR')}, médio R${' '}
            {medium.toLocaleString('pt-BR')} e alto R${' '}
            {highest.toLocaleString('pt-BR')}. O semanal usa o valor do veículo mais barato; o quinzenal aplica 8% de desconto nos 15 dias; o mensal aplica 5% de desconto nas 4 semanas.
          </p>
        </div>

        <div className="plans-grid">
          {plansData.map((plan, idx) => (
            <div 
              key={idx} 
              className={`glass-card plan-card ${plan.recommended ? 'plan-recommended' : ''}`}
            >
              {plan.badge && (
                <div className="recommended-badge">
                  <Sparkles size={14} />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-sub">{plan.subtitle}</p>

                <div className="plan-price-box">
                  <span className="currency">R$</span>
                  <strong className="price-num">{plan.price}</strong>
                  <span className="unit">{plan.unit}</span>
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <div className="feature-check-icon">
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline-green'} btn-full plan-cta`}
                onClick={() => onOpenProposal(plan.planType, null)}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
