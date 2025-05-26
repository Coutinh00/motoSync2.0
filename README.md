# MotoSync 2.0

O MotoSync 2.0 é um aplicativo móvel desenvolvido para gerenciamento de frota de motocicletas, oferecendo uma solução completa para monitoramento e controle de veículos.

## Funcionalidades Principais

- **Dashboard Intuitivo**: Visualização rápida de estatísticas e status da frota
- **Gestão de Motos**: 
  - Listagem completa de motocicletas
  - Detalhes de cada veículo (placa, modelo, chassi, RFID)
  - Status em tempo real (Prontas, Dano Leve, Dano Grave)
  - Localização e filial
- **Sistema de Login**: Autenticação segura para acesso ao sistema
- **Interface Responsiva**: Design moderno e adaptável para diferentes dispositivos

## Como rodar o projeto

1. Certifique-se de ter o Node.js e o Expo CLI instalados.
2. Navegue até a pasta `motoSync` no terminal: `cd motoSync`
3. Instale as dependências: `npm install` (ou `yarn install`)
4. Inicie o projeto com cache limpo: `npx expo start -c`
5. Use o aplicativo Expo Go no seu celular ou um emulador para escanear o código QR no terminal.

## Credenciais de Teste

Para acessar o aplicativo:
- **Email:** teste@example.com
- **Senha:** 123456

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- Expo Vector Icons
- Estilização com StyleSheet

## Estrutura do Projeto

- `/src/screens`: Telas principais do aplicativo
- `/src/components`: Componentes reutilizáveis
- `/src/navigation`: Configuração de navegação
- `/src/assets`: Recursos estáticos (imagens, ícones)

## Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 