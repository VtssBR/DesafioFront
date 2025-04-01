# Desafio Técnico - Front-end de Gerenciamento de Clientes e Contatos

## 1️⃣ Visão Geral  

Este projeto foi desenvolvido como parte de um **desafio técnico** com o objetivo de entregar um sistema de **gerenciamento de clientes e contatos** para uma empresa. A aplicação permite realizar operações **CRUD** (Create, Read, Update, Delete) para gerenciar informações de clientes e seus respectivos contatos de forma eficiente e intuitiva.

A interface do usuário foi construída utilizando **React**, com suporte para roteamento dinâmico através do **React Router**, e conta com uma configuração de desenvolvimento rápida utilizando **Vite**. Para garantir a qualidade do código, o projeto utiliza **ESLint** para a análise estática, além de incorporar a biblioteca **React IMask** para máscaras de input.

---

## 2️⃣ Tecnologias Utilizadas  

### 📌 Framework e Biblioteca  
- **React 19**: Biblioteca para construção da interface do usuário, permitindo a criação de componentes reutilizáveis e gerenciados de forma eficiente.  
- **React Router Dom**: Utilizado para o gerenciamento de rotas, permitindo a navegação entre diferentes páginas da aplicação.  

### 📌 Ferramentas de Desenvolvimento  
- **Vite**: Ferramenta moderna para construção e desenvolvimento rápido de aplicações, proporcionando recarregamento rápido durante o desenvolvimento.  
- **ESLint**: Ferramenta de análise estática que ajuda a manter boas práticas de codificação e a evitar erros comuns.  

### 📌 Outras Bibliotecas  
- **React IMask**: Biblioteca que facilita a implementação de máscaras em inputs, garantindo a formatação correta dos dados inseridos pelo usuário.  

---

## 3️⃣ Requisitos e Instalação  

### 📌 Pré-requisitos  
Antes de iniciar, certifique-se de ter os seguintes pré-requisitos instalados:  
- **Node.js**: Para executar a aplicação e gerenciar pacotes. [Download Node.js](https://nodejs.org/)  
- **Gerenciador de Pacotes**: Utilize `npm` ou `yarn` para gerenciar as dependências do projeto.  

### 📌 Instalação do Projeto  
1. Clone o repositório:  
   ```bash
   git clone https://github.com/VtssBR/DesafioFront
   cd desafiofront
   ```
2. Instale as dependências:  
   ```bash
   npm install  # ou yarn install
   ```
   
   **Dependências de Produção:**
   ```bash
   npm install react@^19.0.0 
   npm install react-dom@^19.0.0 
   npm install react-imask@^7.6.1 
   npm install react-router-dom@^7.4.0
   ```
---

## 4️⃣ Estrutura do Projeto  

A estrutura do projeto segue um modelo **componentizado** e organizado em pastas para facilitar a manutenção e a escalabilidade:
```
/src
  /components      # Componentes reutilizáveis para a interface
  /contexts        # Gerenciamento de estados globais usando Context API
  /pages           # Páginas principais e layouts
  /routes          # Configuração de rotas da aplicação
  /services        # Chamadas e respostas dos endpoints da API
```

### 📌 Exemplo de Configuração de Rotas  
As rotas são configuradas da seguinte maneira no arquivo de rotas:
```javascript
const routes = [
  { path: "create", element: <CreateClients /> },
  { path: "update/:id", element: <UpdateClients /> },
  { path: "list/:id", element: <ListContacts /> },
  { path: "createContact/:id", element: <CreateContacts /> },
  { path: "updateContact/:id", element: <UpdateContacts /> }
];
```

---

## 5️⃣ Executando o Projeto  
Para rodar a aplicação localmente, execute o seguinte comando no terminal:  
```bash
npm run dev  # ou yarn dev
```
Após a execução, a aplicação estará disponível em:  
```
http://localhost:3000  # Porta padrão do Vite
```

---

