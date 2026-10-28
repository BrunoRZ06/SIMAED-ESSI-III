# SIMAED

Aplicativo para geração de simulados alinhados à matriz de referência do **SAEPE 2025**. O professor escolhe disciplina, série, habilidades (descritores), quantidade de questões, dificuldade e tipo de questão, e o sistema valida a configuração e registra a solicitação de geração do simulado.

Projeto desenvolvido na disciplina ESSI III (UFRPE).

## Estrutura

```
.
├── backend/    API REST (Node.js + Express + Prisma + PostgreSQL)
└── frontend/   Aplicativo mobile/web (Expo + React Native + Expo Router)
```

### Backend

| Pasta | Conteúdo |
| --- | --- |
| `src/routes` | Definição das rotas |
| `src/controllers` | Entrada das requisições HTTP |
| `src/services` | Regras de negócio (validação, criação e orquestração da geração) |
| `src/repositories` | Acesso ao banco via Prisma |
| `src/schemas` / `src/middlewares` | Validação do corpo das requisições com Zod |
| `prisma/` | Schema, migrations e seed com os descritores do SAEPE 2025 |
| `tests/` | Testes de integração (Vitest + Supertest) |

### Frontend

| Pasta | Conteúdo |
| --- | --- |
| `src/app` | Rotas do Expo Router (onboarding, login, abas, criação de simulado) |
| `src/features` | Telas e componentes por funcionalidade (`onboarding`, `mock-exam`) |
| `src/services/mockExamApi.ts` | Cliente da API |
| `src/hooks`, `src/constants` | Hooks e tema (cores, tipografia, espaçamento) |

## Pré-requisitos

- Node.js 22 ou superior
- PostgreSQL 16 (local ou hospedado, ex.: Supabase)
- Expo Go no celular, ou um emulador Android/iOS, para rodar o app

## Como rodar

### 1. Backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/simaed"
# Opcional, padrão "public"
DATABASE_SCHEMA="public"
```

Prepare o banco e suba a API:

```bash
npx prisma generate --config prisma7.config.ts
npx prisma migrate deploy --config prisma7.config.ts
npx prisma db seed --config prisma7.config.ts   # disciplinas, séries e descritores do SAEPE 2025
npm run dev
```

A API sobe em `http://localhost:3000`. Para conferir: `GET /health` retorna `{ "status": "ok" }`.

### 2. Frontend

```bash
cd frontend
npm install
```

Crie o arquivo `frontend/.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Em desenvolvimento, a aplicação adapta esse endereço automaticamente: no navegador usa o host da página Expo; no celular usa o host anunciado pelo Expo. Assim, `localhost` continua funcionando na web e não é enviado incorretamente ao celular.

Se a API estiver em outra máquina, ou se cada plataforma precisar de um endereço diferente, configure uma ou ambas as variáveis opcionais. Esses endereços são usados exatamente como informados:

```env
EXPO_PUBLIC_API_URL_WEB=http://192.168.0.10:3000
EXPO_PUBLIC_API_URL_NATIVE=http://192.168.0.10:3000
```

Inicie a API e o Expo em modo LAN; para usar um celular físico, mantenha-o na mesma rede Wi-Fi do computador e permita conexões TCP na porta `3000` no firewall. A API já escuta em `0.0.0.0:3000`.

Inicie o app:

```bash
npx expo start        # depois: "a" para Android, "i" para iOS ou "w" para web
```

## Endpoints da API

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica se a API está no ar |
| GET | `/disciplines` | Lista as disciplinas |
| GET | `/disciplines/:disciplineCode/stages` | Lista as séries da disciplina |
| GET | `/disciplines/:disciplineCode/stages/:stageCode/descriptors` | Lista as habilidades (descritores) da série |
| POST | `/mock-exams/validate` | Valida a configuração do simulado |
| POST | `/mock-exams/generate` | Cria a solicitação de geração do simulado (status inicial `PENDING`) |

Exemplo de corpo para `/mock-exams/validate` e `/mock-exams/generate`:

```json
{
  "disciplineCode": "MATHEMATICS",
  "stageCode": "9EF",
  "descriptorIds": ["<uuid-do-descritor>"],
  "questionCount": 10,
  "difficulty": "easy",
  "questionType": "new"
}
```

Valores aceitos: `questionCount` 10, 15 ou 20; `difficulty` `easy`, `medium` ou `hard`; `questionType` `previous`, `new` ou `combined`.

## Testes

Os testes do backend são de integração e usam um banco PostgreSQL real. Crie o arquivo `backend/.env.test` com um banco **separado** do de desenvolvimento, porque os testes apagam dados:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/simaed_test"
DATABASE_SCHEMA="public"
```

Aplique o schema e rode os testes:

```bash
cd backend
npm run test:db:push
npx dotenv -e .env.test -- vitest run --no-file-parallelism
```

Rode as suítes em série (`--no-file-parallelism`): a `configuration.integration.test.ts` limpa as tabelas no `beforeAll` e interfere nas outras se rodarem em paralelo.

| Suíte | Cobertura |
| --- | --- |
| `configuration.integration.test.ts` | Consulta de disciplinas, séries e descritores |
| `mock-exam-validation.integration.test.ts` | US-05: validação dos parâmetros do simulado |
| `mock-exam-generation.integration.test.ts` | US-06: solicitação de geração do simulado (CT01 a CT18) |

## Tecnologias

- **Backend:** Node.js, Express 5, Prisma 7, PostgreSQL, Zod, Vitest, Supertest
- **Frontend:** Expo 54, React Native 0.81, React 19, Expo Router, TypeScript
