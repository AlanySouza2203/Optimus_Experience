import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, CircleAlert, CircleHelp, Headphones, MapPin, Paperclip, Send, ShieldAlert, Wrench, X } from 'lucide-react';
import './DriverSupportModal.css';

const CURRENT_VEHICLE = { name: 'Renault Kwid', plate: 'ABC-1D23' };
const problemTypes = [
  ['Problema mec�nico', Wrench], ['Pane', CircleAlert], ['Acidente', AlertTriangle],
  ['Pneu furado', CircleAlert], ['Necessidade de guincho', ShieldAlert],
  ['Dúvida sobre contrato', Headphones], ['Outro problema', CircleHelp]
];

const statusClass = (status) => status.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '-');

export default function DriverSupportModal({ isOpen, onClose, requests, onCreateRequest }) {
  const [screen, setScreen] = useState('list');
  const initialForm = { driver: '', vehicle: CURRENT_VEHICLE.name, plate: CURRENT_VEHICLE.plate, type: 'Problema mecânico', description: '', location: '', photo: null };
  const [form, setForm] = useState(initialForm);
  const [createdRequest, setCreatedRequest] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const protocol = useMemo(() => `SUP-${String(26 + requests.length).padStart(4, '0')}`, [requests.length]);

  if (!isOpen) return null;

  const close = () => { setScreen('list'); setCreatedRequest(null); onClose(); };
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const request = {
      id: Date.now(), protocol, driver: form.driver, vehicle: form.vehicle,
      vehicleName: form.vehicle, plate: form.plate, rental: 'Locação atual',
      type: form.type, description: form.description, location: form.location, priority: 'Média',
      status: 'Aberto', responsible: '', notes: '', attachments: form.photo ? [{ file: form.photo, preview: URL.createObjectURL(form.photo) }] : [],
      createdAt: new Date().toLocaleString('pt-BR')
    };

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverId: null,
          driverName: form.driver,
          vehicleName: form.vehicle,
          plate: form.plate,
          requestType: form.type,
          description: form.description,
          location: form.location,
          protocol,
          priority: 'Média',
          status: 'Aberto'
        })
      });

      if (!response.ok) {
        throw new Error('Não foi possível salvar o suporte.');
      }

      const data = await response.json();
      const savedRequest = {
        ...request,
        id: data.support?.id || request.id,
        protocol: data.support?.protocol || protocol,
        createdAt: data.support?.createdAt || request.createdAt
      };

      if (onCreateRequest) {
        onCreateRequest(savedRequest);
      }

      setCreatedRequest(savedRequest);
      setForm(initialForm);
      setScreen('success');
    } catch (error) {
      console.error(error);
      alert('Não foi possível enviar sua solicitação de suporte. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="driver-support-overlay" onClick={close}>
    <section className="driver-support-modal" onClick={(event) => event.stopPropagation()} aria-label="Meu Suporte">
      <header className="driver-support-header"><div><span>Área do motorista</span><h2>Meu Suporte</h2></div><button type="button" onClick={close} aria-label="Fechar"><X size={21} /></button></header>

      {screen === 'list' && <div className="driver-support-content">
        <section className="driver-help-card"><div className="driver-help-icon"><Headphones size={23} /></div><div><strong>Precisa de ajuda?</strong><p>Veículo atual: {CURRENT_VEHICLE.name} · {CURRENT_VEHICLE.plate}</p></div><button className="driver-support-primary" type="button" onClick={() => setScreen('form')}>Solicitar suporte</button></section>
        <div className="driver-support-title"><div><h3>Minhas solicitações</h3><p>Acompanhe cada chamado aberto por você.</p></div></div>
        {requests.length ? <div className="driver-request-list">{requests.map((request) => <article className="driver-request-card" key={request.id}>
          <div className="driver-request-top"><strong>{request.protocol}</strong><span className={`driver-request-status ${statusClass(request.status)}`}>{request.status}</span></div>
          <div className="driver-request-type">{request.type}</div><p>{request.description}</p>
          <div className="driver-request-meta"><span>{request.vehicleName || CURRENT_VEHICLE.name} · {request.plate || CURRENT_VEHICLE.plate}</span><span>{request.createdAt}</span></div>
          {request.notes && <div className="driver-request-notes"><b>Atendimento</b><span>{request.notes}</span></div>}
        </article>)}</div> : <div className="driver-support-empty"><Headphones size={30} /><h3>Nenhuma solicitação ainda</h3><p>Quando precisar, abra um chamado para a equipe ajudar.</p></div>}
      </div>}

      {screen === 'form' && <form className="driver-support-content driver-support-form" onSubmit={submit}>
        <button type="button" className="driver-back" onClick={() => setScreen('list')}>← Voltar</button>
        <div><h3>Solicitar suporte</h3><p>Conte o que aconteceu. A equipe receberá seu chamado imediatamente.</p></div>
        <label>Nome do motorista *<input required value={form.driver} onChange={(event) => setForm({ ...form, driver: event.target.value })} placeholder="Informe seu nome" /></label>
        <div className="driver-vehicle-fields"><label>Veículo atual *<input required value={form.vehicle} onChange={(event) => setForm({ ...form, vehicle: event.target.value })} /></label><label>Placa *<input required value={form.plate} onChange={(event) => setForm({ ...form, plate: event.target.value.toUpperCase() })} /></label></div>
        <fieldset><legend>Tipo de problema</legend><div className="driver-problem-grid">{problemTypes.map(([type, Icon]) => <button type="button" key={type} className={form.type === type ? 'selected' : ''} onClick={() => setForm({ ...form, type })}><Icon size={18} />{type}</button>)}</div></fieldset>
        <label>Descrição do que aconteceu *<textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Descreva o problema..." /></label>
        <label>Onde você está? *<div className="driver-input-icon"><MapPin size={18} /><input required value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Ex.: Av. Paulista, 1000 - São Paulo/SP" /></div></label>
        <label className="driver-photo-input"><Paperclip size={18} /><span>{form.photo ? form.photo.name : 'Adicionar foto (opcional)'}</span><input type="file" accept="image/*" onChange={(event) => setForm({ ...form, photo: event.target.files?.[0] || null })} /></label>
        <button className="driver-support-primary driver-submit" type="submit"><Send size={18} />Enviar solicitação</button>
      </form>}

      {screen === 'success' && <div className="driver-support-content driver-support-success"><div className="driver-success-icon"><CheckCircle2 size={42} /></div><h3>Solicitação enviada!</h3><p>Seu chamado foi encaminhado para a equipe de suporte.</p><strong>{createdRequest?.protocol}</strong><small>Entraremos em contato</small></div>}
    </section>
  </div>;
}

