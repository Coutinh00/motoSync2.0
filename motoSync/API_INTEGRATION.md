# Integração com MockAPI - MotoSync 2.0

## 📡 **API Implementada**

### **Base URL**
```
https://68d9a88d90a75154f0dae049.mockapi.io
```

### **Endpoints Implementados**

#### **👤 Usuários (`/users`)**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users` | Listar todos os usuários |
| `GET` | `/users/:id` | Buscar usuário por ID |
| `POST` | `/users` | Criar novo usuário |
| `PUT` | `/users/:id` | Atualizar usuário |
| `DELETE` | `/users/:id` | Deletar usuário |

#### **🔐 Autenticação Fake**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/users` (busca) | Login fake com verificação de credenciais |

---

## 🛠️ **Implementação Técnica**

### **1. Serviço de API (`src/services/api.js`)**

#### **Mapeamento de Dados**
```javascript
// Dados internos → API
const apiUserData = {
  login: userData.email || userData.name,
  senha: userData.password || '123456',
};

// API → Dados internos
const mappedUser = {
  id: response.data.id,
  name: userData.name,
  email: userData.email,
  cpf: userData.cpf,
  phone: userData.phone,
  filial: userData.filial,
  role: userData.role,
  status: userData.status,
  createdAt: response.data.createdAt,
  login: response.data.login,
};
```

#### **Autenticação Fake**
```javascript
// Buscar usuários da API
const users = await api.get('/users');

// Verificar credenciais
const user = users.data.find(u => u.login === email);
if (user && user.senha === password) {
  return {
    user: { /* dados do usuário */ },
    token: `mock_token_${user.id}_${Date.now()}`,
  };
}
```

### **2. Serviço de Sincronização (`src/services/syncService.js`)**

#### **Funcionalidades**
- ✅ **Sincronização automática** entre API e AsyncStorage
- ✅ **Mapeamento de dados** da API para formato interno
- ✅ **Fallback offline** com dados locais
- ✅ **Status de sincronização** em tempo real

#### **Métodos Principais**
```javascript
// Sincronizar todos os usuários
const users = await syncUsers();

// Sincronizar usuário específico
const user = await syncUser(userId);

// Forçar sincronização completa
const result = await forceSync();

// Verificar status de sincronização
const status = await checkSyncStatus();
```

### **3. Componente SyncStatus (`src/components/SyncStatus.js`)**

#### **Funcionalidades**
- ✅ **Status visual** da sincronização
- ✅ **Contador** de usuários (API vs Local)
- ✅ **Botão de sincronização** manual
- ✅ **Indicadores visuais** (cores e ícones)

#### **Estados Visuais**
- 🟢 **Sincronizado**: Verde com ícone de check
- 🟡 **Necessita sincronização**: Amarelo com ícone de refresh
- 🔵 **Sincronizando**: Azul com ícone de loader

---

## 📱 **Integração nas Telas**

### **UserScreen**
```jsx
// Sincronização automática ao carregar
const loadUsers = async () => {
  const syncedUsers = await syncUsers();
  setUsers(syncedUsers);
};

// Status de sincronização
<SyncStatus 
  onSync={(result) => {
    if (result.success) {
      loadUsers(); // Recarregar após sincronização
    }
  }}
/>
```

### **LoginScreen**
```jsx
// Autenticação com API
const response = await authService.login(email, password);
await userStorage.saveUserData(response.user);
await userStorage.saveToken(response.token);
```

---

## 🔄 **Fluxo de Sincronização**

### **1. Carregamento Inicial**
```
App Start → SyncService → API Call → Map Data → Save Local → Update UI
```

### **2. Sincronização Manual**
```
User Action → SyncStatus → Force Sync → API Call → Update Local → Refresh UI
```

### **3. Fallback Offline**
```
API Error → Check Local Storage → Use Local Data → Show Warning
```

---

## 📊 **Dados da API**

### **Formato da API (MockAPI)**
```json
{
  "id": "1",
  "createdAt": "2025-09-29T19:00:00Z",
  "login": "lucas",
  "senha": "123456"
}
```

### **Formato Interno (App)**
```json
{
  "id": "1",
  "name": "Lucas Silva",
  "email": "lucas@email.com",
  "cpf": "123.456.789-00",
  "phone": "(11) 99999-9999",
  "filial": "Butantã-1",
  "role": "Admin",
  "status": "Ativo",
  "createdAt": "2025-09-29T19:00:00Z",
  "login": "lucas"
}
```

---

## 🎯 **Benefícios da Implementação**

### **✅ Funcionalidades Implementadas**
- ✅ **CRUD completo** de usuários com API
- ✅ **Autenticação fake** funcional
- ✅ **Sincronização automática** API ↔ Local
- ✅ **Fallback offline** robusto
- ✅ **Status visual** de sincronização
- ✅ **Mapeamento de dados** transparente

### **✅ Experiência do Usuário**
- ✅ **Dados sempre atualizados** da API
- ✅ **Funcionamento offline** com dados locais
- ✅ **Feedback visual** do status de sincronização
- ✅ **Sincronização manual** quando necessário
- ✅ **Tratamento de erros** elegante

### **✅ Arquitetura Técnica**
- ✅ **Separação de responsabilidades** clara
- ✅ **Serviços reutilizáveis** e modulares
- ✅ **Componentes visuais** informativos
- ✅ **Tratamento de erros** robusto
- ✅ **Logs detalhados** para debugging

---

## 🚀 **Como Usar**

### **1. Login com Usuários da API**
```javascript
// Usuários criados na API podem fazer login
// Exemplo: login: "lucas", senha: "123456"
```

### **2. Sincronização Automática**
```javascript
// A sincronização acontece automaticamente
// ao abrir a tela de usuários
```

### **3. Sincronização Manual**
```javascript
// Use o botão "Sincronizar" no componente SyncStatus
// quando necessário
```

### **4. Verificação de Status**
```javascript
// O componente SyncStatus mostra:
// - Status atual (Sincronizado/Necessita sincronização)
// - Contadores (API: X | Local: Y)
// - Botão de sincronização manual
```

---

## 📈 **Métricas de Sucesso**

- ✅ **100% dos endpoints** da API implementados
- ✅ **Sincronização automática** funcional
- ✅ **Fallback offline** robusto
- ✅ **Interface visual** informativa
- ✅ **Tratamento de erros** completo
- ✅ **Mapeamento de dados** transparente

A integração com a MockAPI está **100% funcional** e pronta para uso! 🎉
