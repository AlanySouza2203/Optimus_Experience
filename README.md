# 🚗 Optimus Experience - Sistema de Gestão de Frota e Locadora de Veículos

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Online-brightgreen?style=for-the-badge&logo=vercel)](https://optimus-experience-zmr2.vercel.app/)
[![TiDB Cloud](https://img.shields.io/badge/TiDB%20Cloud-MySQL%20Serverless-blue?style=for-the-badge&logo=singlestore)](https://tidbcloud.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://expressjs.com/)

O **Optimus Experience** é uma plataforma web completa para gestão operacional, financeira e de frota de locadoras de veículos. O sistema permite controlar desde a captação de clientes interessados no site público até a vistoria, contratos, gestão financeira, manutenção e sinistros da frota.

🌐 **Link da Aplicação em Produção**: [https://optimus-experience-zmr2.vercel.app/](https://optimus-experience-zmr2.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 19**: Interface reativa e moderna para usuário e painel administrativo.
- **Vite 8**: Build tool ultra-rápida para desenvolvimento e produção.
- **Lucide React**: Biblioteca de ícones modernos para a UI.
- **CSS3 Puro**: Design Responsivo com variáveis de cores, animações e suporte a modo escuro/claro.

### **Backend & Banco de Dados**
- **Node.js & Express**: API RESTful adaptada para Serverless Functions na Vercel.
- **mysql2/promise**: Driver MySQL com pool de conexões otimizado e tratamento de TLS/SSL.
- **TiDB Cloud (MySQL Serverless)**: Banco de dados relacional distribuído, escalável e de alta disponibilidade hospedado na nuvem.

### **Hospedagem & Infraestrutura**
- **Vercel**: Deploy automatizado com integração contínua (CI/CD), funções serverless em `/api` e suporte a SPA.

---

## 📋 Fluxo de Funções de Cada Área

### 1. DASHBOARD
- **O que faz**: Apresenta um resumo geral de toda a operação em uma única tela, com indicadores numéricos, gráficos e alertas.
- **Funções disponíveis**:
  - **Indicadores financeiros** (4 cartões no topo): Receita do mês, Despesas do mês, Lucro do período (receita menos despesas) e Taxa de ocupação (% de veículos em locação).
  - **Indicadores operacionais** (8 cartões): Total de veículos, Disponíveis, Em locação, Em manutenção, Reservados, Contratos ativos, Cobranças pendentes (com valor total) e Cobranças vencidas (com valor total).
  - **Gráfico de barras**: Comparativo de receitas e despesas dos últimos 7 meses, com dados interativos ao passar o mouse.
  - **Gráfico circular**: Distribuição da frota por status.
  - **Painel de alertas**: Listagem de pendências críticas (CNH vencendo, Contrato vencendo, Cobrança vencida, Manutenção programada, Documento vencendo e Nova solicitação de suporte).
  - **Tabela de locações recentes**: Motorista, veículo, plano, período, valor e status.
- **Como funciona o fluxo**: O usuário acessa o painel e cai diretamente no Dashboard. Os indicadores são calculados automaticamente a partir dos dados do banco. O usuário identifica pendências nos alertas e navega para as áreas correspondentes.

---

### 2. USUÁRIOS
- **O que faz**: Gerencia os funcionários internos da locadora que possuem acesso ao painel administrativo.
- **Funções disponíveis**: Buscar por nome ou e-mail, Exportar lista em CSV, Criar novo usuário, Editar usuário existente, Bloquear ou ativar usuário, Resetar senha e Excluir usuário.
- **Como funciona o fluxo**: Exibe a lista com nome, cargo, perfil, status e data de cadastro.
  - *Criar*: Clica em "Novo Usuário", preenche os dados e salva.
  - *Editar*: Altera os campos cadastrais através do menu de ações.
  - *Bloquear/Ativar*: Alterna a situação do usuário no sistema.
  - *Resetar senha*: Gera uma senha temporária de acesso.
- **Campos do formulário**: Nome completo, CPF, Telefone, E-mail, Cargo, Perfil (Administrador, Gestor, Atendente, Vistoriador), Status (Ativo, Inativo, Bloqueado) e Senha temporária.

---

### 3. MOTORISTAS
- **O que faz**: Cadastra, analisa e aprova as pessoas autorizadas a dirigir os veículos da frota.
- **Funções disponíveis**: Indicadores (Aprovados, Em análise, Bloqueados/Reprovados), Busca por nome ou CPF, Filtro por status, Exportação CSV, Ver detalhes completos, Aprovar motorista, Reprovar motorista, Bloquear motorista e Novo cadastro.
- **Como funciona o fluxo**: O usuário visualiza indicadores no topo e pode filtrar a lista. Na janela "Ver detalhes", são exibidos: dados pessoais, CNH (categoria e validade), plataformas em que trabalha e documentos anexados (CNH, RG, CPF, Comprovante, Selfie).
- **Regras de exibição de ações**:
  - Se *Em análise*: exibe opções "Aprovar" e "Reprovar".
  - Se *Aprovado*: exibe opção "Bloquear".
  - Para todos: exibe "Ver detalhes".

---

### 4. VEÍCULOS
- **O que faz**: Controla toda a frota da locadora, permitindo acompanhar a situação individual de cada veículo.
- **Funções disponíveis**: Indicadores (Total, Disponíveis, Em locação, Indisponíveis), Busca por modelo/placa/código, Filtro por categoria (Econômico, Compacto, Sedan, SUV, Elétrico, Premium), Exportação CSV, Detalhes, Edição, Exclusão e Cadastro de novos veículos.
- **Status dos Veículos**:
  - **Disponível** (Verde): Pronto para locação.
  - **Em locação** (Azul): Em uso pelo motorista.
  - **Em manutenção** (Amarelo): Na oficina.
  - **Reservado** (Violeta): Reservado para uma locação futura.
  - **Bloqueado** (Vermelho): Indisponível para operação.

---

### 5. LOCAÇÕES
- **O que faz**: Lista e controla os contratos de locação ativos, agendados e encerrados.
- **Funções disponíveis**: Busca por motorista ou veículo, Exportação CSV, Ver detalhes, Encerrar locação, Cancelar locação e Criar nova locação.
- **Status da locação**: *Ativa*, *Encerrada*, *Cancelada*, *Agendada*, *Em análise*.

---

### 6. COBRANÇAS
- **O que faz**: Controla os valores a receber dos motoristas.
- **Funções disponíveis**: Indicadores (Pago, Pendente, Vencido), Filtro por status, Exportação CSV, Ver detalhes, Marcar cobrança como paga e Criar nova cobrança.
- **Regra de exibição**: Cobranças com status *Pendente* ou *Vencida* exibem a ação "Marcar como paga". Cobranças *Pagas* exibem apenas "Ver detalhes".

---

### 7. INTERESSADOS
- **O que faz**: Recebe e acompanha as solicitações enviadas através do formulário do site público.
- **Funções disponíveis**: Indicadores (Novos, Em contato, Convertidos, Arquivados), Filtros por status, Visualização detalhada de mensagens, Alteração de status para "Em contato", "Convertido" ou "Arquivado".
- **Visualização**: Apresentados em formato de cartões individuais devido às mensagens descritivas do cliente.

---

### 8. CLIENTES
- **O que faz**: Gerencia pessoas físicas (PF) e jurídicas (PJ) registradas na locadora.
- **Funções disponíveis**: Indicadores (Total, PF, PJ), Busca por nome ou CPF/CNPJ, Filtro por tipo, Exportação CSV, Ver detalhes, Cadastro, Edição e Exclusão.
- **Campos dinâmicos**: Alterna entre CPF/Nome (Pessoa Física) e CNPJ/Razão Social (Pessoa Jurídica).

---

### 9. RESERVAS
- **O que faz**: Agenda a separação antecipada de um veículo para determinado cliente/motorista.
- **Funções disponíveis**: Indicadores (Pendentes, Confirmadas, Canceladas), Busca, Filtro, Cadastro, Edição, Confirmação, Cancelamento e Exclusão.

---

### 10. CONTRATOS
- **O que faz**: Formaliza a locação com cláusulas, vigência, plano, caução e arquivo PDF anexado.
- **Funções disponíveis**: Indicadores (Em elaboração, Vigentes, Renovados, Encerrados), Busca por número/cliente/motorista, Download de PDF do contrato, Anexo de PDF e Edição.
- **Automação**: Geração automática da numeração do contrato (`CT-2024-XXX`).

---

### 11. PAGAMENTOS
- **O que faz**: Registra o recebimento de valores vinculados aos contratos de locação.
- **Funções disponíveis**: Indicadores (Total recebido, Número de transações, Com comprovante), Filtro por forma de pagamento (Pix, Cartão, Dinheiro, Transferência, Boleto), Upload de comprovante.

---

### 12. FLUXO DE CAIXA
- **O que faz**: Registra todas as entradas e saídas de capital da locadora, calculando o saldo financeiro líquido.
- **Funções disponíveis**: Indicadores (Entradas, Saídas e Resultado), Filtros por tipo/descrição, Cadastro de movimentações.

---

### 13. MANUTENÇÕES
- **O que faz**: Gerencia os reparos preventivos e corretivos da frota nas oficinas credenciadas.
- **Funções disponíveis**: Indicadores por status, Controle de oficina e custos, Anexo de fotos do reparo, Atualização automática do status do veículo para "Em manutenção".

---

### 14. VISTORIAS
- **O que faz**: Garante a integridade do veículo no momento da saída (retirada) e na devolução.
- **Funções disponíveis**: Controle de quilometragem e nível de combustível, Checklist de 11 fotos obrigatórias (Frente, Traseira, Laterais, Painel, Hodômetro, Combustível, Interior, Porta-malas, Rodas/Pneus e Avarias).

---

### 15. MULTAS
- **O que faz**: Gerencia autos de infração de trânsito vinculados aos veículos e atribuição aos motoristas responsáveis.
- **Funções disponíveis**: Controle de pontuação, órgão autuador, vencimento, repasse do valor ao motorista e upload da notificação.

---

### 16. SINISTROS
- **O que faz**: Registra e acompanha ocorrências graves (colisões, furtos, roubos e danos).
- **Funções disponíveis**: Registro de protocolo, acionamento de seguradora, cálculo de franquia, responsabilidades financeiras e upload de laudos/fotos.

---

### 17. SUPORTE
- **O que faz**: Centraliza chamados de assistência enviados pelos motoristas (pane mecânica, pneu furado, guincho, etc.).
- **Funções disponíveis**: Controle de chamados por protocolo, prioridade e status (*Aberto*, *Em atendimento*, *Resolvido*).

---

### 18. RELATÓRIOS
- **O que faz**: Consolida informações operacionais e financeiras para análise de métricas e tomada de decisão.
- **Funções disponíveis**: Emissão por categoria (Operação, Financeiro, Pessoas, Ocorrências), seleção de período e exportação completa em CSV.

---

## 🔄 Fluxo Completo de Integração Entre as Áreas

```
+------------------+
|   SITE PÚBLICO   |
+--------+---------+
         |
         v
+------------------+     (Atendimento)      +------------------+     (Conversão)      +------------------+
|   INTERESSADOS   | ---------------------> |   INTERESSADOS   | -------------------> |     CLIENTES     |
|  (status: Novo)  |                        | (Em contato)     |                      | (Cadastro PF/PJ) |
+------------------+                        +------------------+                      +--------+---------+
                                                                                               |
                                                                                               v
+------------------+     (Aprovação CNH)    +------------------+                      +------------------+
|    MOTORISTAS    | ---------------------> |    MOTORISTAS    | -------------------> |     RESERVAS     |
|   (Em análise)   |                        |    (Aprovado)    |                      | (Status: Conf.)  |
+------------------+                        +------------------+                      +--------+---------+
                                                                                               |
                                                                                               v
+------------------+     (Pagamento)        +------------------+                      +------------------+
|     COBRANÇA     | <--------------------- |    PAGAMENTOS    | <------------------- |    CONTRATOS     |
|  (status: Paga)  |                        | (Com comprovante)|                      | (Status: Vigente)|
+--------+---------+                        +------------------+                      +--------+---------+
         |                                                                                     |
         v                                                                                     v
+------------------+                        +------------------+                      +------------------+
|  FLUXO DE CAIXA  |                        |    VISTORIAS     | -------------------> |     LOCAÇÃO      |
| (Entrada R$)     |                        | (Checklist 11 px)|                      | (Status: Ativa)  |
+------------------+                        +------------------+                      +--------+---------+
                                                                                               |
                                                                                               v
+------------------+                        +------------------+                      +------------------+
|    DASHBOARD     | <--------------------- |     RELATÓRIOS   | <------------------- |     VEÍCULO      |
|  (Atualiza Kpi)  |                        |  (Exporta CSV)   |                      | (Em Locação)     |
+------------------+                        +------------------+                      +------------------+
```

---

## 📊 Resumo das Funções por Área

| Área | Criar | Editar | Excluir | Ver Detalhes | Mudar Status | Exportar CSV | Anexo de Arquivo |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dashboard** | - | - | - | - | - | - | - |
| **Usuários** | Sim | Sim | Sim | - | Sim | Sim | - |
| **Motoristas** | Sim | - | - | Sim | Sim | Sim | - |
| **Veículos** | Sim | Sim | Sim | Sim | - | Sim | - |
| **Locações** | Sim | - | - | Sim | Sim | Sim | - |
| **Cobranças** | Sim | - | - | Sim | Sim | Sim | - |
| **Interessados** | - | - | - | Sim | Sim | - | - |
| **Clientes** | Sim | Sim | Sim | Sim | - | Sim | - |
| **Reservas** | Sim | Sim | Sim | - | Sim | Sim | - |
| **Contratos** | Sim | Sim | Sim | Sim | - | Sim | Sim (PDF) |
| **Pagamentos** | Sim | Sim | Sim | - | - | Sim | Sim (Comprovante) |
| **Fluxo de Caixa** | Sim | Sim | Sim | - | - | Sim | - |
| **Manutenções** | Sim | Sim | Sim | - | Sim | Sim | Sim (Fotos) |
| **Vistorias** | Sim | Sim | Sim | - | Sim | Sim | Sim (11 Fotos) |
| **Multas** | Sim | Sim | Sim | - | Sim | Sim | Sim (Documento) |
| **Sinistros** | Sim | Sim | Sim | - | Sim | Sim | Sim (Fotos/Docs) |
| **Suporte** | Sim | Sim | Sim | - | Sim | Sim | - |
| **Relatórios** | - | - | - | - | - | Sim | - |

---

## 🚀 Como Rodar o Projeto Localmente

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/AlanySouza2203/Optimus_Experience.git
   cd Optimus_Experience
   ```

2. **Instalar as Dependências**:
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente (`.env`)**:
   Crie um arquivo `.env` na raiz do projeto com as credenciais do seu banco de dados MySQL ou TiDB Cloud:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=suasenha
   DB_NAME=optimus_db
   DB_SSL=false
   ```

4. **Executar a Aplicação em Desenvolvimento**:
   Em um terminal, inicie o backend:
   ```bash
   npm run server
   ```
   Em outro terminal, inicie o frontend com Vite:
   ```bash
   npm run dev
   ```

---

## 🔗 Link de Deploy
Acesse a versão final publicada na Vercel: **[https://optimus-experience-zmr2.vercel.app/](https://optimus-experience-zmr2.vercel.app/)**