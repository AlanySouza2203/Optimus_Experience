import React, { useEffect, useState } from 'react';
import { Bell, Building2, Check, ChevronRight, CircleUserRound, KeyRound, LockKeyhole, Pencil, Plus, ShieldCheck, SlidersHorizontal, Users, X } from 'lucide-react';
import './SettingsTab.css';

const navigation = [
  ['employees', 'Funcionários', Users], ['profiles', 'Perfis de acesso', ShieldCheck], ['permissions', 'Permissões', KeyRound], ['company', 'Dados da empresa', Building2], ['notifications', 'Preferências de notificações', Bell], ['security', 'Segurança', LockKeyhole], ['me', 'Meu perfil', CircleUserRound]
];
const initialEmployees = [
  { id: 1, name: 'Ana Souza', email: 'ana.souza@drivefleet.com.br', role: 'Gerente', profile: 'Administrador', status: 'Ativo', department: 'Gestão' },
  { id: 2, name: 'Carlos Lima', email: 'carlos.lima@drivefleet.com.br', role: 'Analista financeiro', profile: 'Financeiro', status: 'Ativo', department: 'Financeiro' },
  { id: 3, name: 'Mariana Costa', email: 'mariana.costa@drivefleet.com.br', role: 'Atendimento', profile: 'Atendimento', status: 'Ativo', department: 'Atendimento' },
  { id: 4, name: 'João Silva', email: 'joao.silva@drivefleet.com.br', role: 'Operador', profile: 'Operador de Frota', status: 'Inativo', department: 'Frota' }
];
const profiles = [['Administrador', 2, 'Todas as permissões'], ['Gestor', 3, '28 permissões'], ['Financeiro', 4, '12 permissões'], ['Operador de Frota', 8, '18 permissões'], ['Atendimento', 7, '14 permissões']];
const permissionModules = ['Dashboard', 'Motoristas', 'Clientes', 'Frota', 'Locações', 'Contratos', 'Vistorias', 'Manutenções', 'Multas', 'Sinistros', 'Suporte', 'Cobranças', 'Pagamentos', 'Relatórios', 'Notificações', 'Auditoria', 'Configurações'];
const notificationRules = { Financeiro: ['Cobrança vencida', 'Cobrança próxima do vencimento', 'Pagamento recebido', 'Inadimplência'], Frota: ['Manutenção próxima', 'Manutenção atrasada', 'Documento do veículo vencendo', 'Documento vencido', 'Vistoria pendente', 'Novo sinistro', 'Nova multa'], Contratos: ['Contrato próximo do vencimento', 'Contrato vencido', 'Renovação pendente'], Atendimento: ['Novo interessado', 'Nova solicitação de suporte'] };

