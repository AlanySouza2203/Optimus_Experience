import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Car, Send, ShieldCheck, Phone, User, CreditCard, MapPin } from 'lucide-react';
import './ProposalModal.css';

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

export default function ProposalModal({ isOpen, onClose, selectedVehicle, initialPlan = 'Semanal', onLeadSubmit }) {
  const [vehicleOptions, setVehicleOptions] = useState(defaultVehicles);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    cpf: '',
    city: '',
    vehicleModel: selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.name}` : '',
    vehicleId: selectedVehicle?.id ? String(selectedVehicle.id) : '',
    vehiclePriceWeekly: selectedVehicle ? Number(selectedVehicle.priceWeekly || 0) : 0,
    planType: initialPlan,
    hasEAR: 'sim',
    isRegisteredApp: 'sim'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVehicleOptions = async () => {
      try {
        const response = await fetch('/api/vehicles');
        const data = await response.json().catch(() => []);
        const vehicleList = Array.isArray(data) && data.length > 0 ? data : defaultVehicles;
        const availableVehicles = vehicleList.filter((vehicle) => !vehicle.status || vehicle.status === 'Disponível');
        setVehicleOptions(availableVehicles.length > 0 ? availableVehicles : defaultVehicles);
      } catch (error) {
        setVehicleOptions(defaultVehicles);
      }
    };

    loadVehicleOptions();
  }, []);

  const calculatePlanValue = (vehicle, plan) => {
    const baseValue = Number(vehicle?.priceWeekly || 0);
    if (!baseValue) return 0;

    if (plan === 'Quinzenal') {
      return Number((baseValue * (15 / 7) * 0.92).toFixed(2));
    }

    if (plan === 'Mensal') {
      return Number((baseValue * 4 * 0.95).toFixed(2));
    }

    return Number(baseValue.toFixed(2));
  };

  useEffect(() => {
    if (selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehicleModel: `${selectedVehicle.brand} ${selectedVehicle.name}`,
        vehicleId: String(selectedVehicle.id),
        vehiclePriceWeekly: Number(selectedVehicle.priceWeekly || 0),
        planType: initialPlan || 'Semanal'
      }));
    } else if (vehicleOptions.length > 0) {
      const firstVehicle = vehicleOptions[0];
      setFormData(prev => ({
        ...prev,
        vehicleModel: prev.vehicleModel || `${firstVehicle.brand} ${firstVehicle.name}`,
        vehicleId: prev.vehicleId || String(firstVehicle.id),
        vehiclePriceWeekly: prev.vehiclePriceWeekly || Number(firstVehicle.priceWeekly || 0),
        planType: initialPlan || 'Semanal'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        planType: initialPlan || 'Semanal'
      }));
    }
  }, [selectedVehicle, initialPlan, vehicleOptions]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const targetVehicleId = name === 'vehicleId' ? value : prev.vehicleId;
      const matchedVehicle = vehicleOptions.find((vehicle) => String(vehicle.id) === String(targetVehicleId)) || selectedVehicle;
      const currentVehicle = matchedVehicle || vehicleOptions.find((vehicle) => `${vehicle.brand} ${vehicle.name}` === prev.vehicleModel) || selectedVehicle;
      const nextVehiclePrice = currentVehicle ? Number(currentVehicle.priceWeekly || 0) : Number(prev.vehiclePriceWeekly || 0);
      const nextPlanType = name === 'planType' ? value : prev.planType;
      const computedPlanValue = calculatePlanValue(currentVehicle || { priceWeekly: nextVehiclePrice }, nextPlanType);

      return {
        ...prev,
        [name]: value,
        vehicleId: targetVehicleId,
        vehicleModel: currentVehicle ? `${currentVehicle.brand} ${currentVehicle.name}` : prev.vehicleModel,
        vehiclePriceWeekly: nextVehiclePrice,
        vehicleValue: computedPlanValue
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedVehicleMatch = vehicleOptions.find((vehicle) => String(vehicle.id) === String(formData.vehicleId)) || selectedVehicle || vehicleOptions[0];
    if (!selectedVehicleMatch?.id) {
      setLoading(false);
      alert('Selecione um veículo cadastrado antes de enviar.');
      return;
    }
    const customerPlan = formData.planType || initialPlan || 'Semanal';
    const vehicleValue = calculatePlanValue(selectedVehicleMatch || { priceWeekly: Number(formData.vehiclePriceWeekly || 0) }, customerPlan);
    const selectedVehicleName = selectedVehicleMatch ? `${selectedVehicleMatch.brand} ${selectedVehicleMatch.name}` : formData.vehicleModel;

    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      whatsapp: formData.whatsapp || formData.phone,
      city: formData.city,
      cnhCategory: 'B',
      vehicleModel: selectedVehicleName || formData.vehicleModel,
      vehicle_id: selectedVehicleMatch.id,
      vehicleBrand: selectedVehicleMatch ? selectedVehicleMatch.brand : (formData.vehicleModel || '').split(' ')[0],
      vehicleYear: selectedVehicleMatch ? selectedVehicleMatch.year : '2024',
      vehicleCategory: selectedVehicleMatch ? selectedVehicleMatch.category : 'Econômico',
      vehiclePriceWeekly: vehicleValue,
      vehicleValue: vehicleValue,
      priceWeekly: vehicleValue,
      vehicleImage: selectedVehicleMatch ? selectedVehicleMatch.image : '',
      vehicleStatus: selectedVehicleMatch ? selectedVehicleMatch.status : 'Disponível',
      planType: customerPlan,
      appPlatform: formData.isRegisteredApp === 'sim' ? 'Uber/99' : 'Quero começar',
      contactTime: 'Qualquer Horário',
      message: `CPF: ${formData.cpf} | CNH EAR: ${formData.hasEAR} | Valor estimado: ${vehicleValue}`
    };

    fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar proposta');
        return res.json();
      })
      .then((data) => {
        if (onLeadSubmit) {
          onLeadSubmit({
            ...formData,
            ...(data.proposal || {}),
            status: 'Novo',
            createdAt: new Date().toLocaleString('pt-BR'),
            fullName: formData.fullName,
            email: payload.email,
            city: formData.city,
            phone: formData.phone,
            vehicleModel: payload.vehicleModel,
            vehicleBrand: payload.vehicleBrand,
            vehicleYear: payload.vehicleYear,
            vehicleCategory: payload.vehicleCategory,
            vehiclePriceWeekly: payload.vehiclePriceWeekly,
            vehicleImage: payload.vehicleImage,
            planType: customerPlan,
            appPlatform: payload.appPlatform,
            cnhCategory: 'B',
            cpf: formData.cpf,
            hasEAR: formData.hasEAR,
            message: payload.message,
            vehicleValue: vehicleValue,
            status: 'Novo'
          });
        }
        setLoading(false);
        setSubmitted(true);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        alert('Não foi possível salvar seu interesse. O cadastro não foi concluído. Tente novamente.');
      });
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleResetAndClose} aria-label="Fechar">
          <X size={22} />
        </button>

        {!submitted ? (
          <div>
            <div className="modal-header">
              <div className="modal-badge">
                <Car size={16} />
                <span>Solicitação Sem Compromisso</span>
              </div>
              <h2 className="modal-title">Receber Proposta de Aluguel</h2>
              <p className="modal-subtitle">
                Preencha seus dados abaixo para que nossa equipe da <strong>Optimus Experience</strong> consulte a disponibilidade da frota.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="proposal-form">
              {/* Vehicle & Plan Choice */}
              <div className="form-row grid-2">
                <div className="form-group">
                  <label className="form-label">Modelo Desejado</label>
                  <select 
                    name="vehicleId" 
                    value={formData.vehicleId}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Selecione o veículo</option>
                    {vehicleOptions.map((vehicle) => (
                      <option key={vehicle.id} value={String(vehicle.id)}>
                        {vehicle.brand} {vehicle.name} (R$ {Number(vehicle.priceWeekly || 0)}/sem)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp</label>
                  <div className="input-icon-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="form-input with-icon"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="voce@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Plano Preferido</label>
                  <select 
                    name="planType" 
                    value={formData.planType}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="Semanal">Plano Semanal</option>
                    <option value="Quinzenal">Plano Quinzenal (-5% Desc.)</option>
                    <option value="Mensal">Plano Mensal (-10% Desc.)</option>
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <div className="input-icon-wrapper">
                  <User className="input-icon" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Ex: João da Silva Santos"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input with-icon"
                    required
                  />
                </div>
              </div>

              <div className="form-row grid-2">
                <div className="form-group">
                  <label className="form-label">WhatsApp com DDD</label>
                  <div className="input-icon-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input with-icon"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">CPF</label>
                  <div className="input-icon-wrapper">
                    <CreditCard className="input-icon" size={18} />
                    <input 
                      type="text" 
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="form-input with-icon"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cidade / Estado</label>
                <div className="input-icon-wrapper">
                  <MapPin className="input-icon" size={18} />
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Ex: São Paulo - SP"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input with-icon"
                    required
                  />
                </div>
              </div>

              {/* App Status Radios */}
              <div className="form-row grid-2">
                <div className="form-group">
                  <label className="form-label">Possui CNH com EAR?</label>
                  <select 
                    name="hasEAR" 
                    value={formData.hasEAR} 
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="sim">Sim, CNH definitiva com EAR</option>
                    <option value="em-processo">Em processo de inclusão</option>
                    <option value="nao">Não possuo EAR ainda</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Já roda na Uber/99?</label>
                  <select 
                    name="isRegisteredApp" 
                    value={formData.isRegisteredApp} 
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="sim">Sim, cadastro ativo</option>
                    <option value="novo">Quero começar agora</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <span>Enviando dados...</span>
                ) : (
                  <>
                    <span>Enviar e Receber Proposta</span>
                    <Send size={18} />
                  </>
                )}
              </button>

              <div className="form-security-note">
                <ShieldCheck size={14} className="shield-icon" />
                <span>Seus dados estão 100% protegidos com criptografia da Optimus Experience.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="success-state">
            <div className="success-icon-box">
              <CheckCircle2 size={54} />
            </div>
            <h2 className="success-title">Proposta Solicitada com Sucesso!</h2>
            <p className="success-msg">
              Obrigado, <strong>{formData.fullName}</strong>! Recebemos seu interesse no veículo <strong>{formData.vehicleModel}</strong>.
            </p>
            <p className="success-submsg">
              Nossos consultores da <strong>Optimus Experience</strong> entrarão em contato via WhatsApp no número <strong>{formData.phone}</strong> em até 15 minutos para finalizar seu cadastro e agendar a retirada!
            </p>

            <button className="btn btn-primary btn-full" onClick={handleResetAndClose}>
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
