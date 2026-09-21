import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import './ContactForm.css';

const defaultVehicles = [
  { id: 1, brand: 'CHEVROLET', name: 'Onix Plus', category: 'Econômico', priceWeekly: 799, status: 'Disponível' },
  { id: 2, brand: 'CHEVROLET', name: 'Onix', category: 'Econômico', priceWeekly: 749, status: 'Disponível' },
  { id: 3, brand: 'FIAT', name: 'Argo Drive', category: 'Econômico', priceWeekly: 729, status: 'Disponível' },
  { id: 4, brand: 'VOLKSWAGEN', name: 'Polo Track', category: 'Econômico', priceWeekly: 499, status: 'Disponível' },
  { id: 5, brand: 'HYUNDAI', name: 'HB20', category: 'Econômico', priceWeekly: 749, status: 'Disponível' },
  { id: 6, brand: 'FIAT', name: 'Cronos Drive', category: 'Sedan', priceWeekly: 829, status: 'Disponível' },
  { id: 7, brand: 'HYUNDAI', name: 'HB20S', category: 'Sedan', priceWeekly: 829, status: 'Disponível' },
  { id: 8, brand: 'VOLKSWAGEN', name: 'Virtus (Automático)', category: 'Sedan', priceWeekly: 850, status: 'Disponível' },
  { id: 9, brand: 'VOLKSWAGEN', name: 'Virtus (Manual)', category: 'Sedan', priceWeekly: 899, status: 'Disponível' },
  { id: 10, brand: 'RENAULT', name: 'Kwid E-Tech', category: 'Hatch', priceWeekly: 599, status: 'Disponível' },
  { id: 11, brand: 'RENAULT', name: 'Logan', category: 'Sedan', priceWeekly: 519, status: 'Disponível' },
  { id: 12, brand: 'NISSAN', name: 'Kicks', category: 'SUV', priceWeekly: 849, status: 'Disponível' },
  { id: 13, brand: 'TOYOTA', name: 'Yaris Hatch', category: 'Hatch', priceWeekly: 765, status: 'Disponível' }
];

