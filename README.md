
# Rick and Morty Character Catalog | Orys Tech Challenge

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38B2AC)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-Latest-ff4154)](https://tanstack.com/query/latest)

## 📌 Sobre o Projeto

Este projeto é um catálogo de personagens da série Rick and Morty, desenvolvido como parte do desafio técnico para a Orys. A aplicação consome a [API oficial do Rick and Morty](https://rickandmortyapi.com/api/character) e apresenta uma interface responsiva e acessível para explorar os personagens da série.

### 🚀 Live Demo

Acesse o projeto em: [Rick and Morty Character Catalog](https://rick-and-morty-character-database-orys-technical-challenge.vercel.app/)


### 🚀 Features Implementadas

- ✅ Listagem de personagens com informações detalhadas (nome, imagem, status)
- ✅ Filtro por nome com debounce para melhor performance
- ✅ Scroll infinito para carregamento dinâmico
- ✅ Design responsivo (mobile e desktop)
- ✅ Feedback visual de carregamento com skeletons
- ✅ Tratamento de erros com mensagens amigáveis
- ✅ Modo escuro/claro
- ✅ Suporte para múltiplos idiomas (EN/PT)
- ✅ Cache inteligente com React Query
- ✅ Testes unitários com Jest e React Testing Library

### 🛠️ Tecnologias

- **React 18** com Hooks
- **TypeScript**
- **Tailwind CSS** para estilização
- **React Query** para gerenciamento de cache e dados
- **i18next** para internacionalização
- **Jest** e **React Testing Library** para testes
- **Radix UI** para componentes acessíveis
- **Lucide React** para ícones
- **Vite** como bundler

### ⚙️ Organização do Código

O projeto segue uma estrutura organizada e modular:

```
src/
  ├── components/
  │   ├── atoms/        # Componentes básicos
  │   ├── molecules/    # Composição de atoms
  │   ├── organisms/    # Composição de molecules
  │   └── ui/           # Componentes de UI reutilizáveis
  ├── contexts/         # Contextos React
  ├── hooks/            # Hooks customizados
  ├── services/         # Serviços e API
  ├── types/           # Definições de tipos
  └── pages/           # Páginas da aplicação
```

### 🌟 Diferenciais Implementados

1. **React Query**
   - Gerenciamento eficiente de cache
   - Revalidação automática
   - Tratamento de estados de loading e error

2. **Testes**
   - Cobertura de testes para componentes principais
   - Testes de integração para fluxos importantes
   - Mocks para chamadas de API

3. **Acessibilidade**
   - Uso apropriado de ARIA labels
   - Navegação por teclado
   - Mensagens de status para screen readers
   - Contraste adequado

4. **Performance**
   - Lazy loading de imagens
   - Code splitting
   - Debounce em pesquisas
   - Memoização de componentes

### 🚀 Como Executar

```bash
# Clonar o repositório
git clone https://github.com/Robetjunior/Rick-and-Morty-Character-Database---Orys-Technical-Challenge.git

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Executar testes
npm test
```

### 👤 Autor

**José Roberto Ferreira Junior**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/josé-roberto-dev/)

---

Desenvolvido como parte do desafio técnico para a Orys ⚡
