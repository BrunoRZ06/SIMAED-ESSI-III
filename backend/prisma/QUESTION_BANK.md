# Acervo de questões SAEPE

O acervo é separado das questões geradas por IA. Cada questão mantém seu caderno de origem, número/código do item, página do PDF, alternativas, descritor sugerido e, quando necessário, um recorte visual acessível.

## Carga inicial

Foram cadastrados os 104 itens dos dois cadernos do 3º ano/série do Ensino Médio:

- 52 itens do caderno C1202, identificado pela capa como SAEPE 2015;
- 52 itens do caderno C1204, SAEPE 2021;
- imagens das páginas com figuras, gráficos e alternativas visuais, além dos recortes específicos já cadastrados para alguns itens de 2021.

O nome recebido para o PDF C1202 contém “2017”, mas o próprio caderno e os metadados internos indicam 2015. O seed registra o ano identificado no documento e conserva o nome original para rastreabilidade.

Os itens começam com `NEEDS_REVIEW`. Os descritores foram associados como sugestões a partir da habilidade observada, e não como mapeamentos oficiais das matrizes históricas. Os PDFs fornecidos não incluem gabarito; os novos itens ficam sem alternativa correta preenchida. Alguns dos dez itens cadastrados anteriormente mantêm respostas candidatas calculadas ou consultadas em fonte secundária e também precisam de validação. O item 49 de 2021 permanece sem alternativa correta cadastrada porque a resposta inferida divergiu do gabarito secundário encontrado.

Além dos 104 itens históricos, o banco contém 56 questões autorais de prática (21 de Língua Portuguesa e 35 de Matemática), separadas pela fonte `ORIGINAL_PRACTICE`. Elas não são atribuídas a provas históricas.

## Aplicar e carregar

Com `DATABASE_URL` válido no arquivo `backend/.env`, execute no diretório `backend`:

```bash
npx prisma migrate deploy
npm run seed:question-bank
```

O seed é repetível: atualiza as questões existentes e não duplica cadernos nem itens. Ele também valida se a URL inclui uma senha antes de abrir a conexão, para apresentar uma mensagem direta quando houver problema de configuração.

## Consultar

O endpoint `GET /question-bank` aceita filtros e paginação. Exemplos:

```text
GET /question-bank?stageCode=3EM&disciplineCode=MATHEMATICS
GET /question-bank?year=2021&descriptorCode=D20
GET /question-bank?reviewStatus=NEEDS_REVIEW&limit=20&offset=0
```

Imagens são servidas em `/question-assets/<caminho-do-asset>`; o endpoint inclui a URL e o texto alternativo da figura no campo `stimulus`.

Para cadastrar novos itens históricos, edite `historical-question-bank.data.ts`; itens históricos já cadastrados e as fontes ficam em `question-bank.data.ts`. Questões autorais ficam em `original-question-bank.data.ts`. Os apoios visuais ficam em `backend/public/question-assets/`. Rode novamente o seed para atualizar o banco. Antes de marcar uma questão como revisada ou usá-la em simulados reais, confira enunciado, alternativas, resposta e descritor diretamente no caderno e no gabarito oficial correspondente.
