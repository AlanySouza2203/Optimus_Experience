import React, { useState, useEffect } from 'react';
import { 
  Lock, ShieldCheck, X, UserCheck, Car, Plus, Trash2, Edit3, 
  Check, FileText, Database, TrendingUp, LogOut, RefreshCw, Eye,
  Search, Bell, ArrowUpRight, ArrowDownRight, AlertTriangle, Download, MoreVertical, Upload, Camera, ClipboardList, CalendarDays, Clock, Inbox, BadgeAlert, CircleDollarSign, CheckCircle2, Headphones, Wrench, HelpCircle
} from 'lucide-react';
import {
  filterByExactValue,
  filterBySearch,
  formatCurrency,
  formatDate,
  formatRequiredDate,
  getVehicleName,
  sumValuesByStatus
} from './adminModalUtils';
import {
  createAdminAuth,
  createCashForm,
  createClientForm,
  createCollectionUpload,
  createContractForm,
  createDriverForm,
  createFineForm,
  createIncidentForm,
  createInspectionForm,
  createPaymentForm,
  createRentalForm,
  createReservationForm,
  createSupportRequestForm,
  createUserForm,
  createVehicleForm
} from './adminModalFormDefaults';
import './AdminModal.css';
import SupportTab from './SupportTab';
import NotificationsTab from './NotificationsTab';
import SettingsTab from './SettingsTab';

