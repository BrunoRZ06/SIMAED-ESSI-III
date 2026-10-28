import type { QuestionBankSeedItem } from "./question-bank.data.js";

type Draft = {
  disciplineCode: "PORTUGUESE" | "MATHEMATICS";
  descriptorCode: string;
  variant?: number;
  statement: string;
  stimulusText: string;
  choices: [string, string, string, string];
  correct: "A" | "B" | "C" | "D";
};

const sourceCode = "AUTHORIAL_COMPLEMENT_2EF";

const drafts: Draft[] = [
  // Língua Portuguesa — descritores D01 a D08.
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D01",
    stimulusText: "A professora falou: “Beto bateu a bola.”",
    statement: "Qual palavra começa com o mesmo som de “bola”?",
    choices: ["boneca", "casa", "dado", "fada"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D02",
    stimulusText: "Na placa da sala está escrita a palavra: BIBLIOTECA.",
    statement: "Qual palavra está escrita na placa?",
    choices: ["Brinquedoteca", "Biblioteca", "Bicicleta", "Biscoito"], correct: "B",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D03",
    stimulusText: "Lia levou o livro para a escola.",
    statement: "O que Lia levou para a escola?",
    choices: ["Uma bola", "Um caderno", "Um livro", "Uma boneca"], correct: "C",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D04",
    stimulusText: "O cachorro Pipoca dorme em uma caminha azul na varanda.",
    statement: "Onde Pipoca dorme?",
    choices: ["No quarto", "Na varanda", "Na cozinha", "No quintal do vizinho"], correct: "B",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D05",
    stimulusText: "CONVITE\nVenha comemorar os 8 anos de Bia!\nSábado, às 15 horas, no salão do prédio.",
    statement: "Para que serve esse texto?",
    choices: ["Ensinar uma receita", "Convidar para uma festa", "Contar uma aventura", "Dar uma notícia sobre o tempo"], correct: "B",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D06",
    stimulusText: "No sábado, Davi foi à praia com a família. Ele brincou na areia, tomou banho de mar e viu conchas bem pequenas.",
    statement: "Qual é o assunto principal do texto?",
    choices: ["Um passeio de Davi à praia", "Uma visita ao zoológico", "A preparação de um bolo", "Uma partida de futebol"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D07",
    stimulusText: "Quando ouviu o trovão e viu a chuva começar, Nina fechou a janela e pegou uma toalha para secar o chão.",
    statement: "Por que Nina pegou a toalha?",
    choices: ["Para limpar a água que entrou", "Para tomar banho", "Para cobrir a mesa do almoço", "Para brincar de esconder"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D08",
    stimulusText: "Imagine uma placa com o desenho de um copo cheio de água e uma seta apontando para a torneira, ao lado das palavras: “Feche após usar”.",
    statement: "O que a placa pede às pessoas?",
    choices: ["Que deixem a torneira aberta", "Que economizem água fechando a torneira", "Que encham o copo de refrigerante", "Que levem a torneira para casa"], correct: "B",
  },

  // Questões autorais extras para aumentar o conjunto disponível no modo “anteriores”.
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D01", variant: 2,
    stimulusText: "A professora mostrou as figuras de uma mala, uma mesa e uma bola.",
    statement: "Qual palavra começa com o som representado pela letra B?",
    choices: ["Mala", "Mesa", "Bola", "Casa"], correct: "C",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D01", variant: 3,
    stimulusText: "As palavras pato, panela e pipoca começam com a mesma letra.",
    statement: "Qual letra representa o primeiro som dessas palavras?",
    choices: ["P", "B", "T", "M"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D02", variant: 2,
    stimulusText: "No cartão está escrita a palavra: FORMIGA.",
    statement: "Qual palavra você deve ler no cartão?",
    choices: ["Fogueira", "Formiga", "Farinha", "Fofoca"], correct: "B",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D03", variant: 2,
    stimulusText: "O menino guardou o brinquedo na caixa.",
    statement: "O que o menino fez?",
    choices: ["Abriu a janela", "Guardou o brinquedo", "Lavou a caixa", "Comprou um livro"], correct: "B",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D04", variant: 2,
    stimulusText: "A gata Mimi tem pelo branco e gosta de dormir no sofá da sala.",
    statement: "Onde Mimi gosta de dormir?",
    choices: ["No sofá da sala", "Na cama do cachorro", "Na varanda", "Dentro do armário"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D04", variant: 3,
    stimulusText: "A aula de música começa às nove horas, na sala azul.",
    statement: "A que horas começa a aula de música?",
    choices: ["Às oito horas", "Às nove horas", "Às dez horas", "Ao meio-dia"], correct: "B",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D05", variant: 2,
    stimulusText: "RECEITA DE SALADA DE FRUTAS\n1. Lave as frutas.\n2. Peça ajuda a um adulto para cortá-las.\n3. Coloque tudo em uma tigela e misture.",
    statement: "Qual é a finalidade desse texto?",
    choices: ["Ensinar a preparar uma salada de frutas", "Convidar alguém para uma festa", "Contar uma história de frutas", "Avisar que a escola está fechada"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D06", variant: 2,
    stimulusText: "No jardim, as abelhas visitam as flores. Elas levam pólen de uma flor para outra e ajudam algumas plantas a formar frutos.",
    statement: "Qual é o assunto principal do texto?",
    choices: ["Como as abelhas ajudam as plantas", "Como construir um jardim", "Os brinquedos preferidos das abelhas", "Uma viagem de ônibus"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D07", variant: 2,
    stimulusText: "Bia colocou o casaco, pegou o guarda-chuva e saiu de casa. Na rua, as pessoas caminhavam protegendo a cabeça da água.",
    statement: "O que provavelmente estava acontecendo?",
    choices: ["Estava chovendo", "Estava nevando", "Todos estavam indo à praia", "Era hora de dormir"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D07", variant: 3,
    stimulusText: "Rafa abriu a mochila, tirou o caderno e começou a copiar a tarefa escrita no quadro.",
    statement: "Onde Rafa provavelmente está?",
    choices: ["Em uma sala de aula", "Em uma piscina", "Em um supermercado", "Em um parque de diversão"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D08", variant: 2,
    stimulusText: "Imagine o desenho de uma lixeira azul com uma garrafa de plástico sendo colocada dentro. Na lixeira está escrito: “Recicláveis”.",
    statement: "O que a imagem e a palavra indicam que deve ser feito com a garrafa?",
    choices: ["Colocá-la na lixeira de recicláveis", "Deixá-la no chão", "Enchê-la com terra", "Guardá-la dentro de um livro"], correct: "A",
  },
  {
    disciplineCode: "PORTUGUESE", descriptorCode: "D08", variant: 3,
    stimulusText: "Imagine um cartaz com o desenho de uma torneira pingando e uma gota riscada por uma linha vermelha. O cartaz diz: “Não desperdice”.",
    statement: "Qual mensagem o cartaz transmite?",
    choices: ["É importante economizar água", "A torneira deve ficar pingando", "A água não pode ser usada para beber", "As gotas devem ser pintadas de vermelho"], correct: "A",
  },

  // Matemática — descritores D01 a D33.
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D01",
    stimulusText: "Na chamada, a professora conta 24 estudantes. No armário, a etiqueta da turma é 2B.",
    statement: "Na situação, o número 24 indica uma quantidade. O que o código 2B indica?",
    choices: ["A quantidade de estudantes", "A identificação da turma", "A idade da professora", "A ordem de chegada"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D02",
    stimulusText: "Na fila da cantina, Rui é o 1º, Sara é a 2ª, Tomás é o 3º e Val é a 4ª pessoa.",
    statement: "Qual é a posição de Tomás na fila?",
    choices: ["1º", "2º", "3º", "4º"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D03",
    stimulusText: "A biblioteca da escola recebeu duzentos e quarenta e seis livros.",
    statement: "Como esse número é escrito usando algarismos?",
    choices: ["264", "246", "206", "426"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D04",
    stimulusText: "A turma A juntou 18 tampinhas para uma campanha. A turma B juntou 23 tampinhas.",
    statement: "Qual turma juntou mais tampinhas?",
    choices: ["Turma A", "Turma B", "As duas juntaram a mesma quantidade", "Não é possível comparar"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D05",
    stimulusText: "Na reta numérica, os números marcados são 135, 150 e 168.",
    statement: "Qual desses números é o maior?",
    choices: ["135", "150", "168", "São todos iguais"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D06",
    stimulusText: "O número 372 está escrito no quadro.",
    statement: "Qual é o valor do algarismo 7 nesse número?",
    choices: ["7 unidades", "7 dezenas", "7 centenas", "70 centenas"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D07",
    stimulusText: "Pedro tinha 128 figurinhas e ganhou mais 37. Depois, deu 20 figurinhas ao irmão.",
    statement: "Com quantas figurinhas Pedro ficou?",
    choices: ["135", "145", "165", "185"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D08",
    stimulusText: "Uma caixa tem 3 centenas, 4 dezenas e 2 unidades de lápis representados em uma contagem.",
    statement: "Qual adição mostra a decomposição de 342?",
    choices: ["300 + 40 + 2", "30 + 4 + 2", "300 + 4 + 20", "3 + 4 + 2"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D09",
    stimulusText: "Na horta havia 46 cenouras. A turma colheu 18 para preparar o almoço.",
    statement: "Quantas cenouras ficaram na horta?",
    choices: ["28", "32", "54", "64"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D10",
    stimulusText: "A professora distribuiu 4 caixas com 5 lápis em cada uma.",
    statement: "Quantos lápis foram distribuídos ao todo?",
    choices: ["9", "15", "20", "25"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D11",
    stimulusText: "Caio resolveu 23 + 15 assim: “20 + 10 = 30 e 3 + 5 = 8; então 30 + 8 = 38”.",
    statement: "A explicação de Caio está correta?",
    choices: ["Sim, porque ele somou dezenas e unidades", "Não, porque 20 + 10 é 40", "Não, porque 3 + 5 é 15", "Sim, mas o resultado deveria ser 48"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D12",
    stimulusText: "Na mesa há figuras de círculos vermelhos, círculos azuis e triângulos vermelhos.",
    statement: "Qual grupo reúne apenas figuras vermelhas?",
    choices: ["Círculos vermelhos e triângulos vermelhos", "Círculos vermelhos e círculos azuis", "Apenas círculos azuis", "Apenas triângulos azuis"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D13",
    stimulusText: "Observe a sequência: 10, 20, 30, 40.",
    statement: "O que todos esses números têm em comum?",
    choices: ["Todos são pares e terminam em zero", "Todos são ímpares", "Todos têm algarismo das unidades igual a 5", "Todos são menores que 10"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D14",
    stimulusText: "Uma sequência de cartões mostra: 2, 4, 6, 8.",
    statement: "Qual regra foi usada para formar a sequência?",
    choices: ["Acrescentar 1", "Acrescentar 2", "Retirar 2", "Multiplicar por 3"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D15",
    stimulusText: "Na sequência 5, 10, __, 20, 25, os números aumentam de 5 em 5.",
    statement: "Qual número está faltando?",
    choices: ["12", "14", "15", "18"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D16",
    stimulusText: "No mapa quadriculado, a escola está no quadrado B2. A biblioteca fica um quadrado à direita da escola.",
    statement: "Em qual quadrado fica a biblioteca?",
    choices: ["A2", "B1", "B3", "C2"], correct: "D",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D17",
    stimulusText: "Uma bola de futebol tem formato arredondado e não possui pontas nem faces planas.",
    statement: "Com qual sólido geométrico ela mais se parece?",
    choices: ["Cubo", "Esfera", "Pirâmide", "Bloco retangular"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D18",
    stimulusText: "Uma janela tem quatro lados, com lados opostos do mesmo tamanho e quatro cantos retos.",
    statement: "Qual figura plana lembra o formato da janela?",
    choices: ["Triângulo", "Círculo", "Retângulo", "Esfera"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D19",
    stimulusText: "No desenho da sala, a porta está ao sul da mesa. Para ir da mesa até a porta, Ana deve andar para baixo no desenho.",
    statement: "Que deslocamento Ana deve fazer?",
    choices: ["Andar para cima", "Andar para baixo", "Andar para a direita", "Ficar no mesmo lugar"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D20",
    stimulusText: "Uma fita vermelha mede 35 cm e uma fita azul mede 28 cm.",
    statement: "Qual fita é mais comprida?",
    choices: ["A vermelha", "A azul", "As duas têm o mesmo comprimento", "Não dá para saber"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D21",
    stimulusText: "Uma garrafa pequena cabe em torno de 1 litro de água. Um balde grande cabe em torno de 10 litros.",
    statement: "Qual recipiente provavelmente tem maior capacidade?",
    choices: ["A garrafa", "O balde", "Os dois têm a mesma capacidade", "Nenhum pode guardar água"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D22",
    stimulusText: "Em uma régua desenhada, o início do lápis está alinhado ao 0 e sua ponta está alinhada ao 8 cm.",
    statement: "Qual é o comprimento indicado para o lápis?",
    choices: ["6 cm", "7 cm", "8 cm", "9 cm"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D23",
    stimulusText: "A turma quer descobrir quanto tempo dura o recreio.",
    statement: "Qual instrumento é mais adequado para medir esse tempo?",
    choices: ["Balança", "Relógio", "Régua", "Copo medidor"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D24",
    stimulusText: "Lara acorda, toma café da manhã, vai à escola e, depois das aulas, volta para casa.",
    statement: "Qual acontecimento ocorre primeiro?",
    choices: ["Voltar para casa", "Ir à escola", "Tomar café da manhã", "Acordar"], correct: "D",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D25",
    stimulusText: "No calendário, o aniversário de Leo está marcado para o dia 12 de maio.",
    statement: "Em qual mês Leo faz aniversário?",
    choices: ["Março", "Abril", "Maio", "Junho"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D26",
    stimulusText: "Uma moeda de 1 real vale o mesmo que duas moedas de 50 centavos.",
    statement: "Quanto valem juntas duas moedas de 50 centavos?",
    choices: ["50 centavos", "75 centavos", "1 real", "2 reais"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D27",
    stimulusText: "A feira de ciências começou em 3 de junho e terminou em 5 de junho. Conte os dias do início ao término: 3, 4 e 5.",
    statement: "Quantos dias durou a feira, contando o primeiro e o último dia?",
    choices: ["2 dias", "3 dias", "4 dias", "5 dias"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D28",
    stimulusText: "O filme começou às 14 horas e terminou às 16 horas.",
    statement: "Quanto tempo durou o filme?",
    choices: ["1 hora", "2 horas", "3 horas", "4 horas"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D29",
    stimulusText: "Beto comprou um suco por 3 reais e pagou com uma nota de 5 reais.",
    statement: "Quanto Beto recebeu de troco?",
    choices: ["1 real", "2 reais", "3 reais", "8 reais"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D30",
    stimulusText: "Dentro de um saco há somente bolas azuis. Uma criança vai retirar uma bola sem olhar.",
    statement: "Retirar uma bola azul é um resultado...",
    choices: ["Impossível", "Pouco provável", "Certo", "Surpreendente e impossível"], correct: "C",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D31",
    stimulusText: "Livro lido por cada criança: Ana — 3; Beto — 5; Caio — 2.",
    statement: "Quem leu mais livros?",
    choices: ["Ana", "Beto", "Caio", "Todos leram a mesma quantidade"], correct: "B",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D32",
    stimulusText: "Em um gráfico de barras sobre frutas favoritas, a barra da maçã chega a 6 votos, a da banana a 4 e a da uva a 3.",
    statement: "Qual fruta recebeu mais votos?",
    choices: ["Maçã", "Banana", "Uva", "Todas receberam a mesma quantidade"], correct: "A",
  },
  {
    disciplineCode: "MATHEMATICS", descriptorCode: "D33",
    stimulusText: "A turma perguntou a 10 colegas qual animal de estimação preferiam e anotou quantos escolheram cachorro, gato e peixe.",
    statement: "Qual é uma boa maneira de organizar e mostrar essas respostas?",
    choices: ["Uma tabela com cada animal e sua quantidade de votos", "Uma lista sem nomes nem números", "Um desenho de um único animal", "Uma conta de subtração sem os dados"], correct: "A",
  },
];

let extraPortugueseNumber = 0;

export const secondGradePracticeItems: QuestionBankSeedItem[] = drafts.map((draft) => {
  const descriptorNumber = Number(draft.descriptorCode.slice(1));
  const number = draft.disciplineCode === "MATHEMATICS"
    ? 8 + descriptorNumber
    : draft.variant
      ? 41 + ++extraPortugueseNumber
      : descriptorNumber;

  return {
    sourceCode,
    number,
    itemCode: `AUT-2EF-${draft.disciplineCode === "PORTUGUESE" ? "LP" : "MT"}-${draft.descriptorCode}${draft.variant ? `-V${draft.variant}` : ""}`,
    disciplineCode: draft.disciplineCode,
    descriptorCode: draft.descriptorCode,
    statement: draft.statement,
    stimulusText: draft.stimulusText,
    pdfPageNumber: null,
    correctAlternative: draft.correct,
    answerSource: "Gabarito sugerido para questão autoral de prática do 2º ano; pendente de revisão pedagógica.",
    alternatives: draft.choices.map((text, choiceIndex) => ({ label: "ABCD"[choiceIndex]!, text })),
  };
});
