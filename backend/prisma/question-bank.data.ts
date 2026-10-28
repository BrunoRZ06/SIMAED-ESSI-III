export const questionBankSources = [
  {
    code: "SAEPE_2015_C1202_3EM",
    title: "SAEPE 2015 — Língua Portuguesa e Matemática — 3º ano do Ensino Médio",
    sourceType: "HISTORICAL",
    year: 2015,
    bookletCode: "C1202",
    stageCode: "3EM",
    originalFileName: "679082674-SAEPE-2017-C1202-1.pdf",
    sourceNotes:
      "A capa e os metadados do PDF identificam SAEPE 2015, apesar de o nome do arquivo conter 2017. Descritores sugeridos e respostas calculadas a partir dos enunciados; revisar com a matriz e o gabarito oficial da edição.",
  },
  {
    code: "SAEPE_2021_C1204_3EM",
    title: "SAEPE 2021 — Língua Portuguesa e Matemática — 3ª série do Ensino Médio",
    sourceType: "HISTORICAL",
    year: 2021,
    bookletCode: "C1204",
    stageCode: "3EM",
    originalFileName: "613780979-C1204-3EM-SAEPE-2021.pdf",
    sourceNotes:
      "Descritores sugeridos a partir das habilidades avaliadas. Respostas candidatas comparadas com gabarito secundário, ainda sem validação por fonte oficial. Imagens recortadas das páginas citadas.",
  },
  {
    code: "SAEPE_STYLE_ORIGINAL_3EM",
    title: "Banco autoral de prática — estilo SAEPE — 3º ano do Ensino Médio",
    sourceType: "ORIGINAL_PRACTICE",
    year: null,
    bookletCode: null,
    stageCode: "3EM",
    originalFileName: null,
    sourceNotes:
      "Questões autorais criadas para o projeto, com nível e formato inspirados nos cadernos SAEPE fornecidos. Não são itens de provas históricas. Cada questão cobre o descritor indicado; gabaritos são propostos e devem passar por revisão pedagógica.",
  },
  {
    code: "SAEPE_2015_RP_LP_5EF",
    title: "SAEPE 2015 — Revista Pedagógica — Língua Portuguesa — 5º ano do Ensino Fundamental",
    sourceType: "HISTORICAL",
    year: 2015,
    bookletCode: null,
    stageCode: "5EF",
    originalFileName: "PE SAEPE 2015 RP LP 5EF WEB.pdf",
    sourceNotes:
      "Itens-exemplo selecionados da Revista Pedagógica do CAEd, não correspondem a um caderno completo de aplicação. Descritores associados pela habilidade descrita no comentário pedagógico; respostas indicadas conforme o gabarito comentado. Revisão pedagógica recomendada.",
  },
  {
    code: "SAEPE_2015_RP_LP_9EF",
    title: "SAEPE 2015 — Revista Pedagógica — Língua Portuguesa — 9º ano do Ensino Fundamental",
    sourceType: "HISTORICAL",
    year: 2015,
    bookletCode: null,
    stageCode: "9EF",
    originalFileName: "PE SAEPE 2015 RP LP 9EF WEB.pdf",
    sourceNotes:
      "Itens-exemplo selecionados da Revista Pedagógica do CAEd, não correspondem a um caderno completo de aplicação. Descritores associados pela habilidade descrita no comentário pedagógico; respostas indicadas conforme o gabarito comentado. Revisão pedagógica recomendada.",
  },
  {
    code: "SAEPE_2016_RP_MT",
    title: "SAEPE 2016 — Revista do Professor — Matemática — 5º ano do Ensino Fundamental",
    sourceType: "HISTORICAL",
    year: 2016,
    bookletCode: null,
    stageCode: "5EF",
    originalFileName: "PE SAEPE 2016 RP MT WEB.pdf",
    sourceNotes:
      "Itens-exemplo selecionados da Revista do Professor do CAEd para o 5º ano, não correspondem a um caderno completo de aplicação. Descritores associados pela habilidade descrita no comentário pedagógico; respostas indicadas conforme o gabarito comentado. Questões com figura receberam descrição textual do apoio visual. Revisão pedagógica recomendada.",
  },
  {
    code: "SAEPE_2016_RP_MT_9EF",
    title: "SAEPE 2016 — Revista do Professor — Matemática — 9º ano do Ensino Fundamental",
    sourceType: "HISTORICAL",
    year: 2016,
    bookletCode: null,
    stageCode: "9EF",
    originalFileName: "PE SAEPE 2016 RP MT WEB.pdf",
    sourceNotes:
      "Itens-exemplo selecionados da Revista do Professor do CAEd para o 9º ano, não correspondem a um caderno completo de aplicação. Descritores associados pela habilidade descrita no comentário pedagógico; respostas indicadas conforme o gabarito comentado. Revisão pedagógica recomendada.",
  },
  {
    code: "AUTHORIAL_COMPLEMENT_5EF",
    title: "Questões autorais complementares — estilo SAEPE — 5º ano do Ensino Fundamental",
    sourceType: "ORIGINAL_PRACTICE",
    year: null,
    bookletCode: null,
    stageCode: "5EF",
    originalFileName: null,
    sourceNotes:
      "Questões elaboradas para preencher descritores sem itens no acervo do projeto. São exercícios autorais de prática, não questões de provas anteriores do SAEPE. Gabaritos sugeridos; recomenda-se revisão pedagógica.",
  },
  {
    code: "AUTHORIAL_COMPLEMENT_9EF",
    title: "Questões autorais complementares — estilo SAEPE — 9º ano do Ensino Fundamental",
    sourceType: "ORIGINAL_PRACTICE",
    year: null,
    bookletCode: null,
    stageCode: "9EF",
    originalFileName: null,
    sourceNotes:
      "Questões elaboradas para preencher descritores sem itens no acervo do projeto. São exercícios autorais de prática, não questões de provas anteriores do SAEPE. Gabaritos sugeridos; recomenda-se revisão pedagógica.",
  },
  {
    code: "AUTHORIAL_COMPLEMENT_2EF",
    title: "Questões autorais complementares — prática — 2º ano do Ensino Fundamental",
    sourceType: "ORIGINAL_PRACTICE",
    year: null,
    bookletCode: null,
    stageCode: "2EF",
    originalFileName: null,
    sourceNotes:
      "Questões autorais de prática elaboradas para os descritores cadastrados para o 2º ano. Não são itens de provas históricas do SAEPE. Gabaritos sugeridos; recomenda-se revisão pedagógica.",
  },
] as const;

