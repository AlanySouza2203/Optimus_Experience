import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3001;

let useFallback = false;

let fallbackUsers = [
  { id: 1, name: 'Carlos Alberto Silva', email: 'carlos@drivefleet.com.br', password: 'admin123', cargo: 'Diretor Operacional', role: 'Administrador', status: 'Ativo', createdAt: '09/01/2024' },
  { id: 2, name: 'Fernanda Oliveira Costa', email: 'fernanda@drivefleet.com.br', password: 'gestor123', cargo: 'Gestora de Frota', role: 'Gestor', status: 'Ativo', createdAt: '14/02/2024' },
  { id: 3, name: 'Ricardo Mendes Souza', email: 'ricardo@drivefleet.com.br', password: 'atendente123', cargo: 'Atendente', role: 'Atendente', status: 'Ativo', createdAt: '29/02/2024' },
  { id: 4, name: 'Priscila Torres Lima', email: 'priscila@drivefleet.com.br', password: 'vistoriador123', cargo: 'Vistoriadora', role: 'Vistoriador', status: 'Ativo', createdAt: '19/03/2024' },
  { id: 5, name: 'Marcos Vinícius Alves', email: 'marcos@drivefleet.com.br', password: 'atendente123', cargo: 'Atendente', role: 'Atendente', status: 'Inativo', createdAt: '04/04/2024' },
  { id: 6, name: 'Juliana Ramos Ferreira', email: 'juliana@drivefleet.com.br', password: 'gestor123', cargo: 'Gestora Financeira', role: 'Gestor', status: 'Bloqueado', createdAt: '17/04/2024' },
  { id: 7, name: 'Carlos Alberto', email: 'admin@optimusexperience.com.br', password: 'admin123', cargo: 'Diretor Operacional', role: 'Administrador', status: 'Ativo', createdAt: '09/01/2024' }
];

let fallbackPermissions = {};

const calculateVehiclePriceBands = () => {
  const vehiclePrices = approvedVehicleCatalog
    .map((vehicle) => Number(vehicle.priceWeekly || 0))
    .filter((price) => Number.isFinite(price) && price > 0)
    .sort((a, b) => a - b);

  if (vehiclePrices.length === 0) {
    return { lowest: 0, medium: 0, highest: 0 };
  }

  const lowest = vehiclePrices[0];
  const medium = vehiclePrices[Math.floor(vehiclePrices.length / 2)] ?? lowest;
  const highest = vehiclePrices[vehiclePrices.length - 1];

  return { lowest, medium, highest };
};

const calculatePlanValues = (vehiclePrice) => {
  const weekly = Number(vehiclePrice || 0);
  const fortnightly = Number(((weekly * (15 / 7)) * 0.92).toFixed(2));
  const monthly = Number(((weekly * 4) * 0.95).toFixed(2));

  return {
    weekly,
    fortnightly,
    monthly
  };
};

const buildPlanCatalog = () => {
  const { lowest, medium, highest } = calculateVehiclePriceBands();
  const plans = [
    {
      id: 1,
      name: 'Plano Semanal',
      priceWeekly: calculatePlanValues(lowest).weekly,
      priceFortnightly: calculatePlanValues(lowest).fortnightly,
      priceMonthly: calculatePlanValues(lowest).monthly,
      description: 'Valor baseado no veículo mais acessível da frota.',
      benefits: ['Manutenção programada', 'Proteção básica', 'Assistência 24h'],
      popular: false
    },
    {
      id: 2,
      name: 'Plano Quinzenal',
      priceWeekly: calculatePlanValues(medium).weekly,
      priceFortnightly: calculatePlanValues(medium).fortnightly,
      priceMonthly: calculatePlanValues(medium).monthly,
      description: 'Preço médio da frota com desconto de 8% na faixa quinzenal.',
      benefits: ['Manutenção programada', 'Proteção completa', 'Assistência 24h', 'Km inclusa'],
      popular: true
    },
    {
      id: 3,
      name: 'Plano Mensal',
      priceWeekly: calculatePlanValues(highest).weekly,
      priceFortnightly: calculatePlanValues(highest).fortnightly,
      priceMonthly: calculatePlanValues(highest).monthly,
      description: 'Valor do veículo premium com desconto de 5% no ciclo mensal.',
      benefits: ['Manutenção programada', 'Proteção completa', 'Assistência 24h', 'Km inclusa', 'Carro reserva'],
      popular: false
    }
  ];

  return plans;
};

const approvedVehicleCatalog = [
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Porta-malas amplo', 'Ar-condicionado', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Porta-malas amplo', 'Ar-condicionado', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
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
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia'],
    approvedPlatforms: ['Uber', '99', 'inDrive']
  }
];

const fallbackPlans = buildPlanCatalog();

let fallbackVehicles = approvedVehicleCatalog.map((vehicle) => ({ ...vehicle }));

let fallbackDrivers = [
  {
    id: 1,
    fullName: 'Alessandro Rodrigues',
    name: 'Alessandro Rodrigues',
    email: 'alessandro@email.com',
    password: 'driver123',
    cpf: '111.222.333-01',
    phone: '(11) 98001-0001',
    birthDate: '1990-05-10',
    cnhCategory: 'Cat. B',
    cnhExpiry: '14/08/2026',
    city: 'São Paulo',
    state: 'SP',
    status: 'Aprovado',
    appPlatforms: ['Uber', '99'],
    platforms: ['Uber', '99']
  },
  {
    id: 2,
    fullName: 'Bruno Pereira Santos',
    name: 'Bruno Pereira Santos',
    email: 'bruno@email.com',
    password: 'driver123',
    cpf: '222.333.444-02',
    phone: '(11) 98002-0002',
    birthDate: '1988-11-20',
    cnhCategory: 'Cat. B',
    cnhExpiry: '29/11/2025',
    city: 'Guarulhos',
    state: 'SP',
    status: 'Aprovado',
    appPlatforms: ['Uber'],
    platforms: ['Uber']
  },
  {
    id: 3,
    fullName: 'Claudia Nascimento',
    name: 'Claudia Nascimento',
    email: 'claudia@email.com',
    password: 'driver123',
    cpf: '333.444.555-03',
    phone: '(11) 98003-0003',
    birthDate: '1992-03-15',
    cnhCategory: 'Cat. B',
    cnhExpiry: '09/03/2027',
    city: 'Santo André',
    state: 'SP',
    status: 'Em análise',
    appPlatforms: ['inDrive', '99'],
    platforms: ['inDrive', '99']
  },
  {
    id: 4,
    fullName: 'Diego Carvalho Lima',
    name: 'Diego Carvalho Lima',
    email: 'diego@email.com',
    password: 'driver123',
    cpf: '444.555.666-04',
    phone: '(11) 98004-0004',
    birthDate: '1994-07-22',
    cnhCategory: 'Cat. B',
    cnhExpiry: '21/06/2025',
    city: 'São Paulo',
    state: 'SP',
    status: 'Aprovado',
    appPlatforms: ['Uber', 'inDrive'],
    platforms: ['Uber', 'inDrive']
  },
  {
    id: 5,
    fullName: 'Elaine Souza Ribeiro',
    name: 'Elaine Souza Ribeiro',
    email: 'elaine@email.com',
    password: 'driver123',
    cpf: '555.666.777-05',
    phone: '(11) 98005-0005',
    birthDate: '1985-09-18',
    cnhCategory: 'Cat. B',
    cnhExpiry: '30/11/2024',
    city: 'Osasco',
    state: 'SP',
    status: 'Bloqueado',
    appPlatforms: ['99'],
    platforms: ['99']
  },
  {
    id: 6,
    fullName: 'Fábio Monteiro Costa',
    name: 'Fábio Monteiro Costa',
    email: 'fabio@email.com',
    password: 'driver123',
    cpf: '666.777.888-06',
    phone: '(11) 98006-0006',
    birthDate: '1991-01-30',
    cnhCategory: 'Cat. B',
    cnhExpiry: '13/09/2026',
    city: 'São Bernardo',
    state: 'SP',
    status: 'Aprovado',
    appPlatforms: ['Uber'],
    platforms: ['Uber']
  },
  {
    id: 7,
    fullName: 'Gabriela Torres Melo',
    name: 'Gabriela Torres Melo',
    email: 'gabriela@email.com',
    password: 'driver123',
    cpf: '777.888.999-07',
    phone: '(11) 98007-0007',
    birthDate: '1996-12-05',
    cnhCategory: 'Cat. B',
    cnhExpiry: '19/04/2026',
    city: 'São Paulo',
    state: 'SP',
    status: 'Aprovado',
    appPlatforms: ['Uber', '99', 'inDrive'],
    platforms: ['Uber', '99', 'inDrive']
  },
  {
    id: 8,
    fullName: 'Motorista Demo',
    name: 'Motorista Demo',
    email: 'driver@optimusexperience.com.br',
    password: 'driver123',
    cpf: '12345678909',
    phone: '(11) 98888-1234',
    birthDate: '1995-02-15',
    cnhCategory: 'Cat. B',
    cnhExpiry: '15/06/2035',
    city: 'São Paulo',
    state: 'SP',
    status: 'Aprovado',
    appPlatforms: ['Uber', '99'],
    platforms: ['Uber', '99']
  }
];

let fallbackProposals = [];
let fallbackClients = [
  {
    id: 1,
    type: 'PF',
    name: 'Alessandro Rodrigues',
    document: '111.222.333-01',
    email: 'alessandro@email.com',
    phone: '(11) 98001-0001',
    city: 'São Paulo',
    state: 'SP',
    status: 'Ativo',
    createdAt: '10/01/2024'
  },
  {
    id: 2,
    type: 'PF',
    name: 'Bruno Pereira Santos',
    document: '222.333.444-02',
    email: 'bruno@email.com',
    phone: '(11) 98002-0002',
    city: 'Guarulhos',
    state: 'SP',
    status: 'Ativo',
    createdAt: '15/02/2024'
  },
  {
    id: 3,
    type: 'PJ',
    name: 'Logística Express Ltda',
    document: '12.345.678/0001-90',
    email: 'contato@logisticaexpress.com.br',
    phone: '(11) 3333-4444',
    city: 'São Paulo',
    state: 'SP',
    status: 'Ativo',
    createdAt: '01/03/2024'
  }
];
let fallbackReservations = [];
let fallbackPayments = [];
let fallbackCashEntries = [];
let fallbackContracts = [];
let fallbackSupport = [];
let fallbackNotifications = [
  { id: 1, driverId: 1, type: 'reserva', title: 'Reserva confirmada', message: 'Seu veículo foi reservado com sucesso.', isRead: false, createdAt: new Date().toISOString() },
  { id: 2, driverId: 1, type: 'pagamento', title: 'Lembrete de pagamento', message: 'Sua parcela vence em 3 dias.', isRead: false, createdAt: new Date().toISOString() }
];