export default function ContactForm({ onLeadSubmit }) {
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    hasCNH: 'sim-definitiva',
    cnhCategory: 'B',
    vehicleModel: `${defaultVehicles[0].brand} ${defaultVehicles[0].name}`,
    vehicleId: defaultVehicles[0].id,
    planType: 'Semanal',
    appPlatform: 'Uber',
    contactTime: 'Qualquer Horário',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(async (res) => {
        const data = await res.json().catch(() => []);
        const vehicleList = Array.isArray(data) && data.length > 0 ? data : Array.isArray(data?.vehicles) ? data.vehicles : defaultVehicles;

        if (vehicleList.length > 0) {
          setVehicles(vehicleList);
          setFormData(prev => ({
            ...prev,
            vehicleModel: prev.vehicleModel || `${vehicleList[0].brand} ${vehicleList[0].name}`,
            vehicleId: prev.vehicleId || vehicleList[0].id
          }));
        }
      })
      .catch(() => setVehicles(defaultVehicles));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name !== 'vehicleModel') return { ...prev, [name]: value };
      const vehicle = vehicles.find((item) => `${item.brand} ${item.name}` === value);
      return { ...prev, vehicleModel: value, vehicleId: vehicle?.id || prev.vehicleId || 1 };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const activeVehicle = vehicles.find((v) => `${v.brand} ${v.name}` === formData.vehicleModel) || vehicles[0] || defaultVehicles[0];

    const payload = {
      ...formData,
      vehicleId: formData.vehicleId || activeVehicle.id,
      vehicle_id: formData.vehicleId || activeVehicle.id,
      vehicleModel: formData.vehicleModel || `${activeVehicle.brand} ${activeVehicle.name}`,
      vehiclePriceWeekly: activeVehicle.priceWeekly || 0
    };

    const sendToBackend = async () => {
      let res;
      try {
        res = await fetch('/api/proposals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (netErr) {
        try {
          res = await fetch('http://localhost:3001/api/proposals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (directErr) {
          throw new Error('Não foi possível conectar ao servidor backend. Verifique se a API e o banco de dados estão em execução.');
        }
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar proposta no banco de dados');
      return data;
    };

    sendToBackend()
      .then((data) => {
        if (onLeadSubmit) {
          onLeadSubmit({
            ...payload,
            ...(data.proposal || {}),
            status: 'Novo',
            createdAt: new Date().toLocaleString('pt-BR')
          });
        }
        setLoading(false);
        setSubmitted(true);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        alert(err.message || 'Não foi possível salvar seu interesse no banco de dados. Tente novamente.');
      });
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      hasCNH: 'sim-definitiva',
      cnhCategory: 'B',
      vehicleModel: `${vehicles[0]?.brand || 'CHEVROLET'} ${vehicles[0]?.name || 'Onix Plus'}`,
      vehicleId: vehicles[0]?.id || 1,
      planType: 'Semanal',
      appPlatform: 'Uber',
      contactTime: 'Qualquer Horário',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <section id="contato-formulario" className="contact-form-section">
      <div className="container contact-container">
        
        <div className="contact-split">
          {/* Left Column info */}
          <div className="contact-info-col">
            <span className="contact-tag">Formulário de Interesse</span>
            <h2 className="contact-title">Pronto para começar a rodar?</h2>
            <p className="contact-subtitle">
              Preencha seus dados e receba uma proposta personalizada. A análise cadastral leva até 48 horas.
            </p>

            <div className="contact-cards-list">
              <div className="contact-card-item">
                <div className="contact-icon-wrapper">
                  <Mail size={18} />
                </div>
                <div>
                  <h4>Atendimento</h4>
                  <p>contato@optimusexperience.com.br</p>
                </div>
              </div>
              <div className="contact-card-item">
                <div className="contact-icon-wrapper">
                  <Phone size={18} />
                </div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>(11) 4000-0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column form */}
          <div className="contact-form-col">
            <div className="glass-card form-wrapper-card">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="inpage-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Nome completo *</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        placeholder="Seu nome"
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Telefone *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="(11) 90000-0000"
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>E-mail *</label>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="voce@email.com"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Cidade *</label>
                      <input 
                        type="text" 
                        name="city" 
                        placeholder="Sua cidade"
                        value={formData.city} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Possui CNH?</label>
                      <select name="hasCNH" value={formData.hasCNH} onChange={handleChange}>
                        <option value="sim-definitiva">Sim, CNH definitiva</option>
                        <option value="sim-permissao">Sim, permissão para dirigir</option>
                        <option value="nao">Não possuo CNH</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Categoria da CNH</label>
                      <select name="cnhCategory" value={formData.cnhCategory} onChange={handleChange}>
                        <option value="B">B</option>
                        <option value="A">A</option>
                        <option value="AB">AB</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Veículo de interesse</label>
                      <select name="vehicleModel" value={formData.vehicleModel} onChange={handleChange}>
                        {vehicles.map((v) => (
                          <option key={v.id} value={`${v.brand} ${v.name}`}>{v.brand} {v.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Período desejado</label>
                      <select name="planType" value={formData.planType} onChange={handleChange}>
                        <option value="Semanal">Semanal</option>
                        <option value="Quinzenal">Quinzenal</option>
                        <option value="Mensal">Mensal</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Plataforma em que trabalha</label>
                      <select name="appPlatform" value={formData.appPlatform} onChange={handleChange}>
                        <option value="Uber">Uber</option>
                        <option value="99">99</option>
                        <option value="inDrive">inDrive</option>
                        <option value="Outras">Outras plataformas</option>
                        <option value="Nenhuma">Nenhuma / Quero começar</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Melhor horário para contato</label>
                      <select name="contactTime" value={formData.contactTime} onChange={handleChange}>
                        <option value="Qualquer Horário">Qualquer Horário</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mensagem</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      placeholder="Conte um pouco sobre sua necessidade..."
                      value={formData.message} 
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full submit-contact-btn" disabled={loading}>
                    {loading ? (
                      <span>Processando...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Enviar interesse</span>
                      </>
                    )}
                  </button>

                  <p className="form-disclaimer">
                    Ao enviar, você concorda em ser contatado pela equipe Optimus Experience. Dados fictícios para fins de demonstração.
                  </p>
                </form>
              ) : (
                <div className="inpage-success-state">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h3>Interesse Registrado!</h3>
                  <p>
                    Obrigado pelo contato, <strong>{formData.fullName}</strong>. Recebemos seus dados e interesse no veículo <strong>{formData.vehicleModel}</strong>.
                  </p>
                  <p className="success-sub">
                    Nossa equipe entrará em contato via WhatsApp no número <strong>{formData.phone}</strong> no melhor horário de contato ({formData.contactTime.toLowerCase()}) para seguir com sua locação.
                  </p>
                  <button className="btn btn-outline-green" onClick={handleReset}>
                    Enviar outro formulário
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