export interface QuestionBankSeedItem {
  sourceCode: string;
  number: number;
  itemCode: string;
  disciplineCode: string;
  descriptorCode: string;
  statement: string;
  stimulusText?: string;
  stimulusAssetPath?: string;
  stimulusAltText?: string;
  pdfPageNumber: number | null;
  correctAlternative: string | null;
  answerSource: string;
  alternatives: { label: string; text: string }[];
}

export const questionBankItems: QuestionBankSeedItem[] = [
  {
    sourceCode: "SAEPE_2015_C1202_3EM",
    number: 5,
    itemCode: "M120358G5",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D19",
    statement:
      "Para colocar pisos, um pedreiro cobra um valor fixo de R$ 350,00 mais R$ 20,00 por m² de piso colocado. Gabriel contratou esse pedreiro para colocar o piso de sua cozinha, que tem 22 m² de área. Quanto Gabriel pagou ao pedreiro por esse serviço?",
    pdfPageNumber: 4,
    correctAlternative: "D",
    answerSource: "Resposta calculada a partir do enunciado; revisar com gabarito oficial.",
    alternatives: [
      { label: "A", text: "R$ 90,00" },
      { label: "B", text: "R$ 385,00" },
      { label: "C", text: "R$ 440,00" },
      { label: "D", text: "R$ 790,00" },
      { label: "E", text: "R$ 7 700,00" },
    ],
  },
  {
    sourceCode: "SAEPE_2015_C1202_3EM",
    number: 6,
    itemCode: "M120351G5",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D32",
    statement:
      "Rafael desenhou 5 faixas de mesmo tamanho em uma das paredes do seu quarto e vai pintá-las usando 3 cores diferentes de tinta, de forma que cada faixa tenha uma única cor e que faixas adjacentes não sejam de cores iguais. De quantas maneiras diferentes Rafael poderá pintar essa parede usando essas 3 cores?",
    pdfPageNumber: 5,
    correctAlternative: "D",
    answerSource: "Resposta calculada pelo princípio multiplicativo; revisar com gabarito oficial.",
    alternatives: [
      { label: "A", text: "10" },
      { label: "B", text: "15" },
      { label: "C", text: "32" },
      { label: "D", text: "48" },
      { label: "E", text: "81" },
    ],
  },
  {
    sourceCode: "SAEPE_2015_C1202_3EM",
    number: 7,
    itemCode: "M120359G5",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D13",
    statement:
      "Para fazer um experimento em sala de aula, um professor de Matemática utilizou um cone com 12 cm de altura, cujo diâmetro da base mede 10 cm. Ele preencheu todo esse cone com areia. Considerando desprezível a espessura do material, qual volume de areia, no mínimo, ele utilizou para preencher todo esse cone?",
    pdfPageNumber: 5,
    correctAlternative: "A",
    answerSource: "Resposta calculada pela fórmula do volume do cone; revisar com gabarito oficial.",
    alternatives: [
      { label: "A", text: "100π cm³" },
      { label: "B", text: "120π cm³" },
      { label: "C", text: "300π cm³" },
      { label: "D", text: "400π cm³" },
      { label: "E", text: "1 200π cm³" },
    ],
  },
  {
    sourceCode: "SAEPE_2015_C1202_3EM",
    number: 11,
    itemCode: "M120346G5",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D16",
    statement:
      "Em um plantão de pediatria, 30 crianças foram atendidas em um final de semana. Dessas crianças, 6 foram diagnosticadas com a mesma virose. Que percentual de crianças atendidas foram diagnosticadas com essa virose?",
    pdfPageNumber: 6,
    correctAlternative: "C",
    answerSource: "Resposta calculada a partir da proporção; revisar com gabarito oficial.",
    alternatives: [
      { label: "A", text: "5%" },
      { label: "B", text: "6%" },
      { label: "C", text: "20%" },
      { label: "D", text: "30%" },
      { label: "E", text: "80%" },
    ],
  },
  {
    sourceCode: "SAEPE_2021_C1204_3EM",
    number: 15,
    itemCode: "M110033E4",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D06",
    statement:
      "O plano cartesiano abaixo representa parte do mapa de uma cidade em que os estabelecimentos estão associados a pontos desse plano. Qual estabelecimento dessa cidade está associado ao ponto de coordenadas (−20, −10)?",
    stimulusAssetPath: "saepe-2021-c1204/item-15-cartesian-map.png",
    stimulusAltText:
      "Plano cartesiano com os estabelecimentos Hospital, Farmácia, Igreja, Restaurante e Cinema marcados em pontos; Igreja está em (−20, −10).",
    pdfPageNumber: 9,
    correctAlternative: "D",
    answerSource: "Gabarito secundário consultado em Studocu; confirmar com fonte oficial.",
    alternatives: [
      { label: "A", text: "Cinema." },
      { label: "B", text: "Farmácia." },
      { label: "C", text: "Hospital." },
      { label: "D", text: "Igreja." },
      { label: "E", text: "Restaurante." },
    ],
  },
  {
    sourceCode: "SAEPE_2021_C1204_3EM",
    number: 17,
    itemCode: "M120321H6",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D04",
    statement:
      "Para uma exposição de lançamento de marcas, serão colados 2 adesivos com os nomes das empresas participantes em cada uma das faces de um poliedro convexo de 16 arestas e 10 vértices, feito de papelão. Quantos adesivos ao todo serão colados nesse poliedro de papelão?",
    pdfPageNumber: 9,
    correctAlternative: "E",
    answerSource: "Gabarito secundário consultado em Studocu; confirmar com fonte oficial.",
    alternatives: [
      { label: "A", text: "52" },
      { label: "B", text: "48" },
      { label: "C", text: "44" },
      { label: "D", text: "20" },
      { label: "E", text: "16" },
    ],
  },
  {
    sourceCode: "SAEPE_2021_C1204_3EM",
    number: 18,
    itemCode: "M120408H6",
    disciplineCode: "MATHEMATICS",
    descriptorCode: "D20",
    statement:
      "Observe o gráfico de uma função f: [−3, 7] → ℝ. Quais são os zeros dessa função?",
    stimulusAssetPath: "saepe-2021-c1204/item-18-function-graph.png",
    stimulusAltText:
      "Gráfico de uma função no intervalo de −3 a 7 que cruza o eixo x nos pontos −2, 2 e 6.",
    pdfPageNumber: 10,
    correctAlternative: "E",
    answerSource: "Gabarito secundário consultado em Studocu; confirmar com fonte oficial.",
    alternatives: [
      { label: "A", text: "−5 e 4." },
      { label: "B", text: "−3, −2, 2, 6 e 7." },
      { label: "C", text: "−3 e 0." },
      { label: "D", text: "−3 e 7." },
      { label: "E", text: "−2, 2 e 6." },
    ],
  },
  {
    sourceCode: "SAEPE_2021_C1204_3EM",
    number: 33,
    itemCode: "P120865ES",
    disciplineCode: "PORTUGUESE",
    descriptorCode: "D05",
    statement:
      "Em relação ao cuidado com o meio ambiente e à arrumação do próprio quarto, o menino age de forma",
    stimulusAssetPath: "saepe-2021-c1204/item-33-comic.png",
    stimulusAltText:
      "Tirinha de Cascão. O personagem demonstra cuidado com a rua, enquanto o último quadro mostra o quarto dele desorganizado.",
    pdfPageNumber: 17,
    correctAlternative: "C",
    answerSource: "Gabarito secundário consultado em Studocu; confirmar com fonte oficial.",
    alternatives: [
      { label: "A", text: "descuidada." },
      { label: "B", text: "fingida." },
      { label: "C", text: "incoerente." },
      { label: "D", text: "organizada." },
      { label: "E", text: "responsável." },
    ],
  },
  {
    sourceCode: "SAEPE_2021_C1204_3EM",
    number: 41,
    itemCode: "P120232EX",
    disciplineCode: "PORTUGUESE",
    descriptorCode: "D18",
    statement:
      "No segundo quadrinho desse texto, a palavra “cabrum” indica o barulho",
    stimulusAssetPath: "saepe-2021-c1204/item-41-comic.png",
    stimulusAltText:
      "Tirinha em três quadros: uma personagem fica pendurada em um galho durante uma tempestade; no quadro seguinte aparece a onomatopeia “CABRUM”; no último, outra personagem a ajuda com um guarda-chuva.",
    pdfPageNumber: 22,
    correctAlternative: "A",
    answerSource: "Gabarito secundário consultado em Studocu; confirmar com fonte oficial.",
    alternatives: [
      { label: "A", text: "do início da chuva." },
      { label: "B", text: "do outro personagem chegando." },
      { label: "C", text: "do galho se quebrando." },
      { label: "D", text: "do guarda-chuva se abrindo." },
      { label: "E", text: "do personagem caindo." },
    ],
  },
  {
    sourceCode: "SAEPE_2021_C1204_3EM",
    number: 49,
    itemCode: "P120164F5",
    disciplineCode: "PORTUGUESE",
    descriptorCode: "D16",
    statement:
      "No último quadrinho, o fato de a criança dizer que vai confirmar a informação na internet indica que",
    stimulusAssetPath: "saepe-2021-c1204/item-49-comic.png",
    stimulusAltText:
      "Tirinha em que uma tia descreve as estações do ano de forma exagerada e uma criança diz que vai conferir a informação na internet.",
    pdfPageNumber: 26,
    correctAlternative: null,
    answerSource:
      "O gabarito secundário consultado aponta A, mas a leitura do item sugere C. Gabarito não importado; revisão obrigatória.",
    alternatives: [
      { label: "A", text: "a internet é um veículo digital seguro para as crianças." },
      { label: "B", text: "a internet fornece informações atualizadas sobre o clima." },
      { label: "C", text: "as crianças buscam motivos para acessar a internet." },
      { label: "D", text: "as informações sofrem mudanças o tempo todo." },
      { label: "E", text: "as mídias digitais influenciam a vida das pessoas." },
    ],
  },
];
