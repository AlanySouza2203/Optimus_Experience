import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, CircleAlert, CircleHelp, Headphones, HelpCircle, MoreVertical, Plus, Search, ShieldAlert, Upload, UserCheck, Wrench, X } from 'lucide-react';

const PROBLEM_TYPES = ['Problema mecânico', 'Pane', 'Acidente', 'Pneu furado', 'Necessidade de guincho', 'Dúvida sobre contrato', 'Outro problema'];

const problemTypeIcons = {
  'Problema mecânico': Wrench,
  Pane: CircleAlert,
  Acidente: AlertTriangle,
  'Pneu furado': CircleAlert,
  'Necessidade de guincho': ShieldAlert,
  'Dúvida sobre contrato': Headphones,
  'Outro problema': CircleHelp
};

export default function SupportTab({
  requests = [],
  visibleRequests = [],
  formOpen = false,
  form = {},
  search = '',
  statusFilter = 'Todos os status',
  typeFilter = 'Todos os tipos',
  vehicles = [],
  rentals = [],
  driverName = '',
  setFormOpen,
  setForm,
  setSearch,
  setStatusFilter,
  setTypeFilter,
  closeForm,
  submitForm,
  selectVehicle,
  selectAttachment,
  onForwardToMaintenance,
  onUpdateStatus
}) {
  const [openSupportMenu, setOpenSupportMenu] = useState(null);

  return (
    <div className="tab-pane support-tab-pane">
      <div className="dashboard-header-bar users-topbar">
        <h2 className="view-title">Suporte</h2>
        <div className="dashboard-actions">
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Buscar..." />
          </div>
          <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
          <div className="user-avatar-mini">A</div>
        </div>
      </div>

      <div className="support-heading">
        <div>
          <h2>Suporte</h2>
          <p>Gerencie as solicitações e ocorrências dos motoristas</p>
        </div>
        <button className="btn btn-primary btn-sm support-create-button" onClick={() => setFormOpen(true)}>
          <Plus size={17} /> Nova Solicitação
        </button>
      </div>

      <div className="support-summary-grid">
        <div className="support-summary-card open">
          <AlertTriangle size={19} />
          <strong>{requests.filter((item) => item.status === 'Aberto').length}</strong>
          <span>Abertos</span>
        </div>
        <div className="support-summary-card progress">
          <Headphones size={19} />
          <strong>{requests.filter((item) => item.status === 'Em atendimento').length}</strong>
          <span>Em atendimento</span>
        </div>
        <div className="support-summary-card resolved">
          <CheckCircle2 size={19} />
          <strong>{requests.filter((item) => item.status === 'Resolvido').length}</strong>
          <span>Resolvidos</span>
        </div>
        <div className="support-summary-card urgent">
          <AlertTriangle size={19} />
          <strong>{requests.filter((item) => item.priority === 'Urgente').length}</strong>
          <span>Urgentes</span>
        </div>
      </div>

      <div className="support-toolbar">
        <div className="users-filter support-search">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por protocolo, motorista, veículo..." />
        </div>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option>Todos os status</option>
          <option>Aberto</option>
          <option>Em atendimento</option>
          <option>Aguardando motorista</option>
          <option>Resolvido</option>
        </select>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option>Todos os tipos</option>
          {PROBLEM_TYPES.map((type) => <option key={type}>{type}</option>)}
        </select>
      </div>

      <section className="support-list-card">
        {visibleRequests.length ? (
          <div className="users-table-scroll">
            <table className="support-table">
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Motorista</th>
                  <th>Veículo</th>
                  <th>Tipo</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Origem</th>
                  <th aria-label="Ações" />
                </tr>
              </thead>
              <tbody>
                {visibleRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <strong>{request.protocol}</strong>
                      <small>{request.createdAt}</small>
                    </td>
                    <td>{request.driver || '—'}</td>
                    <td>
                      <strong>{request.vehicleName}</strong>
                      <small>{request.plate || '—'}</small>
                    </td>
                    <td>
                      <span className="support-type"><Wrench size={13} /> {request.type}</span>
                    </td>
                    <td>
                      <span className={`support-priority ${(request.priority || 'Normal').toLocaleLowerCase()}`}>{request.priority}</span>
                    </td>
                    <td>
                      <span className={`support-status ${(request.status || 'Aberto').toLocaleLowerCase().replace(/\s+/g, '-')}`}>{request.status}</span>
                    </td>
                    <td>
                      <span className="support-origin">Motorista</span>
                    </td>
                    <td className="action-menu-cell">
                      <div className="action-dropdown-wrapper">
                        <button
                          className="rental-menu-trigger"
                          onClick={() => setOpenSupportMenu(openSupportMenu === request.id ? null : request.id)}
                          aria-label={`Ações para protocolo ${request.protocol}`}
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openSupportMenu === request.id && (
                          <div className="action-dropdown-menu">
                            <button
                              onClick={() => {
                                setOpenSupportMenu(null);
                                onForwardToMaintenance?.(request);
                              }}
                            >
                              <Wrench size={14} style={{ marginRight: 6 }} />
                              Encaminhar para Manutenção
                            </button>
                            <button
                              onClick={() => {
                                setOpenSupportMenu(null);
                                onUpdateStatus?.(request.id, 'Em atendimento');
                              }}
                            >
                              Marcar em atendimento
                            </button>
                            <button
                              onClick={() => {
                                setOpenSupportMenu(null);
                                onUpdateStatus?.(request.id, 'Resolvido');
                              }}
                            >
                              Marcar como Resolvido
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="support-empty-state">
            <Headphones size={28} />
            <h3>Nenhuma solicitação cadastrada</h3>
            <p>As solicitações de suporte registradas aparecerão aqui.</p>
          </div>
        )}
      </section>

      {formOpen && (
        <div className="user-form-overlay" onClick={closeForm}>
          <form className="support-form-modal" onSubmit={submitForm} onClick={(event) => event.stopPropagation()}>
            <div className="user-form-header">
              <h3>Nova Solicitação de Suporte</h3>
              <button type="button" onClick={closeForm}><X size={20} /></button>
            </div>
            <div className="support-form-content">
              <h4><UserCheck size={16} /> Identificação</h4>
              <div className="user-form-row">
                <label className="user-form-field">Motorista *
                  <select required value={form.driver} onChange={(event) => setForm({ ...form, driver: event.target.value })}>
                    <option value="">Selecione o motorista</option>
                    {driverName && <option value={driverName}>{driverName}</option>}
                  </select>
                </label>
                <label className="user-form-field">Veículo *
                  <select required value={form.vehicle} onChange={(event) => selectVehicle(event.target.value)}>
                    <option value="">Selecione o veículo</option>
                    {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.brand} {vehicle.name}</option>)}
                  </select>
                </label>
              </div>
              <div className="user-form-row">
                <label className="user-form-field">Placa
                  <input value={form.plate} onChange={(event) => setForm({ ...form, plate: event.target.value })} placeholder="ABC-1D23" />
                </label>
                <label className="user-form-field">Locação relacionada
                  <select value={form.rental} onChange={(event) => setForm({ ...form, rental: event.target.value })}>
                    <option>Nenhuma</option>
                    {rentals.map((rental) => <option key={rental.id}>{rental.driver} — {rental.vehicle}</option>)}
                  </select>
                </label>
              </div>

              <h4><HelpCircle size={16} /> Tipo de problema</h4>
              <div className="support-type-grid">
                {PROBLEM_TYPES.map((type) => {
                  const Icon = problemTypeIcons[type] || HelpCircle;
                  return (
                    <button type="button" key={type} className={form.type === type ? 'selected' : ''} onClick={() => setForm({ ...form, type })}>
                      <Icon size={17} /> {type}
                    </button>
                  );
                })}
              </div>

              <label className="user-form-field full">Descrição do problema *
                <textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Descreva o problema ocorrido..." />
              </label>
              <label className="user-form-field full">Local da ocorrência
                <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Ex: Av. Paulista, 1000 – São Paulo/SP" />
              </label>
              <div className="user-form-row">
                <label className="user-form-field">Prioridade
                  <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                    <option>Urgente</option>
                  </select>
                </label>
                <label className="user-form-field">Status
                  <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                    <option>Aberto</option>
                    <option>Em atendimento</option>
                    <option>Aguardando motorista</option>
                    <option>Resolvido</option>
                  </select>
                </label>
              </div>

              <h4><Headphones size={16} /> Atendimento</h4>
              <label className="user-form-field full">Responsável
                <input value={form.responsible} onChange={(event) => setForm({ ...form, responsible: event.target.value })} placeholder="Nome do responsável" />
              </label>
              <label className="user-form-field full">Observações de atendimento
                <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Anotações do atendimento..." />
              </label>

              <h4><Upload size={16} /> Anexos</h4>
              <div className="support-attachments">
                {(form.attachments || []).map((attachment, index) => (
                  <label key={index}>
                    <span>Anexo {index + 1}</span>
                    <div>
                      {attachment?.preview ? <img src={attachment.preview} alt={`Anexo ${index + 1}`} /> : <Upload size={21} />}
                      <small>{attachment ? attachment.file.name : 'Clique para tirar/enviar foto'}</small>
                    </div>
                    <input type="file" accept="image/*,application/pdf" onChange={(event) => selectAttachment(index, event.target.files?.[0] || null)} />
                  </label>
                ))}
              </div>
            </div>
            <div className="user-form-actions">
              <button type="button" className="btn btn-secondary" onClick={closeForm}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Registrar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