export default function SettingsTab({ currentUser, permissionsByProfile, onPermissionsSave, onLogout }) {
  const [section, setSection] = useState('employees'); const [employees, setEmployees] = useState(initialEmployees); const [modal, setModal] = useState(false); const [menu, setMenu] = useState(null); const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ name: '', cpf: '', phone: '', email: '', role: '', department: 'Administração', profile: 'Atendimento', status: 'Ativo', admission: '', registration: '' });
  const [company, setCompany] = useState({ name: 'DriveFleet Locação de Veículos Ltda.', cnpj: '12.345.678/0001-90', email: 'contato@drivefleet.com.br', phone: '(11) 4000-1234', zip: '01310-100', address: 'Avenida Paulista', number: '1000', complement: '', district: 'Bela Vista', city: 'São Paulo', state: 'SP' });
  const [rules, setRules] = useState(() => Object.fromEntries(Object.values(notificationRules).flat().map((rule) => [rule, true])));
  const [security, setSecurity] = useState({ expire: '30 minutos', changePassword: true, resetPassword: true, blockAttempts: true });
  const save = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  const submitEmployee = (event) => { event.preventDefault(); setEmployees((items) => [...items, { id: Date.now(), ...form }]); setModal(false); setForm({ name: '', cpf: '', phone: '', email: '', role: '', department: 'Administração', profile: 'Atendimento', status: 'Ativo', admission: '', registration: '' }); save('Funcionário cadastrado com sucesso.'); };
  const toggleEmployee = (employee) => { setEmployees((items) => items.map((item) => item.id === employee.id ? { ...item, status: item.status === 'Ativo' ? 'Inativo' : 'Ativo' } : item)); setMenu(null); save('Status de acesso atualizado.'); };
  const stats = { total: employees.length, active: employees.filter((employee) => employee.status === 'Ativo').length, inactive: employees.filter((employee) => employee.status === 'Inativo').length, admins: employees.filter((employee) => employee.profile === 'Administrador').length };
  return <div className="settings-page">
    <header className="settings-header"><div><h2>Configurações</h2><p>Gerencie usuários, permissões e preferências do sistema.</p></div>{notice && <span className="settings-toast"><Check size={15} /> {notice}</span>}</header>
    <div className="settings-layout"><nav className="settings-nav">{navigation.map(([key, label, Icon]) => <button key={key} onClick={() => setSection(key)} className={section === key ? 'active' : ''}><Icon size={17} />{label}<ChevronRight size={15} /></button>)}</nav><main className="settings-content">
      {section === 'employees' && <Employees employees={employees} stats={stats} menu={menu} setMenu={setMenu} onNew={() => setModal(true)} onToggle={toggleEmployee} />}
      {section === 'profiles' && <Profiles onSave={save} />}
      {section === 'permissions' && <Permissions onSave={save} permissionsByProfile={permissionsByProfile} onPermissionsSave={onPermissionsSave} />}
      {section === 'company' && <Company company={company} setCompany={setCompany} onSave={save} />}
      {section === 'notifications' && <NotificationRules rules={rules} setRules={setRules} onSave={save} />}
      {section === 'security' && <Security settings={security} setSettings={setSecurity} onSave={save} />}
      {section === 'me' && <MyProfile user={currentUser} onSave={save} onLogout={onLogout} />}
    </main></div>
    {modal && <EmployeeModal form={form} setForm={setForm} onClose={() => setModal(false)} onSubmit={submitEmployee} />}
  </div>;
}

