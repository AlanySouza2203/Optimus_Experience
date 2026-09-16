import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    step: '01',
    title: 'Envie seu interesse',
    desc: 'Preencha o formulário com seus dados e o veículo desejado.'
  },
  {
    step: '02',
    title: 'Análise cadastral',
    desc: 'Validamos seus documentos e CNH em até 48h.'
  },
  {
    step: '03',
    title: 'Assine o contrato',
    desc: 'Contrato digital com plano e período escolhidos.'
  },
  {
    step: '04',
    title: 'Vistoria e entrega',
    desc: 'Checklist fotográfico e entrega do veículo pronta para rodar.'
  }
];

const requirements = [
  'Ser maior de 21 anos',
  'Possuir CNH definitiva categoria B (ou superior)',
  'CNH válida por todo o período da locação',
  'Comprovante de residência',
  'Conta em banco para pagamentos',
  'Estar cadastrado em ao menos uma plataforma de aplicativo'
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section how-it-works-section">
      <div className="container">
        <div className="how-it-works-grid">
          
          {/* Left Column: Steps Timeline */}
          <div className="how-left-col">
            <span className="section-tag-green">Como funciona</span>
            <h2 className="how-main-title">
              Do primeiro contato <br />
              à entrega do veículo
            </h2>
            <p className="how-main-subtitle">
              Um processo simples e transparente para você começar a rodar o quanto antes.
            </p>

            <div className="vertical-timeline">
              {steps.map((st, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-badge">
                    <span>{st.step}</span>
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-step-title">{st.title}</h3>
                    <p className="timeline-step-desc">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Requirements Card */}
          <div className="how-right-col">
            <div className="glass-card requirements-card">
              <h3 className="req-card-title">Requisitos para contratação</h3>
              <p className="req-card-subtitle">Documentação necessária para iniciar sua locação.</p>

              <ul className="req-list">
                {requirements.map((req, idx) => (
                  <li key={idx} className="req-list-item">
                    <CheckCircle2 size={18} className="req-check-icon" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <div className="req-tip-box">
                <p>
                  <strong>Dica:</strong> tenha sua CNH e comprovante de residência em mãos ao preencher o formulário para acelerar a análise.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
