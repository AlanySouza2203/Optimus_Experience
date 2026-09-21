

CREATE DATABASE IF NOT EXISTS optimus_db;
USE optimus_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  cargo VARCHAR(100) DEFAULT 'Atendente',
  role VARCHAR(50) NOT NULL DEFAULT 'Atendente',
  status VARCHAR(30) NOT NULL DEFAULT 'Ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(10) NOT NULL DEFAULT 'PF',
  name VARCHAR(120) NOT NULL,
  document VARCHAR(30) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  city VARCHAR(80) DEFAULT '',
  state VARCHAR(10) DEFAULT '',
  interested_id INT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drivers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NULL,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS driver_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id INT NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  file_name VARCHAR(180) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles (
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
);

CREATE TABLE IF NOT EXISTS plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  price_weekly DECIMAL(10, 2) NOT NULL,
  price_fortnightly DECIMAL(10, 2) NOT NULL DEFAULT 0,
  price_monthly DECIMAL(10, 2) NOT NULL,
  description TEXT,
  benefits JSON,
  popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NULL,
  driver_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  plan_id INT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time VARCHAR(20) DEFAULT '09:00',
  status VARCHAR(30) NOT NULL DEFAULT 'pendente',
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  deposit_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS support_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id INT NULL,
  driver_name VARCHAR(120) NOT NULL,
  request_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  latitude VARCHAR(40) DEFAULT '',
  longitude VARCHAR(40) DEFAULT '',
  status VARCHAR(30) NOT NULL DEFAULT 'aberto',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id INT NOT NULL,
  type VARCHAR(40) NOT NULL,
  title VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS proposals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50) DEFAULT '',
  email VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  cnh_category VARCHAR(10) DEFAULT 'B',
  vehicle_id INT NULL,
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
  status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_maintenances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  maintenance_type VARCHAR(50) DEFAULT 'Preventiva',
  service VARCHAR(120) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Aberta',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

-- Dados operacionais do painel administrativo
CREATE TABLE IF NOT EXISTS rentals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NULL,
  driver_id INT NULL,
  vehicle_id INT NOT NULL,
  plan VARCHAR(50) DEFAULT '',
  start_date DATE NOT NULL,
  return_date DATE NULL,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'Ativa',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_number VARCHAR(50) NOT NULL UNIQUE,
  client_id INT NULL,
  driver_id INT NULL,
  vehicle_id INT NULL,
  client_name VARCHAR(120) DEFAULT '',
  vehicle_name VARCHAR(160) DEFAULT '',
  attachment_name VARCHAR(180) DEFAULT '',
  plan VARCHAR(50) DEFAULT '',
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  deposit_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  start_date DATE NULL,
  end_date DATE NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Em elaboração',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NULL,
  contract_id INT NULL,
  reservation_id INT NULL,
  driver_name VARCHAR(120) DEFAULT '',
  driver_phone VARCHAR(40) DEFAULT '',
  driver_email VARCHAR(120) DEFAULT '',
  contract_number VARCHAR(80) DEFAULT '',
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  paid_at DATETIME NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pendente',
  method VARCHAR(40) NOT NULL DEFAULT 'pix',
  external_reference VARCHAR(120) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE SET NULL,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inspections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inspection_type VARCHAR(30) NOT NULL,
  contract_id INT NULL,
  client_name VARCHAR(120) DEFAULT '',
  driver_name VARCHAR(120) DEFAULT '',
  inspector VARCHAR(120) DEFAULT '',
  inspection_date DATE NOT NULL,
  inspection_time VARCHAR(10) DEFAULT '',
  status VARCHAR(30) NOT NULL DEFAULT 'Agendada',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cash_entries (
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
);

CREATE TABLE IF NOT EXISTS collection_charges (
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
);

CREATE TABLE IF NOT EXISTS fines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  notice VARCHAR(100) DEFAULT '',
  vehicle_id INT NULL,
  fine_date DATE NULL,
  fine_type VARCHAR(100) DEFAULT '',
  description TEXT,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  due_date DATE NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  protocol VARCHAR(50) NOT NULL UNIQUE,
  vehicle_id INT NULL,
  driver_name VARCHAR(120) DEFAULT '',
  incident_date DATE NOT NULL,
  incident_type VARCHAR(80) DEFAULT '',
  description TEXT,
  location VARCHAR(255) DEFAULT '',
  responsibility VARCHAR(80) DEFAULT '',
  total_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'Aberto',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

