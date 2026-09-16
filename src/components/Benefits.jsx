import React from 'react';
import { Wallet, ShieldCheck, Wrench, Calendar, Headphones, Gauge, Check } from 'lucide-react';
import './Benefits.css';

const benefitsList = [
  {
    icon: Wallet,
    title: 'Comece com pouco',
    desc: 'Planos a partir de R$ 389/semana, sem entrada e sem carro próprio.'
  },
  {
    icon: ShieldCheck,
    title: 'Proteção total',
    desc: 'Veículos com proteção veicular e assistência 24h inclusa no plano.'
  },
  {
    icon: Wrench,
    title: 'Manutenção por nossa conta',
    desc: 'Revisões e reparos cobertos. Você só precisa dirigir.'
  },
  {
    icon: Calendar,
    title: 'Renovação flexível',
    desc: 'Períodos semanal, quinzenal ou mensal — troque quando quiser.'
  },
  {
    icon: Headphones,
    title: 'Suporte dedicado',
    desc: 'Atendimento humano e canal direto para problemas e panes.'
  },
  {
    icon: Gauge,
    title: 'Frota rastreada',
    desc: 'Controle de quilometragem e histórico completo do veículo.'
  }
];

export default function Benefits() {
  return (
    <section id="beneficios" className="section benefits-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Tudo que você precisa para <br />
            <span className="gradient-green">rodar com tranquilidade</span>
          </h2>
          <p className="section-subtitle">
            Cuidamos da frota, da manutenção e da proteção. Você foca em ganhar dinheiro com as plataformas de aplicativo.
          </p>
        </div>

        <div className="benefits-grid">
          {benefitsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="glass-card benefit-card">
                <div className="benefit-icon-box">
                  <Icon size={24} />
                </div>
                <h3 className="benefit-title">{item.title}</h3>
                <p className="benefit-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