let pool;

async function ensureColumn(tableName, columnName, definition) {
  const [columns] = await pool.query(
    `SELECT COUNT(*) AS total FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [tableName, columnName]
  );

  if (Number(columns[0].total) === 0) {
    await pool.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
}

async function ensureVehicleCatalogSeed() {
  if (useFallback || !pool) return;

  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM vehicles');
    const total = Number(rows[0]?.total || 0);

    if (total > 0) {
      return;
    }

    for (const vehicle of approvedVehicleCatalog) {
      await pool.query(
        `INSERT INTO vehicles (brand, year, name, category, price_weekly, status, image, transm, seats, fuel, consumption, features, approved_platforms)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          vehicle.brand,
          vehicle.year,
          vehicle.name,
          vehicle.category,
          Number(vehicle.priceWeekly),
          vehicle.status,
          vehicle.image,
          vehicle.specs?.transm || 'Manual',
          vehicle.specs?.seats || '5 lugares',
          vehicle.specs?.fuel || 'Flex',
          vehicle.specs?.consumption || '13,0 km/l',
          JSON.stringify(vehicle.features || []),
          JSON.stringify(vehicle.approvedPlatforms || ['Uber', '99'])
        ]
      );
    }

    console.log('✅ Seeded original vehicle catalog into MySQL.');
  } catch (err) {
    console.warn('⚠ï¸ Failed to seed the vehicle catalog:', err.message);
  }
}

async function ensurePlanCatalogSeed() {
  if (useFallback || !pool) return;

  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM plans');
    const plans = buildPlanCatalog();

    if (Number(rows[0]?.total || 0) === 0) {
      for (const plan of plans) {
        await pool.query(
          `INSERT INTO plans (name, price_weekly, price_fortnightly, price_monthly, description, benefits, popular)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            plan.name,
            Number(plan.priceWeekly),
            Number(plan.priceFortnightly),
            Number(plan.priceMonthly),
            plan.description,
            JSON.stringify(plan.benefits || []),
            Boolean(plan.popular)
          ]
        );
      }
    } else {
      for (const plan of plans) {
        const [existingRows] = await pool.query('SELECT id FROM plans WHERE name = ?', [plan.name]);
        if (existingRows.length > 0) {
          await pool.query(
            `UPDATE plans
             SET price_weekly = ?, price_fortnightly = ?, price_monthly = ?, description = ?, benefits = ?, popular = ?
             WHERE id = ?`,
            [
              Number(plan.priceWeekly),
              Number(plan.priceFortnightly),
              Number(plan.priceMonthly),
              plan.description,
              JSON.stringify(plan.benefits || []),
              Boolean(plan.popular),
              existingRows[0].id
            ]
          );
        } else {
          await pool.query(
            `INSERT INTO plans (name, price_weekly, price_fortnightly, price_monthly, description, benefits, popular)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              plan.name,
              Number(plan.priceWeekly),
              Number(plan.priceFortnightly),
              Number(plan.priceMonthly),
              plan.description,
              JSON.stringify(plan.benefits || []),
              Boolean(plan.popular)
            ]
          );
        }
      }
    }

    console.log('✅ Synced calculated plan values into MySQL.');
  } catch (err) {
    console.warn('⚠ï¸ Failed to sync plan catalog:', err.message);
  }
}

async function ensureClientCatalogSeed() {
  if (useFallback || !pool) return;
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM clients');
    if (Number(rows[0]?.total || 0) === 0) {
      for (const client of fallbackClients) {
        await pool.query(
          `INSERT INTO clients (type, name, document, email, phone, city, state, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [client.type, client.name, client.document, client.email, client.phone, client.city, client.state, client.status || 'Ativo']
        );
      }
      console.log('✅ Seeded initial clients into MySQL.');
    }
  } catch (err) {
    console.warn('Failed to seed client catalog:', err.message);
  }
}

async function initDb() {
  try {
    const sslOption = (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1' || process.env.DB_PORT === '4000') 
      ? { minVersion: 'TLSv1.2', rejectUnauthorized: false } 
      : undefined;

    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'optimus_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: sslOption
    });

    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL database successfully!');
    conn.release();

    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      cargo VARCHAR(100) DEFAULT 'Atendente',
      role VARCHAR(50) NOT NULL DEFAULT 'Atendente',
      status VARCHAR(30) NOT NULL DEFAULT 'Ativo',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(10) NOT NULL DEFAULT 'PF',
      name VARCHAR(120) NOT NULL,
      document VARCHAR(30) NOT NULL,
      email VARCHAR(120) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      city VARCHAR(80) DEFAULT '',
      state VARCHAR(10) DEFAULT '',
      status VARCHAR(30) NOT NULL DEFAULT 'Ativo',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS drivers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(120) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      cpf VARCHAR(20) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      birth_date DATE NULL,
      cnh_category VARCHAR(10) DEFAULT 'B',
      cnh_expiry DATE NULL,
      app_platforms JSON DEFAULT NULL,
      experience_months INT DEFAULT 0,
      city VARCHAR(80) DEFAULT '',
      state VARCHAR(3) DEFAULT '',
      cep VARCHAR(15) DEFAULT '',
      address_line VARCHAR(180) DEFAULT '',
      address_number VARCHAR(20) DEFAULT '',
      address_complement VARCHAR(80) DEFAULT '',
      neighborhood VARCHAR(80) DEFAULT '',
      status VARCHAR(30) NOT NULL DEFAULT 'pendente',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS proposals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      cnh_category VARCHAR(10) DEFAULT 'B',
      vehicle_model VARCHAR(150) NOT NULL,
      vehicle_brand VARCHAR(80) DEFAULT '',
      vehicle_year VARCHAR(20) DEFAULT '2024',
      vehicle_category VARCHAR(50) DEFAULT 'Econômico',
      vehicle_price_weekly DECIMAL(10,2) DEFAULT 0,
      vehicle_image TEXT DEFAULT '',
      vehicle_status VARCHAR(30) DEFAULT 'Disponível',
      plan_type VARCHAR(50) NOT NULL,
      app_platform VARCHAR(100) DEFAULT 'Nenhuma',
      contact_time VARCHAR(100) DEFAULT 'Qualquer Horário',
      message TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'Novo',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS vehicles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      brand VARCHAR(50) NOT NULL,
      year VARCHAR(10) NOT NULL,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      price_weekly DECIMAL(10, 2) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'Disponível',
      image TEXT NOT NULL,
      transm VARCHAR(50) NOT NULL,
      seats VARCHAR(50) NOT NULL,
      fuel VARCHAR(50) NOT NULL,
      consumption VARCHAR(50) NOT NULL,
      features JSON,
      approved_platforms JSON DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS plans (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(60) NOT NULL,
      price_weekly DECIMAL(10, 2) NOT NULL,
      price_fortnightly DECIMAL(10, 2) NOT NULL DEFAULT 0,
      price_monthly DECIMAL(10, 2) NOT NULL,
      description TEXT,
      benefits JSON,
      popular BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS support_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      driver_id INT NULL,
      driver_name VARCHAR(120) NOT NULL,
      vehicle_id INT NULL,
      vehicle_name VARCHAR(160) DEFAULT '',
      plate VARCHAR(20) DEFAULT '',
      request_type VARCHAR(80) NOT NULL,
      description TEXT NOT NULL,
      location VARCHAR(180) DEFAULT '',
      latitude VARCHAR(40) DEFAULT '',
      longitude VARCHAR(40) DEFAULT '',
      protocol VARCHAR(30) DEFAULT '',
      priority VARCHAR(30) DEFAULT 'Média',
      status VARCHAR(30) NOT NULL DEFAULT 'Aberto',
      responsible VARCHAR(120) DEFAULT '',
      notes TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Older installations may have been created from a schema that stopped
    // before the payments table. Create it before running its migrations so
    // one missing, unrelated table does not disable all MySQL persistence.
    await pool.query(`CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_id INT NULL,
      contract_id INT NULL,
      reservation_id INT NULL,
      driver_name VARCHAR(120) DEFAULT '',
      driver_phone VARCHAR(40) DEFAULT '',
      driver_email VARCHAR(120) DEFAULT '',
      contract_number VARCHAR(80) DEFAULT '',
      amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
      due_date DATE NOT NULL,
      paid_at DATETIME NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'pendente',
      method VARCHAR(40) NOT NULL DEFAULT 'pix',
      external_reference VARCHAR(120) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS cash_entries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      payment_id INT NULL UNIQUE,
      entry_type VARCHAR(20) NOT NULL,
      entry_date DATE NOT NULL,
      description VARCHAR(255) NOT NULL,
      category VARCHAR(80) DEFAULT '',
      amount DECIMAL(10,2) NOT NULL DEFAULT 0,
      status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL
    )`);

    await ensureColumn('clients', 'interested_id', 'INT NULL');
    await ensureColumn('clients', 'state', "VARCHAR(10) DEFAULT ''");
    await ensureColumn('drivers', 'client_id', 'INT NULL');
    await ensureColumn('reservations', 'client_id', 'INT NULL');
    await ensureColumn('payments', 'client_id', 'INT NULL');
    await ensureColumn('payments', 'contract_id', 'INT NULL');
    await ensureColumn('cash_entries', 'payment_id', 'INT NULL');
    await ensureColumn('contracts', 'client_name', "VARCHAR(120) DEFAULT ''");
    await ensureColumn('contracts', 'vehicle_name', "VARCHAR(160) DEFAULT ''");
    await ensureColumn('contracts', 'attachment_name', "VARCHAR(180) DEFAULT ''");
    await ensureColumn('proposals', 'vehicle_id', 'INT NULL');
    await ensureColumn('proposals', 'whatsapp', "VARCHAR(50) DEFAULT ''");
    await ensureColumn('proposals', 'updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');

    await pool.query('CREATE TABLE IF NOT EXISTS role_permissions (role VARCHAR(80) PRIMARY KEY, permissions JSON NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)');
    await pool.query(`CREATE TABLE IF NOT EXISTS collection_charges (
      id INT AUTO_INCREMENT PRIMARY KEY,
      driver_name VARCHAR(120) NOT NULL,
      charge_type VARCHAR(80) NOT NULL,
      due_date DATE NOT NULL,
      amount DECIMAL(10,2) NOT NULL DEFAULT 0,
      description TEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
      attachment_name VARCHAR(180) DEFAULT '',
      attachment_data LONGTEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await ensurePaymentColumns();
    await ensureColumn('support_requests', 'vehicle_id', 'INT NULL');
    await ensureColumn('support_requests', 'vehicle_name', "VARCHAR(160) DEFAULT ''");
    await ensureColumn('support_requests', 'plate', "VARCHAR(20) DEFAULT ''");
    await ensureColumn('support_requests', 'location', "VARCHAR(180) DEFAULT ''");
    await ensureColumn('support_requests', 'protocol', "VARCHAR(30) DEFAULT ''");
    await ensureColumn('support_requests', 'priority', "VARCHAR(30) DEFAULT 'Média'");
    await ensureColumn('support_requests', 'responsible', "VARCHAR(120) DEFAULT ''");
    await ensureColumn('support_requests', 'notes', 'TEXT DEFAULT ""');
    await syncPaymentsToCashEntries();
    await ensureVehicleCatalogSeed();
    await ensurePlanCatalogSeed();
    await ensureClientCatalogSeed();
  } catch (err) {
    console.warn('⚠ï¸ Could not connect to MySQL database:', err.message);
    console.warn('⚠ï¸ Falling back to in-memory storage.');
    useFallback = true;
  }
}

async function ensurePaymentColumns() {
  try {
    await pool.query('ALTER TABLE payments MODIFY COLUMN reservation_id INT NULL');
  } catch (error) {
    if (error.code !== 'ER_NO_SUCH_TABLE') throw error;
  }

  const columns = [
    ['reservation_id', 'INT NULL'],
    ['driver_name', "VARCHAR(120) DEFAULT ''"],
    ['driver_phone', "VARCHAR(40) DEFAULT ''"],
    ['driver_email', "VARCHAR(120) DEFAULT ''"],
    ['contract_number', "VARCHAR(80) DEFAULT ''"]
  ];

  for (const [name, definition] of columns) {
    try {
      await pool.query(`ALTER TABLE payments ADD COLUMN ${name} ${definition}`);
    } catch (error) {
      if (error.code !== 'ER_DUP_FIELDNAME') throw error;
    }
  }
}

// Pagamentos criados antes da integração não possuíam uma entrada vinculada
// no fluxo de caixa. Esta rotina faz o preenchimento uma única vez por pagamento.
async function syncPaymentsToCashEntries() {
  await pool.query(`
    INSERT INTO cash_entries (payment_id, entry_type, entry_date, description, category, amount, status, notes)
    SELECT
      pay.id,
      'Entrada',
      COALESCE(DATE(pay.paid_at), pay.due_date),
      CONCAT('Pagamento recebido - ', COALESCE(NULLIF(pay.driver_name, ''), 'Motorista não informado'),
        CASE WHEN COALESCE(pay.contract_number, '') = '' THEN '' ELSE CONCAT(' (', pay.contract_number, ')') END),
      'Pagamento',
      pay.amount,
      CASE WHEN LOWER(pay.status) IN ('pago', 'paga', 'paid') THEN 'Pago' ELSE pay.status END,
      CONCAT('Forma de pagamento: ', COALESCE(pay.method, 'Não informada'))
    FROM payments pay
    LEFT JOIN cash_entries cash ON cash.payment_id = pay.id
    WHERE cash.id IS NULL
  `);
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeVehicle(row) {
  return {
    id: row.id,
    brand: row.brand,
    year: row.year,
    name: row.name,
    category: row.category,
    priceWeekly: Number(row.price_weekly ?? row.priceWeekly ?? 0),
    status: row.status,
    image: row.image,
    specs: {
      transm: row.transm,
      seats: row.seats,
      fuel: row.fuel,
      consumption: row.consumption
    },
    features: parseJsonArray(row.features),
    approvedPlatforms: parseJsonArray(row.approved_platforms ?? row.approvedPlatforms)
  };
}

function normalizePlan(row) {
  return {
    id: row.id,
    name: row.name,
    priceWeekly: Number(row.price_weekly ?? row.priceWeekly ?? 0),
    priceFortnightly: Number(row.price_fortnightly ?? row.priceFortnightly ?? 0),
    priceMonthly: Number(row.price_monthly ?? row.priceMonthly ?? 0),
    description: row.description,
    benefits: parseJsonArray(row.benefits),
    popular: Boolean(row.popular)
  };
}

function normalizeSupportRequest(row) {
  return {
    id: row.id,
    driverId: row.driver_id ?? null,
    driverName: row.driver_name || 'Motorista',
    vehicleId: row.vehicle_id ?? null,
    vehicleName: row.vehicle_name || 'Veículo não informado',
    plate: row.plate || '',
    requestType: row.request_type || row.type || 'Suporte',
    description: row.description || '',
    location: row.location || '',
    protocol: row.protocol || `SUP-${String(row.id).padStart(4, '0')}`,
    priority: row.priority || 'Média',
    status: row.status || 'Aberto',
    responsible: row.responsible || '',
    notes: row.notes || '',
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  };
}

const initDbPromise = initDb();
export { initDbPromise, initDb, pool };

app.get('/api/permissions', async (req, res) => {
  if (useFallback) return res.json(fallbackPermissions);
  try {
    const [rows] = await pool.query('SELECT role, permissions FROM role_permissions');
    const permissions = Object.fromEntries(rows.map((row) => [row.role, typeof row.permissions === 'string' ? JSON.parse(row.permissions) : row.permissions]));
    return res.json(permissions);
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

app.put('/api/permissions', async (req, res) => {
  const { permissions } = req.body;
  if (!permissions || typeof permissions !== 'object') return res.status(400).json({ error: 'Permissões inválidas.' });
  if (useFallback) { fallbackPermissions = permissions; return res.json({ success: true, permissions }); }
  try {
    for (const [role, rolePermissions] of Object.entries(permissions)) {
      await pool.query('INSERT INTO role_permissions (role, permissions) VALUES (?, ?) ON DUPLICATE KEY UPDATE permissions = VALUES(permissions)', [role, JSON.stringify(rolePermissions)]);
    }
    return res.json({ success: true, permissions });
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: useFallback ? 'fallback' : 'mysql',
    message: 'Optimus Experience API ativa.'
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, email, password } = req.body;
  const userInput = username || email;

  if (!userInput || !password) {
    return res.status(400).json({ success: false, message: 'Preencha usuário e senha.' });
  }

  if (useFallback) {
    const user = fallbackUsers.find((u) => u.email.toLowerCase() === String(userInput).toLowerCase() && u.password === password);
    if (user) {
      return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, cargo: user.cargo, status: user.status } });
    }
  } else {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = ? AND password = ?', [String(userInput).toLowerCase(), password]);
      if (rows.length > 0) {
        const user = rows[0];
        return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, cargo: user.cargo, status: user.status } });
      }

      const [driverRows] = await pool.query('SELECT * FROM drivers WHERE LOWER(email) = ? AND password = ?', [String(userInput).toLowerCase(), password]);
      if (driverRows.length > 0) {
        const driver = driverRows[0];
        return res.json({ success: true, user: { id: driver.id, name: driver.full_name, email: driver.email, role: 'Motorista', status: driver.status } });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor: ' + err.message });
    }
  }

  return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
});

