import React from 'react';
import { Car, Phone, Mail, MapPin, MessageCircle, Clock, Shield } from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenProposal }) {
  return (
    <footer id="contato" className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#" className="navbar-brand footer-logo">
              <div className="logo-icon-wrapper">
                <Car size={22} />
              </div>
              <div className="logo-text">
                <span className="brand-name">Optimus</span>
                <span className="brand-sub">Experience</span>
              </div>
            </a>
            <p className="footer-desc">
              Solução completa em aluguel e gestão de frotas para motoristas de aplicativo (Uber, 99 e inDrive). Manutenção inclusa, seguro total e atendimento humanizado.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="social-btn whatsapp-btn">
                <MessageCircle size={18} />
                <span>Atendimento WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#beneficios">Benefícios</a></li>
              <li><a href="#veiculos">Nossa Frota</a></li>
              <li><a href="#planos">Planos Flexíveis</a></li>
              <li><a href="#como-funciona">Como Funciona</a></li>
              <li><a href="#faq">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-heading">Contato & Suporte</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={16} className="contact-icon" />
                <span>0800 777 9000 / (11) 99999-9999</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>contato@optimusexperience.com.br</span>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </li>
              <li>
                <Clock size={16} className="contact-icon" />
                <span>Segunda a Sexta: 08h às 19h | Sáb: 08h às 13h</span>
              </li>
            </ul>
          </div>

          {/* Callout Box */}
          <div className="footer-col footer-callout-col">
            <div className="footer-callout-card">
              <Shield size={24} className="callout-icon" />
              <h4>Pronto para rodar?</h4>
              <p>Solicite sua proposta em menos de 2 minutos sem burocracia.</p>
              <button className="btn btn-primary btn-sm btn-full" onClick={onOpenProposal}>
                Solicitar Proposta
              </button>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Optimus Experience - Todos os direitos reservados. CNPJ 00.000.000/0001-00.</p>
          <div className="footer-legal-links">
            <a href="#">Termos de Uso</a>
            <a href="#">Política de Privacidade</a>
            <a href="#">Contrato de Locação</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