const originalVehicleCatalog = [
  {
    id: 1,
    brand: 'CHEVROLET',
    year: '2023',
    name: 'Onix Plus',
    category: 'Econômico',
    priceWeekly: 799,
    status: 'Disponível',
    image: 'https://cdn.motor1.com/images/mgl/xqowy2/s1/chevrolet-onix-plus-premier-2023-vs.-hyundai-hb20s-platinum-plus-2023.jpg',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '14,5 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 2,
    brand: 'CHEVROLET',
    year: '2024',
    name: 'Onix',
    category: 'Econômico',
    priceWeekly: 749,
    status: 'Disponível',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOUbjgj9XnoYT3t04NC-dlG4GFQuyu3y7dY83-PoQEA&s=10',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '14,3 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 3,
    brand: 'FIAT',
    year: '2024',
    name: 'Argo Drive',
    category: 'Econômico',
    priceWeekly: 729,
    status: 'Disponível',
    image: 'https://http2.mlstatic.com/D_NQ_NP_913494-MLA74910398809_032024-F.jpg',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '14,0 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 4,
    brand: 'VOLKSWAGEN',
    year: '2024',
    name: 'Polo Track',
    category: 'Econômico',
    priceWeekly: 499,
    status: 'Disponível',
    image: 'https://static.kbb.com.br/Uploads/ResearchTools/News/4426/582a0483-eef4-4116-8ef6-8f663b7fe1b2_1365x1024.jpg',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '13,8 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 5,
    brand: 'HYUNDAI',
    year: '2024',
    name: 'HB20',
    category: 'Econômico',
    priceWeekly: 749,
    status: 'Disponível',
    image: 'https://garagem360.com.br/wp-content/uploads/2023/12/hyundai-hb20-platinum-safety-2024-3.jpg',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '14,2 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 6,
    brand: 'FIAT',
    year: '2024',
    name: 'Cronos Drive',
    category: 'Sedan',
    priceWeekly: 829,
    status: 'Disponível',
    image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2023/08/FiatCronosPrecisionMY24__044-e1693320105233.jpg?quality=70&strip=info&resize=1080,565&crop=1',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '13,5 km/l' },
    features: ['Porta-malas amplo', 'Ar-condicionado', 'Central multimídia']
  },
  {
    id: 7,
    brand: 'HYUNDAI',
    year: '2024',
    name: 'HB20S',
    category: 'Sedan',
    priceWeekly: 829,
    status: 'Disponível',
    image: 'https://image1.mobiauto.com.br/images/api/images/v1.0/256174833/transform/fl_progressive,f_webp,q_80',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '13,8 km/l' },
    features: ['Porta-malas amplo', 'Ar-condicionado', 'Central multimídia']
  },
  {
    id: 8,
    brand: 'VOLKSWAGEN',
    year: '2024',
    name: 'Virtus (Automático)',
    category: 'Sedan',
    priceWeekly: 850,
    status: 'Disponível',
    image: 'https://garagem360.com.br/wp-content/uploads/2023/11/vw-virtus-highline-2024-2.jpg',
    specs: { transm: 'Automático', seats: '5 lugares', fuel: 'Flex', consumption: '12,8 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 9,
    brand: 'VOLKSWAGEN',
    year: '2024',
    name: 'Virtus (Manual)',
    category: 'Sedan',
    priceWeekly: 899,
    status: 'Disponível',
    image: 'https://garagem360.com.br/wp-content/uploads/2023/11/vw-virtus-highline-2024-2.jpg',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '12,8 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 10,
    brand: 'RENAULT',
    year: '2024',
    name: 'Kwid E-Tech',
    category: 'Hatch',
    priceWeekly: 599,
    status: 'Disponível',
    image: 'https://www.webmotors.com.br/imagens/prod/379822/RENAULT_KWID_ETECH_27_KW_ELETRICO_37982214035105449.webp',
    specs: { transm: 'Automático', seats: '5 lugares', fuel: 'Elétrico', consumption: '7,5 km/kWh' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 11,
    brand: 'RENAULT',
    year: '2024',
    name: 'Logan',
    category: 'Sedan',
    priceWeekly: 519,
    status: 'Disponível',
    image: 'https://cdn.wheel-size.com/automobile/body/renault-logan-2019-2026-1770176449.4616737.jpg',
    specs: { transm: 'Manual', seats: '5 lugares', fuel: 'Flex', consumption: '13,5 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 12,
    brand: 'NISSAN',
    year: '2024',
    name: 'Kicks',
    category: 'SUV',
    priceWeekly: 849,
    status: 'Disponível',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_D-tS9gA6pmCWVOQKKpi_LoaJEPxUD-yxsz-TS81Ig&s=10',
    specs: { transm: 'Automático CVT', seats: '5 lugares', fuel: 'Flex', consumption: '14,2 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 13,
    brand: 'TOYOTA',
    year: '2024',
    name: 'Yaris Hatch',
    category: 'Hatch',
    priceWeekly: 765,
    status: 'Disponível',
    image: 'https://www.toyotacomunica.com.br/wp-content/uploads/2023/09/19_COROLLA-2024_XEI_2.png',
    specs: { transm: 'Automático CVT', seats: '5 lugares', fuel: 'Flex', consumption: '13,0 km/l' },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  }
];

const originalClientCatalog = [
  { id: 1, type: 'PF', name: 'Alessandro Rodrigues', document: '111.222.333-01', email: 'alessandro@email.com', phone: '(11) 98001-0001', city: 'São Paulo', state: 'SP', origin: 'Cadastro administrativo', status: 'Ativo', createdAt: '10/01/2024' },
  { id: 2, type: 'PF', name: 'Bruno Pereira Santos', document: '222.333.444-02', email: 'bruno@email.com', phone: '(11) 98002-0002', city: 'Guarulhos', state: 'SP', origin: 'Cadastro administrativo', status: 'Ativo', createdAt: '15/02/2024' },
  { id: 3, type: 'PJ', name: 'Logística Express Ltda', document: '12.345.678/0001-90', email: 'contato@logisticaexpress.com.br', phone: '(11) 3333-4444', city: 'São Paulo', state: 'SP', origin: 'Cadastro administrativo', status: 'Ativo', createdAt: '01/03/2024' }
];

export default function AdminModal({ isOpen, onClose, supportRequests, setSupportRequests }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [readNotificationIds, setReadNotificationIds] = useState([]);
  const [dbStatus, setDbStatus] = useState('Verificando...');
  const [currentUser, setCurrentUser] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [permissionsByProfile, setPermissionsByProfile] = useState(() => {
    const modules = ['Dashboard', 'Motoristas', 'Clientes', 'Frota', 'Locações', 'Contratos', 'Vistorias', 'Manutenções', 'Multas', 'Sinistros', 'Suporte', 'Cobranças', 'Pagamentos', 'Relatórios', 'Notificações', 'Auditoria', 'Configurações'];
    const profiles = ['Administrador', 'Gestor', 'Financeiro', 'Operador de Frota', 'Atendimento'];
    const defaults = Object.fromEntries(profiles.map((profile) => [profile, Object.fromEntries(modules.map((module) => [module, { view: true, create: true, edit: true, delete: true, approve: true }]))]));
    return defaults;
  });
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [driverSearch, setDriverSearch] = useState('');
  const [driverStatusFilter, setDriverStatusFilter] = useState('Todos os status');
  const [openUserMenu, setOpenUserMenu] = useState(null);
  const [openClientMenu, setOpenClientMenu] = useState(null);
  const [openDriverMenu, setOpenDriverMenu] = useState(null);

  // Autenticação
  const [adminAuth, setAdminAuth] = useState(createAdminAuth);
  const [authError, setAuthError] = useState('');

  // Dados gerais do dashboard
  const [vehicles, setVehicles] = useState(originalVehicleCatalog);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [interestedStatusFilter, setInterestedStatusFilter] = useState('Todos os status');
  const [fines, setFines] = useState([]);
  const [fineFormOpen, setFineFormOpen] = useState(false);
  const [fineStatusFilter, setFineStatusFilter] = useState('Todos os status');
  const [fineTypeFilter, setFineTypeFilter] = useState('Todos os tipos');
  const [fineForm, setFineForm] = useState(createFineForm);

  // Ocorrências, suporte e manutenção
  const [incidents, setIncidents] = useState([]);
  const [incidentFormOpen, setIncidentFormOpen] = useState(false);
  const [incidentStep, setIncidentStep] = useState(1);
  const [incidentSearch, setIncidentSearch] = useState('');
  const [incidentStatusFilter, setIncidentStatusFilter] = useState('Todos os status');
  const [incidentForm, setIncidentForm] = useState(createIncidentForm);
  const [editingIncidentId, setEditingIncidentId] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [openIncidentMenu, setOpenIncidentMenu] = useState(null);
  const [supportFormOpen, setSupportFormOpen] = useState(false);
  const [supportSearch, setSupportSearch] = useState('');
  const [supportStatusFilter, setSupportStatusFilter] = useState('Todos os status');
  const [supportTypeFilter, setSupportTypeFilter] = useState('Todos os tipos');
  const [supportForm, setSupportForm] = useState(createSupportRequestForm);

  // Cadastro e edição de veículos
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleFormOpen, setVehicleFormOpen] = useState(false);
  const [vehicleFormData, setVehicleFormData] = useState(createVehicleForm);
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState('Todas as categorias');
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState('Todos os status');

  // Propostas e cadastros auxiliares
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [interestedSearch, setInterestedSearch] = useState('');
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [userFormData, setUserFormData] = useState(createUserForm);
  const [driverFormOpen, setDriverFormOpen] = useState(false);
  const [driverFormData, setDriverFormData] = useState(createDriverForm);
  const [rentalFormOpen, setRentalFormOpen] = useState(false);
  const [rentalFormData, setRentalFormData] = useState(createRentalForm);
  const [rentalSearch, setRentalSearch] = useState('');
  const [openRentalMenu, setOpenRentalMenu] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [collectionFilter, setCollectionFilter] = useState('Todos os status');
  const [collectionSearch, setCollectionSearch] = useState('');
  const [collectionUploadOpen, setCollectionUploadOpen] = useState(false);
  const [collectionUpload, setCollectionUpload] = useState(createCollectionUpload);
  const [collections, setCollections] = useState([]);

  // Vistorias, clientes, reservas, contratos e fluxo financeiro
  const [inspectionSearch, setInspectionSearch] = useState('');
  const [inspectionTypeFilter, setInspectionTypeFilter] = useState('Todos os tipos');
  const [inspectionStatusFilter, setInspectionStatusFilter] = useState('Todos os status');
  const [inspectionFormOpen, setInspectionFormOpen] = useState(false);
  const [inspectionMenu, setInspectionMenu] = useState(null);
  const [inspectionForm, setInspectionForm] = useState(createInspectionForm);
  const [inspections, setInspections] = useState([]);
  const [clientSearch, setClientSearch] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('Todos os tipos');
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [clientForm, setClientForm] = useState(createClientForm);
  const [clients, setClients] = useState([]);
  const [selectedClientHistory, setSelectedClientHistory] = useState(null);
  const [reservationSearch, setReservationSearch] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState('Todos os status');
  const [reservationFormOpen, setReservationFormOpen] = useState(false);
  const [reservationForm, setReservationForm] = useState(createReservationForm);
  const [reservations, setReservations] = useState([]);
  const [contractSearch, setContractSearch] = useState('');
  const [contractStatusFilter, setContractStatusFilter] = useState('Todos os status');
  const [contractFormOpen, setContractFormOpen] = useState(false);
  const [contractForm, setContractForm] = useState(createContractForm);
  const [contracts, setContracts] = useState([]);
  const [cashFormOpen, setCashFormOpen] = useState(false);
  const [cashForm, setCashForm] = useState(createCashForm);
  const [cashEntries, setCashEntries] = useState([]);
  const [cashSearch, setCashSearch] = useState('');
  const [cashTypeFilter, setCashTypeFilter] = useState('Todos os tipos');
  const [cashStatusFilter, setCashStatusFilter] = useState('Todos os status');
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentForm, setPaymentForm] = useState(createPaymentForm);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [maintenances, setMaintenances] = useState([]);
  const [maintenanceSearch, setMaintenanceSearch] = useState('');
  const [maintenanceStatusFilter, setMaintenanceStatusFilter] = useState('Todos os status');
  const [maintenanceForm, setMaintenanceForm] = useState({ vehicle: '', type: 'Preventiva', service: '', date: '', priority: 'Normal', workshop: '', responsible: '', budget: '', cost: '', parts: '', deadline: '', status: 'Aberta', notes: '' });

  // Relatórios e filtros
  const [reportPeriod, setReportPeriod] = useState('30 dias');
  const [reportCategory, setReportCategory] = useState('Todos');
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [reportStatusFilter, setReportStatusFilter] = useState('Todos');
  const [reportVehicleFilter, setReportVehicleFilter] = useState('Todos');
  const [reportClientFilter, setReportClientFilter] = useState('Todos');
  const [reportDriverFilter, setReportDriverFilter] = useState('Todos');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportSearch, setReportSearch] = useState('');
  const [reportCustomStart, setReportCustomStart] = useState('');
  const [reportCustomEnd, setReportCustomEnd] = useState('');

  useEffect(() => {
    if (isOpen) {
      checkConnectionAndLoadData();
    }
  }, [isOpen]);

  const normalizeProposalStatus = (status) => {
    const value = String(status || '').trim();
    if (!value) return 'Novo';

    const normalized = value.toLowerCase();

    if (['pendente', 'em analise', 'em análise', 'novo'].includes(normalized)) return 'Novo';
    if (normalized === 'em contato') return 'Em contato';
    if (normalized === 'aprovado') return 'Aprovado';
    if (normalized === 'convertido') return 'Convertido';
    if (normalized === 'arquivado') return 'Arquivado';
    if (normalized === 'recusado') return 'Recusado';

    return value;
  };

  const mergePeopleRecords = (clientsList = [], driversList = []) => {
    const merged = new Map();

    const addPerson = (person, source) => {
      if (!person) return;

      const emailKey = String(person.email || '').trim().toLowerCase();
      const identityKey = emailKey || String(person.document || person.cpf || person.phone || person.name || person.fullName || '').trim().toLowerCase();
      if (!identityKey) return;

      const normalized = {
        id: person.id || Date.now() + Math.random(),
        type: person.type || 'PF',
        name: person.name || person.fullName || person.full_name || 'Pessoa',
        fullName: person.fullName || person.name || person.full_name || 'Pessoa',
        document: person.document || person.cpf || '',
        cpf: person.cpf || person.document || '',
        email: person.email || '',
        phone: person.phone || '',
        city: person.city || '—',
        state: person.state || 'SP',
        status: person.status || 'Ativo',
        createdAt: person.createdAt || person.created_at || new Date().toLocaleDateString('pt-BR'),
        cnhCategory: person.cnhCategory || 'B',
        appPlatforms: Array.isArray(person.appPlatforms) ? person.appPlatforms : Array.isArray(person.platforms) ? person.platforms : [],
        platforms: Array.isArray(person.platforms) ? person.platforms : Array.isArray(person.appPlatforms) ? person.appPlatforms : [],
        source
      };

      if (!merged.has(identityKey)) {
        merged.set(identityKey, normalized);
        return;
      }

      const existing = merged.get(identityKey);
      merged.set(identityKey, {
        ...existing,
        ...normalized,
        id: existing.id || normalized.id,
        name: existing.name || normalized.name,
        fullName: existing.fullName || normalized.fullName,
        document: existing.document || normalized.document,
        cpf: existing.cpf || normalized.cpf,
        email: existing.email || normalized.email,
        phone: existing.phone || normalized.phone,
        city: existing.city || normalized.city,
        state: existing.state || normalized.state,
        status: existing.status || normalized.status,
        cnhCategory: existing.cnhCategory || normalized.cnhCategory,
        appPlatforms: (existing.appPlatforms?.length ? existing.appPlatforms : normalized.appPlatforms) || [],
        platforms: (existing.platforms?.length ? existing.platforms : normalized.platforms) || []
      });
    };

    clientsList.forEach((client) => addPerson(client, 'client'));
    driversList.forEach((driver) => addPerson(driver, 'driver'));

    return Array.from(merged.values());
  };

  const checkConnectionAndLoadData = async () => {
    try {
      const res = await fetch('/api/admin/overview');
      if (res.ok) {
        setDashboardSummary(await res.json());
      } else {
        setDashboardSummary(null);
      }
    } catch (e) {
      setDashboardSummary(null);
    }

    try {
      const res = await fetch('/api/vehicles');
      if (res.ok) {
        const data = await res.json();
        const shouldUseOriginalCatalog = !Array.isArray(data) || data.length === 0 || !data.some((item) => item.name === 'Onix Plus' && item.brand === 'CHEVROLET');
        setVehicles(shouldUseOriginalCatalog ? originalVehicleCatalog : data);
        setDbStatus('MySQL conectado');
      } else {
        setVehicles(originalVehicleCatalog);
        setDbStatus('Modo reserva (erro do servidor)');
      }
    } catch (e) {
      setVehicles(originalVehicleCatalog);
      setDbStatus('Modo reserva (offline)');
    }

    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.warn('Não foi possível carregar os usuários');
    }

    let clientsData = [];
    let driversData = [];

    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        clientsData = await res.json();
      }
    } catch (e) {
      console.warn('Não foi possível carregar os clientes');
    }

    try {
      const res = await fetch('/api/drivers');
      if (res.ok) {
        driversData = await res.json();
      }
    } catch (e) {
      console.warn('Não foi possível carregar os motoristas');
    }

    setClients(Array.isArray(clientsData) && clientsData.length > 0 ? clientsData : originalClientCatalog);
    setDrivers(driversData);

    try {
      const res = await fetch('/api/proposals');
      if (res.ok) {
        const data = await res.json();
        setProposals(data);

        const mappedReservations = data.map((proposal) => ({
          id: proposal.id,
          client: proposal.fullName || 'Cliente sem nome',
          driver: '—',
          vehicle: proposal.vehicleModel || 'Veículo não informado',
          date: proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString('pt-BR') : '—',
          period: proposal.planType || 'Semanal',
          value: Number(proposal.vehicleValue ?? proposal.vehiclePriceWeekly ?? 0),
          status: proposal.status === 'Aprovado' ? 'Confirmada' : proposal.status === 'Recusado' ? 'Cancelada' : 'Pendente'
        }));

        setReservations(mappedReservations);
      }
    } catch (e) {
      console.warn('Não foi possível carregar as propostas');
    }

    try {
      const res = await fetch('/api/reservations');
      if (res.ok) {
        const data = await res.json();
        setReservations(data.map((reservation) => ({
          id: reservation.id,
          client: reservation.driver || '—',
          driver: reservation.driver || '—',
          vehicle: reservation.vehicle || '—',
          date: reservation.pickupDate ? new Date(reservation.pickupDate).toLocaleDateString('pt-BR') : '—',
          period: reservation.plan || '—',
          value: Number(reservation.totalAmount || 0),
          status: reservation.status ? `${reservation.status.charAt(0).toUpperCase()}${reservation.status.slice(1)}` : 'Pendente'
        })));
      }
    } catch (e) {
      console.warn('Não foi possível carregar as reservas');
    }

    try {
      const res = await fetch('/api/payments');
      if (res.ok) {
        const data = await res.json();
        setPayments(data.map((payment) => ({
          id: payment.id,
          driver: payment.driver || '—',
          phone: payment.driverPhone || '—',
          email: payment.driverEmail || '—',
          contract: payment.contract || (payment.reservationId ? `Reserva #${payment.reservationId}` : '—'),
          value: Number(payment.amount || 0),
          method: payment.method || '—',
          date: payment.paidAt || payment.dueDate ? new Date(payment.paidAt || payment.dueDate).toLocaleDateString('pt-BR') : '—',
          receipt: Boolean(payment.externalReference),
          receiptName: payment.externalReference || ''
        })));
      }
    } catch (e) {
      console.warn('Não foi possível carregar os pagamentos');
    }

    try {
      const res = await fetch('/api/maintenances');
      if (res.ok) {
        const data = await res.json();
        setMaintenances(data.map((maintenance) => ({
          ...maintenance,
          date: maintenance.date ? new Date(maintenance.date).toLocaleDateString('pt-BR') : '—',
          priority: '—',
          cost: 0
        })));
      }
    } catch (e) {
      console.warn('Não foi possível carregar as manutenções');
    }

    try {
      const res = await fetch('/api/admin/cashEntries');
      if (res.ok) {
        const data = await res.json();
        setCashEntries(data.map((entry) => ({
          id: entry.id,
          type: entry.entry_type || entry.type || 'Entrada',
          date: entry.entry_date ? formatDate(String(entry.entry_date).slice(0, 10)) : '—',
          description: entry.description || '',
          category: entry.category || '',
          value: Number(entry.amount || entry.value || 0),
          status: entry.status || 'Pendente',
          notes: entry.notes || ''
        })));
      }
    } catch (e) {
      console.warn('Não foi possível carregar o fluxo de caixa');
    }

    try {
      const res = await fetch('/api/collections');
      if (res.ok) {
        const data = await res.json();
        setCollections(data.map((collection) => ({
          ...collection,
          dueDate: collection.dueDate ? new Date(`${String(collection.dueDate).slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR') : '—'
        })));
      }
    } catch (e) {
      console.warn('Não foi possível carregar as cobranças');
    }

    try {
      const res = await fetch('/api/support');
      if (res.ok) {
        const data = await res.json();
        setSupportRequests(data.map((request) => ({
          id: request.id,
          protocol: request.protocol || `SUP-${String(request.id).padStart(4, '0')}`,
          driver: request.driverName || request.driver || '—',
          vehicleName: request.vehicleName || 'Veículo não informado',
          plate: request.plate || '—',
          type: request.requestType || request.type || 'Suporte',
          description: request.description || '',
          priority: request.priority || 'Média',
          status: request.status ? `${request.status.charAt(0).toUpperCase()}${request.status.slice(1)}` : 'Aberto',
          createdAt: request.createdAt ? new Date(request.createdAt).toLocaleString('pt-BR') : '—',
          notes: request.notes || '',
          responsible: request.responsible || ''
        })));
      }
    } catch (e) {
      console.warn('Não foi possível carregar as solicitações de suporte');
    }
  };

  if (!isOpen) return null;

  // Clickable Demo account triggers
  const handleFillDemo = (email) => {
    setAdminAuth((current) => ({ ...current, username: email, password: '' }));
    setAuthError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminAuth)
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        loadPermissions();
        checkConnectionAndLoadData();
      } else {
        setAuthError(data.message || 'Credenciais inválidas');
      }
    } catch (err) {
      setLoading(false);
      // Client-side fallback authentication if the server is offline
      const matchingDemo = fallbackUsers.find(
        u => u.email.toLowerCase() === adminAuth.username.toLowerCase() && u.password === adminAuth.password
      );
      if (matchingDemo) {
        setIsLoggedIn(true);
        setCurrentUser({ name: matchingDemo.name, email: matchingDemo.email, role: matchingDemo.role, cargo: matchingDemo.cargo, status: matchingDemo.status });
        loadPermissions();
        checkConnectionAndLoadData();
      } else {
        setAuthError('Erro de conexão com o servidor. Use as contas demo listadas.');
      }
    }
  };

  const loadPermissions = async () => {
    try {
      const response = await fetch('/api/permissions');
      if (!response.ok) return;
      const savedPermissions = await response.json();
      if (savedPermissions && Object.keys(savedPermissions).length) {
        setPermissionsByProfile((current) => ({ ...current, ...savedPermissions }));
      }
    } catch { /* Mantém os padrões se a API não estiver disponível. */ }
  };

  const updatePermissions = async (nextPermissions) => {
    const response = await fetch('/api/permissions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ permissions: nextPermissions }) });
    if (!response.ok) throw new Error('Erro ao salvar permissões');
    const data = await response.json();
    setPermissionsByProfile(data.permissions || nextPermissions);
  };

  const tabPermissionModules = { dashboard: 'Dashboard', users: 'Configurações', clients: 'Clientes', drivers: 'Motoristas', vehicles: 'Frota', reservations: 'Locações', rentals: 'Locações', contracts: 'Contratos', collections: 'Cobranças', payments: 'Pagamentos', cashflow: 'Cobranças', maintenance: 'Manutenções', inspections: 'Vistorias', fines: 'Multas', incidents: 'Sinistros', support: 'Suporte', interested: 'Suporte', reports: 'Relatórios', notifications: 'Notificações', settings: 'Configurações' };
  const activeProfile = currentUser?.role === 'Atendente' ? 'Atendimento' : currentUser?.role;
  const canAccessTab = (tab) => activeProfile === 'Administrador' || permissionsByProfile[activeProfile]?.[tabPermissionModules[tab]]?.view !== false;
  const handleTabChange = (tab) => {
    if (canAccessTab(tab)) { setActiveTab(tab); return; }
    setAccessDenied(true);
    window.setTimeout(() => setAccessDenied(false), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAdminAuth(createAdminAuth());
    setActiveTab('dashboard');
  };

  const closeUserForm = () => {
    setUserFormOpen(false);
    setUserFormData(createUserForm());
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (userFormData.password !== userFormData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    const payload = {
      name: userFormData.name,
      email: userFormData.email,
      password: userFormData.password,
      cargo: userFormData.role || userFormData.profile || 'Atendente',
      role: userFormData.profile || 'Atendente',
      status: userFormData.status || 'Ativo',
      phone: userFormData.phone,
      cpf: userFormData.cpf
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        checkConnectionAndLoadData();
        closeUserForm();
      } else {
        alert(data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (err) {
      alert('Não foi possível conectar ao servidor. O usuário não foi salvo no banco de dados. Verifique se a API está em execução e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Ativo' ? 'Inativo' : currentStatus === 'Inativo' ? 'Bloqueado' : 'Ativo';
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: newStatus } : u));
    setOpenUserMenu(null);
  };

  const handleUserDelete = async (userId) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    try {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    } catch (e) {}
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setOpenUserMenu(null);
  };

  const exportUsersCsv = () => {
    const header = ['Nome', 'E-mail', 'Cargo', 'Perfil', 'Status', 'Cadastro'];
    const rows = visibleUsers.map((u) => [u.name, u.email, u.cargo || u.role, u.role || u.profile || 'Atendente', u.status || 'Ativo', u.createdAt || '09/01/2024']);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value || '').replaceAll('"', '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'usuarios.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const closeDriverForm = () => {
    setDriverFormOpen(false);
    setDriverFormData(createDriverForm());
  };

  const handleDriverPlatform = (platform) => {
    setDriverFormData((current) => ({ ...current, platforms: current.platforms.includes(platform) ? current.platforms.filter((item) => item !== platform) : [...current.platforms, platform] }));
  };

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    if (userFormData.password !== userFormData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    const payload = {
      fullName: driverFormData.name,
      email: driverFormData.email,
      password: 'driver123',
      cpf: driverFormData.cpf,
      phone: driverFormData.phone,
      birthDate: driverFormData.birthDate,
      cnhCategory: driverFormData.cnhCategory || 'B',
      cnhExpiry: driverFormData.cnhExpiryDate,
      appPlatforms: driverFormData.platforms,
      city: driverFormData.city || 'São Paulo',
      state: driverFormData.state || 'SP',
      status: 'Em análise'
    };

    try {
      const res = await fetch('/api/drivers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        checkConnectionAndLoadData();
        closeDriverForm();
      } else {
        alert('Erro ao cadastrar motorista.');
      }
    } catch (err) {
      setDrivers((current) => [{
        id: Date.now(),
        name: driverFormData.name,
        fullName: driverFormData.name,
        email: driverFormData.email,
        cpf: driverFormData.cpf,
        phone: driverFormData.phone,
        cnhCategory: driverFormData.cnhCategory || 'B',
        cnhExpiry: driverFormData.cnhExpiryDate || '14/08/2026',
        city: driverFormData.city || 'São Paulo',
        state: driverFormData.state || 'SP',
        status: 'Em análise',
        platforms: driverFormData.platforms,
        appPlatforms: driverFormData.platforms,
        createdAt: new Date().toLocaleDateString('pt-BR')
      }, ...current]);
      closeDriverForm();
    } finally {
      setLoading(false);
    }
  };

  const handleDriverStatusChange = async (driverId, newStatus) => {
    try {
      await fetch(`/api/drivers/${driverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
    setDrivers((prev) => prev.map((d) => d.id === driverId ? { ...d, status: newStatus } : d));
    setOpenDriverMenu(null);
  };

  const handleDriverDelete = async (driverId) => {
    if (!window.confirm('Tem certeza que deseja excluir este motorista?')) return;
    try {
      await fetch(`/api/drivers/${driverId}`, { method: 'DELETE' });
    } catch (e) {}
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));
    setOpenDriverMenu(null);
  };

  const exportDriversCsv = () => {
    const header = ['Motorista', 'CPF', 'E-mail', 'CNH Categoria', 'CNH Validade', 'Plataformas', 'Cidade', 'Status'];
    const rows = visibleDrivers.map((d) => [d.name || d.fullName, d.cpf, d.email, d.cnhCategory || 'B', d.cnhExpiry || '—', (d.platforms || d.appPlatforms || []).join(', '), d.city, d.status]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value || '').replaceAll('"', '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'motoristas.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const closeRentalForm = () => {
    setRentalFormOpen(false);
    setRentalFormData(createRentalForm());
  };

  const updateVehicleStatusByNameOrId = (vehicleRef, newStatus) => {
    if (!vehicleRef) return;
    setVehicles((prev) => prev.map((v) => {
      const matchId = String(v.id) === String(vehicleRef);
      const matchName = `${v.brand} ${v.name}`.toLowerCase() === String(vehicleRef).toLowerCase() || v.name.toLowerCase() === String(vehicleRef).toLowerCase();
      if (matchId || matchName) {
        return { ...v, status: newStatus };
      }
      return v;
    }));
  };

  const handleRentalSubmit = (e) => {
    e.preventDefault();
    const rentalStatus = rentalFormData.status || 'Ativa';
    setRentals((current) => [{
      id: Date.now(),
      driver: rentalFormData.driver || 'Motorista não informado',
      vehicle: getVehicleName(vehicles, rentalFormData.vehicle, rentalFormData.vehicle || 'Veículo não informado'),
      plan: rentalFormData.plan || 'Não informado',
      startDate: rentalFormData.startDate,
      returnDate: rentalFormData.returnDate,
      value: Number(rentalFormData.value) || 0,
      status: rentalStatus
    }, ...current]);
    if (rentalStatus === 'Ativa') {
      updateVehicleStatusByNameOrId(rentalFormData.vehicle, 'Em locação');
    }
    closeRentalForm();
  };

  const visibleRentals = filterBySearch(rentals, rentalSearch, (rental) => `${rental.driver} ${rental.vehicle}`);
  const updateRentalStatus = (id, status) => {
    const targetRental = rentals.find((r) => r.id === id);
    if (targetRental) {
      if (status === 'Ativa') {
        updateVehicleStatusByNameOrId(targetRental.vehicle, 'Em locação');
      } else if (status === 'Encerrada' || status === 'Cancelada') {
        updateVehicleStatusByNameOrId(targetRental.vehicle, 'Disponível');
      }
    }
    setRentals((current) => current.map((rental) => rental.id === id ? { ...rental, status } : rental));
    setOpenRentalMenu(null);
  };
  const visibleCollections = filterByExactValue(collections, collectionFilter, 'Todos os status', (collection) => collection.status);
  const handleCollectionUpload = async (event) => {
    event.preventDefault();
    const file = collectionUpload.file;
    const fileData = file ? await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }) : '';
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver: collectionUpload.driver,
          type: collectionUpload.type,
          dueDate: collectionUpload.dueDate,
          value: Number(collectionUpload.value),
          description: collectionUpload.description,
          status: 'Pendente',
          fileName: file?.name || '',
          fileData
        })
      });
      if (!response.ok) throw new Error('Não foi possível salvar a cobrança.');
      await checkConnectionAndLoadData();
      setCollectionUpload(createCollectionUpload());
      setCollectionUploadOpen(false);
    } catch (error) {
      alert(error.message || 'Erro ao salvar a cobrança.');
    }
  };
  const updateCollection = async (id, changes) => {
    const response = await fetch(`/api/collections/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) });
    if (!response.ok) throw new Error('Não foi possível atualizar a cobrança.');
    await checkConnectionAndLoadData();
  };
  const visibleInspections = filterByExactValue(
    filterByExactValue(
      filterBySearch(inspections, inspectionSearch, (inspection) => `${inspection.client} ${inspection.vehicle} ${inspection.driver}`),
      inspectionTypeFilter,
      'Todos os tipos',
      (inspection) => inspection.type
    ),
    inspectionStatusFilter,
    'Todos os status',
    (inspection) => inspection.status
  );
  const handleInspectionSubmit = (event) => {
    event.preventDefault();
    const formattedDate = formatDate(inspectionForm.date);
    setInspections((current) => [{ id: Date.now(), type: inspectionForm.type, client: inspectionForm.client || 'Cliente não informado', vehicle: 'Veículo não informado', plate: '—', driver: inspectionForm.driver || 'Motorista não informado', date: formattedDate, time: inspectionForm.time || '—', inspector: inspectionForm.inspector || 'Não informado', photos: '0/11', status: 'Agendada' }, ...current]);
    setInspectionForm(createInspectionForm());
    setInspectionFormOpen(false);
  };

  const visibleUsers = filterBySearch(users, userSearch, (u) => `${u.name} ${u.email} ${u.cargo} ${u.role}`);

  const visibleClients = filterByExactValue(
    filterBySearch(clients, clientSearch, (client) => `${client.name} ${client.document} ${client.email}`),
    clientTypeFilter,
    'Todos os tipos',
    (client) => client.type
  );

  const visibleDrivers = filterByExactValue(
    filterBySearch(drivers, driverSearch, (driver) => `${driver.name || driver.fullName} ${driver.cpf} ${driver.email} ${driver.city}`),
    driverStatusFilter,
    'Todos os status',
    (driver) => driver.status
  );

  const handleClientSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        checkConnectionAndLoadData();
        setClientForm(createClientForm());
        setClientFormOpen(false);
      } else {
        alert(data.error || 'Erro ao cadastrar cliente.');
      }
    } catch (err) {
      setClients((current) => [{ id: Date.now(), type: clientForm.type, name: clientForm.name, document: clientForm.document, email: clientForm.email, phone: clientForm.phone, city: clientForm.city || '—', state: clientForm.state || '—', createdAt: new Date().toLocaleDateString('pt-BR') }, ...current]);
      setClientForm(createClientForm());
      setClientFormOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClientDelete = async (clientId) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });
    } catch (e) {}
    setClients((prev) => prev.filter((c) => c.id !== clientId));
    setOpenClientMenu(null);
  };

  const exportClientsCsv = () => {
    const header = ['Nome', 'Tipo', 'Documento', 'E-mail', 'Telefone', 'Cidade/UF', 'Origem', 'Cadastro'];
    const rows = visibleClients.map((c) => [c.name, c.type, c.document, c.email, c.phone, `${c.city}/${c.state}`, c.origin || (c.interested_id || c.interestedId ? `Site (Interessado #${c.interested_id || c.interestedId})` : 'Cadastro administrativo'), c.createdAt]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value || '').replaceAll('"', '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleViewClientHistory = async (client) => {
    setOpenClientMenu(null);
    try {
      const res = await fetch(`/api/clients/${client.id}/history`);
      if (res.ok) {
        const data = await res.json();
        setSelectedClientHistory(data);
      } else {
        const interestedId = client.interested_id || client.interestedId;
        const interested = interestedId ? proposals.find((p) => p.id === interestedId) : null;
        setSelectedClientHistory({
          client,
          origin: interested ? { type: 'Site', interestedId: interested.id, interested } : { type: 'Cadastro administrativo' },
          drivers: drivers.filter((d) => d.client_id === client.id || d.email?.toLowerCase() === client.email?.toLowerCase()),
          reservations: reservations.filter((r) => r.client === client.name),
          contracts: contracts.filter((c) => c.client === client.name),
          payments: payments.filter((p) => p.driverEmail?.toLowerCase() === client.email?.toLowerCase()),
          rentals: rentals.filter((r) => r.client === client.name),
          fines: [],
          supportRequests: []
        });
      }
    } catch (e) {
      const interestedId = client.interested_id || client.interestedId;
      const interested = interestedId ? proposals.find((p) => p.id === interestedId) : null;
      setSelectedClientHistory({
        client,
        origin: interested ? { type: 'Site', interestedId: interested.id, interested } : { type: 'Cadastro administrativo' },
        drivers: drivers.filter((d) => d.client_id === client.id || d.email?.toLowerCase() === client.email?.toLowerCase()),
        reservations: reservations.filter((r) => r.client === client.name),
        contracts: contracts.filter((c) => c.client === client.name),
        payments: payments.filter((p) => p.driverEmail?.toLowerCase() === client.email?.toLowerCase()),
        rentals: rentals.filter((r) => r.client === client.name),
        fines: [],
        supportRequests: []
      });
    }
  };
  const visibleReservations = filterByExactValue(
    filterBySearch(reservations, reservationSearch, (reservation) => `${reservation.client} ${reservation.vehicle}`),
    reservationStatusFilter,
    'Todos os status',
    (reservation) => reservation.status
  );
  const handleReservationSubmit = (event) => {
    event.preventDefault();
    const resStatus = reservationForm.status || 'Pendente';
    setReservations((current) => [{ id: Date.now(), ...reservationForm, value: Number(reservationForm.value) || 0, date: formatRequiredDate(reservationForm.date) }, ...current]);
    if (resStatus === 'Confirmada') {
      updateVehicleStatusByNameOrId(reservationForm.vehicle, 'Reservado');
    }
    setReservationForm(createReservationForm());
    setReservationFormOpen(false);
  };
  const visibleContracts = filterByExactValue(
    filterBySearch(contracts, contractSearch, (contract) => `${contract.number} ${contract.client} ${contract.driver}`),
    contractStatusFilter,
    'Todos os status',
    (contract) => contract.status
  );
  const handleContractSubmit = (event) => {
    event.preventDefault();
    setContracts((current) => [{ id: Date.now(), ...contractForm, value: Number(contractForm.value) || 0, startDate: formatDate(contractForm.startDate), endDate: formatDate(contractForm.endDate) }, ...current]);
    setContractForm(createContractForm(`CT-2024-${String(contracts.length + 2).padStart(3, '0')}`));
    setContractFormOpen(false);
  };
  const cashIn = cashEntries.filter((item) => item.type === 'Entrada').reduce((total, item) => total + item.value, 0);
  const cashOut = cashEntries.filter((item) => item.type === 'Saída').reduce((total, item) => total + item.value, 0);
  const handleCashSubmit = async (event) => {
    event.preventDefault();
    const amount = Number(cashForm.value) || 0;
    try {
      const response = await fetch('/api/admin/cashEntries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry_type: cashForm.type,
          entry_date: cashForm.date,
          description: cashForm.description,
          category: cashForm.category,
          amount,
          status: cashForm.status,
          notes: cashForm.notes
        })
      });
      if (!response.ok) throw new Error('Não foi possível salvar a movimentação.');
      await checkConnectionAndLoadData();
      setCashForm(createCashForm());
      setCashFormOpen(false);
    } catch (error) {
      alert(error.message || 'Erro ao salvar a movimentação.');
    }
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    const registeredDriver = drivers.find((driver) => String(driver.name || driver.fullName || '').trim().toLowerCase() === String(paymentForm.driver || '').trim().toLowerCase());
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driver: paymentForm.driver,
          phone: paymentForm.phone || registeredDriver?.phone || '',
          email: paymentForm.email || registeredDriver?.email || '',
          contract: paymentForm.contract,
          amount: Number(paymentForm.value) || 0,
          dueDate: paymentForm.date,
          status: 'Pago',
          method: paymentForm.method,
          externalReference: paymentForm.receipt?.name || ''
        })
      });
      if (!response.ok) throw new Error('Não foi possível salvar o pagamento.');
      await checkConnectionAndLoadData();
      setPaymentForm(createPaymentForm());
      setPaymentFormOpen(false);
    } catch (error) {
      alert(error.message || 'Erro ao salvar o pagamento.');
    }
  };

  const handleMaintenanceSubmit = async (event) => {
    event.preventDefault();
    const vehicle = vehicles.find((item) => String(item.id) === maintenanceForm.vehicle);
    try {
      const response = await fetch('/api/maintenances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: maintenanceForm.vehicle,
          type: maintenanceForm.type,
          service: maintenanceForm.service,
          date: maintenanceForm.date,
          status: maintenanceForm.status,
          notes: maintenanceForm.notes
        })
      });
      if (!response.ok) throw new Error('Não foi possível registrar a manutenção.');
      await checkConnectionAndLoadData();
      setMaintenanceFormOpen(false);
    } catch (error) {
      alert(error.message || 'Erro ao registrar manutenção.');
    }
  };
  const closeFineForm = () => {
    setFineFormOpen(false);
    setFineForm(createFineForm());
  };
  const handleFineSubmit = (event) => {
    event.preventDefault();
    setFines((current) => [{ id: Date.now(), ...fineForm, vehicleName: getVehicleName(vehicles, fineForm.vehicle, 'Veículo não informado'), value: Number(fineForm.value) || 0 }, ...current]);
    closeFineForm();
  };
  const visibleFines = filterByExactValue(
    filterByExactValue(fines, fineStatusFilter, 'Todos os status', (fine) => fine.status),
    fineTypeFilter,
    'Todos os tipos',
    (fine) => fine.type
  );
  const closeIncidentForm = (nextProtocolNumber = incidents.length + 1) => {
    setIncidentFormOpen(false);
    setIncidentStep(1);
    setEditingIncidentId(null);
    setIncidentForm(createIncidentForm(`SIN-2026-${String(nextProtocolNumber).padStart(4, '0')}`));
  };
  const openIncidentForm = () => {
    setIncidentFormOpen(true);
    setIncidentStep(1);
  };
  const handleIncidentVehicleChange = (vehicleId) => {
    const vehicle = vehicles.find((item) => String(item.id) === String(vehicleId));
    setIncidentForm((current) => ({ ...current, vehicle: vehicleId, plate: vehicle?.plate || current.plate }));
  };
  const toggleIncidentDamageLocation = (location) => {
    setIncidentForm((current) => ({
      ...current,
      damageLocations: current.damageLocations.includes(location)
        ? current.damageLocations.filter((item) => item !== location)
        : [...current.damageLocations, location]
    }));
  };
  const advanceIncidentStep = (event) => {
    if (!event.currentTarget.form.reportValidity()) return;
    setIncidentStep((current) => current + 1);
  };
  const handleIncidentPhoto = (index, file) => {
    setIncidentForm((current) => ({
      ...current,
      photos: current.photos.map((photo, photoIndex) => photoIndex === index && file ? { file, preview: URL.createObjectURL(file) } : photo)
    }));
  };
  const incidentTotalCost = ['repairBudget', 'deductible', 'insurerPaid', 'driverPaid', 'otherCosts']
    .reduce((total, field) => total + (Number(incidentForm[field]) || 0), 0);
  const handleIncidentSubmit = (event) => {
    event.preventDefault();
    const vehicle = vehicles.find((item) => String(item.id) === String(incidentForm.vehicle));
    const incidentData = {
      ...incidentForm,
      vehicleName: vehicle ? `${vehicle.brand} ${vehicle.name}` : 'Veículo não informado',
      totalCost: incidentTotalCost,
      formattedDate: formatDate(incidentForm.date)
    };
    if (editingIncidentId) {
      setIncidents((current) => current.map((incident) => incident.id === editingIncidentId ? { ...incident, ...incidentData } : incident));
      setSelectedIncident((current) => current?.id === editingIncidentId ? { ...current, ...incidentData } : current);
    } else {
      setIncidents((current) => [{ id: Date.now(), ...incidentData }, ...current]);
    }
    closeIncidentForm(editingIncidentId ? incidents.length + 1 : incidents.length + 2);
  };
  const openIncidentEdit = (incident) => {
    setEditingIncidentId(incident.id);
    setIncidentForm({ ...createIncidentForm(incident.protocol), ...incident });
    setIncidentStep(1);
    setIncidentFormOpen(true);
    setOpenIncidentMenu(null);
    setSelectedIncident(null);
  };
  const updateIncidentStatus = (id, status) => {
    setIncidents((current) => current.map((incident) => incident.id === id ? { ...incident, status } : incident));
    setSelectedIncident((current) => current?.id === id ? { ...current, status } : current);
    setOpenIncidentMenu(null);
  };
  const deleteIncident = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este sinistro?')) return;
    setIncidents((current) => current.filter((incident) => incident.id !== id));
    setOpenIncidentMenu(null);
    setSelectedIncident((current) => current?.id === id ? null : current);
  };
  const exportIncidents = () => {
    const header = ['Protocolo', 'Veículo', 'Placa', 'Motorista', 'Tipo', 'Data', 'Responsabilidade', 'Status'];
    const rows = visibleIncidents.map((incident) => [incident.protocol, incident.vehicleName, incident.plate, incident.driver, incident.type, incident.formattedDate, incident.responsibility, incident.status]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value || '').replaceAll('"', '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sinistros.csv';
    link.click();
    URL.revokeObjectURL(url);
  };
  const closeSupportForm = () => {
    setSupportFormOpen(false);
    setSupportForm(createSupportRequestForm(`SUP-${String(supportRequests.length + 1).padStart(4, '0')}`));
  };
  const handleSupportVehicleChange = (vehicleId) => {
    const vehicle = vehicles.find((item) => String(item.id) === String(vehicleId));
    setSupportForm((current) => ({ ...current, vehicle: vehicleId, plate: vehicle?.plate || current.plate }));
  };
  const handleSupportAttachment = (index, file) => setSupportForm((current) => ({ ...current, attachments: current.attachments.map((attachment, attachmentIndex) => attachmentIndex === index && file ? { file, preview: URL.createObjectURL(file) } : attachment) }));
  const handleSupportSubmit = (event) => {
    event.preventDefault();
    const vehicle = vehicles.find((item) => String(item.id) === String(supportForm.vehicle));
    setSupportRequests((current) => [{ id: Date.now(), ...supportForm, vehicleName: vehicle ? `${vehicle.brand} ${vehicle.name}` : 'Veículo não informado', createdAt: new Date().toLocaleString('pt-BR') }, ...current]);
    closeSupportForm();
  };
  const handleSupportStatusChange = async (requestId, nextStatus) => {
    try {
      const response = await fetch(`/api/support/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar o status do suporte');
      }
      await checkConnectionAndLoadData();
    } catch (error) {
      alert(error.message || 'Não foi possível atualizar o status do suporte.');
    }
  };

  const handleForwardSupportToMaintenance = async (request) => {
    try {
      const selectedVeh = vehicles.find((v) =>
        String(v.id) === String(request.vehicleId) ||
        `${v.brand} ${v.name}`.toLowerCase() === String(request.vehicleName || '').toLowerCase() ||
        v.name.toLowerCase() === String(request.vehicleName || '').toLowerCase()
      );

      const maintenanceEntry = {
        vehicleId: selectedVeh?.id || request.vehicleId || null,
        vehicleName: request.vehicleName || (selectedVeh ? `${selectedVeh.brand} ${selectedVeh.name}` : 'Veículo do Suporte'),
        type: 'Corretiva',
        service: `[Suporte ${request.protocol}] ${request.type}: ${request.description || ''}`,
        date: new Date().toISOString().split('T')[0],
        priority: request.priority === 'Urgente' ? 'Urgente' : request.priority === 'Alta' ? 'Alta' : 'Normal',
        workshop: '',
        responsible: currentUser?.name || 'Suporte',
        budget: 0,
        cost: 0,
        parts: '',
        deadline: '',
        status: 'Aberta',
        notes: `Encaminhado a partir da solicitação de suporte ${request.protocol}. Motorista: ${request.driver || '—'}`
      };

      try {
        const res = await fetch('/api/maintenances', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(maintenanceEntry)
        });
        if (res.ok) {
          const data = await res.json();
          setMaintenances((prev) => [data, ...prev]);
        } else {
          setMaintenances((prev) => [{ id: Date.now(), ...maintenanceEntry }, ...prev]);
        }
      } catch (e) {
        setMaintenances((prev) => [{ id: Date.now(), ...maintenanceEntry }, ...prev]);
      }

      if (selectedVeh || request.vehicleId || request.vehicleName) {
        const ref = selectedVeh?.id || request.vehicleId || request.vehicleName;
        updateVehicleStatusByNameOrId(ref, 'Em manutenção');
      }

      setSupportRequests((prev) =>
        prev.map((s) => (s.id === request.id ? { ...s, status: 'Em atendimento' } : s))
      );

      try {
        await fetch(`/api/support/${request.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Em atendimento' })
        });
      } catch (e) {}

      alert(`Solicitação ${request.protocol} encaminhada para a Manutenção com sucesso!\nO status do veículo foi alterado para 'Em manutenção'.`);
    } catch (err) {
      console.error('Erro ao encaminhar para manutenção:', err);
      alert('Ocorreu um erro ao encaminhar a solicitação para manutenção.');
    }
  };

  const visibleSupportRequests = filterByExactValue(filterByExactValue(filterBySearch(supportRequests, supportSearch, (request) => `${request.protocol} ${request.driver} ${request.vehicleName} ${request.plate}`), supportStatusFilter, 'Todos os status', (request) => request.status), supportTypeFilter, 'Todos os tipos', (request) => request.type);
  const visibleIncidents = filterByExactValue(
    filterBySearch(incidents, incidentSearch, (incident) => `${incident.protocol} ${incident.vehicleName} ${incident.plate} ${incident.driver}`),
    incidentStatusFilter,
    'Todos os status',
    (incident) => incident.status
  );
  const visibleVehicles = filterByExactValue(
    filterByExactValue(
      filterBySearch(vehicles, vehicleSearch, (v) => `${v.brand} ${v.name} ${v.plate || ''} ${v.category} ${v.year || ''}`),
      vehicleCategoryFilter,
      'Todas as categorias',
      (v) => v.category
    ),
    vehicleStatusFilter,
    'Todos os status',
    (v) => v.status
  );
  const visibleProposals = filterByExactValue(
    filterBySearch(proposals, interestedSearch, (p) => `${p.fullName || ''} ${p.phone || ''} ${p.email || ''} ${p.city || ''} ${p.vehicleModel || ''} ${p.message || ''}`),
    interestedStatusFilter,
    'Todos os status',
    (p) => p.status
  );
  const visibleCollections = filterByExactValue(
    filterBySearch(collections, collectionSearch, (c) => `${c.driver || ''} ${c.description || ''} ${c.type || ''}`),
    collectionFilter,
    'Todos os status',
    (c) => c.status
  );
  const visibleMaintenances = filterByExactValue(
    filterBySearch(maintenances, maintenanceSearch, (m) => `${m.vehicleName || ''} ${m.service || ''} ${m.workshop || ''} ${m.notes || ''}`),
    maintenanceStatusFilter,
    'Todos os status',
    (m) => m.status
  );
  const visibleCashEntries = filterByExactValue(
    filterByExactValue(
      filterBySearch(cashEntries, cashSearch, (c) => `${c.description || ''} ${c.category || ''} ${c.notes || ''}`),
      cashTypeFilter,
      'Todos os tipos',
      (c) => c.type
    ),
    cashStatusFilter,
    'Todos os status',
    (c) => c.status
  );

  // Vehicles CRUD Actions
  const openAddVehicle = () => {
    setEditingVehicle(null);
    setVehicleFormData(createVehicleForm());
    setVehicleFormOpen(true);
  };

  const openEditVehicle = (car) => {
    setEditingVehicle(car);
    setVehicleFormData({
      brand: car.brand,
      name: car.name,
      category: car.category,
      priceWeekly: car.priceWeekly,
      year: car.year || '2024',
      status: car.status,
      image: car.image,
      transm: car.specs?.transm || 'Manual',
      seats: car.specs?.seats || '5 lugares',
      fuel: car.specs?.fuel || 'Flex',
      consumption: car.specs?.consumption || '13,0 km/l',
      features: Array.isArray(car.features) ? car.features.join(', ') : '',
      internalCode: '', plate: '', renavam: '', chassis: '', version: '', manufactureYear: '',
      modelYear: car.year || '2024', color: '', mileage: '', doors: '', acquisitionValue: '',
      acquisitionDate: '', insurer: '', mileageControlDate: '', nextMaintenanceMileage: ''
    });
    setVehicleFormOpen(true);
  };

  const handleVehicleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setVehicleFormData((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const featuresArray = vehicleFormData.features
      ? vehicleFormData.features.split(',').map(f => f.trim()).filter(f => f !== '')
      : [];

    const payload = {
      brand: vehicleFormData.brand.toUpperCase(),
      year: vehicleFormData.modelYear || vehicleFormData.year,
      name: vehicleFormData.name,
      category: vehicleFormData.category,
      priceWeekly: Number(vehicleFormData.priceWeekly),
      status: vehicleFormData.status,
      image: vehicleFormData.image,
      specs: {
        transm: vehicleFormData.transm,
        seats: vehicleFormData.seats,
        fuel: vehicleFormData.fuel,
        consumption: vehicleFormData.consumption
      },
      features: featuresArray
    };

    try {
      let res;
      if (editingVehicle) {
        res = await fetch(`/api/vehicles/${editingVehicle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setVehicleFormOpen(false);
        checkConnectionAndLoadData();
      } else {
        alert('Erro ao salvar veículo no servidor.');
      }
    } catch (err) {
      alert('Servidor desconectado. Operações de salvamento não persistiram no banco.');
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este veículo?')) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        checkConnectionAndLoadData();
      } else {
        alert('Erro ao excluir veículo.');
      }
    } catch (e) {
      alert('Erro ao conectar ao servidor.');
    }
  };

  // Proposals Management Actions
  const handleProposalStatus = async (id, newStatus) => {
    try {
      const nextStatus = normalizeProposalStatus(newStatus);
      const res = await fetch(`/api/proposals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        const proposalToConvert = proposals.find((proposal) => proposal.id === id);

        if ((nextStatus === 'Aprovado' || nextStatus === 'Convertido') && proposalToConvert) {
          const newClient = {
            id: Date.now() + Math.random(),
            type: 'PF',
            name: proposalToConvert.fullName,
            fullName: proposalToConvert.fullName,
            document: proposalToConvert.cpf,
            cpf: proposalToConvert.cpf,
            email: proposalToConvert.email,
            phone: proposalToConvert.phone,
            city: proposalToConvert.city,
            state: proposalToConvert.state || 'SP',
            status: 'Ativo',
            createdAt: proposalToConvert.createdAt || new Date().toLocaleDateString('pt-BR'),
            cnhCategory: proposalToConvert.cnhCategory || 'B',
            appPlatforms: proposalToConvert.appPlatform ? [proposalToConvert.appPlatform] : [],
            platforms: proposalToConvert.appPlatform ? [proposalToConvert.appPlatform] : []
          };

          setClients((current) => mergePeopleRecords([newClient, ...current], current));
        }

        setProposals((current) => current.map((proposal) => (
          proposal.id === id ? { ...proposal, status: nextStatus } : proposal
        )));

        checkConnectionAndLoadData();
        setSelectedProposal(prev => prev ? { ...prev, status: nextStatus } : null);
      }
    } catch (e) {
      alert('Erro de conexão ao atualizar proposta.');
    }
  };

  // Fallback demo users array for authentication matches offline
  const fallbackUsers = [
    { name: 'Carlos Alberto', email: 'admin@optimusexperience.com.br', password: 'admin123', role: 'Administrador' },
    { name: 'Fernanda Oliveira', email: 'gestor@optimusexperience.com.br', password: 'gestor123', role: 'Gestor' },
    { name: 'Ricardo Mendes', email: 'atendente@optimusexperience.com.br', password: 'atendente123', role: 'Atendente' },
    { name: 'Carlos Alberto', email: 'admin@drivefleet.com.br', password: 'admin123', role: 'Administrador' },
    { name: 'Fernanda Oliveira', email: 'gestor@drivefleet.com.br', password: 'gestor123', role: 'Gestor' },
    { name: 'Ricardo Mendes', email: 'atendente@drivefleet.com.br', password: 'atendente123', role: 'Atendente' }
  ];

  // Dashboard Stats calculations
  const totalVehiclesCount = dashboardSummary?.totalVehicles ?? vehicles.length;
  const rentedVehiclesCount = dashboardSummary?.rentedVehicles ?? vehicles.filter((vehicle) => vehicle.status === 'Alugado').length;
  const totalProposalsCount = proposals.length;
  const availableVehiclesCount = dashboardSummary?.availableVehicles ?? vehicles.filter((vehicle) => vehicle.status === 'Disponível').length;
  const maintenanceVehiclesCount = dashboardSummary?.maintenanceVehicles ?? vehicles.filter((vehicle) => vehicle.status === 'Em manutenção').length;
  const reservedVehiclesCount = dashboardSummary?.reservedVehicles ?? vehicles.filter((vehicle) => vehicle.status === 'Reservado').length;
  const occupancyRate = totalVehiclesCount ? Math.round((rentedVehiclesCount / totalVehiclesCount) * 100) : 0;
  const fleetStatus = [
    { label: 'Em locação', value: rentedVehiclesCount, color: '#35bf8b' },
    { label: 'Disponível', value: availableVehiclesCount, color: '#4e7df3' },
    { label: 'Manutenção', value: maintenanceVehiclesCount, color: '#f5a623' },
    { label: 'Reservado', value: reservedVehiclesCount, color: '#8b5cf6' }
  ];
  const locallyCalculatedRevenue = cashIn + payments.reduce((total, payment) => total + payment.value, 0) + rentals.filter((rental) => rental.status !== 'Cancelada').reduce((total, rental) => total + rental.value, 0);
  const monthlyRevenue = dashboardSummary?.monthlyRevenue ?? locallyCalculatedRevenue;
  const monthlyExpenses = cashOut + maintenances.reduce((total, maintenance) => total + (Number(maintenance.cost) || 0), 0) + fines.reduce((total, fine) => total + fine.value, 0);
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const chartMonths = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((label, index) => ({ label, revenue: index === 6 ? 0 : (rentals[index]?.value || payments[index]?.value || 0), expense: index === 6 ? 0 : (cashEntries.filter((entry) => entry.type === 'Saída')[index]?.value || maintenances[index]?.cost || 0) }));
  const reportDate = (record) => record.createdAt || record.date || record.startDate || new Date();
  const asDate = (value) => {
    if (value instanceof Date) return value;
    if (typeof value === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [day, month, year] = value.split('/');
      return new Date(`${year}-${month}-${day}T12:00:00`);
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  };
  const notificationTime = (value) => value ? `Registrado em ${asDate(value).toLocaleDateString('pt-BR')}` : 'Agora';
  const automaticNotifications = [
    ...fines.map((fine) => ({ id: `fine-${fine.id}`, category: 'Financeiro', level: fine.status === 'Vencida' ? 'urgent' : 'info', title: fine.status === 'Vencida' ? 'Multa vencida' : 'Nova multa registrada', subject: `${fine.vehicleName || 'Veículo não informado'} — ${formatCurrency(fine.value || 0)}`, description: fine.status === 'Vencida' ? `A multa ${fine.notice || ''} está vencida.` : `Foi registrada uma multa para o veículo ${fine.vehicleName || 'não informado'}.`, action: 'Ver multa', target: 'fines', time: notificationTime(fine.date || fine.dueDate) })),
    ...incidents.map((incident) => ({ id: `incident-${incident.id}`, category: 'Frota', level: 'urgent', title: 'Novo sinistro registrado', subject: incident.vehicleName || 'Veículo não informado', description: `Foi registrado um sinistro${incident.driver ? ` envolvendo o motorista ${incident.driver}` : ''}.`, action: 'Ver sinistro', target: 'incidents', time: notificationTime(incident.date) })),
    ...supportRequests.filter((request) => request.status !== 'Resolvido').map((request) => ({ id: `support-${request.id}`, category: 'Suporte', level: request.priority === 'Urgente' ? 'urgent' : 'info', title: 'Nova solicitação de suporte', subject: `${request.driver || 'Motorista'} — ${request.vehicleName || 'Veículo não informado'}`, description: request.description || `Solicitação de ${request.type || 'suporte'} aguardando atendimento.`, action: 'Atender solicitação', target: 'support', time: notificationTime(request.createdAt) })),
    ...maintenances.filter((maintenance) => maintenance.status !== 'Concluída' && maintenance.status !== 'Cancelada').map((maintenance) => ({ id: `maintenance-${maintenance.id}`, category: 'Frota', level: maintenance.priority === 'Urgente' ? 'urgent' : 'attention', title: 'Manutenção pendente', subject: maintenance.vehicleName || 'Veículo não informado', description: maintenance.service || 'Há uma manutenção programada aguardando atendimento.', action: 'Ver manutenção', target: 'maintenance', time: notificationTime(maintenance.date) })),
    ...vehicles.filter((vehicle) => vehicle.status === 'Em manutenção').map((vehicle) => ({ id: `vehicle-${vehicle.id}`, category: 'Frota', level: 'attention', title: 'Veículo indisponível', subject: `${vehicle.brand} ${vehicle.name}`, description: 'O veículo entrou em manutenção e não pode ser disponibilizado para locação.', action: 'Ver veículo', target: 'vehicles', time: 'Status atualizado' })),
    ...inspections.filter((inspection) => inspection.status !== 'Concluída').map((inspection) => ({ id: `inspection-${inspection.id}`, category: 'Vistorias', level: 'attention', title: 'Vistoria pendente', subject: inspection.vehicle || inspection.client || 'Veículo não informado', description: `A vistoria de ${String(inspection.type || '').toLowerCase()} aguarda realização.`, action: 'Realizar vistoria', target: 'inspections', time: notificationTime(inspection.date) })),
    ...contracts.filter((contract) => { const days = Math.ceil((asDate(contract.endDate) - new Date()) / 86400000); return days >= 0 && days <= 7 && contract.status !== 'Encerrado'; }).map((contract) => { const days = Math.ceil((asDate(contract.endDate) - new Date()) / 86400000); return { id: `contract-${contract.id}`, category: 'Contratos', level: 'attention', title: 'Contrato próximo do vencimento', subject: `Contrato #${contract.number || contract.id}`, description: `O contrato termina em ${days} dia${days === 1 ? '' : 's'}.`, action: 'Ver contrato', target: 'contracts', time: notificationTime(contract.endDate) }; })
  ].map((notification) => ({ ...notification, unread: !readNotificationIds.includes(notification.id) }));
  const reportRecords = [
    ...rentals.map((item) => ({ ...item, reportType: 'Locação' })),
    ...reservations.map((item) => ({ ...item, reportType: 'Reserva' })),
    ...contracts.map((item) => ({ ...item, reportType: 'Contrato' })),
    ...proposals.map((item) => ({ ...item, reportType: 'Proposta' })),
    ...supportRequests.map((item) => ({ ...item, reportType: 'Suporte' }))
  ];
  const reportStart = (() => {
    const today = new Date();
    if (reportPeriod === 'Hoje') return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (reportPeriod === '7 dias') return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    if (reportPeriod === 'Este mês') return new Date(today.getFullYear(), today.getMonth(), 1);
    if (reportPeriod === 'Personalizado' && reportCustomStart) return new Date(`${reportCustomStart}T00:00:00`);
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
  })();
  const reportEnd = reportPeriod === 'Personalizado' && reportCustomEnd ? new Date(`${reportCustomEnd}T23:59:59`) : new Date();
  const periodRecords = reportRecords.filter((record) => {
    const normalizedStatus = (record.status || 'Pendente').toLowerCase();
    const vehicle = record.vehicleName || record.vehicle || '';
    const client = record.client || record.clientName || '';
    const driver = record.driver || record.driverName || '';
    return asDate(reportDate(record)) >= reportStart
      && asDate(reportDate(record)) <= reportEnd
      && (reportStatusFilter === 'Todos' || normalizedStatus === reportStatusFilter.toLowerCase())
      && (reportVehicleFilter === 'Todos' || vehicle === reportVehicleFilter)
      && (reportClientFilter === 'Todos' || client === reportClientFilter)
      && (reportDriverFilter === 'Todos' || driver === reportDriverFilter);
  });
  const reportStatusCount = (names) => periodRecords.filter((record) => names.includes((record.status || 'Pendente').toLowerCase())).length;
  const totalReportRecords = periodRecords.length;
  const completedRecords = reportStatusCount(['concluída', 'concluida', 'encerrada', 'resolvido']);
  const pendingRecords = reportStatusCount(['pendente', 'agendada', 'aberta', 'ativa']);
  const cancelledRecords = reportStatusCount(['cancelada', 'cancelado']);
  const completionRate = totalReportRecords ? Math.round((completedRecords / totalReportRecords) * 100) : 0;
  const typeBreakdown = ['Locação', 'Reserva', 'Contrato', 'Proposta', 'Suporte'].map((type) => ({ type, value: periodRecords.filter((record) => record.reportType === type).length })).filter((item) => item.value > 0);
  const downloadReport = (rows, filename, type = 'csv') => {
    const url = URL.createObjectURL(new Blob([rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';')).join('\n')], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = `${filename}.${type}`; link.click(); URL.revokeObjectURL(url);
  };
  const exportReportsCsv = () => downloadReport([['Tipo', 'Status', 'Data', 'Valor'], ...periodRecords.map((record) => [record.reportType, record.status || 'Pendente', asDate(reportDate(record)).toLocaleDateString('pt-BR'), record.value || ''])], 'relatorio-optimus');
  // O painel inicia sem registros relacionados a clientes.
  const dashboardAlerts = [];
  const recentRentals = [];

  const sidebarSections = [
    {
      title: '',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: TrendingUp }
      ]
    },
    {
      title: 'Gestão',
      items: [
        { key: 'users', label: 'Usuários', icon: UserCheck },
        { key: 'clients', label: 'Clientes', icon: UserCheck },
        { key: 'drivers', label: 'Motoristas', icon: UserCheck },
        { key: 'vehicles', label: 'Veículos', icon: Car }
      ]
    },
    {
      title: 'Operação',
      items: [
        { key: 'reservations', label: 'Reservas', icon: FileText },
        { key: 'rentals', label: 'Locações', icon: FileText },
        { key: 'contracts', label: 'Contratos', icon: FileText }
      ]
    },
    {
      title: 'Financeiro',
      items: [
        { key: 'collections', label: 'Cobranças', icon: Check },
        { key: 'payments', label: 'Pagamentos', icon: Check },
        { key: 'cashflow', label: 'Fluxo de Caixa', icon: TrendingUp }
      ]
    },
    {
      title: 'Frota',
      items: [
        { key: 'maintenance', label: 'Manutenções', icon: ShieldCheck },
        { key: 'inspections', label: 'Vistorias', icon: ShieldCheck },
        { key: 'fines', label: 'Multas', icon: ShieldCheck },
        { key: 'incidents', label: 'Sinistros', icon: ShieldCheck }
      ]
    },
    {
      title: 'Atendimento',
      items: [
        { key: 'support', label: 'Suporte', icon: FileText },
        { key: 'interested', label: 'Interessados', icon: UserCheck }
      ]
    },
    {
      title: 'Sistema',
      items: [
        { key: 'reports', label: 'Relatórios', icon: TrendingUp },
        { key: 'notifications', label: 'Notificações', icon: Bell },
        { key: 'settings', label: 'Configurações', icon: ShieldCheck }
      ]
    }
  ];

  const reportCategories = [
    { name: 'Todos', key: 'Todos' }, { name: 'Operacional', key: 'Operacional' },
    { name: 'Financeiro', key: 'Financeiro' }, { name: 'Pessoas', key: 'Pessoas' },
    { name: 'Ocorrências', key: 'Ocorrências' }
  ];
  const reportItems = [
    { name: 'Veículos', category: 'Operacional', icon: Car }, { name: 'Locações', category: 'Operacional', icon: FileText },
    { name: 'Reservas', category: 'Operacional', icon: CalendarDays }, { name: 'Contratos', category: 'Operacional', icon: ClipboardList },
    { name: 'Vistorias', category: 'Operacional', icon: Camera }, { name: 'Manutenções', category: 'Operacional', icon: Wrench },
    { name: 'Receitas', category: 'Financeiro', icon: TrendingUp }, { name: 'Despesas', category: 'Financeiro', icon: CircleDollarSign },
    { name: 'Cobranças', category: 'Financeiro', icon: CircleDollarSign }, { name: 'Pagamentos', category: 'Financeiro', icon: CircleDollarSign },
    { name: 'Fluxo de Caixa', category: 'Financeiro', icon: TrendingUp }, { name: 'Rentabilidade da Frota', category: 'Financeiro', icon: ArrowUpRight },
    { name: 'Clientes', category: 'Pessoas', icon: UserCheck }, { name: 'Motoristas', category: 'Pessoas', icon: UserCheck },
    { name: 'Multas', category: 'Ocorrências', icon: AlertTriangle }, { name: 'Sinistros', category: 'Ocorrências', icon: ShieldCheck },
    { name: 'Suporte', category: 'Ocorrências', icon: Headphones }
  ];
  const visibleReportItems = reportCategory === 'Todos' ? reportItems : reportItems.filter((item) => item.category === reportCategory);
  const reportSourceRows = {
    [reportItems[0].name]: vehicles,
    [reportItems[1].name]: rentals,
    [reportItems[2].name]: reservations,
    [reportItems[3].name]: contracts,
    [reportItems[4].name]: inspections,
    [reportItems[5].name]: maintenances,
    [reportItems[6].name]: [...rentals.filter((item) => item.status !== 'Cancelada'), ...payments, ...cashEntries.filter((item) => item.type === 'Entrada')],
    [reportItems[7].name]: [...maintenances, ...fines, ...cashEntries.filter((item) => item.type === 'Saída')],
    [reportItems[8].name]: collections,
    [reportItems[9].name]: payments,
    [reportItems[10].name]: cashEntries,
    [reportItems[12].name]: clients,
    [reportItems[13].name]: [],
    [reportItems[14].name]: fines,
    [reportItems[15].name]: incidents,
    [reportItems[16].name]: supportRequests
  };
  const fleetProfitabilityRows = vehicles.map((vehicle) => {
    const vehicleName = getVehicleName(vehicles, vehicle.id, `${vehicle.brand} ${vehicle.name}`);
    const vehicleRentals = rentals.filter((rental) => (rental.vehicleName || rental.vehicle) === vehicleName);
    const revenue = vehicleRentals.reduce((total, rental) => total + (Number(rental.value) || 0), 0);
    const expenses = maintenances.filter((item) => (item.vehicleName || item.vehicle) === vehicleName).reduce((total, item) => total + (Number(item.cost) || 0), 0)
      + fines.filter((item) => (item.vehicleName || item.vehicle) === vehicleName).reduce((total, item) => total + (Number(item.value) || 0), 0);
    return { vehicle: vehicleName, revenue, expenses, profit: revenue - expenses, occupancy: rentals.length ? Math.round(vehicleRentals.filter((item) => item.status === 'Ativa').length / rentals.length * 100) : 0 };
  });
  const selectedReportRows = selectedReport === reportItems[11].name ? fleetProfitabilityRows : (reportSourceRows[selectedReport] || []);
  const normalizedReportRows = selectedReportRows.filter((row) => {
    const text = Object.values(row).join(' ').toLowerCase();
    return !reportSearch || text.includes(reportSearch.toLowerCase());
  });
  const selectedReportColumns = selectedReport === reportItems[11].name
    ? [['vehicle', 'Veículo'], ['revenue', 'Receita'], ['expenses', 'Despesas'], ['profit', 'Lucro'], ['occupancy', 'Taxa de ocupação']]
    : [['id', '#'], ['vehicleName', 'Veículo'], ['vehicle', 'Veículo'], ['client', 'Cliente'], ['driver', 'Motorista'], ['date', 'Data'], ['value', 'Valor'], ['status', 'Status']];
  const visibleSelectedColumns = selectedReportColumns.filter(([key], index, columns) => index === 0 || normalizedReportRows.some((row) => row[key] !== undefined) || !columns.slice(0, index).some(([previousKey]) => previousKey === key));

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className={`admin-modal-content glass-card ${isLoggedIn ? 'dashboard-view-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="admin-close-btn" onClick={onClose} title="Fechar Painel">
          <X size={20} />
        </button>

        {!isLoggedIn ? (
          /* --- LOGIN VIEW SCREEN (IMAGE 10) --- */
          <div className="admin-login-layout">
            <div className="admin-modal-header">
              <div className="admin-badge">
                <Lock size={14} />
                <span>Acesso Restrito</span>
              </div>
              <h2 className="admin-brand-title">Optimus Experience</h2>
              <p className="admin-brand-subtitle">Área Administrativa</p>
            </div>

            <div className="login-flex-row">
              {/* Form Card */}
              <div className="login-form-box">
                <h3>Acessar sistema</h3>
                {authError && <div className="login-error-alert">{authError}</div>}
                
                <form onSubmit={handleLogin} className="admin-form">
                  <div className="admin-input-group">
                    <label>E-mail Corporativo</label>
                    <input 
                      type="text" 
                      placeholder="seu@drivefleet.com.br"
                      value={adminAuth.username}
                      onChange={(e) => setAdminAuth({ ...adminAuth, username: e.target.value })}
                      required
                    />
                  </div>
                  

                  <div className="admin-input-group">
                    <label>Senha</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={adminAuth.password}
                      onChange={(e) => setAdminAuth({ ...adminAuth, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full login-submit-btn" disabled={loading}>
                    {loading ? 'Autenticando...' : 'Entrar'}
                  </button>
                </form>
              </div>

              {/* Demo Accounts Sidebar helper */}
              <div className="demo-accounts-box">
                <span className="demo-badge">CONTAS DEMO</span>
                <p className="demo-desc">Clique em um perfil para preencher os dados de teste:</p>
                <div className="demo-cards-list">
                  <div className="demo-account-card" onClick={() => handleFillDemo('admin@optimusexperience.com.br')}>
                    <div className="demo-user-meta">
                      <strong>Carlos Alberto</strong>
                      <span>admin@drivefleet.com.br</span>
                    </div>
                    <span className="demo-role-tag admin">Administrador</span>
                  </div>

                  <div className="demo-account-card" onClick={() => handleFillDemo('gestor@optimusexperience.com.br')}>
                    <div className="demo-user-meta">
                      <strong>Fernanda Oliveira</strong>
                      <span>gestor@drivefleet.com.br</span>
                    </div>
                    <span className="demo-role-tag manager">Gestor</span>
                  </div>

                  <div className="demo-account-card" onClick={() => handleFillDemo('atendente@optimusexperience.com.br')}>
                    <div className="demo-user-meta">
                      <strong>Ricardo Mendes</strong>
                      <span>atendente@drivefleet.com.br</span>
                    </div>
                    <span className="demo-role-tag staff">Atendente</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-footer">
              <p>Optimus Experience © {new Date().getFullYear()} — Sistema de Gestão de Frotas</p>
            </div>
          </div>
        ) : (
          /* --- ADMIN DASHBOARD LAYOUT VIEW --- */
          <div className="admin-dashboard-layout">
            
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
              <div className="sidebar-brand">
                <div className="brand-main">
                  <div className="brand-icon-wrap">
                    <Car size={18} />
                  </div>
                  <div className="brand-copy">
                    <h4>DriveFleet</h4>
                    <span>Admin Panel</span>
                  </div>
                </div>
                <button className="sidebar-close-btn" onClick={onClose} title="Fechar Painel" aria-label="Fechar painel">
                  <X size={16} />
                </button>
              </div>

              <nav className="sidebar-nav">
                {sidebarSections.map((section) => (
                  <div key={section.title || 'main'} className="sidebar-section">
                    {section.title && <div className="section-label">{section.title}</div>}
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.key}
                          className={`nav-item-btn ${activeTab === item.key ? 'active' : ''}`}
                          onClick={() => handleTabChange(item.key)}
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div className="sidebar-user-mini">
                <div className="mini-user-avatar">A</div>
                <div className="mini-user-meta">
                  <strong>{currentUser?.name || 'Admin'}</strong>
                  <span>{currentUser?.email || 'admin@optimusexperience.com.br'}</span>
                </div>
                <button className="logout-mini" onClick={handleLogout} aria-label="Sair" title="Sair">
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </aside>

            {/* Main Workspace viewport */}
            <main className="admin-viewport">{accessDenied && <div className="access-denied-toast" role="alert">Você não tem permissão para esse setor.</div>}
              
              {/* Tab 1: Indicators / Stats Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="tab-pane">
                  <div className="dashboard-header-bar">
                    <h2 className="view-title">Painel</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input type="text" placeholder="Buscar..." />
                      </div>
                      <button className="icon-action-btn notification-bell-button" aria-label="Notificações" onClick={() => handleTabChange('notifications')}>
                        <Bell size={16} />
                        {automaticNotifications.filter((notification) => notification.unread).length > 0 && <span className="notification-bell-count">{automaticNotifications.filter((notification) => notification.unread).length}</span>}
                      </button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="stats-metric-grid">
                    <div className="metric-card">
                      <div className="metric-topline">
                        <span className="trend positive"><ArrowUpRight size={14} /> 0%</span>
                      </div>
                      <div className="metric-body">
                        <div className="icon-wrapper default-icon">
                          <TrendingUp size={20} />
                        </div>
                        <div className="metric-info">
                          <h3>R$ {monthlyRevenue.toLocaleString('pt-BR')}</h3>
                          <p>Receita do mês</p>
                        </div>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-topline">
                        <span className="trend negative"><ArrowDownRight size={14} /> 0%</span>
                      </div>
                      <div className="metric-body">
                        <div className="icon-wrapper active-icon">
                          <TrendingUp size={20} />
                        </div>
                        <div className="metric-info">
                          <h3>R$ {monthlyExpenses.toLocaleString('pt-BR')}</h3>
                          <p>Despesas do mês</p>
                        </div>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-topline">
                        <span className="trend positive"><ArrowUpRight size={14} /> 0%</span>
                      </div>
                      <div className="metric-body">
                        <div className="icon-wrapper alert-icon">
                          <FileText size={20} />
                        </div>
                        <div className="metric-info">
                          <h3>R$ {monthlyProfit.toLocaleString('pt-BR')}</h3>
                          <p>Lucro do período</p>
                        </div>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-topline">
                        <span className="trend positive"><ArrowUpRight size={14} /> 0%</span>
                      </div>
                      <div className="metric-body">
                        <div className="icon-wrapper ocup-icon">
                          <Check size={20} />
                        </div>
                        <div className="metric-info">
                          <h3>{occupancyRate}%</h3>
                          <p>Taxa de ocupação</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="stats-subgrid">
                    <div className="mini-stat-card">
                      <div className="mini-icon green"><Car size={18} /></div>
                      <div className="mini-stat-body">
                        <h3>{totalVehiclesCount}</h3>
                        <p>Total de veículos</p>
                      </div>
                    </div>
                    <div className="mini-stat-card">
                      <div className="mini-icon green"><Check size={18} /></div>
                      <div className="mini-stat-body">
                        <h3>{availableVehiclesCount}</h3>
                        <p>Disponíveis</p>
                      </div>
                    </div>
                    <div className="mini-stat-card">
                      <div className="mini-icon green"><Car size={18} /></div>
                      <div className="mini-stat-body">
                        <h3>{rentedVehiclesCount}</h3>
                        <p>Em locação</p>
                      </div>
                    </div>
                    <div className="mini-stat-card">
                      <div className="mini-icon green"><TrendingUp size={18} /></div>
                      <div className="mini-stat-body">
                        <h3>{maintenanceVehiclesCount}</h3>
                        <p>Em manutenção</p>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-bottom-grid">
                    <div className="panel-box">
                      <h3>Receita vs Despesas</h3>
                      <div className="bar-chart">
                        {chartMonths.map((month) => (
                          <div key={month.label} className="bar-group" aria-label={`${month.label}: receita e despesas`}>
                            <div className="bar bar-green bar-zero" style={{ height: `${month.revenue}%` }} />
                            <div className="bar bar-red bar-zero" style={{ height: `${month.expense}%` }} />
                            <span className="bar-month-label">{month.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="panel-box donut-panel">
                      <h3>Status da Frota</h3>
                      <div className="donut-wrap">
                        <div className="donut-chart donut-empty">
                          <div className="donut-center">{totalVehiclesCount}</div>
                        </div>
                      </div>
                      <div className="fleet-legend">
                        {fleetStatus.map((item) => <div key={item.label}><span style={{ backgroundColor: item.color }} />{item.label}<strong>{item.value}</strong></div>)}
                      </div>
                    </div>
                  </div>

                  <section className="dashboard-list-panel alerts-panel">
                    <div className="dashboard-list-title">
                      <h3>Alertas e Pendências</h3>
                      <span>{dashboardAlerts.length} alertas</span>
                    </div>
                    <div className="alerts-list">
                      {dashboardAlerts.length === 0 ? (
                        <div className="dashboard-empty-state">Nenhuma pendência de cliente no momento.</div>
                      ) : dashboardAlerts.map((alert, index) => (
                        <div className={`dashboard-alert ${alert.type}`} key={`${alert.title}-${index}`}>
                          <AlertTriangle size={17} />
                          <div><strong>{alert.title}</strong><p>{alert.detail}</p></div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="dashboard-list-panel rentals-panel">
                    <h3>Locações Recentes</h3>
                    <div className="dashboard-table-scroll">
                      <table className="recent-rentals-table">
                        <thead><tr><th>Motorista</th><th>Veículo</th><th>Plano</th><th>Período</th><th>Valor</th><th>Status</th></tr></thead>
                        <tbody>{recentRentals.length === 0 ? (
                          <tr><td colSpan="6" className="table-empty-state">Nenhuma locação de cliente registrada.</td></tr>
                        ) : recentRentals.map((rental) => (
                          <tr key={`${rental[0]}-${rental[1]}`}>
                            <td>{rental[0]}</td><td>{rental[1]}</td><td>{rental[2]}</td><td>{rental[3]}</td><td><strong>{rental[4]}</strong></td>
                            <td><span className={`rental-status ${rental[5].toLowerCase()}`}>{rental[5]}</span></td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="tab-pane reports-tab-pane">
                  <div className="dashboard-header-bar reports-topbar">
                    <h2 className="view-title">Relatórios</h2>
                    <div className="dashboard-actions">
                      <div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="reports-heading">
                    <div><h2>Visão geral da operação</h2><p>Acompanhe resultados, pendências e a evolução do período selecionado.</p></div>
                    <div className="report-actions">
                      <select value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)} aria-label="Período do relatório">
                        <option>Hoje</option><option>7 dias</option><option>30 dias</option><option>Este mês</option><option>Personalizado</option>
                      </select>
                      <button className="report-button" onClick={checkConnectionAndLoadData}><RefreshCw size={16} />Atualizar</button>
                      <button className="report-button pdf" onClick={() => window.print()}><Download size={16} />Imprimir / PDF</button>
                      <button className="report-button excel" onClick={exportReportsCsv}><FileText size={16} />Exportar Excel</button>
                    </div>
                  </div>

                  {reportPeriod === 'Personalizado' && <div className="report-date-range"><label>De<input type="date" value={reportCustomStart} onChange={(event) => setReportCustomStart(event.target.value)} /></label><label>Até<input type="date" value={reportCustomEnd} onChange={(event) => setReportCustomEnd(event.target.value)} /></label></div>}

                  <div className="report-summary-grid">
                    {[
                      { icon: ClipboardList, label: 'Total de registros', value: totalReportRecords, detail: `no período ${reportPeriod.toLowerCase()}`, tone: 'blue' },
                      { icon: CheckCircle2, label: 'Concluídos', value: completedRecords, detail: `${completionRate}% de conclusão`, tone: 'green' },
                      { icon: Clock, label: 'Pendentes', value: pendingRecords, detail: 'requerem acompanhamento', tone: 'amber' },
                      { icon: AlertTriangle, label: 'Cancelados', value: cancelledRecords, detail: 'operações canceladas', tone: 'rose' }
                    ].map((metric) => {
                      const Icon = metric.icon;
                      return <div className="report-summary-card" key={metric.label}><div className={`report-metric-icon ${metric.tone}`}><Icon size={20} /></div><strong>{metric.value}</strong><span>{metric.label}</span><small>{metric.detail}</small></div>;
                    })}
                  </div>

                  <div className="report-business-grid">
                    {[
                      { icon: Car, label: 'Veículos', value: vehicles.length, tone: 'blue' },
                      { icon: ClipboardList, label: 'Locações ativas', value: rentals.filter((item) => item.status === 'Ativa').length, tone: 'green' },
                      { icon: UserCheck, label: 'Clientes', value: clients.length, tone: 'purple' },
                      { icon: UserCheck, label: 'Motoristas', value: new Set(rentals.map((item) => item.driver).filter(Boolean)).size, tone: 'blue' },
                      { icon: TrendingUp, label: 'Receita', value: formatCurrency(monthlyRevenue), tone: 'green' },
                      { icon: CircleDollarSign, label: 'Despesas', value: formatCurrency(monthlyExpenses), tone: 'rose' },
                      { icon: ArrowUpRight, label: 'Lucro', value: formatCurrency(monthlyProfit), tone: 'green' },
                      { icon: AlertTriangle, label: 'Cobranças vencidas', value: collections.filter((item) => item.status === 'Vencida').length, tone: 'amber' }
                    ].map((metric) => { const Icon = metric.icon; return <article className="report-summary-card" key={metric.label}><div className={`report-metric-icon ${metric.tone}`}><Icon size={18} /></div><strong>{metric.value}</strong><span>{metric.label}</span></article>; })}
                  </div>

                  <section className="report-panel report-ranking-panel"><div className="report-panel-heading"><div><h3>Veículos mais alugados</h3><p>Ranking por número de locações</p></div></div>{fleetProfitabilityRows.slice().sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((item, index, ranking) => <div className="report-status-row" key={item.vehicle}><div><span>{index + 1}. {item.vehicle}</span><b>{rentals.filter((rental) => (rental.vehicleName || rental.vehicle) === item.vehicle).length} locações</b></div><div className="report-progress"><i className="category" style={{ width: `${ranking[0]?.revenue ? Math.max(8, item.revenue / ranking[0].revenue * 100) : 8}%` }} /></div></div>)}</section>

                  <div className="reports-chart-grid">
                    <section className="report-panel revenue-chart"><div className="report-panel-heading"><div><h3>Financeiro</h3><p>Entradas e saídas registradas</p></div><strong>{formatCurrency(monthlyProfit)}</strong></div><div className="report-bars">{chartMonths.map((month) => <div className="report-bar-group" key={month.label}><div className="report-bar revenue" style={{ height: `${month.revenue ? Math.max(20, month.revenue / Math.max(monthlyRevenue, 1) * 100) : 4}%` }} /><div className="report-bar expense" style={{ height: `${month.expense ? Math.max(20, month.expense / Math.max(monthlyExpenses, 1) * 100) : 4}%` }} /><span>{month.label}</span></div>)}</div><div className="chart-legend"><span><i className="revenue" />Receitas {formatCurrency(monthlyRevenue)}</span><span><i className="expense" />Despesas {formatCurrency(monthlyExpenses)}</span></div></section>
                    <section className="report-panel report-status-panel"><div className="report-panel-heading"><div><h3>Status das operações</h3><p>Distribuição do período</p></div><strong>{completionRate}%</strong></div>{[{ label: 'Concluídos', value: completedRecords, tone: 'active' }, { label: 'Pendentes', value: pendingRecords, tone: 'scheduled' }, { label: 'Cancelados', value: cancelledRecords, tone: 'cancelled' }].map((status) => <div className="report-status-row" key={status.label}><div><span>{status.label}</span><b>{status.value} {totalReportRecords ? `· ${Math.round(status.value / totalReportRecords * 100)}%` : ''}</b></div><div className="report-progress"><i className={status.tone} style={{ width: `${totalReportRecords ? status.value / totalReportRecords * 100 : 0}%` }} /></div></div>)}</section>
                  </div>

                  <div className="reports-insights-grid"><section className="report-panel report-category-panel"><div className="report-panel-heading"><div><h3>Registros por categoria</h3><p>Comparativo entre áreas</p></div></div>{typeBreakdown.length ? typeBreakdown.map((item) => <div className="report-status-row" key={item.type}><div><span>{item.type}</span><b>{item.value} {totalReportRecords ? `· ${Math.round(item.value / totalReportRecords * 100)}%` : ''}</b></div><div className="report-progress"><i className="category" style={{ width: `${item.value / totalReportRecords * 100}%` }} /></div></div>) : <p className="report-empty">Ainda não há registros neste período.</p>}</section><section className="report-panel report-performance-panel"><h3>Desempenho</h3><div className="performance-metrics"><div><span>Taxa de conclusão</span><strong>{completionRate}%</strong></div><div><span>Locações ativas</span><strong>{rentals.filter((rental) => rental.status === 'Ativa').length}</strong></div><div><span>Veículos disponíveis</span><strong>{vehicles.filter((vehicle) => vehicle.status === 'Disponível').length}</strong></div></div><p>Os indicadores são atualizados à medida que novas operações são registradas.</p></section></div>

                  <section className="reports-catalog">
                    <div className="report-category-tabs">{reportCategories.map((category) => <button key={category.key} className={reportCategory === category.key ? 'active' : ''} onClick={() => setReportCategory(category.key)}>{category.name}</button>)}</div>
                    <div className="report-cards-grid">{visibleReportItems.map((item) => { const Icon = item.icon; return <button className={`report-link-card ${selectedReport === item.name ? 'selected' : ''}`} key={item.name} onClick={() => setSelectedReport(item.name)}><span className="report-link-icon"><Icon size={20} /></span><span><strong>{item.name}</strong><small>{item.category}</small></span></button>; })}</div>
                  </section>

                  <section className={`advanced-report-filters ${advancedFiltersOpen ? 'open' : ''}`}>
                    <button className="advanced-filter-toggle" onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}><span><Search size={17} />Filtros avançados</span><span>{advancedFiltersOpen ? '⌃' : '⌄'}</span></button>
                    {advancedFiltersOpen && <div className="advanced-filter-content">
                      <label>Status<select value={reportStatusFilter} onChange={(event) => setReportStatusFilter(event.target.value)}><option>Todos</option><option>Pendente</option><option>Ativa</option><option>Agendada</option><option>Encerrada</option><option>Concluída</option><option>Cancelada</option></select></label>
                      <label>Veículo<select value={reportVehicleFilter} onChange={(event) => setReportVehicleFilter(event.target.value)}><option>Todos</option>{vehicles.map((vehicle) => <option key={vehicle.id}>{getVehicleName(vehicles, vehicle.id, `${vehicle.brand} ${vehicle.name}`)}</option>)}</select></label>
                      <label>Cliente<select value={reportClientFilter} onChange={(event) => setReportClientFilter(event.target.value)}><option>Todos</option>{clients.map((client) => <option key={client.id}>{client.name}</option>)}</select></label>
                      <label>Motorista<select value={reportDriverFilter} onChange={(event) => setReportDriverFilter(event.target.value)}><option>Todos</option>{[...new Set(rentals.map((item) => item.driver).filter(Boolean))].map((driver) => <option key={driver}>{driver}</option>)}</select></label>
                      <button className="clear-report-filters" onClick={() => { setReportStatusFilter('Todos'); setReportVehicleFilter('Todos'); setReportClientFilter('Todos'); setReportDriverFilter('Todos'); setReportPeriod('30 dias'); setReportCustomStart(''); setReportCustomEnd(''); }}>Limpar filtros</button>
                    </div>}
                  </section>

                  {selectedReport && <section className="selected-report-table"><div className="selected-report-heading"><div><h3>{selectedReport}</h3><p>{normalizedReportRows.length} registro(s) encontrado(s)</p></div><div><label className="report-table-search"><Search size={15} /><input value={reportSearch} onChange={(event) => setReportSearch(event.target.value)} placeholder="Buscar nos dados..." /></label><button className="report-button excel" onClick={() => downloadReport([visibleSelectedColumns.map(([, label]) => label), ...normalizedReportRows.map((row) => visibleSelectedColumns.map(([key]) => row[key] ?? ''))], `relatorio-${selectedReport.toLowerCase().replaceAll(' ', '-')}`)}><Download size={15} />Exportar</button></div></div><div className="report-table-wrap"><table><thead><tr>{visibleSelectedColumns.map(([, label]) => <th key={label}>{label}</th>)}</tr></thead><tbody>{normalizedReportRows.length ? normalizedReportRows.map((row, index) => <tr key={row.id || `${selectedReport}-${index}`}>{visibleSelectedColumns.map(([key]) => <td key={key}>{['revenue', 'expenses', 'profit', 'value', 'cost'].includes(key) ? formatCurrency(Number(row[key]) || 0) : key === 'occupancy' ? `${row[key]}%` : row[key] ?? '—'}</td>)}</tr>) : <tr><td className="table-empty-state" colSpan={visibleSelectedColumns.length}>Nenhum dado encontrado para este relatório.</td></tr>}</tbody></table></div></section>}
                </div>
              )}

              {activeTab === 'notifications' && <NotificationsTab notifications={automaticNotifications} onNavigate={handleTabChange} onMarkRead={(id) => setReadNotificationIds((current) => current.includes(id) ? current : [...current, id])} onMarkAllRead={() => setReadNotificationIds(automaticNotifications.map((notification) => notification.id))} />}

              {activeTab === 'settings' && <SettingsTab currentUser={currentUser} permissionsByProfile={permissionsByProfile} onPermissionsSave={updatePermissions} onLogout={handleLogout} />}

              {activeTab === 'support' && (
                <SupportTab
                  requests={supportRequests}
                  visibleRequests={visibleSupportRequests}
                  formOpen={supportFormOpen}
                  form={supportForm}
                  search={supportSearch}
                  statusFilter={supportStatusFilter}
                  typeFilter={supportTypeFilter}
                  vehicles={vehicles}
                  rentals={rentals}
                  driverName=""
                  setFormOpen={setSupportFormOpen}
                  setForm={setSupportForm}
                  setSearch={setSupportSearch}
                  setStatusFilter={setSupportStatusFilter}
                  setTypeFilter={setSupportTypeFilter}
                  closeForm={closeSupportForm}
                  submitForm={handleSupportSubmit}
                  selectVehicle={handleSupportVehicleChange}
                  selectAttachment={handleSupportAttachment}
                  onForwardToMaintenance={handleForwardSupportToMaintenance}
                  onUpdateStatus={handleSupportStatusChange}
                />
              )}

              {activeTab === 'users' && (
                <div className="tab-pane users-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Usuários</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                        />
                      </div>
                      <button className="icon-action-btn" aria-label="Notificações">
                        <Bell size={16} />
                      </button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="users-page-heading">
                    <div>
                      <h2>Usuários</h2>
                      <p>Gerencie funcionários, cargos e permissões</p>
                    </div>
                    <button className="btn btn-primary btn-sm btn-new-user" onClick={() => setUserFormOpen(true)}>
                      <Plus size={17} /> Novo Usuário
                    </button>
                  </div>

                  <div className="users-toolbar-row">
                    <div className="users-filter">
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                    </div>
                    <button className="btn-export-csv" onClick={exportUsersCsv}>
                      <Download size={16} /> Exportar CSV
                    </button>
                  </div>

                  <section className="users-list-card">
                    <div className="users-table-scroll">
                      <table className="users-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Perfil</th>
                            <th>Status</th>
                            <th>Cadastro</th>
                            <th aria-label="Ações" />
                          </tr>
                        </thead>
                        <tbody>
                          {visibleUsers.length > 0 ? (
                            visibleUsers.map((u) => {
                              const initial = u.name ? u.name.charAt(0).toUpperCase() : 'U';
                              const statusClass = (u.status || 'Ativo').toLowerCase();
                              return (
                                <tr key={u.id}>
                                  <td>
                                    <div className="user-name-cell">
                                      <div className={`user-circle-avatar ${statusClass}`}>{initial}</div>
                                      <div className="user-meta-info">
                                        <strong>{u.name}</strong>
                                        <span>{u.email}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="user-cargo-cell">{u.cargo || u.role || 'Atendente'}</td>
                                  <td className="user-perfil-cell">{u.role || u.profile || 'Atendente'}</td>
                                  <td>
                                    <span className={`status-badge-pill ${statusClass}`}>{u.status || 'Ativo'}</span>
                                  </td>
                                  <td className="user-date-cell">{u.createdAt || '09/01/2024'}</td>
                                  <td className="action-menu-cell">
                                    <div className="action-dropdown-wrapper">
                                      <button
                                        className="rental-menu-trigger"
                                        onClick={() => setOpenUserMenu(openUserMenu === u.id ? null : u.id)}
                                        aria-label={`Ações de ${u.name}`}
                                      >
                                        <MoreVertical size={18} />
                                      </button>
                                      {openUserMenu === u.id && (
                                        <div className="action-dropdown-menu">
                                          <button onClick={() => handleUserStatusToggle(u.id, u.status)}>
                                            Alterar Status ({u.status === 'Ativo' ? 'Inativo' : 'Ativo'})
                                          </button>
                                          <button className="delete-action" onClick={() => handleUserDelete(u.id)}>
                                            Excluir Usuário
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr><td colSpan="6" className="table-empty-state">Nenhum usuário cadastrado.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {userFormOpen && (
                    <div className="user-form-overlay" onClick={closeUserForm}>
                      <form className="user-form-modal" onSubmit={handleUserSubmit} onClick={(e) => e.stopPropagation()}>
                        <div className="user-form-header">
                          <h3>Novo Usuário</h3>
                          <button type="button" onClick={closeUserForm} aria-label="Fechar cadastro"><X size={20} /></button>
                        </div>
                        <div className="user-form-content">
                          <label className="user-form-field full">Nome completo
                            <input required value={userFormData.name} onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })} placeholder="Nome completo" />
                          </label>
                          <div className="user-form-row">
                            <label className="user-form-field">CPF
                              <input value={userFormData.cpf} onChange={(e) => setUserFormData({ ...userFormData, cpf: e.target.value })} placeholder="000.000.000-00" />
                            </label>
                            <label className="user-form-field">Telefone
                              <input value={userFormData.phone} onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })} placeholder="(00) 00000-0000" />
                            </label>
                          </div>
                          <label className="user-form-field full">E-mail
                            <input type="email" required value={userFormData.email} onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })} placeholder="email@drivefleet.com.br" />
                          </label>
                          <div className="user-form-row">
                            <label className="user-form-field">Senha de acesso
                              <input type="password" required minLength="6" value={userFormData.password} onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })} placeholder="Mínimo de 6 caracteres" />
                            </label>
                            <label className="user-form-field">Confirmar senha
                              <input type="password" required minLength="6" value={userFormData.confirmPassword} onChange={(e) => setUserFormData({ ...userFormData, confirmPassword: e.target.value })} placeholder="Repita a senha" />
                            </label>
                          </div>
                          <div className="user-form-row">
                            <label className="user-form-field">Cargo
                              <input value={userFormData.role} onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })} placeholder="ex.: Diretor Operacional" />
                            </label>
                            <label className="user-form-field">Perfil
                              <select value={userFormData.profile} onChange={(e) => setUserFormData({ ...userFormData, profile: e.target.value })}>
                                <option>Administrador</option><option>Gestor</option><option>Financeiro</option><option>Operador de Frota</option><option>Atendimento</option>
                              </select>
                            </label>
                          </div>
                          <label className="user-form-field full">Status
                            <select value={userFormData.status} onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}><option>Ativo</option><option>Inativo</option><option>Bloqueado</option></select>
                          </label>
                        </div>
                        <div className="user-form-actions">
                          <button type="button" className="btn btn-secondary" onClick={closeUserForm}>Cancelar</button>
                          <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'clients' && (
                <div className="tab-pane payments-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Clientes</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                        />
                      </div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="drivers-page-heading clients-heading">
                    <div>
                      <h2>Clientes</h2>
                      <p>Cadastro de pessoas físicas e jurídicas</p>
                    </div>
                    <button className="btn btn-primary btn-sm btn-new-user" onClick={() => setClientFormOpen(true)}>
                      <Plus size={17} /> Novo Cliente
                    </button>
                  </div>

                  <div className="client-summary-grid">
                    <div className="client-summary-card total">
                      <UserCheck size={19} />
                      <strong>{clients.length}</strong>
                      <span>Total</span>
                    </div>
                    <div className="client-summary-card pf">
                      <UserCheck size={19} />
                      <strong>{clients.filter((client) => client.type === 'PF').length}</strong>
                      <span>Pessoa Física</span>
                    </div>
                    <div className="client-summary-card pj">
                      <FileText size={19} />
                      <strong>{clients.filter((client) => client.type === 'PJ').length}</strong>
                      <span>Pessoa Jurídica</span>
                    </div>
                  </div>

                  <div className="client-toolbar">
                    <div className="users-filter client-search">
                      <Search size={16} />
                      <input
                        value={clientSearch}
                        onChange={(event) => setClientSearch(event.target.value)}
                        placeholder="Buscar por nome ou CPF/CNPJ..."
                      />
                    </div>
                    <select value={clientTypeFilter} onChange={(event) => setClientTypeFilter(event.target.value)}>
                      <option>Todos os tipos</option>
                      <option>PF</option>
                      <option>PJ</option>
                    </select>
                    <button className="btn-export-csv" onClick={exportClientsCsv}>
                      <Download size={16} /> Exportar CSV
                    </button>
                  </div>

                  <section className="users-list-card clients-list-card">
                    <div className="users-table-scroll">
                      <table className="clients-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Contato</th>
                            <th>Cidade/UF</th>
                            <th>Origem</th>
                            <th>Cadastro</th>
                            <th aria-label="Ações" />
                          </tr>
                        </thead>
                        <tbody>
                          {visibleClients.length ? visibleClients.map((client) => (
                            <tr key={client.id}>
                              <td>
                                <div className="user-name-cell">
                                  <span className={`client-avatar ${client.type.toLowerCase()}`}>
                                    {client.type === 'PF' ? client.name.charAt(0).toUpperCase() : <FileText size={16} />}
                                  </span>
                                  <div className="client-name">
                                    <strong>{client.name}</strong>
                                    <small>{client.document}</small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className={`client-type-tag ${client.type.toLowerCase()}`}>{client.type}</span>
                              </td>
                              <td>
                                <div className="client-contact">
                                  <span>{client.email}</span>
                                  <small>{client.phone}</small>
                                </div>
                              </td>
                              <td>{client.city}/{client.state}</td>
                              <td>
                                <span className="rental-plan" style={{ fontSize: '0.78rem' }}>
                                  {client.origin || (client.interested_id || client.interestedId ? `Site (Interessado #${client.interested_id || client.interestedId})` : 'Cadastro administrativo')}
                                </span>
                              </td>
                              <td>{client.createdAt}</td>
                              <td className="action-menu-cell">
                                <div className="action-dropdown-wrapper">
                                  <button
                                    className="rental-menu-trigger"
                                    onClick={() => setOpenClientMenu(openClientMenu === client.id ? null : client.id)}
                                    aria-label={`Ações de ${client.name}`}
                                  >
                                    <MoreVertical size={18} />
                                  </button>
                                  {openClientMenu === client.id && (
                                    <div className="action-dropdown-menu">
                                      <button onClick={() => handleViewClientHistory(client)}>
                                        Ver Ficha / Histórico
                                      </button>
                                      <button className="delete-action" onClick={() => handleClientDelete(client.id)}>
                                        Excluir Cliente
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan="7" className="table-empty-state">Nenhum cliente encontrado.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {selectedClientHistory && (
                    <div className="user-form-overlay" onClick={() => setSelectedClientHistory(null)}>
                      <section className="incident-detail-modal client-history-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
                        <div className="user-form-header">
                          <div>
                            <h3>Ficha Cadastral do Cliente — {selectedClientHistory.client.name}</h3>
                            <span className="status-badge-pill ativo" style={{ marginLeft: '0.5rem' }}>{selectedClientHistory.client.status || 'Ativo'}</span>
                          </div>
                          <button type="button" onClick={() => setSelectedClientHistory(null)} aria-label="Fechar"><X size={20} /></button>
                        </div>

                        <div className="incident-detail-content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                          <div className="incident-detail-grid">
                            <div><small>Origem do Cadastro</small><strong>{selectedClientHistory.client.origin || (selectedClientHistory.client.interested_id || selectedClientHistory.client.interestedId ? `Site (Interessado #${selectedClientHistory.client.interested_id || selectedClientHistory.client.interestedId})` : 'Cadastro administrativo')}</strong></div>
                            <div><small>Documento (CPF/CNPJ)</small><strong>{selectedClientHistory.client.document || '—'}</strong></div>
                            <div><small>E-mail</small><strong>{selectedClientHistory.client.email || '—'}</strong></div>
                            <div><small>Telefone</small><strong>{selectedClientHistory.client.phone || '—'}</strong></div>
                          </div>

                          {selectedClientHistory.origin?.interested && (
                            <div className="incident-detail-section">
                              <h4>Interessado de Origem (Formulário do Site)</h4>
                              <p><strong>Veículo desejado:</strong> {selectedClientHistory.origin.interested.vehicle_model || selectedClientHistory.origin.interested.vehicleModel || '—'}</p>
                              <p><strong>Plano:</strong> {selectedClientHistory.origin.interested.plan_type || selectedClientHistory.origin.interested.planType || '—'}</p>
                              <p><strong>Mensagem:</strong> {selectedClientHistory.origin.interested.message || 'Interesse registrado via formulário.'}</p>
                            </div>
                          )}

                          <div className="incident-detail-section">
                            <h4>Motoristas Vinculados ({selectedClientHistory.drivers?.length || 0})</h4>
                            {selectedClientHistory.drivers?.length ? (
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedClientHistory.drivers.map(d => (
                                  <li key={d.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <strong>{d.name || d.full_name || d.fullName}</strong> — CPF: {d.cpf} | CNH: {d.cnh_category || d.cnhCategory || 'B'} | Status: {d.status}
                                  </li>
                                ))}
                              </ul>
                            ) : <p className="report-empty">Nenhum motorista vinculado.</p>}
                          </div>

                          <div className="incident-detail-section">
                            <h4>Reservas ({selectedClientHistory.reservations?.length || 0})</h4>
                            {selectedClientHistory.reservations?.length ? (
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedClientHistory.reservations.map(r => (
                                  <li key={r.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                                    Reserva #{r.id} — Veículo: {r.vehicle || r.vehicle_name} | Plano: {r.period || r.plan} | Status: {r.status}
                                  </li>
                                ))}
                              </ul>
                            ) : <p className="report-empty">Nenhuma reserva registrada.</p>}
                          </div>

                          <div className="incident-detail-section">
                            <h4>Contratos ({selectedClientHistory.contracts?.length || 0})</h4>
                            {selectedClientHistory.contracts?.length ? (
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedClientHistory.contracts.map(c => (
                                  <li key={c.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                                    Contrato #{c.number || c.contract_number || c.id} — Veículo: {c.vehicle || c.vehicle_name} | Status: {c.status}
                                  </li>
                                ))}
                              </ul>
                            ) : <p className="report-empty">Nenhum contrato registrado.</p>}
                          </div>

                          <div className="incident-detail-section">
                            <h4>Locações ({selectedClientHistory.rentals?.length || 0})</h4>
                            {selectedClientHistory.rentals?.length ? (
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedClientHistory.rentals.map(l => (
                                  <li key={l.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                                    Locação #{l.id} — Veículo: {l.vehicle || l.vehicle_name} | Início: {l.startDate || l.start_date} | Status: {l.status}
                                  </li>
                                ))}
                              </ul>
                            ) : <p className="report-empty">Nenhuma locação registrada.</p>}
                          </div>

                          <div className="incident-detail-section">
                            <h4>Pagamentos ({selectedClientHistory.payments?.length || 0})</h4>
                            {selectedClientHistory.payments?.length ? (
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedClientHistory.payments.map(p => (
                                  <li key={p.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                                    R$ {p.amount || p.value} — Data: {p.date || p.due_date} | Forma: {p.method} | Status: {p.status}
                                  </li>
                                ))}
                              </ul>
                            ) : <p className="report-empty">Nenhum pagamento registrado.</p>}
                          </div>
                        </div>

                        <div className="user-form-actions">
                          <button type="button" className="btn btn-secondary" onClick={() => setSelectedClientHistory(null)}>Fechar</button>
                        </div>
                      </section>
                    </div>
                  )}

                  {clientFormOpen && (
                    <div className="user-form-overlay" onClick={() => setClientFormOpen(false)}>
                      <form className="client-form-modal" onSubmit={handleClientSubmit} onClick={(event) => event.stopPropagation()}>
                        <div className="user-form-header">
                          <h3>Novo Cliente</h3>
                          <button type="button" onClick={() => setClientFormOpen(false)} aria-label="Fechar"><X size={20} /></button>
                        </div>
                        <div className="client-form-content">
                          <div className="user-form-row">
                            <label className="user-form-field">Tipo
                              <select value={clientForm.type} onChange={(event) => setClientForm({ ...clientForm, type: event.target.value, document: '' })}>
                                <option>PF</option>
                                <option>PJ</option>
                              </select>
                            </label>
                            <label className="user-form-field">{clientForm.type === 'PF' ? 'CPF' : 'CNPJ'}
                              <input required value={clientForm.document} onChange={(event) => setClientForm({ ...clientForm, document: event.target.value })} placeholder={clientForm.type === 'PF' ? '000.000.000-00' : '00.000.000/0000-00'} />
                            </label>
                          </div>
                          <label className="user-form-field full">{clientForm.type === 'PF' ? 'Nome completo' : 'Razão social'}
                            <input required value={clientForm.name} onChange={(event) => setClientForm({ ...clientForm, name: event.target.value })} placeholder="Nome do cliente" />
                          </label>
                          <div className="user-form-row">
                            <label className="user-form-field">Telefone
                              <input required value={clientForm.phone} onChange={(event) => setClientForm({ ...clientForm, phone: event.target.value })} placeholder="(00) 00000-0000" />
                            </label>
                            <label className="user-form-field">E-mail
                              <input required type="email" value={clientForm.email} onChange={(event) => setClientForm({ ...clientForm, email: event.target.value })} placeholder="email@exemplo.com" />
                            </label>
                          </div>
                          <div className="user-form-row">
                            <label className="user-form-field">Cidade
                              <input value={clientForm.city} onChange={(event) => setClientForm({ ...clientForm, city: event.target.value })} placeholder="Cidade" />
                            </label>
                            <label className="user-form-field">Estado
                              <input value={clientForm.state} onChange={(event) => setClientForm({ ...clientForm, state: event.target.value.toUpperCase().slice(0, 2) })} placeholder="UF" />
                            </label>
                          </div>
                        </div>
                        <div className="user-form-actions">
                          <button type="button" className="btn btn-secondary" onClick={() => setClientFormOpen(false)}>Cancelar</button>
                          <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="tab-pane clients-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Pagamentos</h2>
                    <div className="dashboard-actions">
                      <div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="drivers-page-heading"><div><h2>Pagamentos</h2><p>Registro de pagamentos recebidos</p></div><button className="btn btn-primary btn-sm btn-new-user" onClick={() => setPaymentFormOpen(true)}><Plus size={17} /> Novo Pagamento</button></div><div className="client-summary-grid"><div className="client-summary-card pf"><strong>{formatCurrency(payments.reduce((s,p) => s + p.value,0))}</strong><span>Total recebido</span></div><div className="client-summary-card total"><strong>{payments.length}</strong><span>Transações</span></div><div className="client-summary-card pj"><strong>{payments.filter(p=>p.receipt).length}</strong><span>Com comprovante</span></div></div><section className="users-list-card"><div className="users-table-scroll"><table className="clients-table"><thead><tr><th>Motorista</th><th>Contrato</th><th>Valor</th><th>Forma</th><th>Data</th><th>Comprovante</th></tr></thead><tbody>{payments.length ? payments.map(p=><tr key={p.id}><td>{p.driver}</td><td>{p.contract}</td><td className="reservation-value">{formatCurrency(p.value)}</td><td><span className="rental-plan">{p.method}</span></td><td>{p.date}</td><td>{p.receipt ? 'Anexado' : '—'}</td></tr>) : <tr><td colSpan="6" className="table-empty-state">Nenhum pagamento cadastrado no momento.</td></tr>}</tbody></table></div></section>{paymentFormOpen && <div className="user-form-overlay" onClick={()=>setPaymentFormOpen(false)}><form className="reservation-form-modal" onSubmit={handlePaymentSubmit} onClick={e=>e.stopPropagation()}><div className="user-form-header"><h3>Novo Pagamento</h3><button type="button" onClick={()=>setPaymentFormOpen(false)}><X size={20}/></button></div><div className="reservation-form-content"><label className="user-form-field full">Motorista<select required value={paymentForm.driver} onChange={e=>setPaymentForm({...paymentForm,driver:e.target.value})}><option value="">Selecione o motorista</option>{drivers.map(d=><option key={d.id} value={d.name || d.fullName}>{d.name || d.fullName} ({d.cpf || d.email})</option>)}</select></label><label className="user-form-field full">Número do contrato<input required value={paymentForm.contract} onChange={e=>setPaymentForm({...paymentForm,contract:e.target.value})} placeholder="CT-2024-000"/></label><div className="user-form-row"><label className="user-form-field">Valor (R$)<input required type="number" value={paymentForm.value} onChange={e=>setPaymentForm({...paymentForm,value:e.target.value})}/></label><label className="user-form-field">Forma<select value={paymentForm.method} onChange={e=>setPaymentForm({...paymentForm,method:e.target.value})}><option>Pix</option><option>Cartão</option><option>Transferência</option><option>Boleto</option><option>Dinheiro</option></select></label></div><label className="user-form-field full">Data<input required type="date" value={paymentForm.date} onChange={e=>setPaymentForm({...paymentForm,date:e.target.value})}/></label><label className="user-form-field full">Comprovante<input type="file" accept="application/pdf,image/*" onChange={e=>setPaymentForm({...paymentForm,receipt:e.target.files?.[0]||null})}/></label></div><div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={()=>setPaymentFormOpen(false)}>Cancelar</button><button className="btn btn-primary">Cadastrar</button></div></form></div>}
                </div>
              )}

              {activeTab === 'drivers' && (
                <div className="tab-pane drivers-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Motoristas</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={driverSearch}
                          onChange={(e) => setDriverSearch(e.target.value)}
                        />
                      </div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>
                  <div className="drivers-page-heading">
                    <div>
                      <h2>Motoristas</h2>
                      <p>Gerencie motoristas cadastrados e suas permissões</p>
                    </div>
                    <button className="btn btn-primary btn-sm btn-new-user" onClick={() => setDriverFormOpen(true)}>
                      <Plus size={17} /> Novo Motorista
                    </button>
                  </div>
                  <div className="drivers-stats-grid">
                    <div className="driver-stat-card approved">
                      <div className="driver-stat-icon"><UserCheck size={19} /></div>
                      <strong>{drivers.filter(d => String(d.status).toLowerCase() === 'aprovado').length}</strong>
                      <span>Aprovados</span>
                    </div>
                    <div className="driver-stat-card pending">
                      <div className="driver-stat-icon"><UserCheck size={19} /></div>
                      <strong>{drivers.filter(d => String(d.status).toLowerCase().includes('análise') || String(d.status).toLowerCase() === 'pendente').length}</strong>
                      <span>Em análise</span>
                    </div>
                    <div className="driver-stat-card blocked">
                      <div className="driver-stat-icon"><UserCheck size={19} /></div>
                      <strong>{drivers.filter(d => String(d.status).toLowerCase().includes('bloqueado') || String(d.status).toLowerCase().includes('reprovado')).length}</strong>
                      <span>Bloqueados/Reprovados</span>
                    </div>
                  </div>
                  <div className="drivers-filters">
                    <div className="users-filter">
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Buscar por nome ou CPF..."
                        value={driverSearch}
                        onChange={(e) => setDriverSearch(e.target.value)}
                      />
                    </div>
                    <select className="drivers-status-filter" value={driverStatusFilter} onChange={(e) => setDriverStatusFilter(e.target.value)}>
                      <option>Todos os status</option>
                      <option>Aprovado</option>
                      <option>Em análise</option>
                      <option>Bloqueado</option>
                    </select>
                    <button className="btn-export-csv" onClick={exportDriversCsv}>
                      <Download size={16} /> Exportar CSV
                    </button>
                  </div>
                  <section className="users-list-card drivers-list-card">
                    <div className="users-table-scroll">
                      <table className="drivers-table">
                        <thead>
                          <tr>
                            <th>Motorista</th>
                            <th>CNH</th>
                            <th>Plataformas</th>
                            <th>Cidade</th>
                            <th>Status</th>
                            <th aria-label="Ações" />
                          </tr>
                        </thead>
                        <tbody>
                          {visibleDrivers.length ? visibleDrivers.map((driver) => (
                            <tr key={driver.id}>
                              <td>
                                <div className="client-name">
                                  <strong>{driver.name || driver.fullName}</strong>
                                  <small>{driver.cpf || driver.email}</small>
                                </div>
                              </td>
                              <td>
                                <div className="cnh-cell">
                                  <span>{driver.cnhCategory || 'Cat. B'}</span>
                                  <small>Val: {driver.cnhExpiry || '14/08/2026'}</small>
                                </div>
                              </td>
                              <td>
                                <div className="platforms-badges">
                                  {(driver.platforms || driver.appPlatforms || []).map((p) => (
                                    <span key={p} className="platform-tag-badge">{p}</span>
                                  ))}
                                </div>
                              </td>
                              <td>{driver.city || '—'}</td>
                              <td>
                                <span className={`status-badge-pill ${String(driver.status || 'Em análise').toLowerCase().replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>
                                  {driver.status || 'Em análise'}
                                </span>
                              </td>
                              <td className="action-menu-cell">
                                <div className="action-dropdown-wrapper">
                                  <button
                                    className="rental-menu-trigger"
                                    onClick={() => setOpenDriverMenu(openDriverMenu === driver.id ? null : driver.id)}
                                    aria-label={`Ações para ${driver.name || driver.fullName}`}
                                  >
                                    <MoreVertical size={18} />
                                  </button>
                                  {openDriverMenu === driver.id && (
                                    <div className="action-dropdown-menu">
                                      <button onClick={() => handleDriverStatusChange(driver.id, 'Aprovado')}>
                                        Aprovar Motorista
                                      </button>
                                      <button onClick={() => handleDriverStatusChange(driver.id, 'Em análise')}>
                                        Colocar em Análise
                                      </button>
                                      <button onClick={() => handleDriverStatusChange(driver.id, 'Bloqueado')}>
                                        Bloquear Motorista
                                      </button>
                                      <button className="delete-action" onClick={() => handleDriverDelete(driver.id)}>
                                        Excluir Motorista
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan="6" className="table-empty-state">Nenhum motorista cadastrado.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  {driverFormOpen && (
                    <div className="user-form-overlay" onClick={closeDriverForm}>
                      <form className="driver-form-modal" onSubmit={handleDriverSubmit} onClick={(e) => e.stopPropagation()}>
                        <div className="user-form-header"><h3>Novo Motorista</h3><button type="button" onClick={closeDriverForm} aria-label="Fechar cadastro"><X size={20} /></button></div>
                        <div className="driver-form-content">
                          <h4>Dados pessoais</h4>
                          <label className="user-form-field full">Nome completo<input required value={driverFormData.name} onChange={(e) => setDriverFormData({ ...driverFormData, name: e.target.value })} placeholder="Nome completo" /></label>
                          <div className="user-form-row"><label className="user-form-field">CPF<input value={driverFormData.cpf} onChange={(e) => setDriverFormData({ ...driverFormData, cpf: e.target.value })} placeholder="000.000.000-00" /></label><label className="user-form-field">Data de nascimento<input type="date" value={driverFormData.birthDate} onChange={(e) => setDriverFormData({ ...driverFormData, birthDate: e.target.value })} /></label></div>
                          <div className="user-form-row"><label className="user-form-field">Telefone<input value={driverFormData.phone} onChange={(e) => setDriverFormData({ ...driverFormData, phone: e.target.value })} placeholder="(00) 00000-0000" /></label><label className="user-form-field">E-mail<input type="email" required value={driverFormData.email} onChange={(e) => setDriverFormData({ ...driverFormData, email: e.target.value })} placeholder="email@exemplo.com" /></label></div>
                          <div className="user-form-row"><label className="user-form-field">Cidade<input value={driverFormData.city} onChange={(e) => setDriverFormData({ ...driverFormData, city: e.target.value })} placeholder="Cidade" /></label><label className="user-form-field">Estado<input value={driverFormData.state} onChange={(e) => setDriverFormData({ ...driverFormData, state: e.target.value })} placeholder="UF" maxLength="2" /></label></div>
                          <h4>Dados da CNH</h4>
                          <div className="user-form-row"><label className="user-form-field">Categoria<select value={driverFormData.cnhCategory} onChange={(e) => setDriverFormData({ ...driverFormData, cnhCategory: e.target.value })}><option value="">Selecione</option><option>A</option><option>B</option><option>AB</option><option>C</option><option>D</option><option>E</option></select></label><label className="user-form-field">Validade da CNH<input type="date" value={driverFormData.cnhExpiryDate} onChange={(e) => setDriverFormData({ ...driverFormData, cnhExpiryDate: e.target.value })} /></label></div>
                          <h4>Plataformas utilizadas</h4>
                          <div className="driver-platforms">{['Uber', '99', 'inDrive', 'Aplicativos locais'].map((platform) => <label key={platform}><input type="checkbox" checked={driverFormData.platforms.includes(platform)} onChange={() => handleDriverPlatform(platform)} /> <span>{platform}</span></label>)}</div>
                        </div>
                        <div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={closeDriverForm}>Cancelar</button><button type="submit" className="btn btn-primary">Cadastrar</button></div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'rentals' && (
                <div className="tab-pane rentals-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Locações</h2>
                    <div className="dashboard-actions">
                      <div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>
                  <div className="drivers-page-heading">
                    <div><h2>Locações</h2><p>Contratos de locação ativos e encerrados</p></div>
                    <button className="btn btn-primary btn-sm btn-new-user" onClick={() => setRentalFormOpen(true)}><Plus size={17} /> Nova Locação</button>
                  </div>
                  <div className="users-filter rentals-search"><Search size={16} /><input type="text" value={rentalSearch} onChange={(e) => setRentalSearch(e.target.value)} placeholder="Buscar por motorista ou veículo..." /></div>
                  <section className="users-list-card rentals-list-card">
                    <div className="users-table-scroll"><table className="rentals-table">
                      <thead><tr><th>Motorista</th><th>Veículo</th><th>Plano</th><th>Início</th><th>Devolução</th><th>Valor</th><th>Status</th><th aria-label="Ações" /></tr></thead>
                      <tbody>{visibleRentals.length ? visibleRentals.map((rental) => (
                        <tr key={rental.id}>
                          <td className="rental-driver">{rental.driver}</td>
                          <td>{rental.vehicle}</td>
                          <td><span className="rental-plan">{rental.plan}</span></td>
                          <td className="rental-date">{formatDate(rental.startDate)}</td>
                          <td className="rental-date">{formatDate(rental.returnDate)}</td>
                          <td className="rental-value">{formatCurrency(rental.value)}</td>
                          <td><span className={`rental-status ${rental.status.toLocaleLowerCase()}`}>{rental.status}</span></td>
                          <td className="rental-actions"><button type="button" className="rental-menu-trigger" aria-label={`Ações para ${rental.driver}`} onClick={() => setOpenRentalMenu(openRentalMenu === rental.id ? null : rental.id)}><MoreVertical size={18} /></button>{openRentalMenu === rental.id && <div className="rental-actions-menu"><button onClick={() => updateRentalStatus(rental.id, 'Ativa')}>Marcar como ativa</button><button onClick={() => updateRentalStatus(rental.id, 'Encerrada')}>Encerrar locação</button><button onClick={() => updateRentalStatus(rental.id, 'Agendada')}>Marcar como agendada</button></div>}</td>
                        </tr>
                      )) : <tr><td colSpan="8" className="table-empty-state">Nenhuma locação encontrada.</td></tr>}</tbody>
                    </table></div>
                  </section>
                  {rentalFormOpen && (
                    <div className="user-form-overlay" onClick={closeRentalForm}>
                      <form className="rental-form-modal" onSubmit={handleRentalSubmit} onClick={(e) => e.stopPropagation()}>
                        <div className="user-form-header"><h3>Nova Locação</h3><button type="button" onClick={closeRentalForm} aria-label="Fechar cadastro"><X size={20} /></button></div>
                        <div className="driver-form-content">
                          <h4>Dados da locação</h4>
                          <label className="user-form-field full">Cliente<select value={rentalFormData.client} onChange={(e) => setRentalFormData({ ...rentalFormData, client: e.target.value })}><option value="">Selecione o cliente</option>{clients.map((c) => <option key={c.id} value={c.name}>{c.name} ({c.document || 'PF/PJ'})</option>)}</select></label>
                          <div className="user-form-row"><label className="user-form-field">Motorista<select value={rentalFormData.driver} onChange={(e) => setRentalFormData({ ...rentalFormData, driver: e.target.value })}><option value="">Selecione o motorista</option>{drivers.map((d) => <option key={d.id} value={d.name || d.fullName}>{d.name || d.fullName}</option>)}</select></label><label className="user-form-field">Veículo<select value={rentalFormData.vehicle} onChange={(e) => setRentalFormData({ ...rentalFormData, vehicle: e.target.value })}><option value="">Selecione o veículo</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.brand} {vehicle.name}</option>)}</select></label></div>
                          <div className="user-form-row"><label className="user-form-field">Plano<select value={rentalFormData.plan} onChange={(e) => setRentalFormData({ ...rentalFormData, plan: e.target.value })}><option value="">Selecione o plano</option><option>Diário</option><option>Semanal</option><option>Quinzenal</option><option>Mensal</option></select></label><label className="user-form-field">Situação<select value={rentalFormData.status} onChange={(e) => setRentalFormData({ ...rentalFormData, status: e.target.value })}><option>Ativa</option><option>Encerrada</option><option>Cancelada</option><option>Agendada</option></select></label></div>
                          <div className="user-form-row"><label className="user-form-field">Data de início<input type="date" value={rentalFormData.startDate} onChange={(e) => setRentalFormData({ ...rentalFormData, startDate: e.target.value })} /></label><label className="user-form-field">Data prevista de devolução<input type="date" value={rentalFormData.returnDate} onChange={(e) => setRentalFormData({ ...rentalFormData, returnDate: e.target.value })} /></label></div>
                          <div className="user-form-row"><label className="user-form-field">Período (dias)<input type="number" min="1" placeholder="Quantidade de dias" value={rentalFormData.days} onChange={(e) => setRentalFormData({ ...rentalFormData, days: e.target.value })} /></label><label className="user-form-field">Valor da locação (R$)<input type="number" min="0" placeholder="0,00" value={rentalFormData.value} onChange={(e) => setRentalFormData({ ...rentalFormData, value: e.target.value })} /></label></div>
                          <div className="user-form-row"><label className="user-form-field">Forma de pagamento<select value={rentalFormData.paymentMethod} onChange={(e) => setRentalFormData({ ...rentalFormData, paymentMethod: e.target.value })}><option value="">Selecione</option><option>Pix</option><option>Cartão de crédito</option><option>Cartão de débito</option><option>Dinheiro</option><option>Transferência bancária</option></select></label><label className="user-form-field">Limite de quilometragem (km)<input type="number" min="0" placeholder="Ex: 1000" value={rentalFormData.mileageLimit} onChange={(e) => setRentalFormData({ ...rentalFormData, mileageLimit: e.target.value })} /></label></div>
                          <div className="user-form-row"><label className="user-form-field">Caução (R$)<input type="number" min="0" placeholder="0,00" value={rentalFormData.deposit} onChange={(e) => setRentalFormData({ ...rentalFormData, deposit: e.target.value })} /></label><label className="user-form-field">Responsável pelo atendimento<select value={rentalFormData.attendant} onChange={(e) => setRentalFormData({ ...rentalFormData, attendant: e.target.value })}><option value="">Selecione o atendente</option>{users.map((u) => <option key={u.id} value={u.name}>{u.name} ({u.role || u.cargo})</option>)}</select></label></div>
                          <label className="user-form-field full">Observações<textarea value={rentalFormData.notes} onChange={(e) => setRentalFormData({ ...rentalFormData, notes: e.target.value })} placeholder="Informações adicionais sobre a locação" /></label>
                        </div>
                        <div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={closeRentalForm}>Cancelar</button><button type="submit" className="btn btn-primary">Cadastrar locação</button></div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Vehicles Catalog Management CRUD */}
              {activeTab === 'vehicles' && (
                <div className="tab-pane">
                  <div className="tab-pane-header">
                    <h2 className="view-title">Gestão de Veículos (Frota)</h2>
                    <button className="btn btn-primary btn-sm btn-new-car" onClick={openAddVehicle}>
                      <Plus size={16} /> Adicionar Veículo
                    </button>
                  </div>

                  <div className="client-summary-grid" style={{ marginBottom: '1.25rem' }}>
                    <div className="client-summary-card total">
                      <Car size={19} />
                      <strong>{vehicles.length}</strong>
                      <span>Total de veículos</span>
                    </div>
                    <div className="client-summary-card pf">
                      <CheckCircle2 size={19} />
                      <strong>{vehicles.filter((v) => v.status === 'Disponível').length}</strong>
                      <span>Disponíveis</span>
                    </div>
                    <div className="client-summary-card total">
                      <Car size={19} />
                      <strong>{vehicles.filter((v) => v.status === 'Em locação').length}</strong>
                      <span>Em locação</span>
                    </div>
                    <div className="client-summary-card pj">
                      <Wrench size={19} />
                      <strong>{vehicles.filter((v) => v.status === 'Em manutenção' || v.status === 'Indisponível').length}</strong>
                      <span>Indisponíveis / Oficina</span>
                    </div>
                  </div>

                  <div className="client-toolbar" style={{ marginBottom: '1rem' }}>
                    <div className="users-filter client-search">
                      <Search size={16} />
                      <input
                        value={vehicleSearch}
                        onChange={(e) => setVehicleSearch(e.target.value)}
                        placeholder="Buscar por modelo, marca ou placa..."
                      />
                    </div>
                    <select value={vehicleCategoryFilter} onChange={(e) => setVehicleCategoryFilter(e.target.value)}>
                      <option>Todas as categorias</option>
                      <option>Econômico</option>
                      <option>Compacto</option>
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Elétrico</option>
                      <option>Premium</option>
                    </select>
                    <select value={vehicleStatusFilter} onChange={(e) => setVehicleStatusFilter(e.target.value)}>
                      <option>Todos os status</option>
                      <option>Disponível</option>
                      <option>Em locação</option>
                      <option>Reservado</option>
                      <option>Em manutenção</option>
                      <option>Indisponível</option>
                    </select>
                  </div>

                  {/* Add / Edit Form Overlay */}
                  {vehicleFormOpen && (
                    <div className="form-overlay-card glass-card">
                      <div className="form-overlay-header">
                        <h3>{editingVehicle ? 'Editar Veículo' : 'Novo Veículo'}</h3>
                        <button className="close-form-btn" onClick={() => setVehicleFormOpen(false)}><X size={18} /></button>
                      </div>
                      <form onSubmit={handleVehicleSubmit} className="vehicle-crud-form">
                        <h4 className="vehicle-form-section-title">Identificação do veículo</h4>
                        <div className="form-grid-3">
                          <div className="form-group">
                            <label>Código interno</label>
                            <input 
                              type="text" placeholder="Ex: FROTA-001"
                              value={vehicleFormData.internalCode} onChange={e => setVehicleFormData({ ...vehicleFormData, internalCode: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Placa</label>
                            <input 
                              type="text" placeholder="ABC1D23"
                              value={vehicleFormData.plate} onChange={e => setVehicleFormData({ ...vehicleFormData, plate: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>RENAVAM</label>
                            <input 
                              type="text" placeholder="Número do RENAVAM"
                              value={vehicleFormData.renavam} onChange={e => setVehicleFormData({ ...vehicleFormData, renavam: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-grid-3">
                          <div className="form-group">
                            <label>Chassi</label>
                            <input type="text" placeholder="Número do chassi" value={vehicleFormData.chassis} onChange={e => setVehicleFormData({ ...vehicleFormData, chassis: e.target.value })} />
                          </div>
                          <div className="form-group">
                            <label>Marca *</label>
                            <input type="text" placeholder="Ex: TOYOTA" required value={vehicleFormData.brand} onChange={e => setVehicleFormData({ ...vehicleFormData, brand: e.target.value })} />
                          </div>
                          <div className="form-group">
                            <label>Modelo *</label>
                            <input type="text" placeholder="Ex: Corolla XEi" required value={vehicleFormData.name} onChange={e => setVehicleFormData({ ...vehicleFormData, name: e.target.value })} />
                          </div>
                        </div>

                        <div className="form-grid-3">
                          <div className="form-group"><label>Versão</label><input type="text" placeholder="Ex: 2.0 XEi" value={vehicleFormData.version} onChange={e => setVehicleFormData({ ...vehicleFormData, version: e.target.value })} /></div>
                          <div className="form-group"><label>Ano de fabricação</label><input type="number" placeholder="Ex: 2023" value={vehicleFormData.manufactureYear} onChange={e => setVehicleFormData({ ...vehicleFormData, manufactureYear: e.target.value })} /></div>
                          <div className="form-group"><label>Ano do modelo *</label><input type="number" required placeholder="Ex: 2024" value={vehicleFormData.modelYear} onChange={e => setVehicleFormData({ ...vehicleFormData, modelYear: e.target.value, year: e.target.value })} /></div>
                        </div>

                        <div className="form-grid-3">
                          <div className="form-group"><label>Cor</label><input type="text" placeholder="Ex: Prata" value={vehicleFormData.color} onChange={e => setVehicleFormData({ ...vehicleFormData, color: e.target.value })} /></div>
                          <div className="form-group"><label>Combustível</label><input type="text" placeholder="Flex/Diesel/Elétrico" value={vehicleFormData.fuel} onChange={e => setVehicleFormData({ ...vehicleFormData, fuel: e.target.value })} /></div>
                          <div className="form-group"><label>Tipo de câmbio</label><input type="text" placeholder="Manual/Automático" value={vehicleFormData.transm} onChange={e => setVehicleFormData({ ...vehicleFormData, transm: e.target.value })} /></div>
                        </div>

                        <div className="form-grid-3">
                          <div className="form-group"><label>Quilometragem atual</label><input type="number" min="0" placeholder="Ex: 25000" value={vehicleFormData.mileage} onChange={e => setVehicleFormData({ ...vehicleFormData, mileage: e.target.value })} /></div>
                          <div className="form-group"><label>Quantidade de portas</label><input type="number" min="0" placeholder="Ex: 4" value={vehicleFormData.doors} onChange={e => setVehicleFormData({ ...vehicleFormData, doors: e.target.value })} /></div>
                          <div className="form-group"><label>Quantidade de lugares</label><input type="number" min="1" placeholder="Ex: 5" value={vehicleFormData.seats} onChange={e => setVehicleFormData({ ...vehicleFormData, seats: e.target.value })} /></div>
                        </div>

                        <div className="form-grid-3">
                          <div className="form-group"><label>Categoria *</label><select value={vehicleFormData.category} onChange={e => setVehicleFormData({ ...vehicleFormData, category: e.target.value })}><option value="Econômico">Econômico</option><option value="Compacto">Compacto</option><option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Elétrico">Elétrico</option><option value="Premium">Premium</option></select></div>
                          <div className="form-group"><label>Preço semanal (R$) *</label><input type="number" placeholder="Ex: 549" required value={vehicleFormData.priceWeekly} onChange={e => setVehicleFormData({ ...vehicleFormData, priceWeekly: e.target.value })} /></div>
                          <div className="form-group"><label>Status de disponibilidade *</label><select value={vehicleFormData.status} onChange={e => setVehicleFormData({ ...vehicleFormData, status: e.target.value })}><option value="Disponível">Disponível</option><option value="Indisponível">Indisponível</option></select></div>
                        </div>

                        <div className="vehicle-image-fields">
                          <div className="form-group">
                            <label>URL da Imagem</label>
                            <input 
                              type="text" placeholder="Cole uma URL válida da imagem"
                              value={vehicleFormData.image} onChange={e => setVehicleFormData({ ...vehicleFormData, image: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Upload de imagem <span className="optional-label">(opcional)</span></label>
                            <input type="file" accept="image/*" onChange={handleVehicleImageUpload} />
                            <small className="image-upload-hint">Envie uma imagem ou use a URL ao lado.</small>
                          </div>
                        </div>

                        <div className="form-group vehicle-document-upload">
                          <label>Documento do veículo <span className="optional-label">(opcional)</span></label>
                          <input type="file" accept="application/pdf,image/*" />
                          <small className="image-upload-hint">Envie o CRLV ou outro documento do veículo em PDF ou imagem.</small>
                        </div>

                        <h4 className="vehicle-form-section-title">Aquisição e proteção</h4>
                        <div className="form-grid-3">
                          <div className="form-group"><label>Valor de aquisição (R$)</label><input type="number" min="0" placeholder="Ex: 95000" value={vehicleFormData.acquisitionValue} onChange={e => setVehicleFormData({ ...vehicleFormData, acquisitionValue: e.target.value })} /></div>
                          <div className="form-group"><label>Data de aquisição</label><input type="date" value={vehicleFormData.acquisitionDate} onChange={e => setVehicleFormData({ ...vehicleFormData, acquisitionDate: e.target.value })} /></div>
                          <div className="form-group"><label>Seguradora ou proteção</label><input type="text" placeholder="Nome da seguradora" value={vehicleFormData.insurer} onChange={e => setVehicleFormData({ ...vehicleFormData, insurer: e.target.value })} /></div>
                        </div>

                        <h4 className="vehicle-form-section-title">Controle de quilometragem</h4>
                        <div className="form-grid-3">
                          <div className="form-group"><label>Data da última atualização</label><input type="date" value={vehicleFormData.mileageControlDate} onChange={e => setVehicleFormData({ ...vehicleFormData, mileageControlDate: e.target.value })} /></div>
                          <div className="form-group"><label>Próxima manutenção (km)</label><input type="number" min="0" placeholder="Ex: 30000" value={vehicleFormData.nextMaintenanceMileage} onChange={e => setVehicleFormData({ ...vehicleFormData, nextMaintenanceMileage: e.target.value })} /></div>
                          <div className="form-group"><label>Consumo médio</label><input type="text" placeholder="Ex: 14 km/l" value={vehicleFormData.consumption} onChange={e => setVehicleFormData({ ...vehicleFormData, consumption: e.target.value })} /></div>
                        </div>

                        <div className="form-group">
                          <label>Diferenciais (Separados por vírgula)</label>
                          <input 
                            type="text" placeholder="Ex: Teto solar, 4x4, Recarga rápida" 
                            value={vehicleFormData.features} onChange={e => setVehicleFormData({ ...vehicleFormData, features: e.target.value })}
                          />
                        </div>

                        <div className="form-actions-row">
                          <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Veículo'}
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={() => setVehicleFormOpen(false)}>Cancelar</button>
                        </div>
                      </form>
                    </div>
                  )}

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Foto</th>
                        <th>Marca/Nome</th>
                        <th>Categoria</th>
                        <th>Preço/Sem</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleVehicles.length ? visibleVehicles.map(car => (
                        <tr key={car.id}>
                          <td>
                            <img src={car.image} alt={car.name} className="table-car-img" />
                          </td>
                          <td>
                            <strong>{car.brand} {car.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Ano: {car.year} | {car.specs?.fuel}</div>
                          </td>
                          <td>{car.category}</td>
                          <td>R$ {car.priceWeekly}</td>
                          <td>
                            <span className={`status-tag ${car.status === 'Disponível' ? 'aprovado' : car.status === 'Em manutenção' ? 'pendente' : 'recusado'}`}>
                              {car.status}
                            </span>
                          </td>
                          <td>
                            <div className="table-btn-group">
                              <button className="table-act-btn edit-btn" onClick={() => openEditVehicle(car)}>
                                <Edit3 size={14} /> Editar
                              </button>
                              <button className="table-act-btn delete-btn" onClick={() => handleVehicleDelete(car.id)}>
                                <Trash2 size={14} /> Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="6" className="table-empty-state">Nenhum veículo encontrado.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'maintenance' && (
                <div className="tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Manutenções</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={maintenanceSearch}
                          onChange={(e) => setMaintenanceSearch(e.target.value)}
                        />
                      </div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="drivers-page-heading">
                    <div>
                      <h2>Manutenções</h2>
                      <p>Controle de manutenções preventivas e corretivas da frota</p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => setMaintenanceFormOpen(true)}>
                      <Plus size={17} /> Nova Manutenção
                    </button>
                  </div>

                  <div className="contract-summary-grid">
                    <div><strong>{maintenances.filter(m => m.status === 'Em execução').length}</strong><span>Em manutenção</span></div>
                    <div><strong>{maintenances.filter(m => m.status === 'Agendada' || m.status === 'Aberta').length}</strong><span>Próximas</span></div>
                    <div><strong>{maintenances.filter(m => m.status === 'Concluída').length}</strong><span>Concluídas</span></div>
                    <div><strong>{formatCurrency(maintenances.reduce((s, m) => s + (Number(m.cost) || 0), 0))}</strong><span>Custo do mês</span></div>
                  </div>

                  <div className="client-toolbar" style={{ marginBottom: '1rem' }}>
                    <div className="users-filter client-search">
                      <Search size={16} />
                      <input
                        value={maintenanceSearch}
                        onChange={(e) => setMaintenanceSearch(e.target.value)}
                        placeholder="Buscar por veículo, serviço ou oficina..."
                      />
                    </div>
                    <select value={maintenanceStatusFilter} onChange={(e) => setMaintenanceStatusFilter(e.target.value)}>
                      <option>Todos os status</option>
                      <option>Aberta</option>
                      <option>Agendada</option>
                      <option>Em execução</option>
                      <option>Concluída</option>
                      <option>Cancelada</option>
                    </select>
                  </div>

                  <section className="users-list-card">
                    <div className="users-table-scroll">
                      <table className="contracts-table">
                        <thead>
                          <tr>
                            <th>Veículo</th>
                            <th>Tipo</th>
                            <th>Serviço</th>
                            <th>Data</th>
                            <th>Prioridade</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleMaintenances.length ? visibleMaintenances.map(m => (
                            <tr key={m.id}>
                              <td>{m.vehicleName}</td>
                              <td>{m.type}</td>
                              <td>{m.service}</td>
                              <td>{m.date}</td>
                              <td>{m.priority}</td>
                              <td><span className={`reservation-status ${m.status === 'Concluída' ? 'confirmada' : m.status === 'Em execução' ? 'pendente' : ''}`}>{m.status}</span></td>
                            </tr>
                          )) : (
                            <tr><td colSpan="6" className="table-empty-state">Nenhuma manutenção encontrada.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {maintenanceFormOpen && (
                    <div className="user-form-overlay" onClick={() => setMaintenanceFormOpen(false)}>
                      <form className="contract-form-modal" onSubmit={handleMaintenanceSubmit} onClick={e => e.stopPropagation()}>
                        <div className="user-form-header">
                          <h3>Nova Manutenção</h3>
                          <button type="button" onClick={() => setMaintenanceFormOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="contract-form-content">
                          <div className="user-form-row">
                            <label className="user-form-field">Veículo
                              <select required value={maintenanceForm.vehicle} onChange={e => setMaintenanceForm({ ...maintenanceForm, vehicle: e.target.value })}>
                                <option value="">Selecionar veículo</option>
                                {vehicles.map(v => <option key={v.id} value={v.id}>{v.brand} {v.name}</option>)}
                              </select>
                            </label>
                            <label className="user-form-field">Tipo
                              <select value={maintenanceForm.type} onChange={e => setMaintenanceForm({ ...maintenanceForm, type: e.target.value })}>
                                <option>Preventiva</option>
                                <option>Corretiva</option>
                              </select>
                            </label>
                          </div>
                          <label className="user-form-field full">Problema / serviço
                            <input required value={maintenanceForm.service} onChange={e => setMaintenanceForm({ ...maintenanceForm, service: e.target.value })} placeholder="Ex.: Troca de óleo" />
                          </label>
                          <div className="user-form-row">
                            <label className="user-form-field">Data
                              <input required type="date" value={maintenanceForm.date} onChange={e => setMaintenanceForm({ ...maintenanceForm, date: e.target.value })} />
                            </label>
                            <label className="user-form-field">Prioridade
                              <select value={maintenanceForm.priority} onChange={e => setMaintenanceForm({ ...maintenanceForm, priority: e.target.value })}>
                                <option>Baixa</option>
                                <option>Normal</option>
                                <option>Alta</option>
                                <option>Urgente</option>
                              </select>
                            </label>
                          </div>
                          <div className="user-form-row">
                            <label className="user-form-field">Oficina
                              <input value={maintenanceForm.workshop} onChange={e => setMaintenanceForm({ ...maintenanceForm, workshop: e.target.value })} />
                            </label>
                            <label className="user-form-field">Custo final
                              <input type="number" value={maintenanceForm.cost} onChange={e => setMaintenanceForm({ ...maintenanceForm, cost: e.target.value })} />
                            </label>
                          </div>
                          <label className="user-form-field full">Situação
                            <select value={maintenanceForm.status} onChange={e => setMaintenanceForm({ ...maintenanceForm, status: e.target.value })}>
                              <option>Aberta</option>
                              <option>Agendada</option>
                              <option>Em execução</option>
                              <option>Concluída</option>
                              <option>Cancelada</option>
                            </select>
                          </label>
                          <label className="user-form-field full">Observações
                            <textarea value={maintenanceForm.notes} onChange={e => setMaintenanceForm({ ...maintenanceForm, notes: e.target.value })} />
                          </label>
                        </div>
                        <div className="user-form-actions">
                          <button type="button" className="btn btn-secondary" onClick={() => setMaintenanceFormOpen(false)}>Cancelar</button>
                          <button className="btn btn-primary">Cadastrar</button>
                        </div>
                      </form>
                    </div>
                </div>
              )}

              {activeTab === 'cashflow' && (
                <div className="tab-pane cashflow-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Fluxo de Caixa</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input
                          placeholder="Buscar..."
                          value={cashSearch}
                          onChange={(e) => setCashSearch(e.target.value)}
                        />
                      </div>
                      <button className="icon-action-btn"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="drivers-page-heading cashflow-heading">
                    <div>
                      <h2>Fluxo de Caixa</h2>
                      <p>Acompanhe as entradas, saídas e o resultado financeiro da sua locadora</p>
                    </div>
                    <button className="btn btn-primary btn-sm btn-new-user" onClick={() => setCashFormOpen(true)}>
                      <Plus size={17} /> Nova Movimentação
                    </button>
                  </div>

                  <div className="cash-summary-grid">
                    <div className="cash-summary income">
                      <TrendingUp size={20} />
                      <span>Entradas</span>
                      <strong>{formatCurrency(cashIn)}</strong>
                      <small>Pagas no período</small>
                    </div>
                    <div className="cash-summary expense">
                      <TrendingUp size={20} />
                      <span>Saídas</span>
                      <strong>{formatCurrency(cashOut)}</strong>
                      <small>Pagas no período</small>
                    </div>
                    <div className="cash-summary balance">
                      <FileText size={20} />
                      <span>Saldo</span>
                      <strong>{formatCurrency(cashIn - cashOut)}</strong>
                      <small>Resultado do período</small>
                    </div>
                  </div>

                  <div className="cash-toolbar">
                    <div className="users-filter">
                      <Search size={16} />
                      <input
                        value={cashSearch}
                        onChange={(e) => setCashSearch(e.target.value)}
                        placeholder="Buscar por descrição ou categoria..."
                      />
                    </div>
                    <select value={cashTypeFilter} onChange={(e) => setCashTypeFilter(e.target.value)}>
                      <option>Todos os tipos</option>
                      <option>Entrada</option>
                      <option>Saída</option>
                    </select>
                    <select value={cashStatusFilter} onChange={(e) => setCashStatusFilter(e.target.value)}>
                      <option>Todos os status</option>
                      <option>Pago</option>
                      <option>Pendente</option>
                    </select>
                  </div>

                  <section className="users-list-card">
                    <div className="users-table-scroll">
                      <table className="cash-table">
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleCashEntries.length ? visibleCashEntries.map((item) => (
                            <tr key={item.id}>
                              <td>{item.date}</td>
                              <td className="cash-description">{item.description}</td>
                              <td><span className="rental-plan">{item.category}</span></td>
                              <td><span className={`cash-type ${item.type.toLocaleLowerCase()}`}>{item.type}</span></td>
                              <td className={item.type === 'Entrada' ? 'cash-income-value' : 'cash-expense-value'}>
                                {item.type === 'Entrada' ? '+' : '-'}{formatCurrency(item.value)}
                              </td>
                              <td><span className="reservation-status confirmada">{item.status}</span></td>
                            </tr>
                          )) : (
                            <tr><td colSpan="6" className="table-empty-state">Nenhuma movimentação cadastrada no momento.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {cashFormOpen && (
                    <div className="user-form-overlay" onClick={() => setCashFormOpen(false)}>
                      <form className="cash-form-modal" onSubmit={handleCashSubmit} onClick={(event) => event.stopPropagation()}>
                        <div className="user-form-header">
                          <h3>Nova Movimentação</h3>
                          <button type="button" onClick={() => setCashFormOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="cash-form-content">
                          <div className="user-form-row">
                            <label className="user-form-field">Tipo de movimentação
                              <select value={cashForm.type} onChange={(e) => setCashForm({ ...cashForm, type: e.target.value })}>
                                <option>Entrada</option>
                                <option>Saída</option>
                              </select>
                            </label>
                            <label className="user-form-field">Data
                              <input required type="date" value={cashForm.date} onChange={(e) => setCashForm({ ...cashForm, date: e.target.value })} />
                            </label>
                          </div>
                          <label className="user-form-field full">Descrição
                            <input required value={cashForm.description} onChange={(e) => setCashForm({ ...cashForm, description: e.target.value })} placeholder="Ex: Aluguel mensal – Polo Track" />
                          </label>
                          <div className="user-form-row">
                            <label className="user-form-field">Categoria
                              <select value={cashForm.category} onChange={(e) => setCashForm({ ...cashForm, category: e.target.value })}>
                                <option>Locação</option>
                                <option>Manutenção</option>
                                <option>Multa</option>
                                <option>Taxa</option>
                                <option>Outros</option>
                              </select>
                            </label>
                            <label className="user-form-field">Valor (R$)
                              <input required type="number" min="0" value={cashForm.value} onChange={(e) => setCashForm({ ...cashForm, value: e.target.value })} placeholder="0" />
                            </label>
                          </div>
                          <label className="user-form-field full">Status
                            <select value={cashForm.status} onChange={(e) => setCashForm({ ...cashForm, status: e.target.value })}>
                              <option>Pago</option>
                              <option>Pendente</option>
                            </select>
                          </label>
                          <label className="user-form-field full">Observações
                            <textarea value={cashForm.notes} onChange={(e) => setCashForm({ ...cashForm, notes: e.target.value })} placeholder="Anotações adicionais..." />
                          </label>
                        </div>
                        <div className="user-form-actions">
                          <button type="button" className="btn btn-secondary" onClick={() => setCashFormOpen(false)}>Cancelar</button>
                          <button className="btn btn-primary">Cadastrar</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
              )}

              {activeTab === 'contracts' && (
                <div className="tab-pane contracts-tab-pane"><div className="dashboard-header-bar users-topbar"><h2 className="view-title">Contratos</h2><div className="dashboard-actions"><div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div><button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button><div className="user-avatar-mini">A</div></div></div><div className="drivers-page-heading contracts-heading"><div><h2>Contratos</h2><p>Gestão de contratos de locação</p></div><button className="btn btn-primary btn-sm btn-new-user" onClick={() => setContractFormOpen(true)}><Plus size={17} /> Novo Contrato</button></div><div className="contract-summary-grid"><div><strong>{contracts.filter((item) => item.status === 'Em elaboração').length}</strong><span>Em elaboração</span></div><div><strong>{contracts.filter((item) => item.status === 'Vigente').length}</strong><span>Vigentes</span></div><div><strong>{contracts.filter((item) => item.status === 'Renovado').length}</strong><span>Renovados</span></div><div><strong>{contracts.filter((item) => item.status === 'Encerrado').length}</strong><span>Encerrados</span></div></div><div className="contract-toolbar"><div className="users-filter contract-search"><Search size={16} /><input value={contractSearch} onChange={(event) => setContractSearch(event.target.value)} placeholder="Buscar por número, cliente ou motorista..." /></div><select value={contractStatusFilter} onChange={(event) => setContractStatusFilter(event.target.value)}><option>Todos os status</option><option>Em elaboração</option><option>Vigente</option><option>Renovado</option><option>Encerrado</option></select><button className="btn btn-secondary btn-sm"><Download size={16} /> Exportar CSV</button></div><section className="users-list-card"><div className="users-table-scroll"><table className="contracts-table"><thead><tr><th>Número</th><th>Cliente</th><th>Motorista</th><th>Veículo</th><th>Valor</th><th>Vigência</th><th>PDF</th><th>Status</th><th /></tr></thead><tbody>{visibleContracts.length ? visibleContracts.map((contract) => <tr key={contract.id}><td className="contract-number">{contract.number}</td><td>{contract.client}</td><td>{contract.driver}</td><td>{contract.vehicle}</td><td className="contract-value">{formatCurrency(contract.value)}</td><td>{contract.startDate} →<br />{contract.endDate}</td><td>{contract.file ? <span className="contract-file"><FileText size={15} /> Anexado</span> : '—'}</td><td><span className={`reservation-status ${contract.status.toLocaleLowerCase().replace(' ', '-')}`}>{contract.status}</span></td><td><button className="rental-menu-trigger" aria-label="Ações"><MoreVertical size={18} /></button></td></tr>) : <tr><td colSpan="9" className="table-empty-state">Nenhum contrato cadastrado no momento.</td></tr>}</tbody></table></div></section>{contractFormOpen && <div className="user-form-overlay" onClick={() => setContractFormOpen(false)}><form className="contract-form-modal" onSubmit={handleContractSubmit} onClick={(event) => event.stopPropagation()}><div className="user-form-header"><h3>Novo Contrato</h3><button type="button" onClick={() => setContractFormOpen(false)}><X size={20} /></button></div><div className="contract-form-content"><div className="user-form-row"><label className="user-form-field">Número do contrato<input required value={contractForm.number} onChange={(event) => setContractForm({ ...contractForm, number: event.target.value })} /></label><label className="user-form-field">Plano<select value={contractForm.plan} onChange={(event) => setContractForm({ ...contractForm, plan: event.target.value })}><option>Mensal</option><option>Quinzenal</option><option>Semanal</option></select></label></div><label className="user-form-field full">Cliente<select required value={contractForm.client} onChange={(event) => setContractForm({ ...contractForm, client: event.target.value })}><option value="">Selecione o cliente</option>{clients.map((c) => <option key={c.id} value={c.name}>{c.name} ({c.document})</option>)}</select></label><div className="user-form-row"><label className="user-form-field">Motorista<select required value={contractForm.driver} onChange={(event) => setContractForm({ ...contractForm, driver: event.target.value })}><option value="">Selecione o motorista</option>{drivers.map((d) => <option key={d.id} value={d.name || d.fullName}>{d.name || d.fullName}</option>)}</select></label><label className="user-form-field">Veículo<select required value={contractForm.vehicle} onChange={(event) => setContractForm({ ...contractForm, vehicle: event.target.value })}><option value="">Selecione o veículo</option>{vehicles.map((v) => <option key={v.id} value={`${v.brand} ${v.name}`}>{v.brand} {v.name}</option>)}</select></label></div><div className="user-form-row"><label className="user-form-field">Valor (R$)<input required type="number" min="0" value={contractForm.value} onChange={(event) => setContractForm({ ...contractForm, value: event.target.value })} placeholder="0" /></label><label className="user-form-field">Caução (R$)<input type="number" min="0" value={contractForm.deposit} onChange={(event) => setContractForm({ ...contractForm, deposit: event.target.value })} placeholder="0" /></label></div><div className="user-form-row"><label className="user-form-field">Data inicial<input required type="date" value={contractForm.startDate} onChange={(event) => setContractForm({ ...contractForm, startDate: event.target.value })} /></label><label className="user-form-field">Data final<input required type="date" value={contractForm.endDate} onChange={(event) => setContractForm({ ...contractForm, endDate: event.target.value })} /></label></div><label className="user-form-field full">Status<select value={contractForm.status} onChange={(event) => setContractForm({ ...contractForm, status: event.target.value })}><option>Em elaboração</option><option>Vigente</option><option>Renovado</option><option>Encerrado</option></select></label><label className="user-form-field full">Contrato (PDF)<input type="file" accept="application/pdf" onChange={(event) => setContractForm({ ...contractForm, file: event.target.files?.[0] || null })} /></label></div><div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={() => setContractFormOpen(false)}>Cancelar</button><button className="btn btn-primary">Cadastrar</button></div></form></div>}</div>
              )}

              {activeTab === 'reservations' && (
                <div className="tab-pane reservations-tab-pane">
                  <div className="dashboard-header-bar users-topbar"><h2 className="view-title">Reservas</h2><div className="dashboard-actions"><div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div><button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button><div className="user-avatar-mini">A</div></div></div>
                  <div className="drivers-page-heading reservations-heading"><div><h2>Reservas</h2><p>Agendamentos de veículos para locação</p></div><button className="btn btn-primary btn-sm btn-new-user" onClick={() => setReservationFormOpen(true)}><Plus size={17} /> Nova Reserva</button></div>
                  <div className="reservation-summary-grid"><div className="reservation-summary-card"><strong>{reservations.filter((item) => item.status === 'Pendente').length}</strong><span>Pendentes</span></div><div className="reservation-summary-card"><strong>{reservations.filter((item) => item.status === 'Confirmada').length}</strong><span>Confirmadas</span></div><div className="reservation-summary-card"><strong>{reservations.filter((item) => item.status === 'Cancelada').length}</strong><span>Canceladas</span></div></div>
                  <div className="reservation-toolbar"><div className="users-filter reservation-search"><Search size={16} /><input value={reservationSearch} onChange={(event) => setReservationSearch(event.target.value)} placeholder="Buscar por cliente ou veículo..." /></div><select value={reservationStatusFilter} onChange={(event) => setReservationStatusFilter(event.target.value)}><option>Todos os status</option><option>Pendente</option><option>Confirmada</option><option>Cancelada</option></select><button className="btn btn-secondary btn-sm"><Download size={16} /> Exportar CSV</button></div>
                  <section className="users-list-card reservations-list-card"><div className="users-table-scroll"><table className="reservations-table"><thead><tr><th>Cliente</th><th>Motorista</th><th>Veículo</th><th>Data</th><th>Período</th><th>Valor</th><th>Status</th><th /></tr></thead><tbody>{visibleReservations.length ? visibleReservations.map((reservation) => <tr key={reservation.id}><td className="reservation-client">{reservation.client}</td><td>{reservation.driver}</td><td>{reservation.vehicle}</td><td>{reservation.date}</td><td><span className="rental-plan">{reservation.period}</span></td><td className="reservation-value">{formatCurrency(reservation.value)}</td><td><span className={`reservation-status ${reservation.status.toLocaleLowerCase()}`}>{reservation.status}</span></td><td><button className="rental-menu-trigger" aria-label="Ações"><MoreVertical size={18} /></button></td></tr>) : <tr><td colSpan="8" className="table-empty-state">Nenhuma reserva cadastrada no momento.</td></tr>}</tbody></table></div></section>
                  {reservationFormOpen && <div className="user-form-overlay" onClick={() => setReservationFormOpen(false)}><form className="reservation-form-modal" onSubmit={handleReservationSubmit} onClick={(event) => event.stopPropagation()}><div className="user-form-header"><h3>Nova Reserva</h3><button type="button" onClick={() => setReservationFormOpen(false)} aria-label="Fechar"><X size={20} /></button></div><div className="reservation-form-content"><label className="user-form-field full">Cliente<select required value={reservationForm.client} onChange={(event) => setReservationForm({ ...reservationForm, client: event.target.value })}><option value="">Selecione o cliente</option>{clients.map((c) => <option key={c.id} value={c.name}>{c.name} ({c.document})</option>)}</select></label><label className="user-form-field full">Motorista<select required value={reservationForm.driver} onChange={(event) => setReservationForm({ ...reservationForm, driver: event.target.value })}><option value="">Selecione o motorista</option>{drivers.map((d) => <option key={d.id} value={d.name || d.fullName}>{d.name || d.fullName}</option>)}</select></label><label className="user-form-field full">Veículo<select required value={reservationForm.vehicle} onChange={(event) => setReservationForm({ ...reservationForm, vehicle: event.target.value })}><option value="">Selecione o veículo</option>{vehicles.map((v) => <option key={v.id} value={`${v.brand} ${v.name}`}>{v.brand} {v.name}</option>)}</select></label><div className="user-form-row"><label className="user-form-field">Data<input required type="date" value={reservationForm.date} onChange={(event) => setReservationForm({ ...reservationForm, date: event.target.value })} /></label><label className="user-form-field">Período<select value={reservationForm.period} onChange={(event) => setReservationForm({ ...reservationForm, period: event.target.value })}><option>Semanal</option><option>Quinzenal</option><option>Mensal</option></select></label></div><div className="user-form-row"><label className="user-form-field">Valor (R$)<input required type="number" min="0" value={reservationForm.value} onChange={(event) => setReservationForm({ ...reservationForm, value: event.target.value })} placeholder="0" /></label><label className="user-form-field">Status<select value={reservationForm.status} onChange={(event) => setReservationForm({ ...reservationForm, status: event.target.value })}><option>Pendente</option><option>Confirmada</option><option>Cancelada</option></select></label></div></div><div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={() => setReservationFormOpen(false)}>Cancelar</button><button type="submit" className="btn btn-primary">Cadastrar</button></div></form></div>}
                </div>
              )}

              {activeTab === 'inspections' && (
                <div className="tab-pane inspections-tab-pane">
                  <div className="dashboard-header-bar users-topbar"><h2 className="view-title">Vistorias</h2><div className="dashboard-actions"><div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div><button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button><div className="user-avatar-mini">A</div></div></div>
                  <div className="drivers-page-heading inspections-heading"><div><h2>Vistorias</h2><p>Checklist fotográfico de saída e devolução de veículos</p></div></div>
                  <div className="inspection-summary-grid"><div className="inspection-summary-card total"><ClipboardList size={19} /><strong>{inspections.length}</strong><span>Total</span></div><div className="inspection-summary-card scheduled"><CalendarDays size={19} /><strong>{inspections.filter((item) => item.status === 'Agendada').length}</strong><span>Agendadas</span></div><div className="inspection-summary-card progress"><Clock size={19} /><strong>{inspections.filter((item) => item.status === 'Em andamento').length}</strong><span>Em andamento</span></div><div className="inspection-summary-card finished"><Check size={19} /><strong>{inspections.filter((item) => item.status === 'Concluída').length}</strong><span>Concluídas</span></div></div>
                  <div className="inspection-toolbar"><div className="users-filter inspection-search"><Search size={16} /><input value={inspectionSearch} onChange={(event) => setInspectionSearch(event.target.value)} placeholder="Buscar por cliente, veículo, motorista..." /></div><select value={inspectionTypeFilter} onChange={(event) => setInspectionTypeFilter(event.target.value)}><option>Todos os tipos</option><option>Saída</option><option>Devolução</option></select><select value={inspectionStatusFilter} onChange={(event) => setInspectionStatusFilter(event.target.value)}><option>Todos os status</option><option>Agendada</option><option>Em andamento</option><option>Concluída</option></select><button className="btn btn-secondary btn-sm"><Download size={16} /> Exportar CSV</button></div>
                  <div className="inspection-create-actions"><button className="btn btn-primary btn-sm" onClick={() => { setInspectionForm({ ...inspectionForm, type: 'Saída' }); setInspectionFormOpen(true); }}><Camera size={16} /> Vistoria de Saída</button><button className="btn btn-secondary btn-sm inspection-return-btn" onClick={() => { setInspectionForm({ ...inspectionForm, type: 'Devolução' }); setInspectionFormOpen(true); }}><Camera size={16} /> Vistoria de Devolução</button></div>
                  <section className="users-list-card inspections-list-card"><div className="users-table-scroll"><table className="inspections-table"><thead><tr><th>Tipo</th><th>Cliente</th><th>Veículo</th><th>Motorista</th><th>Data/Hora</th><th>Vistoriador</th><th>Fotos</th><th>Status</th><th /></tr></thead><tbody>{visibleInspections.length ? visibleInspections.map((inspection) => <tr key={inspection.id}><td><span className={`inspection-type ${inspection.type === 'Saída' ? 'exit' : 'return'}`}><Camera size={12} /> {inspection.type}</span></td><td className="inspection-client">{inspection.client}</td><td>{inspection.vehicle}<small>{inspection.plate}</small></td><td>{inspection.driver}</td><td>{inspection.date}<small>{inspection.time}</small></td><td>{inspection.inspector}</td><td><span className="inspection-photo-count"><Camera size={12} /> {inspection.photos}</span></td><td><span className={`inspection-status ${inspection.status.toLocaleLowerCase().replace(' ', '-')}`}>{inspection.status}</span></td><td className="inspection-actions"><button className="rental-menu-trigger" onClick={() => setInspectionMenu(inspectionMenu === inspection.id ? null : inspection.id)} aria-label="Ações"><MoreVertical size={18} /></button>{inspectionMenu === inspection.id && <div className="rental-actions-menu"><button>Ver detalhes</button><button>Editar</button><button className="inspection-delete-action" onClick={() => { setInspections((current) => current.filter((item) => item.id !== inspection.id)); setInspectionMenu(null); }}>Excluir</button></div>}</td></tr>) : <tr><td colSpan="9" className="table-empty-state">Nenhuma vistoria encontrada.</td></tr>}</tbody></table></div></section>
                  {inspectionFormOpen && <div className="user-form-overlay" onClick={() => setInspectionFormOpen(false)}><form className="inspection-form-modal" onSubmit={handleInspectionSubmit} onClick={(event) => event.stopPropagation()}><div className="user-form-header"><h3>Vistoria de {inspectionForm.type}</h3><button type="button" onClick={() => setInspectionFormOpen(false)} aria-label="Fechar"><X size={20} /></button></div><div className="inspection-steps"><span className="active">1</span><b>Dados</b><i /><span>2</span><b>Veículo & Combustível</b><i /><span>3</span><b>Checklist de Fotos</b></div><div className="inspection-form-content"><div className="user-form-row"><label className="user-form-field">Tipo de vistoria<select value={inspectionForm.type} onChange={(event) => setInspectionForm({ ...inspectionForm, type: event.target.value })}><option>Saída</option><option>Devolução</option></select></label><label className="user-form-field">Contrato vinculado<select value={inspectionForm.contract} onChange={(event) => setInspectionForm({ ...inspectionForm, contract: event.target.value })}><option value="">Selecione um contrato</option>{contracts.map((ct) => <option key={ct.id} value={ct.number || ct.id}>Contrato #{ct.number || ct.id} — {ct.client}</option>)}</select></label></div><label className="user-form-field full">Nome do cliente<select required value={inspectionForm.client} onChange={(event) => setInspectionForm({ ...inspectionForm, client: event.target.value })}><option value="">Selecione o cliente</option>{clients.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select></label><div className="user-form-row"><label className="user-form-field">Motorista<select required value={inspectionForm.driver} onChange={(event) => setInspectionForm({ ...inspectionForm, driver: event.target.value })}><option value="">Selecione o motorista</option>{drivers.map((d) => <option key={d.id} value={d.name || d.fullName}>{d.name || d.fullName}</option>)}</select></label><label className="user-form-field">Vistoriador<input required value={inspectionForm.inspector} onChange={(event) => setInspectionForm({ ...inspectionForm, inspector: event.target.value })} placeholder="Nome do vistoriador" /></label></div><div className="user-form-row"><label className="user-form-field">Data<input required type="date" value={inspectionForm.date} onChange={(event) => setInspectionForm({ ...inspectionForm, date: event.target.value })} /></label><label className="user-form-field">Horário<input required type="time" value={inspectionForm.time} onChange={(event) => setInspectionForm({ ...inspectionForm, time: event.target.value })} /></label></div></div><div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={() => setInspectionFormOpen(false)}>Cancelar</button><button type="submit" className="btn btn-primary">Avançar</button></div></form></div>}
                </div>
              )}

              {activeTab === 'collections' && (
                <div className="tab-pane collections-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Cobranças</h2>
                    <div className="dashboard-actions">
                      <div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." /></div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>
                  <div className="drivers-page-heading collections-heading">
                    <div><h2>Cobranças</h2><p>Controle de cobranças de aluguel, multas e taxas</p></div>
                    <button className="btn btn-primary btn-sm btn-new-user" onClick={() => setCollectionUploadOpen(true)}><Upload size={16} /> Enviar arquivo</button>
                  </div>
                  <div className="collections-summary-grid">
                    <div className="collection-summary-card paid"><span className="collection-summary-icon"><Check size={21} /></span><div><strong>{formatCurrency(collections.filter((item) => item.status === 'Pago').reduce((total, item) => total + Number(item.value || 0), 0))}</strong><small>Pago</small></div></div>
                    <div className="collection-summary-card pending"><span className="collection-summary-icon">$</span><div><strong>{formatCurrency(collections.filter((item) => item.status === 'Pendente').reduce((total, item) => total + Number(item.value || 0), 0))}</strong><small>Pendente</small></div></div>
                    <div className="collection-summary-card overdue"><span className="collection-summary-icon">$</span><div><strong>{formatCurrency(collections.filter((item) => item.status === 'Vencido').reduce((total, item) => total + Number(item.value || 0), 0))}</strong><small>Vencido</small></div></div>
                  </div>
                  <select className="collections-status-filter" value={collectionFilter} onChange={(event) => setCollectionFilter(event.target.value)}><option>Todos os status</option><option>Pendente</option><option>Pago</option><option>Vencido</option></select>
                  <section className="users-list-card collections-list-card">
                    <div className="users-table-scroll"><table className="collections-table"><thead><tr><th>Motorista</th><th>Tipo</th><th>Vencimento</th><th>Valor</th><th>Descrição</th><th>Status</th><th /></tr></thead><tbody>{visibleCollections.length ? visibleCollections.map((collection) => <tr key={collection.id}><td className="collection-driver">{collection.driver}</td><td>{collection.type}</td><td className="collection-date">{collection.dueDate}</td><td className="collection-value">{formatCurrency(collection.value)}</td><td>{collection.description || '—'}</td><td><span className={`collection-status ${collection.status.toLowerCase()}`}>{collection.status}</span></td><td><details><summary aria-label="Ações">•••</summary><div className="rental-actions-menu"><button type="button" onClick={() => updateCollection(collection.id, { status: 'Pago' })}>Marcar pago</button><button type="button" onClick={() => updateCollection(collection.id, { status: 'Pendente' })}>Marcar pendente</button><button type="button" onClick={() => updateCollection(collection.id, { status: 'Vencido' })}>Marcar vencido</button><label>Comprovante<input type="file" accept="application/pdf,image/*" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; const fileData = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); }); await updateCollection(collection.id, { fileName: file.name, fileData }); }} /></label>{collection.fileData && <a href={collection.fileData} download={collection.fileName || 'comprovante'}>Baixar comprovante</a>}</div></details></td></tr>) : <tr><td colSpan="7" className="table-empty-state">Nenhuma cobrança cadastrada no momento.</td></tr>}</tbody></table></div>
                  </section>
                  {collectionUploadOpen && <div className="user-form-overlay" onClick={() => setCollectionUploadOpen(false)}><form className="collection-upload-modal" onSubmit={handleCollectionUpload} onClick={(event) => event.stopPropagation()}><div className="user-form-header"><h3>Nova cobrança</h3><button type="button" onClick={() => setCollectionUploadOpen(false)} aria-label="Fechar"><X size={20} /></button></div><div className="collection-upload-content"><label className="user-form-field">Motorista<select autoFocus required value={collectionUpload.driver} onChange={(event) => setCollectionUpload({ ...collectionUpload, driver: event.target.value })}><option value="">Selecione o motorista</option>{drivers.map((d) => <option key={d.id} value={d.name || d.fullName}>{d.name || d.fullName}</option>)}</select></label><label className="user-form-field">Tipo<select value={collectionUpload.type} onChange={(event) => setCollectionUpload({ ...collectionUpload, type: event.target.value })}><option>Aluguel</option><option>Multa</option><option>Taxa</option><option>Manutenção</option><option>Outro</option></select></label><div className="user-form-row"><label className="user-form-field">Vencimento<input required type="date" value={collectionUpload.dueDate} onChange={(event) => setCollectionUpload({ ...collectionUpload, dueDate: event.target.value })} /></label><label className="user-form-field">Valor<input required type="number" min="0.01" step="0.01" value={collectionUpload.value} onChange={(event) => setCollectionUpload({ ...collectionUpload, value: event.target.value })} /></label></div><label className="user-form-field">Descrição<textarea required value={collectionUpload.description} onChange={(event) => setCollectionUpload({ ...collectionUpload, description: event.target.value })} /></label><label className="user-form-field">Comprovante<input type="file" accept="application/pdf,image/*" onChange={(event) => setCollectionUpload({ ...collectionUpload, file: event.target.files?.[0] || null })} /></label></div><div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={() => setCollectionUploadOpen(false)}>Cancelar</button><button type="submit" className="btn btn-primary"><Upload size={16} /> Salvar cobrança</button></div></form></div>}
                </div>
              )}

              {activeTab === 'support' && <SupportTab requests={supportRequests} visibleRequests={visibleSupportRequests} formOpen={supportFormOpen} form={supportForm} search={supportSearch} statusFilter={supportStatusFilter} typeFilter={supportTypeFilter} vehicles={vehicles} rentals={rentals} driverName={driverFormData.name} setFormOpen={setSupportFormOpen} setForm={setSupportForm} setSearch={setSupportSearch} setStatusFilter={setSupportStatusFilter} setTypeFilter={setSupportTypeFilter} closeForm={closeSupportForm} submitForm={handleSupportSubmit} selectVehicle={handleSupportVehicleChange} selectAttachment={handleSupportAttachment} onStatusChange={handleSupportStatusChange} />}

              {activeTab === 'interested' && (
                <div className="tab-pane interested-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Interessados</h2>
                    <div className="dashboard-actions">
                      <div className="search-box">
                        <Search size={16} />
                        <input type="text" placeholder="Buscar..." aria-label="Buscar interessados" />
                      </div>
                      <button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button>
                      <div className="user-avatar-mini">A</div>
                    </div>
                  </div>

                  <div className="interested-heading">
                    <h2>Interessados</h2>
                    <p>Pessoas que preencheram o formulário da landing page</p>
                  </div>

                  <div className="interested-summary-grid">
                    <div className="interested-summary-card"><strong>{proposals.filter((lead) => lead.status === 'Novo').length}</strong><span>Novos</span></div>
                    <div className="interested-summary-card"><strong>{proposals.filter((lead) => lead.status === 'Em contato').length}</strong><span>Em contato</span></div>
                    <div className="interested-summary-card"><strong>{proposals.filter((lead) => lead.status === 'Aprovado' || lead.status === 'Convertido').length}</strong><span>Convertidos</span></div>
                    <div className="interested-summary-card"><strong>{proposals.filter((lead) => lead.status === 'Arquivado').length}</strong><span>Arquivados</span></div>
                  </div>

                  <select className="interested-status-filter" value={interestedStatusFilter} onChange={(event) => setInterestedStatusFilter(event.target.value)}>
                    <option>Todos os status</option>
                    <option>Novo</option>
                    <option>Em contato</option>
                    <option>Aprovado</option>
                    <option>Convertido</option>
                    <option>Arquivado</option>
                    <option>Recusado</option>
                  </select>

                  {(proposals.length === 0) ? (
                    <div className="interested-empty-state">
                      <Inbox size={28} />
                      <h3>Nenhum interessado por enquanto</h3>
                      <p>Os contatos enviados pelo formulário da landing page aparecerão aqui.</p>
                    </div>
                  ) : (
                    <div className="interested-cards-grid">
                      {proposals
                        .filter((lead) => interestedStatusFilter === 'Todos os status' || lead.status === interestedStatusFilter)
                        .map((lead) => {
                          const status = lead.status || 'Novo';
                          const initials = (lead.fullName || 'C')
                            .split(' ')
                            .map((part) => part[0])
                            .filter(Boolean)
                            .slice(0, 2)
                            .join('')
                            .toUpperCase();

                          return (
                            <article key={lead.id} className={`interested-card ${selectedProposal?.id === lead.id ? 'selected' : ''}`} onClick={() => setSelectedProposal(lead)}>
                              <div className="interested-card-header">
                                <div className="interested-avatar">{initials}</div>
                                <div className="interested-name-wrap">
                                  <h3>{lead.fullName}</h3>
                                  <span>{new Date(lead.createdAt || Date.now()).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <span className={`status-badge status-${String(status).toLowerCase().replace(/\s+/g, '-')}`}>
                                  {status}
                                </span>
                              </div>

                              <div className="interested-meta-list">
                                <div className="interested-meta-item"><span>☎</span><p>{lead.phone || '—'}</p></div>
                                <div className="interested-meta-item"><span>✉</span><p>{lead.email || '—'}</p></div>
                                <div className="interested-meta-item"><span>📍</span><p>{lead.city || '—'}</p></div>
                                <div className="interested-meta-item"><span>🚗</span><p>{lead.vehicleModel || 'Veículo não informado'} • {lead.appPlatform || '—'}</p></div>
                              </div>

                              <div className="interested-note">
                                <span className="note-box"> </span>
                                <p>{lead.message || 'Interesse registrado via formulário.'}</p>
                              </div>

                              <div className="interested-actions">
                                <button
                                  type="button"
                                  className="interested-action primary"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleProposalStatus(lead.id, 'Convertido');
                                  }}
                                >
                                  Converter
                                </button>
                                <button
                                  type="button"
                                  className="interested-action secondary"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleProposalStatus(lead.id, 'Em contato');
                                  }}
                                >
                                  Contatar
                                </button>
                                <button
                                  type="button"
                                  className="interested-action icon"
                                  aria-label="Arquivar interessado"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleProposalStatus(lead.id, 'Arquivado');
                                  }}
                                >
                                  🗑
                                </button>
                              </div>
                            </article>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'fines' && (
                <div className="tab-pane fines-tab-pane">
                  <div className="dashboard-header-bar users-topbar">
                    <h2 className="view-title">Multas</h2>
                    <div className="dashboard-actions"><div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." aria-label="Buscar multas" /></div><button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button><div className="user-avatar-mini">A</div></div>
                  </div>
                  <div className="fines-heading">
                    <div><h2>Multas</h2><p>Cadastro de infrações vinculadas a veículos</p></div>
                    <button className="btn btn-primary btn-sm fines-create-button" onClick={() => setFineFormOpen(true)}><Plus size={17} /> Registrar Multa</button>
                  </div>
                  <div className="fines-summary-grid">
                    <div className="fine-summary-card total"><BadgeAlert size={19} /><strong>{fines.length}</strong><span>Total de multas</span></div>
                    <div className="fine-summary-card pending"><Clock size={19} /><strong>{formatCurrency(sumValuesByStatus(fines, 'Pendente'))}</strong><span>Valor pendente</span></div>
                    <div className="fine-summary-card paid"><CheckCircle2 size={19} /><strong>{formatCurrency(sumValuesByStatus(fines, 'Paga'))}</strong><span>Valor pago</span></div>
                  </div>
                  <div className="fines-toolbar">
                    <div className="users-filter fines-search"><Search size={16} /><input type="text" placeholder="Buscar por auto, veículo ou placa..." /></div>
                    <select value={fineStatusFilter} onChange={(event) => setFineStatusFilter(event.target.value)}><option>Todos os status</option><option>Pendente</option><option>Paga</option><option>Vencida</option><option>Cancelada</option></select>
                    <select value={fineTypeFilter} onChange={(event) => setFineTypeFilter(event.target.value)}><option>Todos os tipos</option><option>Excesso de velocidade</option><option>Estacionamento irregular</option><option>Avanço de sinal vermelho</option><option>Uso de celular</option></select>
                    <button className="btn btn-secondary btn-sm"><Download size={16} /> Exportar CSV</button>
                  </div>
                  <section className="fines-list-card">
                    {visibleFines.length ? <div className="users-table-scroll"><table className="fines-table"><thead><tr><th>Auto de infração</th><th>Veículo</th><th>Tipo</th><th>Vencimento</th><th>Valor</th><th>Status</th><th /></tr></thead><tbody>{visibleFines.map((fine) => <tr key={fine.id}><td><strong>{fine.notice}</strong><small>{fine.authority}</small></td><td><strong>{fine.vehicleName}</strong><small>{fine.plate || '—'}</small></td><td><span className="fine-type-tag"><BadgeAlert size={13} /> {fine.type}</span></td><td>{fine.dueDate || '—'}</td><td className="fine-value">{formatCurrency(fine.value)}</td><td><span className={`fine-status ${fine.status.toLowerCase()}`}>{fine.status}</span></td><td><button className="rental-menu-trigger" aria-label="Ações"><MoreVertical size={18} /></button></td></tr>)}</tbody></table></div> : <div className="fines-empty-state"><BadgeAlert size={28} /><h3>Nenhuma multa cadastrada</h3><p>As infrações registradas para os veículos aparecerão aqui.</p></div>}
                  </section>
                  {fineFormOpen && <div className="user-form-overlay" onClick={closeFineForm}><form className="fine-form-modal" onSubmit={handleFineSubmit} onClick={(event) => event.stopPropagation()}><div className="user-form-header"><h3>Registrar Multa</h3><button type="button" onClick={closeFineForm} aria-label="Fechar"><X size={20} /></button></div><div className="fine-form-content"><h4><BadgeAlert size={16} /> Dados da multa</h4><label className="user-form-field full">Número do Auto de Infração *<input required value={fineForm.notice} onChange={(event) => setFineForm({ ...fineForm, notice: event.target.value })} placeholder="Ex.: AI202600012345" /></label><div className="user-form-row"><label className="user-form-field">Veículo *<select required value={fineForm.vehicle} onChange={(event) => setFineForm({ ...fineForm, vehicle: event.target.value })}><option value="">Selecione o veículo</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.brand} {vehicle.name}</option>)}</select></label><label className="user-form-field">Placa<input value={fineForm.plate} onChange={(event) => setFineForm({ ...fineForm, plate: event.target.value })} placeholder="ABC-1D23" /></label></div><div className="user-form-row"><label className="user-form-field">Órgão autuador<select value={fineForm.authority} onChange={(event) => setFineForm({ ...fineForm, authority: event.target.value })}><option>DETRAN</option><option>DER</option><option>PRF</option><option>Prefeitura</option></select></label><label className="user-form-field">Tipo de infração *<select value={fineForm.type} onChange={(event) => setFineForm({ ...fineForm, type: event.target.value })}><option>Excesso de velocidade</option><option>Estacionamento irregular</option><option>Avanço de sinal vermelho</option><option>Uso de celular</option><option>Outra</option></select></label></div><div className="user-form-row"><label className="user-form-field">Data da infração *<input required type="date" value={fineForm.date} onChange={(event) => setFineForm({ ...fineForm, date: event.target.value })} /></label><label className="user-form-field">Hora<input type="time" value={fineForm.time} onChange={(event) => setFineForm({ ...fineForm, time: event.target.value })} /></label></div><label className="user-form-field full">Local da infração<input value={fineForm.location} onChange={(event) => setFineForm({ ...fineForm, location: event.target.value })} placeholder="Ex.: Av. Paulista, 1000 – São Paulo/SP" /></label><label className="user-form-field full">Descrição<textarea value={fineForm.description} onChange={(event) => setFineForm({ ...fineForm, description: event.target.value })} placeholder="Descrição da infração..." /></label><div className="user-form-row"><label className="user-form-field">Valor da multa (R$) *<input required type="number" min="0" step="0.01" value={fineForm.value} onChange={(event) => setFineForm({ ...fineForm, value: event.target.value })} placeholder="0" /></label><label className="user-form-field">Data de vencimento *<input required type="date" value={fineForm.dueDate} onChange={(event) => setFineForm({ ...fineForm, dueDate: event.target.value })} /></label></div><h4><CircleDollarSign size={16} /> Pagamento</h4><label className="user-form-field full">Situação<select value={fineForm.status} onChange={(event) => setFineForm({ ...fineForm, status: event.target.value })}><option>Pendente</option><option>Paga</option><option>Vencida</option><option>Cancelada</option></select></label><label className="fine-check"><input type="checkbox" checked={fineForm.chargeDriver} onChange={(event) => setFineForm({ ...fineForm, chargeDriver: event.target.checked })} /> Gerar cobrança vinculada à multa</label><h4><Upload size={16} /> Documentos da infração</h4><label className="fine-upload"><Upload size={22} /><strong>Arraste o arquivo aqui ou clique para selecionar</strong><span>Auto de infração, notificação ou comprovante — PDF, JPG ou PNG</span><input type="file" accept="application/pdf,image/*" onChange={(event) => setFineForm({ ...fineForm, document: event.target.files?.[0] || null })} /></label><label className="user-form-field full">Observações<textarea value={fineForm.notes} onChange={(event) => setFineForm({ ...fineForm, notes: event.target.value })} placeholder="Anotações adicionais..." /></label></div><div className="user-form-actions"><button type="button" className="btn btn-secondary" onClick={closeFineForm}>Cancelar</button><button type="submit" className="btn btn-primary">Registrar</button></div></form></div>}
                </div>
              )}

              {activeTab === 'incidents' && (
                <div className="tab-pane incidents-tab-pane">
                  <div className="dashboard-header-bar users-topbar"><h2 className="view-title">Sinistros</h2><div className="dashboard-actions"><div className="search-box"><Search size={16} /><input type="text" placeholder="Buscar..." aria-label="Buscar sinistros" /></div><button className="icon-action-btn" aria-label="Notificações"><Bell size={16} /></button><div className="user-avatar-mini">A</div></div></div>
                  <div className="incidents-heading"><div><h2>Sinistros</h2><p>Registro de acidentes, furtos e ocorrências vinculadas a veículos e motoristas</p></div><button className="btn btn-primary btn-sm incidents-create-button" onClick={openIncidentForm}><Plus size={17} /> Registrar Sinistro</button></div>
                  <div className="incidents-summary-grid"><div className="incident-summary-card open"><AlertTriangle size={19} /><strong>{incidents.filter((incident) => incident.status === 'Aberto').length}</strong><span>Sinistros abertos</span></div><div className="incident-summary-card resolved"><CheckCircle2 size={19} /><strong>{incidents.filter((incident) => incident.status === 'Resolvido').length}</strong><span>Resolvidos</span></div><div className="incident-summary-card insured"><ShieldCheck size={19} /><strong>{incidents.filter((incident) => incident.insuranceActivated === true).length}</strong><span>Com seguro</span></div><div className="incident-summary-card cost"><CircleDollarSign size={19} /><strong>{formatCurrency(incidents.reduce((total, incident) => total + incident.totalCost, 0))}</strong><span>Custo total</span></div></div>
                  <div className="incidents-toolbar"><div className="users-filter incidents-search"><Search size={16} /><input value={incidentSearch} onChange={(event) => setIncidentSearch(event.target.value)} placeholder="Buscar por protocolo, veículo, placa ou motorista..." /></div><select value={incidentStatusFilter} onChange={(event) => setIncidentStatusFilter(event.target.value)}><option>Todos os status</option><option>Aberto</option><option>Em análise</option><option>Aguardando documentação</option><option>Em reparo</option><option>Resolvido</option><option>Cancelado</option></select><button className="btn btn-secondary btn-sm" onClick={exportIncidents}><Download size={16} /> Exportar CSV</button></div>
                  <section className="incidents-list-card">{visibleIncidents.length ? <div className="users-table-scroll"><table className="incidents-table"><thead><tr><th>Protocolo</th><th>Veículo</th><th>Motorista</th><th>Tipo</th><th>Data</th><th>Responsabilidade</th><th>Status</th><th /></tr></thead><tbody>{visibleIncidents.map((incident) => <tr key={incident.id}><td><strong>{incident.protocol}</strong><small>{incident.rental || '—'}</small></td><td><strong>{incident.vehicleName}</strong><small>{incident.plate || '—'}</small></td><td>{incident.driver || '—'}</td><td><span className="incident-type-tag"><AlertTriangle size={13} /> {incident.type}</span></td><td>{incident.formattedDate}</td><td>{incident.responsibility}</td><td><span className={`incident-status ${incident.status.toLocaleLowerCase().replace(' ', '-')}`}>{incident.status}</span></td><td className="incident-actions"><button className="rental-menu-trigger" onClick={() => setOpenIncidentMenu(openIncidentMenu === incident.id ? null : incident.id)} aria-label="Ações"><MoreVertical size={18} /></button>{openIncidentMenu === incident.id && <div className="rental-actions-menu"><button onClick={() => { setSelectedIncident(incident); setOpenIncidentMenu(null); }}>Ver detalhes</button><button onClick={() => openIncidentEdit(incident)}>Editar</button><button onClick={() => updateIncidentStatus(incident.id, 'Resolvido')}>Marcar como resolvido</button><button onClick={() => updateIncidentStatus(incident.id, 'Cancelado')}>Cancelar</button><button className="inspection-delete-action" onClick={() => deleteIncident(incident.id)}>Excluir</button></div>}</td></tr>)}</tbody></table></div> : <div className="incidents-empty-state"><AlertTriangle size={28} /><h3>Nenhum sinistro cadastrado</h3><p>Os acidentes, furtos e ocorrências registrados aparecerão aqui.</p></div>}</section>
                  {incidentFormOpen && <div className="user-form-overlay" onClick={closeIncidentForm}><form className="incident-form-modal" onSubmit={handleIncidentSubmit} onClick={(event) => event.stopPropagation()}><div className="user-form-header"><h3>Registrar Sinistro</h3><button type="button" onClick={closeIncidentForm} aria-label="Fechar"><X size={20} /></button></div><div className="incident-steps">{['Identificação', 'Ocorrência', 'Danos', 'Fotos & Docs', 'Seguro & Custos'].map((label, index) => { const step = index + 1; return <React.Fragment key={label}><span className={step < incidentStep ? 'completed' : step === incidentStep ? 'active' : ''}>{step < incidentStep ? <Check size={14} /> : step}</span><b className={step === incidentStep ? 'active-label' : ''}>{label}</b>{step < 5 && <i className={step < incidentStep ? 'completed-line' : ''} />}</React.Fragment>; })}</div><div className="incident-form-content">
                    {incidentStep === 1 && <><label className="user-form-field full">Número do protocolo *<input required value={incidentForm.protocol} onChange={(event) => setIncidentForm({ ...incidentForm, protocol: event.target.value })} /></label><div className="user-form-row"><label className="user-form-field">Veículo *<select required value={incidentForm.vehicle} onChange={(event) => handleIncidentVehicleChange(event.target.value)}><option value="">Selecione o veículo</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.brand} {vehicle.name}</option>)}</select></label><label className="user-form-field">Placa<input value={incidentForm.plate} onChange={(event) => setIncidentForm({ ...incidentForm, plate: event.target.value })} placeholder="ABC-1D23" /></label></div><div className="user-form-row"><label className="user-form-field">Motorista responsável *<select required value={incidentForm.driver} onChange={(event) => setIncidentForm({ ...incidentForm, driver: event.target.value })}><option value="">Selecione o motorista</option>{driverFormData.name && <option value={driverFormData.name}>{driverFormData.name}</option>}</select></label><label className="user-form-field">Locação relacionada<select value={incidentForm.rental} onChange={(event) => setIncidentForm({ ...incidentForm, rental: event.target.value })}><option value="">Nenhuma</option>{rentals.map((rental) => <option key={rental.id} value={`${rental.driver} — ${rental.vehicle}`}>{rental.driver} — {rental.vehicle}</option>)}</select></label></div><div className="user-form-row"><label className="user-form-field">Data do sinistro *<input required type="date" value={incidentForm.date} onChange={(event) => setIncidentForm({ ...incidentForm, date: event.target.value })} /></label><label className="user-form-field">Hora<input type="time" value={incidentForm.time} onChange={(event) => setIncidentForm({ ...incidentForm, time: event.target.value })} /></label></div><label className="user-form-field full">Local do sinistro *<input required value={incidentForm.location} onChange={(event) => setIncidentForm({ ...incidentForm, location: event.target.value })} placeholder="Ex.: Av. Paulista, 1000 – São Paulo/SP" /></label></>}
                    {incidentStep === 2 && <><label className="user-form-field full">Tipo de ocorrência *<select value={incidentForm.type} onChange={(event) => setIncidentForm({ ...incidentForm, type: event.target.value })}><option>Colisão</option><option>Batida</option><option>Furto</option><option>Roubo</option><option>Incêndio</option><option>Alagamento</option><option>Vandalismo</option><option>Queda</option><option>Danos por terceiros</option><option>Outros</option></select></label><label className="user-form-field full">Descrição da ocorrência *<textarea required value={incidentForm.occurrenceDescription} onChange={(event) => setIncidentForm({ ...incidentForm, occurrenceDescription: event.target.value })} placeholder="Descreva o que aconteceu..." /></label><label className="user-form-field full">Status do sinistro<select value={incidentForm.status} onChange={(event) => setIncidentForm({ ...incidentForm, status: event.target.value })}><option>Aberto</option><option>Em análise</option><option>Aguardando documentação</option><option>Em reparo</option><option>Resolvido</option><option>Cancelado</option></select></label></>}
                    {incidentStep === 3 && <><p className="incident-question">Houve danos no veículo?</p><div className="incident-choice-row"><button type="button" className={incidentForm.hasDamage === true ? 'selected danger' : ''} onClick={() => setIncidentForm({ ...incidentForm, hasDamage: true })}>Sim, houve danos</button><button type="button" className={incidentForm.hasDamage === false ? 'selected safe' : ''} onClick={() => setIncidentForm({ ...incidentForm, hasDamage: false, damageLocations: [], damageDescription: '' })}>Não houve danos</button></div>{incidentForm.hasDamage && <><p className="incident-field-label">Local dos danos</p><div className="damage-location-grid">{['Frente', 'Traseira', 'Lateral direita', 'Lateral esquerda', 'Teto', 'Para-brisa', 'Vidros', 'Rodas', 'Motor', 'Interior', 'Outros'].map((location) => <label key={location}><input type="checkbox" checked={incidentForm.damageLocations.includes(location)} onChange={() => toggleIncidentDamageLocation(location)} />{location}</label>)}</div><label className="user-form-field full">Descrição dos danos<textarea value={incidentForm.damageDescription} onChange={(event) => setIncidentForm({ ...incidentForm, damageDescription: event.target.value })} placeholder="Ex: Para-choque dianteiro danificado. Farol direito quebrado..." /></label></>}</>}
                    {incidentStep === 4 && <><h4><Camera size={16} /> Fotos do sinistro</h4><div className="incident-photos-grid">{incidentForm.photos.map((photo, index) => <label key={index}><span>Foto {index + 1}</span><div className={photo ? 'has-file' : ''}>{photo?.preview ? <img src={photo.preview} alt={`Prévia da foto ${index + 1}`} /> : <Upload size={21} />}<strong>{photo ? photo.file.name : 'Clique para tirar/enviar foto'}</strong></div><input type="file" accept="image/*" onChange={(event) => handleIncidentPhoto(index, event.target.files?.[0] || null)} /></label>)}</div><h4><FileText size={16} /> Documentos</h4><label className="incident-document-upload"><Upload size={23} /><strong>{incidentForm.documents.length ? `${incidentForm.documents.length} documento(s) selecionado(s)` : 'Adicionar documento'}</strong><span>BO, documento da seguradora, orçamento — PDF, JPG ou PNG</span><input type="file" multiple accept="application/pdf,image/*" onChange={(event) => setIncidentForm({ ...incidentForm, documents: Array.from(event.target.files || []) })} /></label>{incidentForm.documents.length > 0 && <div className="incident-documents-list">{incidentForm.documents.map((document) => <span key={`${document.name}-${document.lastModified}`}><FileText size={14} /> {document.name}</span>)}</div>}</>}
                    {incidentStep === 5 && <><p className="incident-question">Houve acionamento do seguro?</p><div className="incident-choice-row"><button type="button" className={incidentForm.insuranceActivated === true ? 'selected safe' : ''} onClick={() => setIncidentForm({ ...incidentForm, insuranceActivated: true })}>Sim</button><button type="button" className={incidentForm.insuranceActivated === false ? 'selected' : ''} onClick={() => setIncidentForm({ ...incidentForm, insuranceActivated: false })}>Não</button></div>{incidentForm.insuranceActivated && <div className="insurance-fields"><div className="user-form-row"><label className="user-form-field">Seguradora<input value={incidentForm.insurer} onChange={(event) => setIncidentForm({ ...incidentForm, insurer: event.target.value })} /></label><label className="user-form-field">Protocolo do seguro<input value={incidentForm.insuranceProtocol} onChange={(event) => setIncidentForm({ ...incidentForm, insuranceProtocol: event.target.value })} /></label></div><div className="user-form-row"><label className="user-form-field">Data de abertura<input type="date" value={incidentForm.insuranceOpenDate} onChange={(event) => setIncidentForm({ ...incidentForm, insuranceOpenDate: event.target.value })} /></label><label className="user-form-field">Status do processo<select value={incidentForm.insuranceStatus} onChange={(event) => setIncidentForm({ ...incidentForm, insuranceStatus: event.target.value })}><option>Em análise</option><option>Aprovado</option><option>Recusado</option><option>Concluído</option></select></label></div></div>}<label className="user-form-field full">Responsabilidade<select value={incidentForm.responsibility} onChange={(event) => setIncidentForm({ ...incidentForm, responsibility: event.target.value })}><option>Em análise</option><option>Motorista</option><option>Terceiro</option><option>Locadora</option><option>Não identificado</option></select></label><div className="incident-costs"><h4><CircleDollarSign size={16} /> Custos do sinistro</h4><div className="user-form-row"><label className="user-form-field">Orçamento do reparo (R$)<input type="number" min="0" value={incidentForm.repairBudget} onChange={(event) => setIncidentForm({ ...incidentForm, repairBudget: event.target.value })} /></label><label className="user-form-field">Franquia paga (R$)<input type="number" min="0" value={incidentForm.deductible} onChange={(event) => setIncidentForm({ ...incidentForm, deductible: event.target.value })} /></label></div><div className="user-form-row"><label className="user-form-field">Pago pela seguradora (R$)<input type="number" min="0" value={incidentForm.insurerPaid} onChange={(event) => setIncidentForm({ ...incidentForm, insurerPaid: event.target.value })} /></label><label className="user-form-field">Pago pelo motorista (R$)<input type="number" min="0" value={incidentForm.driverPaid} onChange={(event) => setIncidentForm({ ...incidentForm, driverPaid: event.target.value })} /></label></div><label className="user-form-field full">Outros custos (R$)<input type="number" min="0" value={incidentForm.otherCosts} onChange={(event) => setIncidentForm({ ...incidentForm, otherCosts: event.target.value })} /></label><div className="incident-total"><strong>Valor total</strong><b>{formatCurrency(incidentTotalCost)}</b></div></div><label className="user-form-field full">Observações<textarea value={incidentForm.notes} onChange={(event) => setIncidentForm({ ...incidentForm, notes: event.target.value })} placeholder="Anotações adicionais..." /></label></>}
                  </div><div className="incident-form-actions">{incidentStep > 1 ? <button type="button" className="btn btn-secondary" onClick={() => setIncidentStep((current) => current - 1)}>Voltar</button> : <button type="button" className="btn btn-secondary" onClick={closeIncidentForm}>Cancelar</button>}{incidentStep < 5 ? <button type="button" className="btn btn-primary" onClick={advanceIncidentStep}>Avançar</button> : <button type="submit" className="btn btn-primary">Registrar</button>}</div></form></div>}
                  {selectedIncident && <div className="user-form-overlay" onClick={() => setSelectedIncident(null)}><section className="incident-detail-modal" onClick={(event) => event.stopPropagation()}><div className="user-form-header"><div><h3>Sinistro {selectedIncident.protocol}</h3><span className={`incident-status ${selectedIncident.status.toLocaleLowerCase().replace(' ', '-')}`}>{selectedIncident.status}</span></div><button type="button" onClick={() => setSelectedIncident(null)} aria-label="Fechar"><X size={20} /></button></div><div className="incident-detail-content"><div className="incident-detail-grid"><div><small>Veículo</small><strong>{selectedIncident.vehicleName}</strong><span>{selectedIncident.plate || '—'}</span></div><div><small>Motorista</small><strong>{selectedIncident.driver || '—'}</strong><span>{selectedIncident.rental || 'Sem locação vinculada'}</span></div><div><small>Ocorrência</small><strong>{selectedIncident.type}</strong><span>{selectedIncident.formattedDate} {selectedIncident.time && `• ${selectedIncident.time}`}</span></div><div><small>Responsabilidade</small><strong>{selectedIncident.responsibility}</strong><span>{selectedIncident.location}</span></div></div><div className="incident-detail-section"><h4>Descrição da ocorrência</h4><p>{selectedIncident.occurrenceDescription || '—'}</p></div><div className="incident-detail-section"><h4>Danos</h4>{selectedIncident.hasDamage ? <><div className="incident-damage-tags">{selectedIncident.damageLocations.map((location) => <span key={location}>{location}</span>)}</div><p>{selectedIncident.damageDescription || 'Sem descrição adicional.'}</p></> : <p>Não houve danos no veículo.</p>}</div><div className="incident-detail-section"><h4>Seguro e custos</h4><div className="incident-detail-grid"><div><small>Seguro</small><strong>{selectedIncident.insuranceActivated ? selectedIncident.insurer || 'Acionado' : 'Não acionado'}</strong><span>{selectedIncident.insuranceProtocol || '—'}</span></div><div><small>Custo total</small><strong>{formatCurrency(selectedIncident.totalCost)}</strong><span>Franquia: {formatCurrency(Number(selectedIncident.deductible) || 0)}</span></div></div></div>{selectedIncident.photos.some(Boolean) && <div className="incident-detail-section"><h4>Fotos</h4><div className="incident-detail-photos">{selectedIncident.photos.filter(Boolean).map((photo, index) => <img key={index} src={photo.preview} alt={`Foto do sinistro ${index + 1}`} />)}</div></div>}{selectedIncident.documents.length > 0 && <div className="incident-detail-section"><h4>Documentos</h4><div className="incident-documents-list">{selectedIncident.documents.map((document) => <span key={`${document.name}-${document.lastModified}`}><FileText size={14} /> {document.name}</span>)}</div></div>}<div className="incident-detail-section"><h4>Observações</h4><p>{selectedIncident.notes || '—'}</p></div></div><div className="incident-form-actions"><button className="btn btn-secondary" type="button" onClick={() => openIncidentEdit(selectedIncident)}>Editar</button><button className="btn btn-primary" type="button" onClick={() => updateIncidentStatus(selectedIncident.id, 'Resolvido')}>Resolver</button></div></section></div>}
                </div>
              )}

              {/* Tab 3: Proposals / Client Leads list */}
              {activeTab === 'proposals' && (
                <div className="tab-pane">
                  <h2 className="view-title">Propostas de Interesse</h2>

                  <div className="proposals-split-view">
                    {/* List Table */}
                    <div className="proposals-list-box">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Cliente</th>
                            <th>Veículo</th>
                            <th>Data</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proposals.map(lead => (
                            <tr 
                              key={lead.id} 
                              className={`proposal-row-item ${selectedProposal?.id === lead.id ? 'selected-row' : ''}`}
                              onClick={() => setSelectedProposal(lead)}
                            >
                              <td>
                                <strong>{lead.fullName}</strong>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{lead.phone}</div>
                              </td>
                              <td>{lead.vehicleModel}</td>
                              <td>{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                              <td>
                                <span className={`status-tag ${lead.status.toLowerCase()}`}>
                                  {lead.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Lead Detail View Panel */}
                    <div className="proposal-detail-panel">
                      {selectedProposal ? (
                        <div className="glass-card detail-card">
                          <div className="detail-header">
                            <h3>Ficha de Lead #{selectedProposal.id}</h3>
                            <span className={`status-tag ${selectedProposal.status.toLowerCase()}`}>{selectedProposal.status}</span>
                          </div>

                          <div className="detail-grid">
                            <div className="detail-field">
                              <label>Cliente</label>
                              <p>{selectedProposal.fullName}</p>
                            </div>
                            <div className="detail-field">
                              <label>Cidade</label>
                              <p>{selectedProposal.city}</p>
                            </div>
                            <div className="detail-field">
                              <label>WhatsApp</label>
                              <p><a href={`https://wa.me/55${selectedProposal.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="detail-link">{selectedProposal.phone}</a></p>
                            </div>
                            <div className="detail-field">
                              <label>E-mail</label>
                              <p>{selectedProposal.email}</p>
                            </div>
                            <div className="detail-field">
                              <label>CNH Categoria</label>
                              <p>{selectedProposal.cnhCategory || 'B'}</p>
                            </div>
                            <div className="detail-field">
                              <label>Contato Preferido</label>
                              <p>{selectedProposal.contactTime}</p>
                            </div>
                            <div className="detail-field">
                              <label>Veículo Selecionado</label>
                              <p><strong>{selectedProposal.vehicleModel}</strong></p>
                            </div>
                            <div className="detail-field">
                              <label>Plano Escolhido</label>
                              <p>{selectedProposal.planType}</p>
                            </div>
                            {selectedProposal.appPlatform && (
                              <div className="detail-field">
                                <label>Trabalha com App</label>
                                <p>{selectedProposal.appPlatform}</p>
                              </div>
                            )}
                          </div>

                          {selectedProposal.message && (
                            <div className="detail-field-full">
                              <label>Mensagem do Cliente</label>
                              <div className="message-text-bubble">{selectedProposal.message}</div>
                            </div>
                          )}

                          <div className="detail-actions-footer">
                            <label>Alterar Status:</label>
                            <div className="btn-status-group">
                              <button 
                                className="btn btn-outline-green btn-sm" 
                                disabled={selectedProposal.status === 'Aprovado'}
                                onClick={() => handleProposalStatus(selectedProposal.id, 'Aprovado')}
                              >
                                Aprovar Cadastro
                              </button>
                              <button 
                                className="btn btn-secondary btn-sm status-recusar" 
                                disabled={selectedProposal.status === 'Recusado'}
                                onClick={() => handleProposalStatus(selectedProposal.id, 'Recusado')}
                              >
                                Recusar
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="detail-idle-card">
                          <p>Selecione uma proposta na lista para visualizar a ficha cadastral e gerenciar o status do atendimento.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}






