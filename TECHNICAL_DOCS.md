# Documentação Técnica - MotoSync 2.0

## 📋 Visão Geral

O MotoSync 2.0 é um aplicativo React Native desenvolvido para gestão de frotas de motocicletas da Mottu. Este documento detalha a arquitetura técnica, padrões de código e decisões de design implementadas.

## 🏗️ Arquitetura

### Padrão Arquitetural
- **MVVM (Model-View-ViewModel)** com React Hooks
- **Separação de Responsabilidades** entre componentes, serviços e contextos
- **Injeção de Dependências** através de contextos React

### Estrutura de Pastas
```
src/
├── components/          # Componentes UI reutilizáveis
├── contexts/            # Contextos React (Estado global)
├── hooks/               # Hooks customizados
├── screens/             # Telas da aplicação
├── services/            # Lógica de negócio e APIs
├── theme/               # Sistema de design
└── utils/               # Funções utilitárias
```

## 🔧 Serviços e APIs

### API Service (`src/services/api.js`)
- **Base URL**: MockAPI (https://68d9a88d90a75154f0dae049.mockapi.io)
- **Timeout**: 10 segundos
- **Interceptors**: Para tratamento de erros e autenticação
- **Serviços Disponíveis**:
  - `motoService`: CRUD de motos
  - `userService`: CRUD de usuários
  - `authService`: Autenticação
  - `branchService`: CRUD de filiais

### Storage Service (`src/services/storage.js`)
- **AsyncStorage**: Persistência local
- **Chaves Organizadas**: Por tipo de entidade
- **Operações CRUD**: Para cada entidade
- **Tratamento de Erros**: Try-catch em todas as operações

### Sync Service (`src/services/syncService.js`)
- **Sincronização Inteligente**: Só sincroniza quando necessário
- **Fallback Strategy**: API → Local → Mock
- **Status de Sincronização**: Monitoramento em tempo real
- **Operações Paralelas**: Promise.all para performance

## 🎨 Sistema de Design

### Theme Context (`src/contexts/ThemeContext.js`)
- **Provider Pattern**: Contexto global para tema
- **Cores Consistentes**: Paleta definida em `theme/colors.js`
- **Tipografia**: Sistema de fontes em `theme/typography.js`
- **Espaçamento**: Grid system em `theme/spacing.js`

### Componentes Reutilizáveis
- **Button**: Botões com variantes (primary, secondary, outline)
- **Input**: Campos de entrada com validação
- **Card**: Cards com animações e gradientes
- **LoadingSpinner**: Indicador de carregamento global

## 📱 Navegação

### React Navigation
- **Stack Navigator**: Para navegação principal
- **Tab Navigator**: Para navegação entre seções
- **Screen Options**: Headers customizados
- **Deep Linking**: Suporte a URLs profundas

### Estrutura de Rotas
```
Login → Main (Tabs)
├── Home (Dashboard)
├── Motos (Lista)
├── Usuários (Lista)
└── Configurações

Modais:
├── MotoDetails
├── AddMoto
├── EditMoto
├── AddUser
├── EditUser
└── CreateBranchLayout
```

## 🔐 Autenticação

### Fluxo de Login
1. **Validação**: Campos obrigatórios e formato
2. **API Call**: Tentativa de login via MockAPI
3. **Fallback**: Credenciais mock para demonstração
4. **Storage**: Salva token e dados do usuário
5. **Navigation**: Redireciona para tela principal

### Gerenciamento de Estado
- **Context API**: Para dados globais do usuário
- **AsyncStorage**: Persistência de sessão
- **Auto-logout**: Limpeza automática de dados

## 📊 Persistência de Dados

### Estratégia Híbrida
1. **API First**: Prioriza dados da API
2. **Local Cache**: AsyncStorage como backup
3. **Offline Support**: Funciona sem internet
4. **Sync on Demand**: Sincronização manual

### Estrutura de Dados
```javascript
// Moto
{
  id: string,
  plate: string,
  model: string,
  chassis: string,
  rfid: string,
  status: 'Prontas' | 'Dano Leve' | 'Dano Grave',
  location: string,
  filial: string,
  notes?: string,
  createdAt: string
}

// Usuário
{
  id: string,
  name: string,
  email: string,
  cpf: string,
  phone: string,
  filial: string,
  role: 'Admin' | 'Usuário',
  status: 'Ativo' | 'Pendente',
  createdAt: string
}
```

## ✅ Validações

### Validação de Formulários (`src/services/validation.js`)
- **Email**: Regex para formato válido
- **CPF**: Algoritmo de validação completo
- **Telefone**: Formato brasileiro
- **Placa**: Formato ABC-1234
- **Campos Obrigatórios**: Validação de presença

### Tratamento de Erros
- **Try-Catch**: Em todas as operações assíncronas
- **User Feedback**: Alertas e mensagens de erro
- **Fallback**: Estratégias de recuperação
- **Logging**: Console.log para debug

## 🎭 Animações

### AnimatedCard Component
- **Entrada**: Animação de fade-in com delay
- **Interação**: Feedback visual ao tocar
- **Performance**: Usando Animated API nativa

### Transições
- **Screen Transitions**: Configuradas no React Navigation
- **Loading States**: Spinners e skeletons
- **Micro-interactions**: Feedback visual em botões

## 📱 Responsividade

### Hook useResponsive
- **Breakpoints**: Small, Medium, Large
- **Dynamic Sizing**: Baseado no tamanho da tela
- **Font Scaling**: Tamanhos de fonte responsivos
- **Layout Adaptation**: Grids flexíveis

### Suporte a Dispositivos
- **Phones**: 320px - 768px
- **Tablets**: 768px+
- **Orientation**: Portrait e Landscape

## 🧪 Testes

### Estratégia de Testes
- **Unit Tests**: Funções utilitárias
- **Component Tests**: Componentes isolados
- **Integration Tests**: Fluxos completos
- **E2E Tests**: Cenários de usuário

### Ferramentas
- **Jest**: Framework de testes
- **React Native Testing Library**: Testes de componentes
- **Detox**: Testes E2E (futuro)

## 🚀 Performance

### Otimizações Implementadas
- **Lazy Loading**: Componentes carregados sob demanda
- **Memoization**: React.memo para componentes
- **Image Optimization**: Compressão de assets
- **Bundle Splitting**: Código dividido por rotas

### Monitoramento
- **Console Logs**: Para debug em desenvolvimento
- **Error Boundaries**: Captura de erros React
- **Performance Metrics**: Tempo de resposta da API

## 🔒 Segurança

### Boas Práticas
- **Input Sanitization**: Validação de entrada
- **HTTPS Only**: Comunicação segura
- **Token Management**: Armazenamento seguro
- **Error Handling**: Não exposição de dados sensíveis

### Dados Sensíveis
- **AsyncStorage**: Dados locais criptografados (futuro)
- **API Keys**: Variáveis de ambiente
- **User Data**: Minimização de dados armazenados

## 📈 Escalabilidade

### Preparação para Crescimento
- **Modular Architecture**: Fácil adição de features
- **Service Layer**: Lógica de negócio separada
- **Component Library**: Reutilização de código
- **API Abstraction**: Fácil troca de backend

### Futuras Melhorias
- **Push Notifications**: Notificações em tempo real
- **Offline Queue**: Sincronização em background
- **Caching Strategy**: Cache inteligente
- **Analytics**: Métricas de uso

## 🐛 Debugging

### Ferramentas de Debug
- **React Native Debugger**: Debug avançado
- **Flipper**: Inspeção de estado
- **Console Logs**: Logs estruturados
- **Error Tracking**: Sentry (futuro)

### Logs Estruturados
```javascript
console.log('🔄 Iniciando sincronização...');
console.log('📡 Dados recebidos da API');
console.log('💾 Salvando no AsyncStorage');
console.log('❌ Erro na operação');
```

## 📚 Documentação de Código

### Padrões de Comentários
```javascript
/**
 * Sincroniza usuários da API com o AsyncStorage
 * @param {string} userId - ID do usuário
 * @returns {Promise<Object>} Dados do usuário sincronizado
 */
export const syncUser = async (userId) => {
  // Implementação...
};
```

### JSDoc Standards
- **Funções**: Descrição, parâmetros, retorno
- **Componentes**: Props, estado, comportamento
- **Serviços**: Métodos públicos, configurações

## 🔄 Versionamento

### Semantic Versioning
- **Major**: Mudanças incompatíveis
- **Minor**: Novas funcionalidades
- **Patch**: Correções de bugs

### Changelog
- **v3.2.0**: Sprint 3 completa
- **v3.1.0**: MVP funcional
- **v3.0.0**: Projeto inicial

## 🚀 Deploy e CI/CD

### Pipeline de Deploy
1. **Code Review**: Pull request review
2. **Tests**: Execução automática de testes
3. **Build**: Compilação para produção
4. **Deploy**: Publicação no Expo

### Ambientes
- **Development**: Desenvolvimento local
- **Staging**: Testes de integração
- **Production**: App publicado

---

**Documentação Técnica MotoSync 2.0** - Versão 3.2.0
