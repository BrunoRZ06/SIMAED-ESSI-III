import type { QuestionBankSeedItem } from "./question-bank.data.js";

const sourceCode = "SAEPE_STYLE_ORIGINAL_3EM";
let number = 0;

function item(
  disciplineCode: "PORTUGUESE" | "MATHEMATICS",
  descriptorCode: string,
  stimulusText: string,
  statement: string,
  choices: [string, string, string, string, string],
  correct: "A" | "B" | "C" | "D" | "E",
): QuestionBankSeedItem {
  number += 1;
  const prefix = disciplineCode === "MATHEMATICS" ? "M" : "P";
  return {
    sourceCode,
    number,
    itemCode: `AUT-${prefix}-${descriptorCode}`,
    disciplineCode,
    descriptorCode,
    stimulusText,
    statement,
    pdfPageNumber: null,
    correctAlternative: correct,
    answerSource: "Gabarito proposto para questão autoral; recomenda-se revisão pedagógica.",
    alternatives: choices.map((text, index) => ({ label: "ABCDE"[index]!, text })),
  };
}

export const originalPracticeItems: QuestionBankSeedItem[] = [
  // Matemática — descritores D01 a D35.
  item("MATHEMATICS", "D01", "Uma estudante de 1,60 m projeta uma sombra de 2 m. No mesmo instante, uma árvore projeta sombra de 7,5 m.", "Considerando os triângulos semelhantes formados, qual é a altura da árvore?", ["5 m", "6 m", "7,5 m", "9,5 m", "12 m"], "B"),
  item("MATHEMATICS", "D02", "Em um triângulo retângulo, a altura relativa à hipotenusa divide-a em dois segmentos de 9 cm e 16 cm.", "Qual é a medida dessa altura?", ["5 cm", "10 cm", "12 cm", "13 cm", "25 cm"], "C"),
  item("MATHEMATICS", "D03", "Uma embalagem é montada com uma peça retangular e duas peças circulares congruentes, uma para cada extremidade.", "Qual sólido geométrico essa planificação forma?", ["Cone", "Cilindro", "Esfera", "Pirâmide", "Prisma triangular"], "B"),
  item("MATHEMATICS", "D04", "Um poliedro convexo possui 8 vértices e 12 arestas.", "Quantas faces ele possui?", ["4", "5", "6", "8", "12"], "C"),
  item("MATHEMATICS", "D05", "Uma escada de 10 m está apoiada no chão e forma um ângulo de 30° com a horizontal. Considere sen 30° = 0,5.", "A que altura do chão chega a extremidade superior da escada?", ["3 m", "5 m", "5√3 m", "8,66 m", "10 m"], "B"),
  item("MATHEMATICS", "D06", "Em um mapa cartesiano, os pontos estão identificados assim: A(−3, 2), B(2, −3), C(3, 2) e D(−2, −3).", "Qual ponto está localizado no terceiro quadrante?", ["A", "B", "C", "D", "Nenhum"], "D"),
  item("MATHEMATICS", "D07", "Uma reta é representada pela função y = 2x − 3.", "Qual é o coeficiente angular dessa reta?", ["−3", "−2", "0", "2", "3"], "D"),
  item("MATHEMATICS", "D08", "Uma reta passa pelos pontos (1, 3) e (3, 7).", "Qual função afim representa essa reta?", ["y = x + 2", "y = 2x + 1", "y = 2x − 1", "y = 3x", "y = 4x − 1"], "B"),
  item("MATHEMATICS", "D09", "Duas retas de um sistema são dadas por y = x + 1 e y = −x + 5.", "Em que ponto elas se cruzam?", ["(1, 2)", "(2, 3)", "(3, 2)", "(4, 1)", "(5, 0)"], "B"),
  item("MATHEMATICS", "D10", "Uma circunferência tem centro C(2, −1) e raio 3.", "Qual equação representa essa circunferência no plano cartesiano?", ["(x + 2)² + (y − 1)² = 3", "(x − 2)² + (y + 1)² = 9", "(x − 2)² + (y + 1)² = 3", "(x + 2)² + (y − 1)² = 9", "x² + y² = 9"], "B"),
  item("MATHEMATICS", "D11", "Uma quadra retangular mede 12 m de comprimento e 7 m de largura.", "Quantos metros de tela são necessários para cercar toda a quadra?", ["19 m", "28 m", "38 m", "84 m", "168 m"], "C"),
  item("MATHEMATICS", "D12", "Um terreno tem formato de trapézio, com bases paralelas de 10 m e 6 m e altura de 4 m.", "Qual é a área desse terreno?", ["16 m²", "24 m²", "32 m²", "40 m²", "64 m²"], "C"),
  item("MATHEMATICS", "D13", "Um reservatório cilíndrico tem raio da base igual a 3 m e altura igual a 5 m.", "Qual é o volume do reservatório?", ["15π m³", "30π m³", "45π m³", "75π m³", "90π m³"], "C"),
  item("MATHEMATICS", "D14", "Na reta numérica, considere √5 ≈ 2,24.", "Entre quais números inteiros consecutivos está √5?", ["Entre 0 e 1", "Entre 1 e 2", "Entre 2 e 3", "Entre 3 e 4", "Entre 4 e 5"], "C"),
  item("MATHEMATICS", "D15", "Seis máquinas iguais concluem um serviço em 10 horas. Todas trabalham no mesmo ritmo.", "Em quanto tempo 12 máquinas iguais concluem esse serviço?", ["2 horas", "5 horas", "10 horas", "12 horas", "20 horas"], "B"),
  item("MATHEMATICS", "D16", "Uma mochila que custava R$ 250,00 recebeu desconto de 20%.", "Qual é o preço da mochila após o desconto?", ["R$ 50,00", "R$ 180,00", "R$ 200,00", "R$ 230,00", "R$ 300,00"], "C"),
  item("MATHEMATICS", "D17", "Considere a equação x² − 5x + 6 = 0.", "Qual é a maior raiz dessa equação?", ["1", "2", "3", "5", "6"], "C"),
  item("MATHEMATICS", "D18", "Uma função associa os valores da tabela: x = 0, 1, 2 e f(x) = 4, 7, 10, respectivamente.", "Qual expressão pode representar essa função?", ["f(x) = 3x + 4", "f(x) = 4x + 3", "f(x) = x + 4", "f(x) = 3x − 4", "f(x) = x² + 4"], "A"),
  item("MATHEMATICS", "D19", "Uma corrida de táxi custa R$ 6,00 de bandeirada mais R$ 3,00 por quilômetro percorrido.", "Qual será o valor de uma corrida de 8 km?", ["R$ 18,00", "R$ 24,00", "R$ 30,00", "R$ 32,00", "R$ 48,00"], "C"),
  item("MATHEMATICS", "D20", "O gráfico de uma função corta o eixo x exatamente nos pontos de abscissas −2 e 3.", "Quais são os zeros dessa função?", ["−2 e 3", "−3 e 2", "0 e 3", "−2 e 0", "−2, 0 e 3"], "A"),
  item("MATHEMATICS", "D21", "Um reservatório vazio começa a ser preenchido por uma bomba que mantém vazão constante. O eixo horizontal representa o tempo e o vertical, o volume de água.", "Qual gráfico representa essa situação desde o início do enchimento?", ["Uma reta crescente que parte da origem", "Uma reta decrescente que parte da origem", "Uma reta horizontal acima da origem", "Uma curva decrescente", "Uma reta crescente que começa em volume negativo"], "A"),
  item("MATHEMATICS", "D22", "Em uma progressão aritmética, o termo geral é aₙ = 3n + 2.", "Qual é o oitavo termo dessa progressão?", ["24", "25", "26", "27", "29"], "C"),
  item("MATHEMATICS", "D23", "Uma reta tem equação y = −2x + 4.", "Qual descrição corresponde ao gráfico dessa reta?", ["Crescente e intercepta o eixo y em 4", "Decrescente e intercepta o eixo y em 4", "Decrescente e intercepta o eixo y em −2", "Horizontal e intercepta o eixo y em 4", "Crescente e intercepta o eixo y em −2"], "B"),
  item("MATHEMATICS", "D24", "Uma reta no gráfico passa pelos pontos (0, −2) e (2, 2).", "Qual é a lei da função representada?", ["f(x) = 2x − 2", "f(x) = 2x + 2", "f(x) = x − 2", "f(x) = −2x + 2", "f(x) = 4x − 2"], "A"),
  item("MATHEMATICS", "D25", "A altura h, em metros, de uma bola após t segundos é dada por h(t) = −2t² + 8t + 1.", "Qual é a altura máxima atingida pela bola?", ["1 m", "7 m", "8 m", "9 m", "17 m"], "D"),
  item("MATHEMATICS", "D26", "Uma equação pode ser escrita como (x − 1)(x + 4)(x − 2) = 0.", "Quais são suas raízes?", ["−4, 1 e 2", "−2, −1 e 4", "1 e 2", "−4 e 2", "−1, 1 e 4"], "A"),
  item("MATHEMATICS", "D27", "Uma função exponencial passa pelos pontos (0, 1) e (1, 3).", "Qual expressão representa essa função?", ["f(x) = 2ˣ", "f(x) = 3ˣ", "f(x) = x³", "f(x) = 3x", "f(x) = 3ˣ + 1"], "B"),
  item("MATHEMATICS", "D28", "A função y = log₂(x) é a inversa da função exponencial y = 2ˣ.", "Qual ponto pertence ao gráfico de y = log₂(x)?", ["(0, 1)", "(1, 0)", "(2, 0)", "(2, 2)", "(4, 1)"], "B"),
  item("MATHEMATICS", "D29", "Uma cultura tem inicialmente 200 bactérias e sua população dobra a cada 3 horas.", "Quantas bactérias haverá após 9 horas, mantendo-se esse padrão?", ["600", "800", "1 000", "1 200", "1 600"], "E"),
  item("MATHEMATICS", "D30", "Considere o gráfico da função y = 2 sen(x), para x real.", "Qual é a amplitude desse gráfico?", ["0,5", "1", "2", "π", "2π"], "C"),
  item("MATHEMATICS", "D31", "Um sistema linear é formado pelas equações 2x + y = 7 e x − y = 2.", "Qual par ordenado é a solução do sistema?", ["(1, 3)", "(2, 1)", "(3, 1)", "(3, 2)", "(4, −1)"], "C"),
  item("MATHEMATICS", "D32", "O grêmio de uma escola escolherá uma comissão com 3 estudantes entre 8 candidatos. A ordem dos escolhidos não importa.", "De quantas maneiras diferentes a comissão pode ser formada?", ["24", "48", "56", "336", "512"], "C"),
  item("MATHEMATICS", "D33", "Uma caixa contém 4 cartões vermelhos, 3 azuis e 5 verdes. Um cartão será retirado ao acaso.", "Qual é a probabilidade de retirar um cartão azul?", ["20%", "25%", "30%", "35%", "40%"], "B"),
  item("MATHEMATICS", "D34", "A tabela registra a quantidade de livros emprestados: janeiro, 120; fevereiro, 150; março, 180.", "Em quantos livros aumentaram os empréstimos de janeiro a março?", ["30", "50", "60", "120", "180"], "C"),
  item("MATHEMATICS", "D35", "Uma tabela relaciona tempo e distância: (0 h, 0 km), (1 h, 60 km), (2 h, 120 km), (3 h, 180 km).", "Qual gráfico representa corretamente os dados da tabela?", ["Uma reta crescente que passa pela origem", "Uma reta decrescente que passa pela origem", "Uma reta horizontal em 60 km", "Uma curva crescente que começa em 60 km", "Uma reta crescente que intercepta o eixo vertical em 60 km"], "A"),

  // Língua Portuguesa — descritores D01 a D21.
  item("PORTUGUESE", "D01", "A biblioteca municipal informou que, na segunda-feira, recebeu 120 livros doados pela comunidade.", "De acordo com o texto, quantos livros a biblioteca recebeu?", ["12", "20", "100", "120", "220"], "D"),
  item("PORTUGUESE", "D02", "A pesquisadora apresentou o estudo à turma. Ela explicou que os resultados ainda são preliminares.", "No trecho, a palavra “Ela” retoma", ["a turma", "a pesquisadora", "a apresentação", "a explicação", "os resultados"], "B"),
  item("PORTUGUESE", "D03", "Para economizar água, Lucas passou a tomar banhos mais curtos e a fechar a torneira enquanto escovava os dentes. Seu consumo mensal diminuiu de modo parcimonioso, sem comprometer os hábitos de higiene.", "Nesse contexto, “parcimonioso” indica que o consumo diminuiu de maneira", ["exagerada", "cuidadosa e moderada", "repentina e involuntária", "insuficiente", "desorganizada"], "B"),
  item("PORTUGUESE", "D04", "Ao ver o céu escurecer, Joana guardou os cadernos na mochila e fechou as janelas antes de sair.", "A atitude de Joana permite inferir que ela", ["esperava que começasse a chover", "queria deixar os cadernos na escola", "pretendia limpar as janelas", "havia esquecido a mochila", "não percebeu a mudança do tempo"], "A"),
  item("PORTUGUESE", "D05", "Infográfico textual: em uma pesquisa com 100 estudantes, 45 disseram ir à escola de ônibus, 30 a pé, 15 de bicicleta e 10 de carro.", "Qual meio de transporte foi o segundo mais citado?", ["Ônibus", "A pé", "Bicicleta", "Carro", "Todos foram igualmente citados"], "B"),
  item("PORTUGUESE", "D06", "Texto: “As praças oferecem espaço para convivência, lazer e contato com áreas verdes. Quando são cuidadas e acessíveis, contribuem para uma cidade mais acolhedora.”", "Qual é o tema central do texto?", ["A construção de casas nas cidades", "A importância das praças para a vida urbana", "O custo de manutenção dos parques", "A falta de transporte público", "A prática de esportes profissionais"], "B"),
  item("PORTUGUESE", "D07", "Texto: “As escolas deveriam ampliar os projetos de leitura. Além de desenvolver a interpretação, a leitura frequente ajuda os estudantes a conhecer diferentes realidades e a expressar melhor suas ideias.”", "Qual ideia o autor defende principalmente?", ["Os estudantes devem evitar textos de ficção", "A leitura deve ser estimulada por projetos escolares", "A interpretação é menos importante que a escrita", "As escolas precisam reduzir suas atividades", "Conhecer outras realidades depende apenas de viagens"], "B"),
  item("PORTUGUESE", "D08", "Tese: “A escola deve oferecer orientação sobre o uso responsável das redes sociais.”", "Qual argumento sustenta melhor essa tese?", ["As redes sociais foram criadas há muitos anos", "A orientação ajuda os jovens a reconhecer riscos e avaliar informações", "Todos os estudantes usam o mesmo aplicativo", "Os celulares possuem diferentes tamanhos", "A internet pode ser acessada em vários lugares"], "B"),
  item("PORTUGUESE", "D09", "Texto: “A coleta seletiva reduz o volume de resíduos enviado aos aterros. No bairro, o caminhão passa às terças e quintas, sempre às 8 horas.”", "Qual informação expressa a ideia principal do texto?", ["O caminhão passa às 8 horas", "A coleta seletiva reduz resíduos enviados aos aterros", "O bairro tem duas ruas principais", "A coleta ocorre somente no verão", "Os moradores devem comprar lixeiras"], "B"),
  item("PORTUGUESE", "D10", "Narrativa: “Quando Pedro chegou à estação, percebeu que o trem partiria em cinco minutos e que seu bilhete estava em casa. Pediu ajuda à atendente, que conseguiu emitir uma segunda via antes da partida.”", "Qual situação dá início ao conflito da narrativa?", ["Pedro chega à estação perto do horário de partida e sem o bilhete", "A atendente encerra o expediente", "O trem muda de plataforma", "Pedro decide viajar em outro dia", "A estação fica sem passageiros"], "A"),
  item("PORTUGUESE", "D11", "Texto: “Como a chuva forte alagou a estrada de acesso, o ônibus escolar não conseguiu chegar à comunidade naquela manhã.”", "Por que o ônibus escolar não chegou à comunidade?", ["Porque houve uma reunião na escola", "Porque a estrada ficou alagada pela chuva", "Porque os estudantes perderam o horário", "Porque o ônibus estava sem passageiros", "Porque a comunidade mudou de endereço"], "B"),
  item("PORTUGUESE", "D12", "Aviso: “Atenção, usuários: a biblioteca estará fechada nesta sexta-feira para manutenção. Os livros emprestados poderão ser devolvidos na segunda-feira.”", "A finalidade principal desse aviso é", ["narrar um acontecimento na biblioteca", "divulgar uma obra recém-publicada", "informar sobre o fechamento temporário e orientar os usuários", "convencer leitores a comprar livros", "descrever a história da biblioteca"], "C"),
  item("PORTUGUESE", "D13", "Mensagem: “Prezada senhora Helena, encaminho em anexo o relatório solicitado. Permaneço à disposição para esclarecimentos. Atenciosamente, Marcos.”", "A linguagem usada indica que Marcos se dirige a Helena em uma situação", ["formal e respeitosa", "íntima e descontraída", "irônica e provocadora", "infantil e fantasiosa", "hostil e ameaçadora"], "A"),
  item("PORTUGUESE", "D14", "Em um debate, alguém afirma: “A reunião começou às 14 horas e durou uma hora. Foi, sem dúvida, a reunião mais produtiva do ano.”", "Qual trecho apresenta uma opinião?", ["A reunião começou às 14 horas", "A reunião durou uma hora", "A reunião mais produtiva do ano", "A reunião aconteceu à tarde", "A duração foi de uma hora"], "C"),
  item("PORTUGUESE", "D15", "“Embora o trajeto fosse longo, os estudantes chegaram animados ao museu.”", "A palavra “Embora” estabelece uma relação de", ["causa", "concessão", "conclusão", "explicação", "alternância"], "B"),
  item("PORTUGUESE", "D16", "Depois de esperar duas horas por um atendimento que atrasou, Caio comentou: “Que pontualidade impecável!”", "O humor da fala se constrói porque Caio", ["elogia sinceramente a rapidez do atendimento", "usa uma expressão positiva para criticar o atraso", "não percebe que houve demora", "quer cancelar o atendimento", "descreve o horário de funcionamento"], "B"),
  item("PORTUGUESE", "D17", "Na frase “Na mochila, cadernos; na mesa, livros”, o verbo não aparece nas duas orações.", "O uso da vírgula nesse caso contribui para", ["separar elementos e evitar a repetição do verbo", "indicar uma pergunta direta", "marcar a fala de uma personagem", "expressar uma ordem", "substituir o ponto de interrogação"], "A"),
  item("PORTUGUESE", "D18", "A notícia dizia: “Apenas três vagas continuam disponíveis para a oficina.”", "O emprego de “Apenas” destaca que", ["há muitas vagas abertas", "resta uma quantidade pequena de vagas", "a oficina foi cancelada", "as vagas não têm limite", "três pessoas já concluíram a oficina"], "B"),
  item("PORTUGUESE", "D19", "Uma criança observa o desenho e diz: “Olha o passarinho que encontrei no quintal!”", "O uso de “passarinho” no diminutivo expressa, nesse contexto, principalmente", ["carinho ou afeto", "tamanho necessariamente enorme", "desprezo pelo animal", "distância do quintal", "dúvida sobre a espécie"], "A"),
  item("PORTUGUESE", "D20", "Texto 1 — comunicado da prefeitura: “A nova ciclovia será inaugurada no sábado. O percurso de quatro quilômetros ligará a praça ao terminal.” Texto 2 — editorial: “A ciclovia é um avanço, mas sua utilidade dependerá da manutenção e da integração com outras rotas.”", "Como os textos abordam a ciclovia de maneiras diferentes?", ["O primeiro informa sobre a inauguração; o segundo avalia condições para que a obra funcione bem", "Os dois anunciam o cancelamento da obra", "O primeiro critica a ciclovia; o segundo apenas informa a data", "Os dois apresentam instruções para construir bicicletas", "O primeiro relata uma pesquisa; o segundo descreve um acidente"], "A"),
  item("PORTUGUESE", "D21", "Texto 1: “Proibir celulares durante toda a jornada escolar reduz distrações e favorece a concentração.” Texto 2: “O celular também pode ser ferramenta de pesquisa; seu uso orientado é mais útil que uma proibição total.”", "Qual diferença de posicionamento existe entre os textos?", ["O primeiro defende a proibição; o segundo prefere o uso orientado", "O primeiro apoia o uso livre; o segundo defende a proibição", "Ambos consideram o celular inútil em qualquer situação", "Ambos tratam apenas da compra de aparelhos", "O primeiro fala de pesquisa e o segundo de transporte"], "A"),
];
