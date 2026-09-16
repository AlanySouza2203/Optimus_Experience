export const createAdminAuth = () => ({ username: '', password: '' });

export const createFineForm = () => ({
  notice: '', vehicle: '', plate: '', authority: 'DETRAN', date: '', time: '', location: '',
  type: 'Excesso de velocidade', description: '', value: '', dueDate: '', status: 'Pendente',
  chargeDriver: false, document: null, notes: ''
});

export const createVehicleForm = () => ({
  brand: '', name: '', category: 'Econômico', priceWeekly: '', year: '2024',
  status: 'Disponível', image: '', transm: 'Automático', seats: '5 lugares',
  fuel: 'Flex', consumption: '12,0 km/l', features: '', internalCode: '', plate: '',
  renavam: '', chassis: '', version: '', manufactureYear: '', modelYear: '2024', color: '',
  mileage: '', doors: '', acquisitionValue: '', acquisitionDate: '', insurer: '',
  mileageControlDate: '', nextMaintenanceMileage: ''
});

export const createUserForm = () => ({ name: '', cpf: '', phone: '', email: '', password: '', confirmPassword: '', role: '', profile: 'Atendimento', status: 'Ativo' });
export const createDriverForm = () => ({ name: '', cpf: '', birthDate: '', phone: '', email: '', address: '', city: '', state: '', emergencyContact: '', cnhNumber: '', cnhCategory: '', cnhIssueDate: '', cnhExpiryDate: '', cnhIssuerState: '', platforms: [] });
export const createRentalForm = () => ({ client: '', driver: '', vehicle: '', plan: '', startDate: '', returnDate: '', days: '', value: '', paymentMethod: '', mileageLimit: '', deposit: '', attendant: '', status: 'Ativa', notes: '' });
export const createCollectionUpload = () => ({ driver: '', type: 'Aluguel', dueDate: '', value: '', description: '', file: null });
export const createInspectionForm = () => ({ type: 'Saída', contract: '', client: '', driver: '', inspector: '', date: '', time: '' });
export const createClientForm = () => ({ type: 'PF', document: '', name: '', birthDate: '', phone: '', email: '', zipCode: '', address: '', city: '', state: '', notes: '' });
export const createReservationForm = () => ({ client: '', driver: '', vehicle: '', date: '', period: 'Semanal', value: '', status: 'Pendente' });
export const createContractForm = (number = 'CT-2024-001') => ({ number, plan: 'Mensal', client: '', driver: '', vehicle: '', value: '', deposit: '', startDate: '', endDate: '', status: 'Em elaboração', file: null });
export const createCashForm = () => ({ type: 'Entrada', date: '', description: '', category: 'Locação', value: '', status: 'Pago', notes: '' });
export const createPaymentForm = () => ({ driver: '', phone: '', email: '', contract: '', value: '', method: 'Pix', date: '', receipt: null });
export const createIncidentForm = (protocol = 'SIN-2026-0001') => ({
  protocol, vehicle: '', plate: '', driver: '', rental: '', date: '', time: '', location: '',
  type: 'Colisão', occurrenceDescription: '', status: 'Aberto', hasDamage: null, damageLocations: [],
  damageDescription: '', photos: Array(6).fill(null), documents: [], insuranceActivated: null,
  insurer: '', insuranceProtocol: '', insuranceOpenDate: '', insuranceStatus: 'Em análise',
  responsibility: 'Em análise', repairBudget: '', deductible: '', insurerPaid: '', driverPaid: '',
  otherCosts: '', notes: ''
});

export const createSupportRequestForm = (protocol = 'SUP-0001') => ({
  protocol, driver: '', vehicle: '', plate: '', rental: '', type: 'Problema mec�nico',
  description: '', location: '', priority: 'Média', status: 'Aberto', responsible: '',
  notes: '', attachments: Array(3).fill(null)
});