-- Seed Data: System Users (Funcionários)
INSERT INTO users (name, email, password, cargo, role, status, created_at) VALUES
('Carlos Alberto Silva', 'carlos@drivefleet.com.br', 'admin123', 'Diretor Operacional', 'Administrador', 'Ativo', '2024-01-09 10:00:00'),
('Fernanda Oliveira Costa', 'fernanda@drivefleet.com.br', 'gestor123', 'Gestora de Frota', 'Gestor', 'Ativo', '2024-02-14 11:30:00'),
('Ricardo Mendes Souza', 'ricardo@drivefleet.com.br', 'atendente123', 'Atendente', 'Atendente', 'Ativo', '2024-02-29 14:15:00'),
('Priscila Torres Lima', 'priscila@drivefleet.com.br', 'vistoriador123', 'Vistoriadora', 'Vistoriador', 'Ativo', '2024-03-19 09:45:00'),
('Marcos Vinícius Alves', 'marcos@drivefleet.com.br', 'atendente123', 'Atendente', 'Atendente', 'Inativo', '2024-04-04 16:20:00'),
('Juliana Ramos Ferreira', 'juliana@drivefleet.com.br', 'gestor123', 'Gestora Financeira', 'Gestor', 'Bloqueado', '2024-04-17 13:10:00'),
('Carlos Alberto', 'admin@optimusexperience.com.br', 'admin123', 'Diretor Operacional', 'Administrador', 'Ativo', '2024-01-09 10:00:00')
ON DUPLICATE KEY UPDATE name=VALUES(name), cargo=VALUES(cargo), role=VALUES(role), status=VALUES(status);

-- Seed Data: Motoristas
INSERT INTO drivers (full_name, email, password, cpf, phone, birth_date, cnh_category, cnh_expiry, app_platforms, experience_months, city, state, status, created_at) VALUES
('Alessandro Rodrigues', 'alessandro@email.com', 'driver123', '111.222.333-01', '(11) 98001-0001', '1990-05-10', 'B', '2026-08-14', '["Uber", "99"]', 24, 'São Paulo', 'SP', 'Aprovado', '2024-01-15 10:00:00'),
('Bruno Pereira Santos', 'bruno@email.com', 'driver123', '222.333.444-02', '(11) 98002-0002', '1988-11-20', 'B', '2025-11-29', '["Uber"]', 36, 'Guarulhos', 'SP', 'Aprovado', '2024-02-10 11:30:00'),
('Claudia Nascimento', 'claudia@email.com', 'driver123', '333.444.555-03', '(11) 98003-0003', '1992-03-15', 'B', '2027-03-09', '["inDrive", "99"]', 12, 'Santo André', 'SP', 'Em análise', '2024-03-05 14:20:00'),
('Diego Carvalho Lima', 'diego@email.com', 'driver123', '444.555.666-04', '(11) 98004-0004', '1994-07-22', 'B', '2025-06-21', '["Uber", "inDrive"]', 18, 'São Paulo', 'SP', 'Aprovado', '2024-04-12 09:10:00'),
('Elaine Souza Ribeiro', 'elaine@email.com', 'driver123', '555.666.777-05', '(11) 98005-0005', '1985-09-18', 'B', '2024-11-30', '["99"]', 48, 'Osasco', 'SP', 'Bloqueado', '2024-05-01 16:50:00'),
('Fábio Monteiro Costa', 'fabio@email.com', 'driver123', '666.777.888-06', '(11) 98006-0006', '1991-01-30', 'B', '2026-09-13', '["Uber"]', 30, 'São Bernardo', 'SP', 'Aprovado', '2024-05-20 13:40:00'),
('Gabriela Torres Melo', 'gabriela@email.com', 'driver123', '777.888.999-07', '(11) 98007-0007', '1996-12-05', 'B', '2026-04-19', '["Uber", "99", "inDrive"]', 15, 'São Paulo', 'SP', 'Aprovado', '2024-06-11 10:15:00'),
('Motorista Demo', 'driver@optimusexperience.com.br', 'driver123', '12345678909', '(11) 98888-1234', '1995-02-15', 'B', '2035-06-15', '["Uber", "99"]', 24, 'São Paulo', 'SP', 'Aprovado', '2024-01-01 08:00:00')
ON DUPLICATE KEY UPDATE email=VALUES(email);

INSERT INTO vehicles (
    brand,
    year,
    name,
    category,
    price_weekly,
    status,
    image,
    transm,
    seats,
    fuel,
    consumption,
    features,
    approved_platforms
) VALUES

