# MotoSync 2.0

O MotoSync 2.0 é um aplicativo móvel desenvolvido para gerenciamento de frota de motocicletas, oferecendo uma solução completa para monitoramento e controle de veículos.

## 👥 Integrantes da Equipe

- **Vinicius Murtinho Vicente** - RM: 551151
- **Lucas Barreto Consentino** - RM: 557107  
- **Gustavo Bispo Cordeiro** - RM: 558515

**Turma:** 2TDSPY - 2025

## 🚀 Funcionalidades Principais

- **Dashboard Intuitivo**: Visualização rápida de estatísticas e status da frota
- **Gestão de Motos**: 
  - Listagem completa de motocicletas
  - Detalhes de cada veículo (placa, modelo, chassi, RFID)
  - Status em tempo real (Prontas, Dano Leve, Dano Grave)
  - Localização e filial
- **Gestão de Usuários**: 
  - Cadastro e edição de usuários da filial
  - Controle de permissões (Admin, Usuário)
  - Status de usuários (Ativo, Pendente)
- **Sistema de Login**: Autenticação segura para acesso ao sistema
- **Sincronização Inteligente**: 
  - Sincronização automática com MockAPI
  - Modo offline com cache local
  - Persistência combinada (AsyncStorage + API)
- **Interface Responsiva**: Design moderno e adaptável para diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

- **React Native** (0.79.5) - Framework mobile
- **Expo** (~53.0.23) - Plataforma de desenvolvimento
- **React** (19.0.0) - Biblioteca principal
- **React Navigation** (^7.1.17) - Navegação entre telas
- **AsyncStorage** (2.1.2) - Persistência local
- **Axios** (^1.12.2) - Cliente HTTP para MockAPI
- **Expo Linear Gradient** (~14.1.5) - Gradientes
- **React Native Vector Icons** (^10.3.0) - Ícones
- **React Native Reanimated** (~3.17.4) - Animações
- **React Native Gesture Handler** (~2.24.0) - Gestos

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/motoSync2.0.git
cd motoSync2.0/motoSync
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npx expo start -c
```

4. **Acesse no dispositivo**
- Instale o app **Expo Go** no seu celular
- Escaneie o QR code que aparece no terminal
- Ou use um emulador Android/iOS

## 🔐 Credenciais de Teste

Para acessar o aplicativo:
- **Email:** teste@example.com
- **Senha:** 123456

## 🎨 Protótipo e Design

### Link do Figma
🔗 **[Acesse o protótipo no Figma](https://www.figma.com/design/W9u2hG7DHwZlCQgXjJ0pDu/Vers%C3%A3o-final?node-id=0-1&t=qqZCD1xByO9)**

### 📱 Link da Versão Publicada no Expo
```
exp://exp.host/@coutinh00/motosync
```

### 📸 QR Code para Expo Go

Escaneie este QR Code com o aplicativo Expo Go para acessar a versão publicada do MotoSync 2.0:

![expo_qrcode](https://github.com/user-attachments/assets/aab9558c-4c5e-4801-8ba1-aae4fa153cb4)


*QR Code do projeto MotoSync 2.0 - Escaneie com o Expo Go para acessar o aplicativo*

### 🚀 Status do Deploy

- ✅ **Deploy realizado com sucesso!**
- **Branch**: `main`
- **Runtime Version**: `3.2.0`
- **Platforms**: Android, iOS
- **Update ID**: `df63a90e-a93c-45cf-b229-a522e258f246`
- **EAS Dashboard**: [Ver no Dashboard](https://expo.dev/accounts/coutinh00/projects/motosync/updates/df63a90e-a93c-45cf-b229-a522e258f246)

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.js        # Botão personalizado
│   ├── FormField.js     # Campo de formulário
│   ├── LoadingSpinner.js # Indicador de carregamento
│   ├── SyncStatus.js    # Status de sincronização
│   └── index.js         # Exportações
├── contexts/            # Contextos React
│   └── ThemeContext.js  # Tema global
├── hooks/               # Hooks customizados
│   └── useResponsive.js # Responsividade
├── screens/             # Telas do aplicativo
│   ├── LoginScreen.js   # Tela de login
│   ├── FleetScreen.js   # Tela de frota
│   ├── UserScreen.js    # Tela de usuários
│   ├── AddMotoScreen.js # Adicionar moto
│   ├── EditMotoScreen.js # Editar moto
│   ├── AddUserScreen.js # Adicionar usuário
│   ├── EditUserScreen.js # Editar usuário
│   └── SettingsScreen.js # Configurações
├── services/            # Serviços
│   ├── api.js          # Integração com MockAPI
│   ├── storage.js      # Persistência local
│   ├── syncService.js  # Sincronização
│   └── validation.js   # Validações
├── theme/              # Sistema de design
│   ├── colors.js       # Paleta de cores
│   ├── typography.js    # Tipografia
│   ├── spacing.js      # Espaçamentos
│   └── index.js        # Tema consolidado
└── utils/              # Utilitários
    ├── constants.js    # Constantes
    ├── helpers.js      # Funções auxiliares
    └── index.js        # Exportações
```

## 🔧 Integração com MockAPI

O projeto utiliza MockAPI para desenvolvimento e testes:

- **Base URL**: `https://68d9a88d90a75154f0dae049.mockapi.io`
- **Endpoints**: `/users`, `/motos`, `/branches`
- **Autenticação**: Sistema fake integrado
- **Sincronização**: Automática entre API e AsyncStorage

## 🚀 Deploy e Atualizações

### Como Fazer Deploy no Expo

1. **Faça login no EAS:**
   ```bash
   eas login
   ```

2. **Execute o update:**
   ```bash
   eas update --branch main --message "Descrição da atualização"
   ```

3. **Acesse o Dashboard:**
   - [EAS Dashboard](https://expo.dev/accounts/coutinh00/projects/motosync)

### Informações do Deploy Atual

- **Owner**: `coutinh00`
- **Project ID**: `051321b4-c8a8-4956-a598-85618b18181c`
- **Slug**: `motosync`
- **Branch**: `main`
- **Runtime Version**: `3.2.0`

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

**MotoSync 2.0** - Desenvolvido com ❤️ pela equipe 2TDSPY - 2025
