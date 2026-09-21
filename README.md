# Optimus Experience

Sistema de gestão de frotas e locações voltado a locadoras e motoristas de aplicativo. A aplicação reúne o site institucional, captação de interessados e uma área administrativa para operação, financeiro, frota e atendimento.

## Visão geral

- Site público com catálogo de veículos, planos, propostas e suporte ao motorista.
- Painel administrativo com indicadores, permissões por perfil e módulos operacionais.
- API REST em Express com MySQL.
- Modo de reserva local quando o MySQL não está disponível, útil para demonstração e desenvolvimento inicial.
- Relatórios filtráveis por período, status, veículo, cliente e motorista.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, Vite 8, CSS e Lucide React |
| Backend | Node.js, Express, CORS e dotenv |
| Banco de dados | MySQL 8+ com `mysql2` |
| Qualidade | Oxlint |

## Módulos administrativos

| Área | Principais informações gerenciadas |
| --- | --- |
| Dashboard | Entradas, saídas, saldo, frota e alertas pendentes |
| Pessoas | Usuários, clientes e motoristas |
| Operação | Veículos, reservas, locações e contratos |
| Financeiro | Cobranças, pagamentos e fluxo de caixa |
| Frota | Manutenções, vistorias, multas e sinistros |
| Atendimento | Suporte, interessados e notificações |
| Sistema | Relatórios e configurações de perfis/permissões |

## Pré-requisitos

- Node.js 20 ou superior
- npm 10 ou superior
- MySQL 8 ou superior para persistência em banco

## Instalação

```bash
git clone https://github.com/AlanySouza2203/Optimus_Experience.git
cd Optimus_Experience
npm install
```

## Configuração do banco

Crie um arquivo `.env` na raiz do projeto com suas credenciais locais:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=optimus_db
```

Para criar a estrutura e a base inicial:

```bash
mysql -u root -p < schema.sql
```

> O arquivo `schema.sql` cria o banco `optimus_db`, as tabelas e dados iniciais. A API também cria tabelas essenciais ao iniciar quando consegue se conectar ao MySQL.

## Executar localmente

Inicie a API em um terminal:

```bash
npm run server
```

Em outro terminal, inicie o frontend:

```bash
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

O frontend encaminha chamadas iniciadas por `/api` para `http://localhost:3001`. Caso necessário, defina `VITE_API_TARGET` antes de iniciar o Vite:

```bash
VITE_API_TARGET=http://localhost:3001 npm run dev
```

No PowerShell:

```powershell
$env:VITE_API_TARGET = 'http://localhost:3001'
npm run dev
```

## Acesso administrativo de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@optimusexperience.com.br` | `admin123` |
| Gestor | `gestor@optimusexperience.com.br` | `gestor123` |
| Atendimento | `atendente@optimusexperience.com.br` | `atendente123` |

Essas credenciais são somente para desenvolvimento/demonstração. Altere-as antes de qualquer publicação.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o frontend Vite em desenvolvimento |
| `npm run server` | Inicia a API Express |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada em `dist/` |
| `npm run lint` | Executa a análise estática com Oxlint |

## Principais rotas da API

A API usa o prefixo `/api`.

| Grupo | Rotas principais |
| --- | --- |
| Saúde e autenticação | `GET /health`, `POST /auth/login` |
| Pessoas | `/users`, `/clients`, `/drivers` |
| Operação | `/vehicles`, `/plans`, `/reservations`, `/contracts` |
| Financeiro | `/payments`, `/collections`, `/admin/cashEntries` |
| Frota | `/maintenances`, `/fines`, `/incidents` |
| Atendimento | `/support`, `/proposals`, `/interessados` |
| Administração | `/permissions`, `/admin/overview`, `/notifications` |

Consulte [server.js](./server.js) para os métodos e corpos aceitos por cada rota.

## Estrutura do projeto

```text
├── public/                 # Ícones e arquivos públicos
├── src/
│   ├── assets/             # Imagens locais
│   ├── components/         # Componentes do site e painel administrativo
│   ├── App.jsx             # Composição da aplicação
│   └── main.jsx            # Inicialização React
├── server.js               # API Express e integração MySQL/fallback
├── schema.sql              # Banco, tabelas e dados iniciais
├── vite.config.js          # Vite e proxy para a API
└── package.json            # Dependências e scripts
```

## Dados e comportamento financeiro

- **Entradas do mês** no dashboard somam pagamentos recebidos e lançamentos de entrada do fluxo de caixa no mês atual.
- **Saídas do mês** consideram lançamentos do tipo `Saída` no fluxo de caixa.
- Os relatórios financeiros usam os filtros ativos de período e status para recalcular receitas, despesas e saldo.

## Segurança e produção

O projeto atual foi estruturado para ambiente local/demonstração. Antes de publicar em produção, recomenda-se:

- usar hash de senha com bcrypt ou equivalente;
- adicionar autenticação baseada em token/sessão e autorização no servidor;
- remover credenciais de demonstração e nunca versionar senhas reais;
- restringir CORS aos domínios autorizados;
- validar entradas no servidor e configurar logs/monitoramento;
- usar variáveis de ambiente seguras no provedor de hospedagem.

## Verificação

```bash
npm run lint
npm run build
```

## Licença

Este projeto é privado. Defina uma licença antes de redistribuí-lo.