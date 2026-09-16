import React, { useMemo, useState } from 'react';
import { Bell, CheckCheck, ChevronDown, Clock3, MoreHorizontal, Search, TriangleAlert } from 'lucide-react';
import './NotificationsTab.css';

const tabs = ['Todas', 'Não lidas', 'Urgentes', 'Financeiro', 'Frota', 'Documentos', 'Contratos', 'Manutenção'];
const meta = { urgent: ['Urgente', '●'], attention: ['Atenção', '●'], info: ['Informativa', '●'], resolved: ['Resolvida', '●'] };

export default function NotificationsTab({ notifications: items, onMarkRead, onMarkAllRead, onNavigate }) {
  const [query, setQuery] = useState(''); const [tab, setTab] = useState('Todas'); const [type, setType] = useState('Todos os tipos'); const [more, setMore] = useState(false);
  const unread = items.filter((item) => item.unread).length;
  const visible = useMemo(() => items.filter((item) => {
    const text = `${item.title} ${item.subject} ${item.description}`.toLowerCase();
    const tabMatch = tab === 'Todas' || (tab === 'Não lidas' && item.unread) || (tab === 'Urgentes' && item.level === 'urgent') || (tab === 'Manutenção' && item.target === 'maintenance') || item.category === tab;
    return text.includes(query.toLowerCase()) && tabMatch && (type === 'Todos os tipos' || item.category === type);
  }), [items, query, tab, type]);
  const summary = (level) => items.filter((item) => item.level === level).length;
  return <div className="notifications-page">
    <header className="notifications-heading"><div><div className="notifications-title-row"><Bell size={23} /><h2>Notificações</h2></div><p>Acompanhe automaticamente os acontecimentos importantes da operação.</p></div><div className="notifications-heading-actions"><button className="notification-more-button" onClick={() => setMore(!more)}><MoreHorizontal size={18} /> Mais opções</button>{more && <div className="notification-more-menu"><button onClick={() => window.print()}>Exportar notificações</button></div>}<button className="mark-read-button" disabled={!unread} onClick={onMarkAllRead}><CheckCheck size={17} /> Marcar todas como lidas</button></div></header>
    <section className="notification-summary-grid"><Summary level="urgent" count={summary('urgent')} label="Urgentes" /><Summary level="attention" count={summary('attention')} label="Atenção" /><Summary level="info" count={summary('info')} label="Informativas" /><Summary level="resolved" count={summary('resolved')} label="Resolvidas" /></section>
    <section className="notification-controls"><label className="notification-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar notificações" /></label><label className="notification-select"><Clock3 size={16} /><select><option>Todos os períodos</option><option>Hoje</option><option>Últimos 7 dias</option></select><ChevronDown size={14} /></label><label className="notification-select"><TriangleAlert size={16} /><select value={type} onChange={(event) => setType(event.target.value)}><option>Todos os tipos</option><option>Financeiro</option><option>Frota</option><option>Documentos</option><option>Contratos</option><option>Suporte</option><option>Vistorias</option></select><ChevronDown size={14} /></label></section>
    <nav className="notification-filter-tabs">{tabs.map((label) => <button key={label} className={tab === label ? 'active' : ''} onClick={() => setTab(label)}>{label}{label === 'Não lidas' && unread > 0 && <span>{unread}</span>}</button>)}</nav>
    <section className="notification-list-card"><div className="notification-list-header"><h3>Alertas recentes</h3><p>{items.length} notificações · {unread} não lidas</p></div>{visible.length ? <div>{visible.map((item) => <article key={item.id} className={`notification-item ${item.unread ? 'unread' : ''}`}><div className={`notification-level ${item.level}`}>{meta[item.level][1]}</div><div><div className="notification-item-heading"><div><h4>{item.title}</h4><strong>{item.subject}</strong></div>{item.unread && <span className="unread-label">N�O LIDA</span>}</div><p>{item.description}</p><div className="notification-item-footer"><time>{item.time}</time><button onClick={() => { onMarkRead(item.id); onNavigate(item.target); }}>{item.action} →</button></div></div></article>)}</div> : <div className="notifications-empty"><Bell size={28} /><h3>Nenhuma notificação encontrada</h3><p>Os alertas dos módulos administrativos aparecerão aqui automaticamente.</p></div>}</section>
  </div>;
}
function Summary({ level, count, label }) { return <div className={`notification-summary-card ${level}`}><span>{meta[level][1]}</span><strong>{count}</strong><p>{label}</p></div>; }

