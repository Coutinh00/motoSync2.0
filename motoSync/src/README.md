# Arquitetura do MotoSync

Este documento descreve a estrutura e organização do código do aplicativo MotoSync.

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.js       # Botão padronizado
│   ├── Input.js        # Campo de entrada padronizado
│   ├── Card.js         # Card padronizado
│   ├── StatusBadge.js  # Badge de status
│   ├── Header.js       # Header padronizado
│   ├── LoadingSpinner.js # Spinner de carregamento
│   └── index.js        # Exportações dos componentes
├── contexts/           # Contextos React
│   └── ThemeContext.js # Contexto do tema
├── screens/           # Telas da aplicação
│   ├── LoginScreen.js
│   ├── FleetScreen.js
│   ├── UserScreen.js
│   └── ...
├── services/          # Serviços e APIs
│   ├── api.js         # Integração com API
│   ├── storage.js     # Persistência local
│   └── validation.js  # Validações
├── theme/            # Sistema de design
│   ├── colors.js     # Paleta de cores
│   ├── typography.js # Tipografia
│   ├── spacing.js    # Espaçamentos
│   └── index.js      # Tema consolidado
├── utils/            # Utilitários
│   ├── helpers.js    # Funções auxiliares
│   ├── constants.js  # Constantes
│   └── index.js      # Exportações
└── README.md         # Esta documentação
```

## 🎨 Sistema de Design

### Cores
- **Primárias**: Azul (#007BFF) para ações principais
- **Secundárias**: Cinza (#6C757D) para elementos secundários
- **Status**: Verde (sucesso), Amarelo (aviso), Vermelho (erro)
- **Neutras**: Escala de cinzas para textos e fundos

### Tipografia
- **Títulos**: H1-H6 com pesos e tamanhos consistentes
- **Corpo**: Texto principal com altura de linha otimizada
- **Interface**: Labels, botões e elementos de UI padronizados

### Espaçamento
- **Base**: Múltiplos de 4px para consistência
- **Componentes**: Padding e margin padronizados
- **Layout**: Espaçamentos específicos para diferentes contextos

## 🧩 Componentes Reutilizáveis

### Button
```jsx
<Button
  variant="primary"    // primary, secondary, outline, disabled
  size="medium"        // small, medium, large
  title="Entrar"
  onPress={handlePress}
  disabled={false}
/>
```

### Input
```jsx
<Input
  label="Email"
  placeholder="Digite seu email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  required
  leftIcon={<Icon name="email" />}
/>
```

### Card
```jsx
<Card variant="elevated">
  <Text>Conteúdo do card</Text>
</Card>
```

### StatusBadge
```jsx
<StatusBadge
  status="ready"       // ready, lightDamage, heavyDamage, active, pending
  text="Prontas"
  size="medium"        // small, medium, large
/>
```

## 🔧 Serviços

### API Service
- Integração com MockAPI
- Tratamento de erros
- Timeout e retry automático
- Interceptors para autenticação

### Storage Service
- AsyncStorage para persistência local
- Sincronização com API
- Fallback offline
- Cache inteligente

### Validation Service
- Validações de formulário
- Mensagens de erro personalizadas
- Validação em tempo real
- Suporte a diferentes tipos de dados

## 📱 Contextos

### ThemeContext
- Fornece acesso ao tema global
- Hook `useTheme()` para componentes
- Cores, tipografia e espaçamentos centralizados
- Facilita mudanças de tema futuras

## 🛠️ Utilitários

### Helpers
- Formatação de dados (telefone, CPF, placa)
- Validações comuns
- Funções de data/hora
- Debounce e throttle

### Constants
- Status de motos e usuários
- Configurações da API
- Chaves de storage
- Mensagens de erro e sucesso

## 📋 Padrões de Código

### Nomenclatura
- **Componentes**: PascalCase (Button, Input)
- **Funções**: camelCase (handleLogin, formatPhone)
- **Constantes**: UPPER_SNAKE_CASE (API_CONFIG)
- **Arquivos**: PascalCase para componentes, camelCase para utilitários

### Estrutura de Componentes
```jsx
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// 2. Componente
const MyComponent = ({ prop1, prop2 }) => {
  const theme = useTheme();
  
  return (
    <View style={[theme.components.card, styles.container]}>
      <Text style={theme.text.title}>Título</Text>
    </View>
  );
};

// 3. Estilos locais
const styles = StyleSheet.create({
  container: {
    // Estilos específicos
  },
});

// 4. Export
export default MyComponent;
```

### Comentários
- Documentação JSDoc para funções públicas
- Comentários explicativos para lógica complexa
- README.md em cada pasta importante

## 🚀 Benefícios da Arquitetura

### Consistência
- Design system unificado
- Componentes padronizados
- Cores e tipografia consistentes

### Manutenibilidade
- Código modular e organizado
- Separação de responsabilidades
- Fácil localização de funcionalidades

### Reutilização
- Componentes reutilizáveis
- Utilitários compartilhados
- Padrões estabelecidos

### Escalabilidade
- Estrutura preparada para crescimento
- Fácil adição de novas funcionalidades
- Sistema de tema extensível

## 📚 Próximos Passos

1. **Testes**: Implementar testes unitários e de integração
2. **Internacionalização**: Suporte a múltiplos idiomas
3. **Tema Escuro**: Implementar modo escuro
4. **Performance**: Otimizações de renderização
5. **Acessibilidade**: Melhorar suporte a acessibilidade