// USERS ENDPOINTS
app.get('/api/users', async (req, res) => {
  if (useFallback) {
    return res.json(fallbackUsers);
  }
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return res.json(rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      cargo: row.cargo || row.role || 'Atendente',
      role: row.role || 'Atendente',
      status: row.status || 'Ativo',
      createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString('pt-BR') : '09/01/2024'
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, password, cargo, role, status, profile } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  const userRole = role || profile || 'Atendente';
  const userCargo = cargo || userRole;
  const userStatus = status || 'Ativo';
  const userPass = password;
  const createdAt = new Date().toLocaleDateString('pt-BR');

  if (useFallback) {
    const nextId = fallbackUsers.length > 0 ? Math.max(...fallbackUsers.map(u => u.id)) + 1 : 1;
    const newUser = { id: nextId, name, email, password: userPass, cargo: userCargo, role: userRole, status: userStatus, createdAt };
    fallbackUsers.push(newUser);
    return res.status(201).json({ success: true, user: newUser });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, cargo, role, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, userPass, userCargo, userRole, userStatus]
    );
    const newUser = { id: result.insertId, name, email, cargo: userCargo, role: userRole, status: userStatus, createdAt };
    return res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, cargo, role, status, password } = req.body;

  if (useFallback) {
    const idx = fallbackUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      if (password !== undefined && password !== null && String(password).trim() !== '') {
        if (String(password).length < 6) {
          return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
        }
        fallbackUsers[idx].password = password;
      }

      fallbackUsers[idx] = { ...fallbackUsers[idx], ...(name && { name }), ...(email && { email }), ...(cargo && { cargo }), ...(role && { role }), ...(status && { status }) };
      return res.json({ success: true, user: fallbackUsers[idx] });
    }
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  try {
    const fields = [];
    const values = [];
    if (name) { fields.push('name = ?'); values.push(name); }
    if (email) { fields.push('email = ?'); values.push(email); }
    if (cargo) { fields.push('cargo = ?'); values.push(cargo); }
    if (role) { fields.push('role = ?'); values.push(role); }
    if (status) { fields.push('status = ?'); values.push(status); }
    if (password !== undefined && password !== null && String(password).trim() !== '') {
      if (String(password).length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
      }
      fields.push('password = ?');
      values.push(password);
    }
    values.push(id);

    if (fields.length === 0) return res.status(400).json({ error: 'Nenhum campo para atualizar' });

    await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return res.json({ success: true, user: rows[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (useFallback) {
    fallbackUsers = fallbackUsers.filter(u => u.id !== id);
    return res.json({ success: true });
  }
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// CLIENTS ENDPOINTS
app.get('/api/clients', async (req, res) => {
  if (useFallback) {
    return res.json(fallbackClients.map(c => ({
      ...c,
      interestedId: c.interested_id || c.interestedId || null,
      interested_id: c.interested_id || c.interestedId || null,
      origin: (c.interested_id || c.interestedId) ? `Site (Interessado #${c.interested_id || c.interestedId})` : 'Cadastro administrativo'
    })));
  }
  try {
    const [rows] = await pool.query('SELECT * FROM clients ORDER BY id DESC');
    return res.json(rows.map(row => ({
      id: row.id,
      type: row.type || 'PF',
      name: row.name,
      document: row.document,
      email: row.email,
      phone: row.phone,
      city: row.city,
      state: row.state,
      interestedId: row.interested_id,
      interested_id: row.interested_id,
      origin: row.interested_id ? `Site (Interessado #${row.interested_id})` : 'Cadastro administrativo',
      status: row.status || 'Ativo',
      createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString('pt-BR') : '24/07/2024'
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/clients/:id/history', async (req, res) => {
  const clientId = Number(req.params.id);

  if (useFallback) {
    const client = fallbackClients.find(c => c.id === clientId);
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });

    const interestedId = client.interested_id || client.interestedId;
    const interested = interestedId ? fallbackProposals.find(p => p.id === interestedId) : null;
    const clientDrivers = fallbackDrivers.filter(d => d.client_id === clientId || d.email?.toLowerCase() === client.email?.toLowerCase());
    const clientReservations = fallbackReservations.filter(r => r.client_id === clientId || r.driver === client.name);
    const clientPayments = fallbackPayments.filter(p => p.client_id === clientId || p.driverEmail?.toLowerCase() === client.email?.toLowerCase());

    return res.json({
      client,
      origin: interested ? { type: 'Site', interestedId: interested.id, interested } : { type: 'Cadastro administrativo' },
      drivers: clientDrivers,
      reservations: clientReservations,
      contracts: [],
      payments: clientPayments,
      rentals: [],
      fines: [],
      supportRequests: []
    });
  }

  try {
    const [clientRows] = await pool.query('SELECT * FROM clients WHERE id = ? LIMIT 1', [clientId]);
    if (!clientRows.length) return res.status(404).json({ error: 'Cliente não encontrado' });
    const client = clientRows[0];

    let interested = null;
    if (client.interested_id) {
      const [propRows] = await pool.query('SELECT * FROM proposals WHERE id = ? LIMIT 1', [client.interested_id]);
      if (propRows.length) interested = propRows[0];
    }

    const [drivers] = await pool.query('SELECT * FROM drivers WHERE client_id = ? OR LOWER(email) = LOWER(?)', [clientId, client.email]);
    const [reservations] = await pool.query('SELECT r.*, v.brand, v.name AS vehicle_name FROM reservations r LEFT JOIN vehicles v ON v.id = r.vehicle_id WHERE r.client_id = ? OR r.driver_id IN (SELECT id FROM drivers WHERE client_id = ? OR LOWER(email) = LOWER(?))', [clientId, clientId, client.email]);
    const [contracts] = await pool.query('SELECT c.*, v.brand, v.name AS vehicle_name FROM contracts c LEFT JOIN vehicles v ON v.id = c.vehicle_id WHERE c.client_id = ?', [clientId]);
    const [payments] = await pool.query('SELECT * FROM payments WHERE client_id = ? OR LOWER(driver_email) = LOWER(?)', [clientId, client.email]);
    const [rentals] = await pool.query('SELECT r.*, v.brand, v.name AS vehicle_name FROM rentals r LEFT JOIN vehicles v ON v.id = r.vehicle_id WHERE r.client_id = ?', [clientId]);
    const [fines] = await pool.query('SELECT f.*, v.name AS vehicle_name FROM fines f LEFT JOIN vehicles v ON v.id = f.vehicle_id WHERE f.vehicle_id IN (SELECT vehicle_id FROM rentals WHERE client_id = ?)', [clientId]);
    const [supportRequests] = await pool.query('SELECT * FROM support_requests WHERE driver_id IN (SELECT id FROM drivers WHERE client_id = ? OR LOWER(email) = LOWER(?))', [clientId, client.email]);

    return res.json({
      client: {
        id: client.id,
        type: client.type,
        name: client.name,
        document: client.document,
        email: client.email,
        phone: client.phone,
        city: client.city,
        state: client.state,
        interestedId: client.interested_id,
        origin: client.interested_id ? `Site (Interessado #${client.interested_id})` : 'Cadastro administrativo',
        status: client.status,
        createdAt: client.created_at
      },
      origin: interested ? { type: 'Site', interestedId: interested.id, interested } : { type: 'Cadastro administrativo' },
      drivers,
      reservations,
      contracts,
      payments,
      rentals,
      fines,
      supportRequests
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/clients', async (req, res) => {
  const { type, name, document, email, phone, city, state, status } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
  }

  const clientObj = {
    type: type || 'PF',
    name,
    document: document || '',
    email,
    phone: phone || '',
    city: city || 'São Paulo',
    state: state || 'SP',
    status: status || 'Ativo',
    createdAt: new Date().toLocaleDateString('pt-BR')
  };

  if (useFallback) {
    const nextId = fallbackClients.length > 0 ? Math.max(...fallbackClients.map(c => c.id)) + 1 : 1;
    clientObj.id = nextId;
    fallbackClients.unshift(clientObj);
    return res.status(201).json({ success: true, client: clientObj });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO clients (type, name, document, email, phone, city, state, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [clientObj.type, clientObj.name, clientObj.document, clientObj.email, clientObj.phone, clientObj.city, clientObj.state, clientObj.status]
    );
    clientObj.id = result.insertId;
    return res.status(201).json({ success: true, client: clientObj });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { status, name, email, phone } = req.body;

  if (useFallback) {
    const idx = fallbackClients.findIndex(c => c.id === id);
    if (idx !== -1) {
      fallbackClients[idx] = { ...fallbackClients[idx], ...(status && { status }), ...(name && { name }), ...(email && { email }), ...(phone && { phone }) };
      return res.json({ success: true });
    }
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  try {
    await pool.query('UPDATE clients SET status = ? WHERE id = ?', [status || 'Ativo', id]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (useFallback) {
    fallbackClients = fallbackClients.filter(c => c.id !== id);
    return res.json({ success: true });
  }
  try {
    await pool.query('DELETE FROM clients WHERE id = ?', [id]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DRIVER PUT & DELETE ENDPOINTS
app.put('/api/drivers/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (useFallback) {
    const idx = fallbackDrivers.findIndex(d => d.id === id);
    if (idx !== -1) {
      fallbackDrivers[idx].status = status;
      return res.json({ success: true });
    }
    return res.status(404).json({ error: 'Motorista não encontrado' });
  }

  try {
    await pool.query('UPDATE drivers SET status = ? WHERE id = ?', [status, id]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/drivers/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (useFallback) {
    fallbackDrivers = fallbackDrivers.filter(d => d.id !== id);
    return res.json({ success: true });
  }
  try {
    await pool.query('DELETE FROM drivers WHERE id = ?', [id]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/vehicles', async (req, res) => {
  if (useFallback) {
    return res.json(fallbackVehicles);
  }

  try {
    const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
    const vehicles = rows.map(normalizeVehicle);
    if (!Array.isArray(vehicles) || vehicles.length === 0) {
      return res.json(fallbackVehicles);
    }
    return res.json(vehicles);
  } catch (err) {
    console.warn('⚠️ Failed to load vehicle catalog from DB, falling back to in-memory:', err.message);
    useFallback = true;
    return res.json(fallbackVehicles);
  }
});

app.post('/api/vehicles', async (req, res) => {
  const { brand, year, name, category, priceWeekly, status, image, specs, features, approvedPlatforms } = req.body;
  if (!brand || !name || !category || !priceWeekly || !specs) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const featureList = Array.isArray(features) ? features : [];
  const platformList = Array.isArray(approvedPlatforms) && approvedPlatforms.length > 0 ? approvedPlatforms : ['Uber', '99'];

  if (useFallback) {
    const nextId = fallbackVehicles.length > 0 ? Math.max(...fallbackVehicles.map((v) => v.id)) + 1 : 1;
    const newVehicle = {
      id: nextId,
      brand,
      year: year || '2024',
      name,
      category,
      priceWeekly: Number(priceWeekly),
      status: status || 'Disponível',
      image: image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
      specs: {
        transm: specs.transm || 'Manual',
        seats: specs.seats || '5 lugares',
        fuel: specs.fuel || 'Flex',
        consumption: specs.consumption || '13,0 km/l'
      },
      features: featureList,
      approvedPlatforms: platformList
    };
    fallbackVehicles.unshift(newVehicle);
    return res.status(201).json(newVehicle);
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO vehicles (brand, year, name, category, price_weekly, status, image, transm, seats, fuel, consumption, features, approved_platforms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        brand,
        year || '2024',
        name,
        category,
        Number(priceWeekly),
        status || 'Disponível',
        image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
        specs.transm || 'Manual',
        specs.seats || '5 lugares',
        specs.fuel || 'Flex',
        specs.consumption || '13,0 km/l',
        JSON.stringify(featureList),
        JSON.stringify(platformList)
      ]
    );

    return res.status(201).json({
      id: result.insertId,
      brand,
      year: year || '2024',
      name,
      category,
      priceWeekly: Number(priceWeekly),
      status: status || 'Disponível',
      image: image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
      specs: {
        transm: specs.transm || 'Manual',
        seats: specs.seats || '5 lugares',
        fuel: specs.fuel || 'Flex',
        consumption: specs.consumption || '13,0 km/l'
      },
      features: featureList,
      approvedPlatforms: platformList
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/vehicles/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { brand, year, name, category, priceWeekly, status, image, specs, features, approvedPlatforms } = req.body;

  if (!id || !brand || !name || !category || !priceWeekly || !specs) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const featureList = Array.isArray(features) ? features : [];
  const platformList = Array.isArray(approvedPlatforms) && approvedPlatforms.length > 0 ? approvedPlatforms : ['Uber', '99'];

  if (useFallback) {
    const idx = fallbackVehicles.findIndex((vehicle) => vehicle.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Veículo não encontrado.' });
    }

    fallbackVehicles[idx] = {
      ...fallbackVehicles[idx],
      brand,
      year: year || fallbackVehicles[idx].year,
      name,
      category,
      priceWeekly: Number(priceWeekly),
      status: status || fallbackVehicles[idx].status,
      image: image || fallbackVehicles[idx].image,
      specs: {
        transm: specs.transm || fallbackVehicles[idx].specs?.transm || 'Manual',
        seats: specs.seats || fallbackVehicles[idx].specs?.seats || '5 lugares',
        fuel: specs.fuel || fallbackVehicles[idx].specs?.fuel || 'Flex',
        consumption: specs.consumption || fallbackVehicles[idx].specs?.consumption || '13,0 km/l'
      },
      features: featureList,
      approvedPlatforms: platformList
    };

    return res.json(fallbackVehicles[idx]);
  }

  try {
    await pool.query(
      `UPDATE vehicles
       SET brand = ?, year = ?, name = ?, category = ?, price_weekly = ?, status = ?, image = ?, transm = ?, seats = ?, fuel = ?, consumption = ?, features = ?, approved_platforms = ?
       WHERE id = ?`,
      [
        brand,
        year || '2024',
        name,
        category,
        Number(priceWeekly),
        status || 'Disponível',
        image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
        specs.transm || 'Manual',
        specs.seats || '5 lugares',
        specs.fuel || 'Flex',
        specs.consumption || '13,0 km/l',
        JSON.stringify(featureList),
        JSON.stringify(platformList),
        id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    return rows.length ? res.json(normalizeVehicle(rows[0])) : res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/vehicles/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'ID do veículo inválido.' });
  }

  if (useFallback) {
    fallbackVehicles = fallbackVehicles.filter((vehicle) => vehicle.id !== id);
    return res.json({ success: true });
  }

  try {
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/plans', async (req, res) => {
  if (useFallback) {
    return res.json(buildPlanCatalog());
  }

  try {
    await ensurePlanCatalogSeed();
    const [rows] = await pool.query('SELECT * FROM plans ORDER BY id ASC');
    const plans = rows.map(normalizePlan);
    if (!Array.isArray(plans) || plans.length === 0) {
      return res.json(buildPlanCatalog());
    }
    return res.json(plans);
  } catch (err) {
    console.warn('⚠️ Failed to load plan catalog from DB, falling back to default plans:', err.message);
    useFallback = true;
    return res.json(buildPlanCatalog());
  }
});



app.post(['/api/proposals', '/api/interessados'], async (req, res) => {
  const {
    fullName,
    name,
    phone,
    whatsapp,
    email,
    city,
    cnhCategory,
    vehicle_id,
    vehicleId,
    vehicleModel,
    vehicleBrand,
    vehicleYear,
    vehicleCategory,
    vehiclePriceWeekly,
    vehicleValue,
    priceWeekly,
    price,
    vehicle_image,
    vehicleImage,
    vehicleStatus,
    planType,
    appPlatform,
    contactTime,
    message
  } = req.body;

  const resolvedFullName = fullName || name;
  let resolvedVehicleId = Number(vehicle_id || vehicleId || 0) || null;

  if (!resolvedFullName || !phone || !email || !city) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes: nome, telefone, e-mail e cidade.' });
  }

  if (!resolvedVehicleId && vehicleModel) {
    const matched = fallbackVehicles.find(v => `${v.brand} ${v.name}`.toLowerCase() === String(vehicleModel).toLowerCase());
    if (matched) resolvedVehicleId = matched.id;
    else resolvedVehicleId = fallbackVehicles[0]?.id || 1;
  } else if (!resolvedVehicleId) {
    resolvedVehicleId = fallbackVehicles[0]?.id || 1;
  }

  const finalVehicleValue = Number(
    vehicleValue ??
    vehiclePriceWeekly ??
    priceWeekly ??
    price ??
    0
  );

  const finalPlanType = planType || 'Semanal';

  const proposalObj = {
    fullName: resolvedFullName,
    phone,
    whatsapp: whatsapp || phone,
    email,
    city,
    cnhCategory: cnhCategory || 'B',
    vehicleId: resolvedVehicleId,
    vehicleModel: vehicleModel || (fallbackVehicles.find(v => v.id === resolvedVehicleId) ? `${fallbackVehicles.find(v => v.id === resolvedVehicleId).brand} ${fallbackVehicles.find(v => v.id === resolvedVehicleId).name}` : 'CHEVROLET Onix Plus'),
    vehicleBrand: vehicleBrand || (vehicleModel || '').split(' ')[0] || 'CHEVROLET',
    vehicleYear: vehicleYear || '2024',
    vehicleCategory: vehicleCategory || 'Econômico',
    vehiclePriceWeekly: finalVehicleValue,
    vehicleImage: vehicleImage || vehicle_image || '',
    vehicleStatus: vehicleStatus || 'Disponível',
    vehicleValue: finalVehicleValue,
    planType: finalPlanType,
    appPlatform: appPlatform || 'Nenhuma',
    contactTime: contactTime || 'Qualquer Horário',
    message: message || '',
    status: 'Novo',
    createdAt: new Date()
  };

  if (useFallback) {
    const nextId = fallbackProposals.length > 0 ? Math.max(...fallbackProposals.map(p => p.id)) + 1 : 1;
    proposalObj.id = nextId;
    fallbackProposals.unshift(proposalObj);
    return res.status(201).json({ success: true, proposal: proposalObj });
  }

  try {
    let vehicle = null;
    try {
      const [vehicleRows] = await pool.query('SELECT id, brand, name, year, category, price_weekly, image, status FROM vehicles WHERE id = ? LIMIT 1', [resolvedVehicleId]);
      if (vehicleRows.length > 0) {
        vehicle = vehicleRows[0];
      }
    } catch (e) {
      console.warn('⚠ Could not query vehicles from DB, using fallback catalog:', e.message);
    }

    if (!vehicle) {
      vehicle = fallbackVehicles.find(v => v.id === resolvedVehicleId) || fallbackVehicles[0];
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO proposals (full_name, phone, whatsapp, email, city, cnh_category, vehicle_id, vehicle_model, vehicle_brand, vehicle_year, vehicle_category, vehicle_price_weekly, vehicle_image, vehicle_status, plan_type, app_platform, contact_time, message, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          resolvedFullName,
          phone,
          whatsapp || phone,
          email,
          city,
          cnhCategory || 'B',
          resolvedVehicleId,
          proposalObj.vehicleModel || `${vehicle.brand} ${vehicle.name}`,
          proposalObj.vehicleBrand || vehicle.brand,
          vehicleYear || vehicle.year || '2024',
          vehicleCategory || vehicle.category || 'Econômico',
          finalVehicleValue || Number(vehicle.price_weekly || vehicle.priceWeekly || 0),
          vehicleImage || vehicle.image || '',
          vehicleStatus || vehicle.status || 'Disponível',
          finalPlanType,
          appPlatform || 'Nenhuma',
          contactTime || 'Qualquer Horário',
          message || '',
          'Novo'
        ]
      );
      proposalObj.id = result.insertId;
    } catch (dbErr) {
      console.warn('⚠ Could not insert proposal to DB, storing in fallback:', dbErr.message);
      useFallback = true;
      const nextId = fallbackProposals.length > 0 ? Math.max(...fallbackProposals.map(p => p.id)) + 1 : 1;
      proposalObj.id = nextId;
      fallbackProposals.unshift(proposalObj);
    }

    proposalObj.vehicleId = resolvedVehicleId;
    return res.status(201).json({ success: true, proposal: proposalObj });
  } catch (err) {
    const nextId = fallbackProposals.length > 0 ? Math.max(...fallbackProposals.map(p => p.id)) + 1 : 1;
    proposalObj.id = nextId;
    fallbackProposals.unshift(proposalObj);
    return res.status(201).json({ success: true, proposal: proposalObj });
  }
});

app.get(['/api/proposals', '/api/interessados'], async (req, res) => {
  if (useFallback) {
    return res.json(fallbackProposals);
  }

  try {
    const [rows] = await pool.query(
      `SELECT p.*, v.brand AS related_vehicle_brand, v.name AS related_vehicle_name,
              v.year AS related_vehicle_year, v.category AS related_vehicle_category,
              v.price_weekly AS related_vehicle_price, v.image AS related_vehicle_image
       FROM proposals p
       LEFT JOIN vehicles v ON v.id = p.vehicle_id
       ORDER BY p.created_at DESC`
    );
    const formatted = rows.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      phone: row.phone,
      email: row.email,
      city: row.city,
      whatsapp: row.whatsapp || row.phone,
      cnhCategory: row.cnh_category,
      vehicleId: row.vehicle_id,
      vehicleModel: row.related_vehicle_name ? `${row.related_vehicle_brand} ${row.related_vehicle_name}` : row.vehicle_model,
      vehicleBrand: row.related_vehicle_brand || row.vehicle_brand || (row.vehicle_model || '').split(' ')[0],
      vehicleYear: row.related_vehicle_year || row.vehicle_year || '2024',
      vehicleCategory: row.related_vehicle_category || row.vehicle_category || 'Econômico',
      vehiclePriceWeekly: Number(row.related_vehicle_price ?? row.vehicle_price_weekly ?? 0),
      vehicleImage: row.related_vehicle_image || row.vehicle_image || '',
      vehicleStatus: row.vehicle_status || 'Disponível',
      vehicleValue: Number(row.vehicle_price_weekly ?? row.vehicleValue ?? 0),
      planType: row.plan_type,
      appPlatform: row.app_platform,
      contactTime: row.contact_time,
      message: row.message,
      status: ['Pendente', 'Em análise', 'Em analise'].includes(row.status) ? 'Novo' : (row.status || 'Novo'),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/interessados/:id', async (req, res) => {
  if (useFallback) {
    const proposal = fallbackProposals.find(p => p.id === Number(req.params.id));
    if (!proposal) return res.status(404).json({ error: 'Interessado não encontrado.' });
    return res.json(proposal);
  }

  try {
    const [rows] = await pool.query(
      `SELECT p.*, v.brand AS related_vehicle_brand, v.name AS related_vehicle_name,
              v.year AS related_vehicle_year, v.category AS related_vehicle_category,
              v.price_weekly AS related_vehicle_price, v.image AS related_vehicle_image
       FROM proposals p
       LEFT JOIN vehicles v ON v.id = p.vehicle_id
       WHERE p.id = ? LIMIT 1`,
      [Number(req.params.id)]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Interessado não encontrado.' });
    const row = rows[0];
    return res.json({
      id: row.id,
      fullName: row.full_name,
      phone: row.phone,
      whatsapp: row.whatsapp || row.phone,
      email: row.email,
      city: row.city,
      vehicleId: row.vehicle_id,
      vehicleModel: row.related_vehicle_name ? `${row.related_vehicle_brand} ${row.related_vehicle_name}` : row.vehicle_model,
      vehicleBrand: row.related_vehicle_brand || row.vehicle_brand,
      vehicleYear: row.related_vehicle_year || row.vehicle_year,
      vehicleCategory: row.related_vehicle_category || row.vehicle_category,
      vehiclePriceWeekly: Number(row.related_vehicle_price ?? row.vehicle_price_weekly ?? 0),
      vehicleImage: row.related_vehicle_image || row.vehicle_image || '',
      planType: row.plan_type,
      appPlatform: row.app_platform,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/interessados/:id/convert', async (req, res) => {
  req.body = { status: 'Convertido' };
  return updateProposalStatus(req, res);
});

app.patch('/api/interessados/:id', async (req, res) => {
  const allowedStatuses = ['Novo', 'Em contato', 'Convertido', 'Arquivado'];
  const status = String(req.body?.status || '').trim();
  if (!allowedStatuses.includes(status)) return res.status(400).json({ error: 'Status inválido.' });

  req.body = { status };
  return updateProposalStatus(req, res);
});

app.put('/api/proposals/:id', async (req, res) => {
  return updateProposalStatus(req, res);
});

async function updateProposalStatus(req, res) {
  const proposalId = Number(req.params.id);
  const { status } = req.body;
  const normalizedStatus = String(status || '').trim();

  if (!normalizedStatus) {
    return res.status(400).json({ error: 'Status ausente.' });
  }

  if (useFallback) {
    const proposal = fallbackProposals.find(p => p.id === proposalId);
    if (!proposal) {
      return res.status(404).json({ error: 'Proposta não encontrada.' });
    }
    proposal.status = normalizedStatus;

    if (['aprovado', 'convertido'].includes(normalizedStatus.toLowerCase())) {
      let client = fallbackClients.find(c => (c.email || '').toLowerCase() === (proposal.email || '').toLowerCase());
      if (client) {
        client.status = 'Ativo';
        client.interested_id = proposalId;
      } else {
        const cpfMatch = String(proposal.message || '').match(/CPF:\s*([^|]+)/i);
        const doc = cpfMatch ? cpfMatch[1].trim() : '';
        client = {
          id: Date.now(),
          type: 'PF',
          name: proposal.fullName || proposal.full_name || 'Cliente',
          document: doc,
          email: proposal.email || '',
          phone: proposal.phone || '',
          city: proposal.city || 'São Paulo',
          state: 'SP',
          interested_id: proposalId,
          interestedId: proposalId,
          status: 'Ativo',
          createdAt: new Date().toLocaleDateString('pt-BR')
        };
        fallbackClients.unshift(client);
      }
    }
    return res.json({ success: true, status: normalizedStatus });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query('UPDATE proposals SET status = ? WHERE id = ?', [normalizedStatus, proposalId]);
    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Proposta não encontrada.' });
    }

    if (['aprovado', 'convertido'].includes(normalizedStatus.toLowerCase())) {
      const [proposalRows] = await connection.query(
        `SELECT full_name, email, phone, city, message FROM proposals WHERE id = ? LIMIT 1`,
        [proposalId]
      );

      if (proposalRows.length > 0) {
        const proposal = proposalRows[0];
        const cpfMatch = String(proposal.message || '').match(/CPF:\s*([^|]+)/i);
        const doc = cpfMatch ? cpfMatch[1].trim() : '';

        const [existingClients] = await connection.query(
          'SELECT id FROM clients WHERE LOWER(email) = LOWER(?) LIMIT 1',
          [proposal.email || '']
        );

        if (existingClients.length > 0) {
          await connection.query(
            `UPDATE clients
             SET name = ?, phone = ?, city = ?, state = ?, status = 'Ativo', interested_id = ?
             WHERE id = ?`,
            [proposal.full_name || 'Cliente', proposal.phone || '', proposal.city || '', 'SP', proposalId, existingClients[0].id]
          );
        } else {
          await connection.query(
            `INSERT INTO clients (type, name, document, email, phone, city, state, status, interested_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'Ativo', ?)`,
            ['PF', proposal.full_name || 'Cliente', doc, proposal.email || '', proposal.phone || '', proposal.city || '', 'SP', proposalId]
          );
        }
      }
    }
    await connection.commit();
    return res.json({ success: true, status: normalizedStatus });
  } catch (err) {
    if (connection) await connection.rollback();
    return res.status(500).json({ error: err.message });
  } finally {
    connection?.release();
  }
}

app.post('/api/drivers/register', async (req, res) => {
  const payload = req.body || {};
  const required = ['fullName', 'cpf', 'email', 'phone', 'password', 'city', 'cnhCategory'];
  const missing = required.filter((field) => !payload[field]);

  if (missing.length > 0) {
    return res.status(400).json({ success: false, message: 'Dados obrigatórios ausentes: ' + missing.join(', ') });
  }

  const driver = {
    fullName: payload.fullName,
    email: payload.email,
    password: payload.password,
    cpf: payload.cpf,
    phone: payload.phone,
    birthDate: payload.birthDate || null,
    cnhCategory: payload.cnhCategory || 'B',
    cnhExpiry: payload.cnhExpiry || null,
    appPlatforms: Array.isArray(payload.appPlatforms) ? payload.appPlatforms : [],
    experienceMonths: Number(payload.experienceMonths || 0),
    city: payload.city || '',
    state: payload.state || '',
    cep: payload.cep || '',
    addressLine: payload.addressLine || '',
    addressNumber: payload.addressNumber || '',
    addressComplement: payload.addressComplement || '',
    neighborhood: payload.neighborhood || '',
    status: 'pendente'
  };

  if (useFallback) {
    const nextId = fallbackDrivers.length > 0 ? Math.max(...fallbackDrivers.map((d) => d.id)) + 1 : 1;
    fallbackDrivers.unshift({ id: nextId, ...driver, appPlatforms: driver.appPlatforms, role: 'Motorista' });
    return res.status(201).json({ success: true, driver: { id: nextId, ...driver } });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO drivers (
        full_name, email, password, cpf, phone, birth_date, cnh_category, cnh_expiry,
        app_platforms, experience_months, city, state, cep, address_line, address_number,
        address_complement, neighborhood, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        driver.fullName,
        driver.email,
        driver.password,
        driver.cpf,
        driver.phone,
        driver.birthDate,
        driver.cnhCategory,
        driver.cnhExpiry,
        JSON.stringify(driver.appPlatforms),
        driver.experienceMonths,
        driver.city,
        driver.state,
        driver.cep,
        driver.addressLine,
        driver.addressNumber,
        driver.addressComplement,
        driver.neighborhood,
        driver.status
      ]
    );

    const insertedId = result.insertId;

    if (Array.isArray(payload.documents)) {
      for (const doc of payload.documents) {
        await pool.query(
          'INSERT INTO driver_documents (driver_id, document_type, file_name, file_url, file_size, status) VALUES (?, ?, ?, ?, ?, ?)',
          [insertedId, doc.type || 'documento', doc.name || 'arquivo', doc.url || '', doc.size || 0, 'pendente']
        );
      }
    }

    return res.status(201).json({ success: true, driver: { id: insertedId, ...driver } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erro ao cadastrar motorista: ' + err.message });
  }
});

app.get('/api/drivers', async (req, res) => {
  if (useFallback) {
    return res.json(fallbackDrivers);
  }

  try {
    const [rows] = await pool.query('SELECT * FROM drivers ORDER BY id DESC');
    return res.json(rows.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      cpf: row.cpf,
      phone: row.phone,
      birthDate: row.birth_date,
      cnhCategory: row.cnh_category,
      city: row.city,
      state: row.state,
      status: row.status,
      appPlatforms: parseJsonArray(row.app_platforms)
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/reservations', async (req, res) => {
  const { driverId, vehicleId, planId, pickupDate, pickupTime, totalAmount } = req.body;

  if (!driverId || !vehicleId || !planId || !pickupDate) {
    return res.status(400).json({ error: 'Dados da reserva incompletos.' });
  }

  const reservation = {
    id: Date.now(),
    driverId,
    vehicleId,
    planId,
    pickupDate,
    pickupTime: pickupTime || '09:00',
    totalAmount: Number(totalAmount || 0),
    status: 'pendente',
    depositPaid: false,
    createdAt: new Date().toISOString()
  };

  if (useFallback) {
    fallbackReservations.unshift(reservation);
    return res.status(201).json({ success: true, reservation });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO reservations (driver_id, vehicle_id, plan_id, pickup_date, pickup_time, status, total_amount, deposit_paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [driverId, vehicleId, planId, pickupDate, pickupTime || '09:00', 'pendente', Number(totalAmount || 0), false]
    );

    reservation.id = result.insertId;
    return res.status(201).json({ success: true, reservation });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/reservations', async (req, res) => {
  if (useFallback) return res.json(fallbackReservations);

  try {
    const [rows] = await pool.query(`
      SELECT r.*, d.full_name AS driver_name, v.brand, v.name AS vehicle_name, p.name AS plan_name
      FROM reservations r
      JOIN drivers d ON d.id = r.driver_id
      JOIN vehicles v ON v.id = r.vehicle_id
      LEFT JOIN plans p ON p.id = r.plan_id
      ORDER BY r.created_at DESC
    `);
    return res.json(rows.map((row) => ({
      id: row.id,
      driverId: row.driver_id,
      vehicleId: row.vehicle_id,
      planId: row.plan_id,
      pickupDate: row.pickup_date,
      pickupTime: row.pickup_time,
      status: row.status,
      totalAmount: Number(row.total_amount),
      depositPaid: Boolean(row.deposit_paid),
      driver: row.driver_name,
      vehicle: `${row.brand} ${row.vehicle_name}`,
      plan: row.plan_name || 'Plano não informado',
      createdAt: row.created_at
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/payments', async (req, res) => {
  if (useFallback) return res.json(fallbackPayments);

  try {
    const [rows] = await pool.query(`
      SELECT pay.*, COALESCE(pay.driver_name, d.full_name, '') AS driver_name,
        COALESCE(pay.driver_phone, d.phone, '') AS driver_phone,
        COALESCE(pay.driver_email, d.email, '') AS driver_email,
        COALESCE(pay.contract_number, '') AS contract_number,
        v.brand, v.name AS vehicle_name
      FROM payments pay
      LEFT JOIN reservations r ON r.id = pay.reservation_id
      LEFT JOIN drivers d ON d.id = r.driver_id
      LEFT JOIN vehicles v ON v.id = r.vehicle_id
      ORDER BY pay.due_date DESC, pay.id DESC
    `);
    return res.json(rows.map((row) => ({
      id: row.id,
      reservationId: row.reservation_id,
      amount: Number(row.amount),
      dueDate: row.due_date,
      paidAt: row.paid_at,
      status: row.status,
      method: row.method,
      externalReference: row.external_reference,
      driver: row.driver_name,
      driverPhone: row.driver_phone || '',
      driverEmail: row.driver_email || '',
      contract: row.contract_number || (row.reservation_id ? `Reserva #${row.reservation_id}` : '—'),
      vehicle: `${row.brand} ${row.vehicle_name}`
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/maintenances', async (req, res) => {
  if (useFallback) return res.json([]);

  try {
    const [rows] = await pool.query(`
      SELECT m.*, v.brand, v.name AS vehicle_name
      FROM vehicle_maintenances m
      JOIN vehicles v ON v.id = m.vehicle_id
      ORDER BY m.due_date DESC, m.id DESC
    `);
    return res.json(rows.map((row) => ({
      id: row.id,
      vehicleId: row.vehicle_id,
      vehicleName: `${row.brand} ${row.vehicle_name}`,
      type: row.maintenance_type,
      service: row.service,
      date: row.due_date,
      status: row.status,
      notes: row.notes || ''
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/maintenances', async (req, res) => {
  let { vehicleId, type = 'Preventiva', service, date, status = 'Aberta', notes = '' } = req.body;
  if (!vehicleId && req.body.vehicleName) {
    const [vehicles] = await pool.query(`SELECT id FROM vehicles WHERE LOWER(CONCAT(brand, ' ', name)) = LOWER(?) LIMIT 1`, [String(req.body.vehicleName).trim()]);
    vehicleId = vehicles[0]?.id;
  }
  if (!vehicleId || !service || !date) {
    return res.status(400).json({ error: 'Veículo, serviço e data são obrigatórios.' });
  }

  if (useFallback) return res.status(201).json({ success: true });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      'INSERT INTO vehicle_maintenances (vehicle_id, maintenance_type, service, due_date, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [vehicleId, type, service, date, status, notes]
    );
    if (status !== 'Concluída' && status !== 'Cancelada') {
      await connection.query("UPDATE vehicles SET status = 'Em manutenção' WHERE id = ?", [vehicleId]);
    }
    await connection.commit();
    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    await connection.rollback();
    return res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

const adminResources = {
  rentals: { table: 'rentals', fields: ['client_id', 'driver_id', 'vehicle_id', 'plan', 'start_date', 'return_date', 'total_amount', 'status', 'notes'] },
  inspections: { table: 'inspections', fields: ['inspection_type', 'contract_id', 'client_name', 'driver_name', 'inspector', 'inspection_date', 'inspection_time', 'status'] },
  fines: { table: 'fines', fields: ['notice', 'vehicle_id', 'fine_date', 'fine_type', 'description', 'amount', 'due_date', 'status', 'notes'] },
  incidents: { table: 'incidents', fields: ['protocol', 'vehicle_id', 'driver_name', 'incident_date', 'incident_type', 'description', 'location', 'responsibility', 'total_cost', 'status', 'notes'] }
};

Object.entries(adminResources).forEach(([resource, { table, fields }]) => {
  app.get(`/api/admin/${resource}`, async (req, res) => {
    if (useFallback) return res.json([]);
    try {
      const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY created_at DESC, id DESC`);
      return res.json(rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.post(`/api/admin/${resource}`, async (req, res) => {
    if (useFallback) return res.status(201).json({ success: true });
    if ((resource === 'fines' || resource === 'incidents') && req.body.vehicleName) {
      const [vehicles] = await pool.query(`SELECT id FROM vehicles WHERE LOWER(CONCAT(brand, ' ', name)) = LOWER(?) LIMIT 1`, [String(req.body.vehicleName).trim()]);
      if (!vehicles.length) return res.status(400).json({ error: 'Veículo não encontrado. Digite o modelo exatamente como cadastrado.' });
      req.body.vehicle_id = vehicles[0].id;
    }
    const values = fields.map((field) => req.body[field] ?? null);
    try {
      const [result] = await pool.query(
        `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
        values
      );
      return res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
});

app.get('/api/contracts', async (req, res) => {
  if (useFallback) return res.json(fallbackContracts);
  try {
    const [rows] = await pool.query('SELECT * FROM contracts ORDER BY created_at DESC, id DESC');
    return res.json(rows.map((row) => ({
      id: row.id,
      number: row.contract_number,
      client: row.client_name || '',
      vehicle: row.vehicle_name || '',
      plan: row.plan || '',
      value: Number(row.total_amount || 0),
      deposit: Number(row.deposit_amount || 0),
      startDate: row.start_date,
      endDate: row.end_date,
      status: row.status,
      file: row.attachment_name || ''
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/contracts', async (req, res) => {
  const { number, client, vehicle, plan = '', value, deposit = 0, startDate, endDate, status = 'Em elaboração', fileName = '' } = req.body;
  if (!number?.trim() || !client?.trim() || !vehicle?.trim() || !startDate || !endDate || !Number.isFinite(Number(value))) {
    return res.status(400).json({ error: 'Número, cliente, veículo, valor e vigência são obrigatórios.' });
  }
  const contract = { id: Date.now(), number: number.trim(), client: client.trim(), vehicle: vehicle.trim(), plan, value: Number(value), deposit: Number(deposit) || 0, startDate, endDate, status, file: fileName };
  if (useFallback) {
    fallbackContracts.unshift(contract);
    return res.status(201).json({ success: true, contract });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO contracts (contract_number, client_name, vehicle_name, plan, total_amount, deposit_amount, start_date, end_date, status, attachment_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [contract.number, contract.client, contract.vehicle, plan, contract.value, contract.deposit, startDate, endDate, status, fileName]
    );
    return res.status(201).json({ success: true, contract: { ...contract, id: result.insertId } });
  } catch (err) {
    return res.status(err.code === 'ER_DUP_ENTRY' ? 409 : 500).json({ error: err.code === 'ER_DUP_ENTRY' ? 'Já existe um contrato com esse número.' : err.message });
  }
});

app.delete('/api/contracts/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Contrato inválido.' });
  if (useFallback) {
    const before = fallbackContracts.length;
    fallbackContracts = fallbackContracts.filter((contract) => contract.id !== id);
    return res.status(before === fallbackContracts.length ? 404 : 204).end();
  }
  try {
    const [result] = await pool.query('DELETE FROM contracts WHERE id = ?', [id]);
    return res.status(result.affectedRows ? 204 : 404).end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const isPaymentCategory = (category) => String(category || '').trim().toLocaleLowerCase('pt-BR') === 'pagamento';
const isPaidStatus = (status) => ['pago', 'paga', 'paid'].includes(String(status || '').trim().toLocaleLowerCase('pt-BR'));

app.get('/api/admin/cashEntries', async (req, res) => {
  if (useFallback) return res.json(fallbackCashEntries);
  try {
    await syncPaymentsToCashEntries();
    const [rows] = await pool.query('SELECT * FROM cash_entries ORDER BY entry_date DESC, id DESC');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/cashEntries', async (req, res) => {
  const { entry_type, entry_date, description, category = '', amount, status = 'Pendente', notes = '', driver = '', contract = '', method = 'Pix' } = req.body;
  const numericAmount = Number(amount);
  const paymentEntry = entry_type === 'Entrada' && isPaymentCategory(category);

  if (!entry_type || !entry_date || !description || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Tipo, data, descrição e valor maior que zero são obrigatórios.' });
  }
  if (paymentEntry && !driver.trim()) {
    return res.status(400).json({ error: 'Informe o motorista para registrar uma movimentação de pagamento.' });
  }

  if (useFallback) {
    const payment = paymentEntry ? {
      id: Date.now(), driver, contract, amount: numericAmount, dueDate: entry_date,
      paidAt: isPaidStatus(status) ? new Date(`${entry_date}T12:00:00`).toISOString() : null,
      status, method, externalReference: ''
    } : null;
    if (payment) fallbackPayments.unshift(payment);
    const cashEntry = { id: Date.now() + (payment ? 1 : 0), payment_id: payment?.id || null, entry_type, entry_date, description, category, amount: numericAmount, status, notes };
    fallbackCashEntries.unshift(cashEntry);
    return res.status(201).json({ success: true, cashEntry, payment });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    let paymentId = null;
    if (paymentEntry) {
      const [paymentResult] = await connection.query(
        'INSERT INTO payments (driver_name, contract_number, amount, due_date, paid_at, status, method) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [driver.trim(), contract.trim(), numericAmount, entry_date, isPaidStatus(status) ? new Date(`${entry_date}T12:00:00`) : null, status, method]
      );
      paymentId = paymentResult.insertId;
    }
    const [cashResult] = await connection.query(
      'INSERT INTO cash_entries (payment_id, entry_type, entry_date, description, category, amount, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [paymentId, entry_type, entry_date, description.trim(), category, numericAmount, status, notes]
    );
    await connection.commit();
    return res.status(201).json({ success: true, id: cashResult.insertId, paymentId });
  } catch (err) {
    await connection.rollback();
    return res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

app.post('/api/payments', async (req, res) => {
  const { reservationId, driver = '', phone = '', email = '', contract = '', amount, dueDate, status = 'Pago', method = 'Pix', externalReference = '' } = req.body;
  const paid = ['pago', 'paga', 'paid'].includes(String(status).toLowerCase());
  if ((!reservationId && !driver) || !Number(amount) || !dueDate) {
    return res.status(400).json({ error: 'Motorista ou reserva, valor e data são obrigatórios.' });
  }

  if (useFallback) {
    const payment = { id: Date.now(), reservationId: reservationId ? Number(reservationId) : null, driver, driverPhone: phone, driverEmail: email, contract, amount: Number(amount), dueDate, paidAt: paid ? new Date().toISOString() : null, status, method, externalReference };
    fallbackPayments.unshift(payment);
    fallbackCashEntries.unshift({ id: Date.now() + 1, payment_id: payment.id, entry_type: 'Entrada', entry_date: dueDate, description: `Pagamento recebido - ${driver}${contract ? ` (${contract})` : ''}`, category: 'Pagamento', amount: Number(amount), status: paid ? 'Pago' : status, notes: `Forma de pagamento: ${method}` });
    return res.status(201).json({ success: true, payment });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const reservations = reservationId ? (await connection.query('SELECT vehicle_id FROM reservations WHERE id = ? FOR UPDATE', [reservationId]))[0] : [];
    if (reservationId && !reservations.length) throw new Error('Reserva não encontrada.');
    const [result] = await connection.query(
      'INSERT INTO payments (reservation_id, driver_name, driver_phone, driver_email, contract_number, amount, due_date, paid_at, status, method, external_reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [reservationId || null, driver, phone, email, contract, Number(amount), dueDate, paid ? new Date() : null, status, method, externalReference]
    );
    await connection.query(
      'INSERT INTO cash_entries (payment_id, entry_type, entry_date, description, category, amount, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [result.insertId, 'Entrada', dueDate, `Pagamento recebido - ${driver}${contract ? ` (${contract})` : ''}`, 'Pagamento', Number(amount), paid ? 'Pago' : status, `Forma de pagamento: ${method}`]
    );
    if (paid && reservationId) {
      await connection.query("UPDATE reservations SET status = 'Confirmada', deposit_paid = TRUE WHERE id = ?", [reservationId]);
      await connection.query("UPDATE vehicles SET status = 'Alugado' WHERE id = ?", [reservations[0].vehicle_id]);
    }
    await connection.commit();
    return res.status(201).json({ success: true, payment: { id: result.insertId, reservationId: reservationId ? Number(reservationId) : null, driver, phone, email, contract, amount: Number(amount), dueDate, status, method, externalReference } });
  } catch (err) {
    await connection.rollback();
    return res.status(err.message === 'Reserva não encontrada.' ? 404 : 500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

app.get('/api/collections', async (req, res) => {
  if (useFallback) return res.json([]);
  try {
    const [rows] = await pool.query('SELECT * FROM collection_charges ORDER BY due_date DESC, id DESC');
    return res.json(rows.map((row) => ({
      id: row.id,
      driver: row.driver_name,
      type: row.charge_type,
      dueDate: row.due_date,
      value: Number(row.amount),
      description: row.description || '',
      status: row.status,
      fileName: row.attachment_name || '',
      fileData: row.attachment_data || ''
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/collections', async (req, res) => {
  const { driver, type, dueDate, value, description = '', status = 'Pendente', fileName = '', fileData = '' } = req.body;
  if (!driver || !type || !dueDate || !Number(value)) {
    return res.status(400).json({ error: 'Motorista, tipo, vencimento e valor são obrigatórios.' });
  }
  if (useFallback) return res.status(201).json({ success: true, collection: { id: Date.now(), driver, type, dueDate, value: Number(value), description, status, fileName, fileData } });
  try {
    const [result] = await pool.query(
      'INSERT INTO collection_charges (driver_name, charge_type, due_date, amount, description, status, attachment_name, attachment_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [driver, type, dueDate, Number(value), description, status, fileName, fileData]
    );
    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.patch('/api/collections/:id', async (req, res) => {
  const { status, fileName, fileData } = req.body;
  if (!status && !fileName) return res.status(400).json({ error: 'Nenhuma alteração informada.' });
  if (useFallback) return res.json({ success: true });
  try {
    await pool.query(
      'UPDATE collection_charges SET status = COALESCE(?, status), attachment_name = COALESCE(?, attachment_name), attachment_data = COALESCE(?, attachment_data) WHERE id = ?',
      [status || null, fileName || null, fileData || null, Number(req.params.id)]
    );
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/support', async (req, res) => {
  const {
    driverId,
    driverName,
    vehicleId,
    vehicleName,
    plate,
    requestType,
    description,
    location,
    latitude,
    longitude,
    protocol,
    priority,
    status,
    responsible,
    notes
  } = req.body;

  if (!driverName || !requestType || !description) {
    return res.status(400).json({ error: 'Dados do suporte incompletos.' });
  }

  const support = {
    id: Date.now(),
    driverId: driverId || null,
    driverName,
    vehicleId: vehicleId || null,
    vehicleName: vehicleName || 'Veículo não informado',
    plate: plate || '',
    requestType,
    description,
    location: location || '',
    latitude: latitude || '',
    longitude: longitude || '',
    protocol: protocol || `SUP-${String(Date.now()).slice(-4)}`,
    priority: priority || 'Média',
    status: status || 'Aberto',
    responsible: responsible || '',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  if (useFallback) {
    fallbackSupport.unshift(support);
    return res.status(201).json({ success: true, support });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO support_requests (driver_id, driver_name, vehicle_id, vehicle_name, plate, request_type, description, location, latitude, longitude, protocol, priority, status, responsible, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [support.driverId, support.driverName, support.vehicleId, support.vehicleName, support.plate, support.requestType, support.description, support.location, support.latitude, support.longitude, support.protocol, support.priority, support.status, support.responsible, support.notes]
    );
    support.id = result.insertId;
    return res.status(201).json({ success: true, support });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/support', async (req, res) => {
  if (useFallback) return res.json(fallbackSupport);

  try {
    const [rows] = await pool.query('SELECT * FROM support_requests ORDER BY created_at DESC');
    return res.json(rows.map((row) => normalizeSupportRequest(row)));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.patch('/api/support/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { status, priority, notes, responsible, description, location, requestType } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID do suporte inválido.' });
  }

  if (useFallback) {
    const index = fallbackSupport.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Solicitação não encontrada.' });
    }
    fallbackSupport[index] = {
      ...fallbackSupport[index],
      ...(status && { status }),
      ...(priority && { priority }),
      ...(notes && { notes }),
      ...(responsible && { responsible }),
      ...(description && { description }),
      ...(location && { location }),
      ...(requestType && { requestType })
    };

    if (status === 'Em manutenção' && fallbackSupport[index].vehicleId) {
      fallbackVehicles = fallbackVehicles.map((vehicle) => vehicle.id === fallbackSupport[index].vehicleId ? { ...vehicle, status: 'Em manutenção' } : vehicle);
    }
    if (status === 'Pronto' && fallbackSupport[index].vehicleId) {
      fallbackVehicles = fallbackVehicles.map((vehicle) => vehicle.id === fallbackSupport[index].vehicleId ? { ...vehicle, status: 'Disponível' } : vehicle);
    }

    return res.json({ success: true, support: fallbackSupport[index] });
  }

  try {
    const fields = [];
    const values = [];

    if (status) { fields.push('status = ?'); values.push(status); }
    if (priority) { fields.push('priority = ?'); values.push(priority); }
    if (notes !== undefined) { fields.push('notes = ?'); values.push(notes); }
    if (responsible !== undefined) { fields.push('responsible = ?'); values.push(responsible); }
    if (description) { fields.push('description = ?'); values.push(description); }
    if (location) { fields.push('location = ?'); values.push(location); }
    if (requestType) { fields.push('request_type = ?'); values.push(requestType); }
    values.push(id);

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Nenhuma alteração informada.' });
    }

    await pool.query(`UPDATE support_requests SET ${fields.join(', ')} WHERE id = ?`, values);

    if (status === 'Em manutenção') {
      const [supportRows] = await pool.query('SELECT vehicle_id, vehicle_name, request_type, description FROM support_requests WHERE id = ? LIMIT 1', [id]);
      const supportRow = supportRows[0];
      if (supportRow?.vehicle_id) {
        await pool.query("UPDATE vehicles SET status = 'Em manutenção' WHERE id = ?", [supportRow.vehicle_id]);
        await pool.query(
          'INSERT INTO vehicle_maintenances (vehicle_id, maintenance_type, service, due_date, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
          [supportRow.vehicle_id, 'Suporte', supportRow.request_type || supportRow.description || 'Manutenção por suporte', new Date().toISOString().slice(0, 10), 'Aberta', supportRow.description || 'Solicitação de suporte convertida para manutenção.']
        );
      }
    }

    if (status === 'Pronto') {
      const [supportRows] = await pool.query('SELECT vehicle_id FROM support_requests WHERE id = ? LIMIT 1', [id]);
      if (supportRows[0]?.vehicle_id) {
        await pool.query("UPDATE vehicles SET status = 'Disponível' WHERE id = ?", [supportRows[0].vehicle_id]);
      }
    }

    const [updatedRows] = await pool.query('SELECT * FROM support_requests WHERE id = ? LIMIT 1', [id]);
    return res.json({ success: true, support: updatedRows[0] ? normalizeSupportRequest(updatedRows[0]) : { id } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/notifications', async (req, res) => {
  const driverId = Number(req.query.driverId || 1);

  if (useFallback) {
    return res.json(fallbackNotifications.filter((n) => n.driverId === driverId));
  }

  try {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE driver_id = ? ORDER BY created_at DESC', [driverId]);
    return res.json(rows.map((row) => ({
      id: row.id,
      driverId: row.driver_id,
      type: row.type,
      title: row.title,
      message: row.message,
      isRead: Boolean(row.is_read),
      createdAt: row.created_at
    })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/overview', async (req, res) => {
  const summary = {
    activeDrivers: 0,
    totalVehicles: 0,
    rentedVehicles: 0,
    availableVehicles: 0,
    maintenanceVehicles: 0,
    reservedVehicles: 0,
    monthlyRevenue: 0,
    openSupport: 0,
    pendingApprovals: 0
  };

  if (useFallback) {
    summary.activeDrivers = fallbackDrivers.length;
    summary.totalVehicles = fallbackVehicles.length;
    summary.rentedVehicles = fallbackVehicles.filter((v) => v.status === 'Alugado').length;
    summary.availableVehicles = fallbackVehicles.filter((v) => v.status === 'Disponível').length;
    summary.maintenanceVehicles = fallbackVehicles.filter((v) => v.status === 'Em manutenção').length;
    summary.reservedVehicles = fallbackVehicles.filter((v) => v.status === 'Reservado').length;
    summary.monthlyRevenue = fallbackReservations.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
    summary.openSupport = fallbackSupport.filter((item) => item.status === 'aberto').length;
    summary.pendingApprovals = fallbackDrivers.filter((d) => d.status === 'pendente').length;
    return res.json(summary);
  }

  try {
    const [driverRows] = await pool.query("SELECT COUNT(*) AS total FROM drivers WHERE LOWER(status) = 'aprovado'");
    const [vehicleRows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COALESCE(SUM(status = 'Alugado'), 0) AS rented,
        COALESCE(SUM(status = 'Disponível'), 0) AS available,
        COALESCE(SUM(status = 'Em manutenção'), 0) AS maintenance,
        COALESCE(SUM(status = 'Reservado'), 0) AS reserved
      FROM vehicles
    `);
    const [supportRows] = await pool.query("SELECT COUNT(*) AS total FROM support_requests WHERE status = 'aberto'");
    const [proposalRows] = await pool.query("SELECT COUNT(*) AS total FROM proposals WHERE LOWER(status) IN ('pendente', 'novo')");
    const [paymentRows] = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*) AS count
      FROM payments
      WHERE LOWER(status) IN ('pago', 'paga', 'paid')
        AND paid_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND paid_at < DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
    `);

    summary.activeDrivers = Number(driverRows[0]?.total || 0);
    summary.totalVehicles = Number(vehicleRows[0]?.total || 0);
    summary.rentedVehicles = Number(vehicleRows[0]?.rented || 0);
    summary.availableVehicles = Number(vehicleRows[0]?.available || 0);
    summary.maintenanceVehicles = Number(vehicleRows[0]?.maintenance || 0);
    summary.reservedVehicles = Number(vehicleRows[0]?.reserved || 0);
    summary.openSupport = Number(supportRows[0]?.total || 0);
    summary.pendingApprovals = Number(proposalRows[0]?.total || 0);
    summary.monthlyRevenue = Number(paymentRows[0]?.total || 0);
    summary.paidPayments = Number(paymentRows[0]?.count || 0);
    return res.json(summary);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`ðŸš€ Express server running on port ${port}`);
    console.log(`ðŸ‘‰ API base path is http://localhost:${port}/api`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`⚠ï¸  Port ${port} is already in use. Trying port ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });
}

startServer(Number(process.env.PORT || 3001));