function SectionHeader({ icon: Icon, title, text, action }) { return <div className="settings-section-header"><div><span className="settings-section-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{text}</p></div></div>{action}</div>; }
function Employees({ employees, stats, menu, setMenu, onNew, onToggle }) { return <><SectionHeader icon={Users} title="Funcionários" text="Gerencie os usuários que possuem acesso à área administrativa." /><div className="settings-stats">{[[stats.total, 'Total de funcionários'], [stats.active, 'Ativos'], [stats.inactive, 'Inativos'], [stats.admins, 'Administradores']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><section className="settings-table-card"><table><thead><tr><th>Funcionário</th><th>Cargo</th><th>Perfil</th><th>Status</th><th /></tr></thead><tbody>{employees.map((employee) => <tr key={employee.id}><td><span className="employee-avatar">{employee.name.charAt(0)}</span><div><strong>{employee.name}</strong><small>{employee.email}</small></div></td><td>{employee.role}<small>{employee.department}</small></td><td><span className="profile-tag">{employee.profile}</span></td><td><span className={`access-status ${employee.status.toLowerCase()}`}>{employee.status}</span></td><td className="employee-actions"><button onClick={() => setMenu(menu === employee.id ? null : employee.id)}>•••</button>{menu === employee.id && <div className="employee-menu"><button>Visualizar</button><button>Editar</button><button>Alterar permissões</button><button onClick={() => onToggle(employee)}>{employee.status === 'Ativo' ? 'Inativar acesso' : 'Ativar acesso'}</button><button>Redefinir acesso</button></div>}</td></tr>)}</tbody></table></section></>; }
function Profiles({ onSave }) { return <><SectionHeader icon={ShieldCheck} title="Perfis de acesso" text="Defina os níveis de acesso dos usuários administrativos." action={<button className="settings-primary" onClick={() => onSave('Novo perfil preparado para configuração.')}><Plus size={16} /> Novo perfil</button>} /><section className="settings-table-card"><table><thead><tr><th>Perfil</th><th>Usuários</th><th>Permissões</th><th>Status</th><th /></tr></thead><tbody>{profiles.map(([profile, users, permissions]) => <tr key={profile}><td><strong>{profile}</strong></td><td>{users}</td><td>{permissions}</td><td><span className="access-status ativo">Ativo</span></td><td><button className="settings-link" onClick={() => onSave(`Perfil ${profile} selecionado.`)}>Editar</button></td></tr>)}</tbody></table></section></>; }
function Permissions({ onSave, permissionsByProfile, onPermissionsSave }) {
  const [profile, setProfile] = useState('Administrador');
  const [draftPermissions, setDraftPermissions] = useState(permissionsByProfile);
  const [saving, setSaving] = useState(false);
  useEffect(() => setDraftPermissions(permissionsByProfile), [permissionsByProfile]);
  const permissions = draftPermissions[profile];
  const toggle = (module, action) => setDraftPermissions((state) => ({ ...state, [profile]: { ...state[profile], [module]: { ...state[profile][module], [action]: !state[profile][module][action] } } }));
  const savePermissions = async () => {
    setSaving(true);
    try { await onPermissionsSave(draftPermissions); onSave(`Permissões do perfil ${profile} salvas no banco de dados.`); }
    catch { onSave('Não foi possível salvar as permissões no banco de dados.'); }
    finally { setSaving(false); }
  };
  return <><SectionHeader icon={KeyRound} title="Permissões por módulo" text="As alterações só serão aplicadas depois de salvar no banco de dados." action={<select className="settings-profile-select" value={profile} onChange={(event) => setProfile(event.target.value)}>{profiles.map(([name]) => <option key={name}>{name}</option>)}</select>} /><div className="permission-actions"><span>Visualizar</span><span>Criar</span><span>Editar</span><span>Excluir</span><span>Aprovar</span></div><section className="permission-list">{permissionModules.map((module) => <div key={module}><strong>{module}</strong>{['view', 'create', 'edit', 'delete', 'approve'].map((action) => <label key={action}><input type="checkbox" checked={Boolean(permissions?.[module]?.[action])} disabled={profile === 'Administrador' || (module === 'Auditoria' && action !== 'view')} onChange={() => toggle(module, action)} /><span /></label>)}</div>)}</section><button className="settings-primary" disabled={saving} onClick={savePermissions}>{saving ? 'Salvando...' : 'Salvar permissões'}</button></>;
}
function Company({ company, setCompany, onSave }) { return <><SectionHeader icon={Building2} title="Dados da empresa" text="Informações básicas da operação." /><div className="settings-form-grid">{[['name', 'Nome da empresa'], ['cnpj', 'CNPJ'], ['email', 'E-mail'], ['phone', 'Telefone'], ['zip', 'CEP'], ['address', 'Endereço'], ['number', 'Número'], ['complement', 'Complemento'], ['district', 'Bairro'], ['city', 'Cidade'], ['state', 'Estado']].map(([key, label]) => <label key={key}>{label}<input value={company[key]} onChange={(event) => setCompany({ ...company, [key]: event.target.value })} /></label>)}</div><button className="settings-primary" onClick={() => onSave('Dados da empresa salvos.')}>Salvar alterações</button></>; }
function NotificationRules({ rules, setRules, onSave }) { return <><SectionHeader icon={Bell} title="Preferências de notificações" text="Defina quais acontecimentos geram alertas para este perfil." />{Object.entries(notificationRules).map(([group, entries]) => <section className="notification-rule-group" key={group}><h4>{group}</h4>{entries.map((entry) => <label key={entry}><input type="checkbox" checked={rules[entry]} onChange={() => setRules({ ...rules, [entry]: !rules[entry] })} /><span />{entry}</label>)}</section>)}<button className="settings-primary" onClick={() => onSave('Preferências de notificações salvas.')}>Salvar preferências</button></>; }
function Security({ settings, setSettings, onSave }) { return <><SectionHeader icon={LockKeyhole} title="Segurança" text="Controle de acesso e proteção da conta." /><div className="security-card"><label>Tempo de sessão<select value={settings.expire} onChange={(event) => setSettings({ ...settings, expire: event.target.value })}><option>15 minutos</option><option>30 minutos</option><option>1 hora</option><option>4 horas</option></select></label>{[['changePassword', 'Exigir alteração de senha'], ['resetPassword', 'Permitir redefinição de senha'], ['blockAttempts', 'Bloquear usuário após tentativas inválidas']].map(([key, label]) => <label className="switch-row" key={key}>{label}<input type="checkbox" checked={settings[key]} onChange={() => setSettings({ ...settings, [key]: !settings[key] })} /><span /></label>)}</div><button className="settings-primary" onClick={() => onSave('Configurações de segurança salvas.')}>Salvar configurações</button></>; }
function MyProfile({ user, onSave, onLogout }) {
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      onSave('Usuário não identificado para alterar a senha.');
      return;
    }

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      onSave('Preencha a senha atual, a nova senha e a confirmação.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      onSave('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      onSave('A confirmação de senha não confere com a nova senha.');
      return;
    }

    setPasswordSaving(true);

    try {
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: passwordForm.currentPassword })
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok || !loginData.success) {
        throw new Error(loginData.message || 'Senha atual incorreta.');
      }

      const updateResponse = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordForm.newPassword })
      });

      const updateData = await updateResponse.json();
      if (!updateResponse.ok) {
        throw new Error(updateData.error || 'Não foi possível atualizar a senha.');
      }

      setPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onSave('Senha atualizada com sucesso.');
    } catch (error) {
      onSave(error.message || 'Não foi possível alterar a senha.');
    } finally {
      setPasswordSaving(false);
    }
  };

  return <>
    <SectionHeader icon={CircleUserRound} title="Meu perfil" text="Visualize e atualize as informações permitidas da sua conta." />
    <section className="my-profile-card"><span className="my-profile-avatar">{(user?.name || 'A').charAt(0)}</span><div><h3>{user?.name || 'Administrador'}</h3><p>{user?.email || 'admin@drivefleet.com.br'}</p><span className="profile-tag">{user?.role || 'Administrador'}</span></div></section>
    <div className="profile-actions">
      <button className="settings-secondary" onClick={() => setPasswordModal(true)}><KeyRound size={15} /> Alterar senha</button>
      <button className="settings-danger" onClick={() => { onLogout?.(); onSave('Sessões encerradas com sucesso.'); }}>Sair de todas as sessões</button>
    </div>
    {passwordModal && <div className="settings-modal-overlay" onClick={() => setPasswordModal(false)}>
      <form className="settings-modal" onSubmit={handlePasswordSubmit} onClick={(event) => event.stopPropagation()}>
        <header>
          <div>
            <h3>Alterar senha</h3>
            <p>Atualize sua senha de acesso ao sistema.</p>
          </div>
          <button type="button" onClick={() => setPasswordModal(false)}><X size={19} /></button>
        </header>
        <div className="settings-form-grid">
          <label>Senha atual<input type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })} placeholder="Digite sua senha atual" /></label>
          <label>Nova senha<input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })} placeholder="Mínimo 6 caracteres" /></label>
          <label>Confirmar nova senha<input type="password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })} placeholder="Repita a nova senha" /></label>
        </div>
        <footer>
          <button type="button" className="settings-secondary" onClick={() => setPasswordModal(false)}>Cancelar</button>
          <button className="settings-primary" type="submit" disabled={passwordSaving}>{passwordSaving ? 'Salvando...' : 'Salvar nova senha'}</button>
        </footer>
      </form>
    </div>}
  </>;
}
function EmployeeModal({ form, setForm, onClose, onSubmit }) { const field = (key, label, type = 'text') => <label>{label}<input required={['name', 'phone', 'email', 'role'].includes(key)} type={type} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>; return <div className="settings-modal-overlay" onClick={onClose}><form className="settings-modal" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}><header><div><h3>Novo funcionário</h3><p>Dados pessoais, profissionais e de acesso.</p></div><button type="button" onClick={onClose}><X size={19} /></button></header><h4>Dados pessoais</h4><div className="settings-form-grid">{field('name', 'Nome completo *')}{field('cpf', 'CPF')}{field('phone', 'Telefone *')}{field('email', 'E-mail *', 'email')}</div><h4>Dados profissionais</h4><div className="settings-form-grid">{field('role', 'Cargo *')}<label>Departamento<select value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })}>{['Administração', 'Financeiro', 'Frota', 'Atendimento', 'Operações', 'Gestão'].map((item) => <option key={item}>{item}</option>)}</select></label>{field('admission', 'Data de admissão', 'date')}{field('registration', 'Matrícula')}</div><h4>Acesso ao sistema</h4><div className="settings-form-grid"><label>Perfil de acesso<select value={form.profile} onChange={(event) => setForm({ ...form, profile: event.target.value })}>{['Administrador', 'Gestor', 'Financeiro', 'Operador de Frota', 'Atendimento'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Status do acesso<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Ativo</option><option>Inativo</option></select></label></div><label className="access-instructions"><input type="checkbox" defaultChecked /> Enviar instruções de acesso por e-mail</label><footer><button type="button" className="settings-secondary" onClick={onClose}>Cancelar</button><button className="settings-primary">Cadastrar funcionário</button></footer></form></div>; }



