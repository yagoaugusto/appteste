# Reminder App - Agenda de Lembretes

Um aplicativo React Native elegante e funcional para gerenciar lembretes com banco de dados local.

![Metro Bundler](https://github.com/user-attachments/assets/cf688391-727d-4c79-9b64-c9beb76c8606)

## 📱 Funcionalidades

- ✅ **Interface Moderna**: Design bonito e organizado com Material Design
- ✅ **Multiplataforma**: Funciona em Android e iOS
- ✅ **Banco de Dados Local**: Armazenamento persistente usando AsyncStorage
- ✅ **CRUD Completo**: Criar, visualizar, editar e excluir lembretes
- ✅ **Data e Hora**: Seletor de data e hora integrado
- ✅ **Status de Conclusão**: Marcar lembretes como concluídos
- ✅ **Notificações Visuais**: Indicadores para lembretes vencidos
- ✅ **Pull-to-Refresh**: Atualizar lista puxando para baixo
- ✅ **Estatísticas**: Visualizar lembretes pendentes e concluídos
- ✅ **Estado Vazio**: Mensagem amigável quando não há lembretes

## 🛠️ Tecnologias Utilizadas

- **React Native 0.81**: Framework para desenvolvimento mobile
- **TypeScript**: Tipagem estática para JavaScript
- **AsyncStorage**: Banco de dados local
- **React Native SafeAreaContext**: Área segura para diferentes dispositivos
- **React Native DateTimePicker**: Seletor de data e hora nativo
- **UUID**: Geração de IDs únicos
- **Jest**: Framework de testes

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 20 ou superior)
- React Native CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/yagoaugusto/appteste.git
cd appteste
```

2. Instale as dependências:
```bash
npm install
```

### Para Android

1. Inicie o Metro bundler:
```bash
npm start
```

2. Em outro terminal, execute:
```bash
npm run android
```

### Para iOS

1. Instale os pods (apenas para iOS):
```bash
cd ios
pod install
cd ..
```

2. Inicie o Metro bundler:
```bash
npm start
```

3. Em outro terminal, execute:
```bash
npm run ios
```

## 🧪 Testes

Execute os testes unitários:
```bash
npm test
```

Execute o linting:
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ReminderItem.tsx      # Componente de item individual
│   ├── ReminderForm.tsx      # Formulário para criar/editar
│   └── DemoData.tsx          # Dados de demonstração
├── services/
│   └── ReminderService.ts    # Serviço para operações CRUD
├── types/
│   └── Reminder.ts           # Tipos TypeScript
└── utils/
    └── dateUtils.ts          # Utilitários para datas
```

## 💾 Modelo de Dados

```typescript
interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🎨 Design e UX

- **Cores**: Paleta azul e verde para estados diferentes
- **Tipografia**: Hierarquia clara com diferentes pesos
- **Espaçamento**: Layout responsivo com espaçamentos consistentes
- **Feedback Visual**: Indicadores de estado (pendente, concluído, vencido)
- **Animações**: Transições suaves e feedback tátil

## 📱 Funcionalidades Principais

### 1. Lista de Lembretes
- Visualização ordenada por data/hora
- Indicadores visuais para status
- Pull-to-refresh para atualizar
- Estatísticas no topo

### 2. Criar/Editar Lembrete
- Formulário modal elegante
- Validação de campos obrigatórios
- Seletores nativos de data/hora
- Interface responsiva

### 3. Gerenciamento
- Marcar como concluído com um toque
- Editar ao tocar no item
- Excluir com confirmação
- Ordenação automática

## 🔧 Configuração de Desenvolvimento

### Scripts Disponíveis

- `npm start`: Inicia o Metro bundler
- `npm run android`: Executa no Android
- `npm run ios`: Executa no iOS
- `npm test`: Executa os testes
- `npm run lint`: Verifica o código com ESLint

### Ambiente de Desenvolvimento

- ESLint configurado para React Native
- Prettier para formatação de código
- Jest para testes unitários
- TypeScript para tipagem estática

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ usando React Native