# 🚗 Optimus Experience — Sistema de Gestão de Frota e Locadora de Veículos

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Online-brightgreen?style=for-the-badge&logo=vercel)](https://optimus-experience-zmr2.vercel.app/)
[![TiDB Cloud](https://img.shields.io/badge/TiDB%20Cloud-MySQL%20Serverless-blue?style=for-the-badge&logo=tidb)](https://tidbcloud.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://expressjs.com/)

**Aplicação em produção:** [https://optimus-experience-zmr2.vercel.app/](https://optimus-experience-zmr2.vercel.app/)  
**Repositório:** [AlanySouza2203/Optimus_Experience](https://github.com/AlanySouza2203/Optimus_Experience)

---

## 1. Identificação Acadêmica

| Campo | Informação |
|---|---|
| **Instituição de Ensino** | A ser definido pela equipe |
| **Curso** | A ser definido pela equipe |
| **Disciplina** | A ser definido pela equipe |
| **Orientador** | Profº Hudson Neves |
| **Autora do projeto** | Alany Souza |

## 2. Descrição do Projeto

O **Optimus Experience** é uma aplicação web para gestão operacional, financeira e de frota de uma locadora de veículos. O sistema reúne funcionalidades para acompanhar o relacionamento com interessados, o cadastro de clientes e motoristas, a disponibilidade dos veículos, as locações, os contratos, os pagamentos e as demais rotinas administrativas.

A solução também contempla áreas de manutenção, vistoria, multas, sinistros, suporte e relatórios, permitindo centralizar informações relevantes para a operação da locadora.

## 3. Objetivos

### 3.1 Objetivo geral

Centralizar e apoiar o gerenciamento das atividades operacionais, financeiras e administrativas de uma locadora de veículos por meio de uma aplicação web.

### 3.2 Problema que o sistema busca resolver

A administração de uma locadora envolve informações relacionadas a pessoas, veículos, locações, contratos, cobranças e ocorrências. A falta de centralização pode dificultar o acompanhamento dessas informações e das pendências operacionais. O Optimus Experience reúne essas áreas em um único sistema.

### 3.3 Público-alvo

- Administradores e gestores de locadoras de veículos.
- Funcionários responsáveis pelo atendimento e pelas rotinas administrativas.
- Profissionais envolvidos no controle da frota, vistorias, manutenção e financeiro.
- Motoristas e pessoas interessadas em contratar os serviços da locadora, conforme as funcionalidades disponibilizadas.

## 4. Funcionalidades

### 4.1 Dashboard

- Apresenta indicadores financeiros e operacionais.
- Exibe receita, despesas, lucro do período e taxa de ocupação da frota.
- Resume a quantidade e a situação dos veículos, contratos e cobranças.
- Apresenta gráficos de receitas e despesas dos últimos sete meses e distribuição da frota por status.
- Reúne alertas sobre CNH, contratos, cobranças, manutenções, documentos e solicitações de suporte.
- Lista locações recentes.

### 4.2 Usuários

- Consulta usuários por nome ou e-mail.
- Cria, edita, bloqueia, ativa e exclui usuários.
- Permite exportar a lista em CSV e resetar senhas.
- Contempla dados como nome, CPF, telefone, e-mail, cargo, perfil e status.
- Perfis descritos: Administrador, Gestor, Atendente e Vistoriador.

### 4.3 Motoristas

- Cadastra e consulta motoristas.
- Permite buscar por nome ou CPF e filtrar por status.
- Exibe informações pessoais, dados da CNH, plataformas de trabalho e documentos anexados.
- Permite aprovar, reprovar ou bloquear motoristas, conforme o status.
- Permite exportar os dados em CSV.

### 4.4 Veículos

- Cadastra, consulta, edita e exclui veículos.
- Permite pesquisar por modelo, placa ou código e filtrar por categoria.
- Exibe indicadores da frota e permite exportar os dados em CSV.
- Contempla os status: Disponível, Em locação, Em manutenção, Reservado e Bloqueado.

### 4.5 Locações

- Lista locações ativas, agendadas e encerradas.
- Permite pesquisar por motorista ou veículo.
- Permite criar, consultar, encerrar e cancelar locações.
- Contempla os status Ativa, Encerrada, Cancelada, Agendada e Em análise.
- Permite exportar os dados em CSV.

### 4.6 Cobranças

- Acompanha valores a receber.
- Apresenta indicadores de cobranças pagas, pendentes e vencidas.
- Permite filtrar, consultar detalhes, criar cobranças e exportar dados.
- Disponibiliza a ação de marcar como paga para cobranças pendentes ou vencidas.

### 4.7 Interessados

- Recebe e acompanha solicitações enviadas pelo site público.
- Apresenta indicadores e filtros por status.
- Permite visualizar os detalhes das mensagens.
- Permite atualizar o status para Em contato, Convertido ou Arquivado.
- A conversão representa a passagem do interessado para o processo de cadastro como cliente.

### 4.8 Clientes

- Gerencia cadastros de pessoas físicas (PF) e pessoas jurídicas (PJ).
- Permite cadastrar, pesquisar, consultar detalhes, editar e excluir clientes.
- Permite filtrar por tipo e exportar os dados em CSV.
- Adapta os campos conforme o tipo de pessoa, incluindo CPF/Nome para PF e CNPJ/Razão Social para PJ.

### 4.9 Reservas

- Agenda a reserva antecipada de veículos para clientes ou motoristas.
- Permite cadastrar, consultar, editar, confirmar, cancelar e excluir reservas.
- Apresenta indicadores de reservas pendentes, confirmadas e canceladas.

### 4.10 Contratos

- Registra informações contratuais, como vigência, plano e caução.
- Permite consultar, editar e anexar arquivos PDF.
- Disponibiliza o download do PDF do contrato.
- Contempla indicadores de contratos em elaboração, vigentes, renovados e encerrados.
- A numeração automática está descrita no formato `CT-2024-XXX`.

### 4.11 Pagamentos

- Registra recebimentos vinculados aos contratos de locação.
- Apresenta indicadores de valores recebidos e transações.
- Permite filtrar por forma de pagamento.
- Contempla Pix, cartão, dinheiro, transferência e boleto.
- Permite anexar comprovantes.

### 4.12 Fluxo de caixa

- Registra entradas e saídas financeiras.
- Apresenta indicadores de entradas, saídas e resultado.
- Permite cadastrar movimentações e filtrar por tipo ou descrição.

### 4.13 Manutenções

- Gerencia manutenções preventivas e corretivas.
- Acompanha status, oficina e custos.
- Permite anexar fotos dos reparos.
- Prevê a atualização do status do veículo para **Em manutenção**.

### 4.14 Vistorias

- Registra informações da vistoria na retirada e na devolução do veículo.
- Controla quilometragem e nível de combustível.
- Contempla checklist de fotos de diferentes partes do veículo, incluindo frente, traseira, laterais, painel, hodômetro, combustível, interior, porta-malas, rodas/pneus e avarias.

### 4.15 Multas

- Registra infrações relacionadas aos veículos e aos motoristas responsáveis.
- Controla pontuação, órgão autuador e vencimento.
- Contempla o repasse de valores ao motorista.
- Permite anexar a notificação.

### 4.16 Sinistros

- Registra ocorrências como colisões, furtos, roubos e danos.
- Acompanha protocolo, acionamento da seguradora e franquia.
- Registra responsabilidades financeiras.
- Permite anexar laudos e fotos.

### 4.17 Suporte

- Centraliza solicitações de assistência dos motoristas.
- Organiza chamados por protocolo, prioridade e status.
- Contempla os status Aberto, Em atendimento e Resolvido.

### 4.18 Relatórios

- Consolida informações para análise e apoio à tomada de decisões.
- Organiza relatórios por Operação, Financeiro, Pessoas e Ocorrências.
- Permite selecionar um período e exportar os dados em CSV.

## 5. Tecnologias Utilizadas

### Frontend

- **React 19:** construção da interface.
- **Vite 8:** ferramenta de desenvolvimento e build.
- **Lucide React:** biblioteca de ícones.
- **CSS3:** estilização, responsividade, variáveis de cores, animações e suporte a modo claro/escuro.

### Backend

- **Node.js:** ambiente de execução JavaScript.
- **Express:** criação da aplicação e das rotas da API.
- **mysql2/promise:** conexão com o banco de dados MySQL/TiDB.

### Banco de dados

- **TiDB Cloud (compatível com MySQL):** banco de dados relacional hospedado na nuvem.

### Hospedagem e infraestrutura

- **Vercel:** hospedagem da aplicação, deploy e suporte a funções serverless na pasta `/api`.

## 6. Arquitetura da Solução

O projeto utiliza uma arquitetura web com frontend, backend/API e banco de dados relacional.

```text
┌─────────────────────────────┐
│       Usuário / Navegador   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Frontend                    │
│ React + Vite + CSS          │
└──────────────┬──────────────┘
               │ Requisições HTTP
               ▼
┌─────────────────────────────┐
│ Backend / API               │
│ Node.js + Express           │
└──────────────┬──────────────┘
               │ Consultas SQL
               ▼
┌─────────────────────────────┐
│ Banco de dados              │
│ TiDB Cloud / MySQL           │
└─────────────────────────────┘
```

O frontend apresenta as interfaces e envia requisições ao backend. A API processa as solicitações e realiza as operações necessárias no banco de dados. A hospedagem de produção utiliza a Vercel. Os detalhes completos das rotas, dos módulos e da comunicação de cada funcionalidade devem ser documentados conforme a implementação final do código.

## 7. Fluxo de Integração entre as Áreas

O fluxo operacional documentado para o sistema pode ser resumido da seguinte forma:

1. **Site público:** recebe solicitações de pessoas interessadas.
2. **Interessados:** registra e acompanha o atendimento, com possibilidade de conversão ou arquivamento.
3. **Clientes:** mantém os cadastros de pessoas físicas e jurídicas.
4. **Motoristas:** registra os dados e acompanha a análise e a aprovação.
5. **Reservas:** organiza a reserva de veículos.
6. **Contratos e locações:** formalizam e acompanham a utilização do veículo.
7. **Vistorias:** registram as condições do veículo na retirada e na devolução.
8. **Pagamentos e cobranças:** acompanham os recebimentos e os valores pendentes.
9. **Fluxo de caixa:** reúne as movimentações de entrada e saída.
10. **Manutenções, multas, sinistros e suporte:** registram ocorrências e atividades operacionais.
11. **Dashboard e relatórios:** apresentam indicadores consolidados para acompanhamento da operação.

## 8. Modelagem do Banco de Dados

O banco de dados utilizado é o **TiDB Cloud**, compatível com o protocolo e o ecossistema MySQL.

O projeto utiliza conexão por meio do pacote `mysql2/promise`. O nome do banco informado no exemplo de configuração local é `optimus_db`.

As tabelas, os relacionamentos, as chaves primárias e estrangeiras e o diagrama entidade-relacionamento devem ser documentados com base no script SQL efetivamente utilizado no projeto.

**Diagrama do banco de dados:** A ser definido pela equipe.

## 9. Pré-requisitos

Para executar o projeto localmente, são necessários:

- Node.js instalado.
- npm instalado.
- Git instalado para clonar o repositório.
- Acesso a um banco de dados MySQL ou TiDB Cloud.
- Credenciais de conexão válidas para o banco de dados.
- Navegador web atualizado.

As versões mínimas exatas de Node.js e npm: **A ser definido pela equipe**.

## 10. Instalação

### 10.1 Clonar o repositório

```bash
git clone https://github.com/AlanySouza2203/Optimus_Experience.git
cd Optimus_Experience
```

### 10.2 Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 10.3 Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, caso essa seja a configuração utilizada pelo backend. Preencha com os dados do banco de dados:

```env
PORT=3001
DB_HOST=seu_host
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=optimus_db
DB_SSL=true
```

**Importante:** substitua os valores de exemplo pelas credenciais reais do ambiente. Para o TiDB Cloud, utilize os dados de conexão e os requisitos de TLS/SSL fornecidos pelo serviço. Não compartilhe nem envie o arquivo `.env` ao repositório. Se o projeto utilizar outra configuração de variáveis, ajuste este exemplo de acordo com o código.

## 11. Como Executar

Os comandos documentados para desenvolvimento são:

### 11.1 Iniciar o backend

Em um terminal, execute:

```bash
npm run server
```

### 11.2 Iniciar o frontend

Em outro terminal, execute:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir o frontend no navegador. A porta e o endereço exatos dependem da configuração do projeto.

**Observação:** os comandos acima dependem da existência dos scripts `server` e `dev` no arquivo `package.json`.

## 12. Estrutura do Projeto

A estrutura abaixo apresenta apenas os diretórios e componentes citados na documentação atual. A árvore completa de arquivos deve ser atualizada de acordo com o repositório.

```text
Optimus_Experience/
├── api/                 # Funções serverless/API na Vercel
├── package.json         # Dependências e scripts npm
├── .env                 # Variáveis locais (não versionar)
└── README.md            # Documentação do projeto
```

Outros diretórios e arquivos: **A ser definido pela equipe**, conforme a estrutura real do repositório.

## 13. Exemplos de Uso

### Exemplo 1 — Registrar um interessado

1. Uma pessoa acessa o site público.
2. Preenche e envia o formulário de interesse.
3. A equipe consulta a solicitação na área **Interessados**.
4. O atendimento é atualizado para Em contato.
5. Caso o interessado prossiga, o status pode ser alterado para Convertido e o cadastro segue para a área de Clientes, conforme o fluxo previsto.

### Exemplo 2 — Cadastrar um veículo

1. A equipe acessa a área **Veículos**.
2. Informa os dados solicitados no formulário.
3. Salva o cadastro.
4. O veículo passa a ser acompanhado conforme seu status operacional.

### Exemplo 3 — Acompanhar uma cobrança

1. A equipe acessa **Cobranças**.
2. Consulta os indicadores ou filtra os registros por status.
3. Abre os detalhes da cobrança.
4. Quando aplicável, registra a cobrança como paga.

Os exemplos descrevem os fluxos previstos na documentação. O comportamento final depende da implementação disponível em cada ambiente.

## 14. API

O backend é descrito como uma API baseada em Node.js e Express, com integração ao banco de dados por meio de `mysql2/promise` e adaptação para funções serverless na Vercel.

| Item | Descrição |
|---|---|
| Tecnologia | Node.js e Express |
| Tipo de integração | API web |
| Banco de dados | TiDB Cloud / compatibilidade MySQL |
| Hospedagem | Vercel |
| Lista de endpoints e métodos HTTP | A ser definido pela equipe |
| Exemplos de requisições e respostas | A ser definido pela equipe |
| Autenticação e autorização da API | A ser definido pela equipe |

A documentação dos endpoints deve ser preenchida a partir das rotas realmente implementadas no projeto, sem presumir caminhos ou métodos HTTP.

## 15. Capturas de Tela

Adicione nesta seção imagens reais da aplicação para demonstrar as principais interfaces. Salve as imagens em um diretório do repositório, por exemplo `docs/screenshots/`, e ajuste os caminhos conforme a estrutura final.

### Dashboard

<!-- Inserir a captura de tela do Dashboard em docs/screenshots/dashboard.png -->
`[Captura de tela do Dashboard a ser adicionada]`

### Gestão de veículos

<!-- Inserir a captura de tela da área de Veículos em docs/screenshots/veiculos.png -->
`[Captura de tela da área de Veículos a ser adicionada]`

### Interessados e clientes

<!-- Inserir a captura de tela das áreas Interessados e Clientes em docs/screenshots/interessados-clientes.png -->
`[Captura de tela de Interessados e Clientes a ser adicionada]`

### Financeiro e relatórios

<!-- Inserir a captura de tela das áreas financeiras e de relatórios em docs/screenshots/financeiro-relatorios.png -->
`[Captura de tela das áreas financeiras e de relatórios a ser adicionada]`

## 16. Autoria do Projeto

**Desenvolvimento:** Alany Souza (projeto individual).

**Orientador:** Profº Hudson Neves.

## 17. Melhorias Futuras

As melhorias futuras devem ser definidas a partir das necessidades identificadas durante o desenvolvimento e do estado atual da aplicação.

- Documentar os endpoints da API e seus exemplos de uso.
- Adicionar o diagrama entidade-relacionamento e a descrição das tabelas do banco.
- Inserir capturas de tela atualizadas das principais áreas.
- Documentar os testes automatizados e os procedimentos de validação, caso existam.
- Registrar requisitos de segurança, autenticação e autorização conforme a implementação.
- Detalhar o processo de implantação e configuração dos ambientes.

## 18. Status do Projeto

**Status:** A ser definido pela equipe.

## 19. Licença

**Licença:** A ser definido pela equipe.

Até que uma licença seja definida e incluída no repositório, não se deve presumir que o projeto esteja publicado sob uma licença de código aberto específica.

---

## 🔗 Links do Projeto

- **Aplicação publicada:** [Optimus Experience na Vercel](https://optimus-experience-zmr2.vercel.app/)
- **Repositório GitHub:** [AlanySouza2203/Optimus_Experience](https://github.com/AlanySouza2203/Optimus_Experience)
- **TiDB Cloud:** [https://tidbcloud.com/](https://tidbcloud.com/)
- **Documentação React:** [https://react.dev/](https://react.dev/)
- **Documentação Express:** [https://expressjs.com/](https://expressjs.com/)