(
    'CHEVROLET',
    2023,
    'Onix Plus',
    'Econômico',
    799.00,
    'Disponível',
    'https://cdn.motor1.com/images/mgl/xqowy2/s1/chevrolet-onix-plus-premier-2023-vs.-hyundai-hb20s-platinum-plus-2023.jpg',
    'Manual',
    '5 lugares',
    'Flex',
    '14,5 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'CHEVROLET',
    2024,
    'Onix',
    'Econômico',
    749.00,
    'Disponível',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOUbjgj9XnoYT3t04NC-dlG4GFQuyu3y7dY83-PoQEA&s=10',
    'Manual',
    '5 lugares',
    'Flex',
    '14,3 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'FIAT',
    2024,
    'Argo Drive',
    'Econômico',
    729.00,
    'Disponível',
    'https://http2.mlstatic.com/D_NQ_NP_913494-MLA74910398809_032024-F.jpg',
    'Manual',
    '5 lugares',
    'Flex',
    '14,0 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'VOLKSWAGEN',
    2024,
    'Polo Track',
    'Econômico',
    499.00,
    'Disponível',
    'https://static.kbb.com.br/Uploads/ResearchTools/News/4426/582a0483-eef4-4116-8ef6-8f663b7fe1b2_1365x1024.jpg',
    'Manual',
    '5 lugares',
    'Flex',
    '13,8 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'HYUNDAI',
    2024,
    'HB20',
    'Econômico',
    749.00,
    'Disponível',
    'https://garagem360.com.br/wp-content/uploads/2023/12/hyundai-hb20-platinum-safety-2024-3.jpg',
    'Manual',
    '5 lugares',
    'Flex',
    '14,2 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'FIAT',
    2024,
    'Cronos Drive',
    'Sedan',
    829.00,
    'Disponível',
    'https://quatrorodas.abril.com.br/wp-content/uploads/2023/08/FiatCronosPrecisionMY24__044-e1693320105233.jpg?quality=70&strip=info&resize=1080,565&crop=1',
    'Manual',
    '5 lugares',
    'Flex',
    '13,5 km/l',
    '["Porta-malas amplo", "Ar-condicionado", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'HYUNDAI',
    2024,
    'HB20S',
    'Sedan',
    829.00,
    'Disponível',
    'https://image1.mobiauto.com.br/images/api/images/v1.0/256174833/transform/fl_progressive,f_webp,q_80',
    'Manual',
    '5 lugares',
    'Flex',
    '13,8 km/l',
    '["Porta-malas amplo", "Ar-condicionado", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'VOLKSWAGEN',
    2024,
    'Virtus (Automático)',
    'Sedan',
    850.00,
    'Disponível',
    'https://garagem360.com.br/wp-content/uploads/2023/11/vw-virtus-highline-2024-2.jpg',
    'Automático',
    '5 lugares',
    'Flex',
    '12,8 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'VOLKSWAGEN',
    2024,
    'Virtus (Manual)',
    'Sedan',
    899.00,
    'Disponível',
    'https://garagem360.com.br/wp-content/uploads/2023/11/vw-virtus-highline-2024-2.jpg',
    'Manual',
    '5 lugares',
    'Flex',
    '12,8 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'RENAULT',
    2024,
    'Kwid E-Tech',
    'Hatch',
    599.00,
    'Disponível',
    'https://www.webmotors.com.br/imagens/prod/379822/RENAULT_KWID_ETECH_27_KW_ELETRICO_37982214035105449.webp',
    'Automático',
    '5 lugares',
    'Elétrico',
    '7,5 km/kWh',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "inDrive"]'
),

(
    'RENAULT',
    2024,
    'Logan',
    'Sedan',
    519.00,
    'Disponível',
    'https://cdn.wheel-size.com/automobile/body/renault-logan-2019-2026-1770176449.4616737.jpg',
    'Manual',
    '5 lugares',
    'Flex',
    '13,5 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'NISSAN',
    2024,
    'Kicks',
    'SUV',
    849.00,
    'Disponível',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_D-tS9gA6pmCWVOQKKpi_LoaJEPxUD-yxsz-TS81Ig&s=10',
    'Automático CVT',
    '5 lugares',
    'Flex',
    '14,2 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
),

(
    'TOYOTA',
    2024,
    'Yaris Hatch',
    'Hatch',
    765.00,
    'Disponível',
    'https://www.toyotacomunica.com.br/wp-content/uploads/2023/09/19_COROLLA-2024_XEI_2.png',
    'Automático CVT',
    '5 lugares',
    'Flex',
    '13,0 km/l',
    '["Ar-condicionado", "Direção elétrica", "Central multimídia"]',
    '["Uber", "99", "inDrive"]'
);
INSERT INTO plans (name, price_weekly, price_monthly, description, benefits, popular) VALUES
('Básico', 350.00, 1350.00, 'Plano essencial para quem quer começar a rodar com flexibilidade.', '["Manutenção programada", "Assistência 24h", "Proteção básica"]', FALSE),
('Intermediário', 450.00, 1700.00, 'Para motoristas que exigem mais suporte e proteção.', '["Manutenção programada", "Proteção completa", "Assistência 24h", "Km inclusa"]', TRUE),
('Completo', 550.00, 2100.00, 'Cobertura premium com suporte total e troca de óleo inclusa.', '["Manutenção programada", "Proteção completa", "Assistência 24h", "Km inclusa", "Carro reserva"]', FALSE)
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO notifications (driver_id, type, title, message, is_read) VALUES
((SELECT id FROM drivers WHERE email = 'driver@optimusexperience.com.br'), 'reserva', 'Reserva confirmada', 'Seu veículo foi reservado com sucesso. Confira os próximos passos.', FALSE),
((SELECT id FROM drivers WHERE email = 'driver@optimusexperience.com.br'), 'pagamento', 'Lembrete de pagamento', 'Sua parcela vence em 3 dias.', FALSE)
ON DUPLICATE KEY UPDATE title=VALUES(title);


CREATE TABLE IF NOT EXISTS role_permissions (
  role VARCHAR(80) PRIMARY KEY,
  permissions JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
