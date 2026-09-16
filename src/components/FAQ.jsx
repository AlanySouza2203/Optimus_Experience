import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const faqItems = [
  {
    q: 'Quais os requisitos básicos para alugar um veículo na Optimus Experience?',
    a: 'Você precisa ter CNH definitiva válida com a observação EAR (Exerce Atividade Remunerada), idade mínima de 21 anos, comprovante de residência em seu nome (ou familiar de 1º grau) e perfil ativo ou aprovado para cadastro na Uber, 99 ou inDrive.'
  },
  {
    q: 'Como funciona a manutenção do veículo? Pago algum valor extra?',
    a: 'Não! Toda a manutenção preventiva e corretiva por desgaste natural (revisões periódicas, óleo, pastilhas de freio, suspensão, pneus, alinhamento) é 100% cobrada e gerenciada pela Optimus Experience sem nenhum custo adicional para você.'
  },
  {
    q: 'O que acontece em caso de avaria ou se o carro precisar ir para oficina?',
    a: 'Se o serviço de manutenção ultrapassar 24 horas, fornecemos um veículo reserva da mesma categoria ou equivalente para que suas corridas e faturamento diário não parem.'
  },
  {
    q: 'Preciso pagar caução ou depósito de garantia ao retirar o veículo?',
    a: 'Sim, solicitamos um valor de caução de garantia devolutiva ao final do contrato. Oferecemos opções facilitadas de pagamento da caução parcelada no cartão de crédito ou no PIX.'
  },
  {
    q: 'Como são feitos os pagamentos semanais do aluguel?',
    a: 'Você pode pagar via PIX, cartão de débito/crédito ou boleto bancário de forma rápida. O vencimento ocorre sempre no mesmo dia da semana escolhido por você.'
  },
  {
    q: 'Posso utilizar o veículo para uso pessoal nos dias de folga?',
    a: 'Com certeza! O veículo fica com você 24 horas por dia, 7 dias por semana. Você pode utilizá-lo para trabalhar e também para seus compromissos e momentos de lazer em família.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Tire Suas Dúvidas</span>
          <h2 className="section-title">
            Perguntas <span className="gradient-green">frequentes</span>
          </h2>
          <p className="section-subtitle">
            Tudo de forma transparente para você iniciar com total segurança.
          </p>
        </div>

        <div className="faq-container">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item ${isOpen ? 'faq-open' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="faq-question">
                  <div className="faq-q-left">
                    <HelpCircle size={18} className="faq-icon" />
                    <h3>{item.q}</h3>
                  </div>
                  <ChevronDown size={20} className="faq-arrow" />
                </div>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
