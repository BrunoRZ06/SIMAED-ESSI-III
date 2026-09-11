import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const descriptors = [
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D01",
    "description": "Relacionar elementos sonoros das palavras com sua representação escrita."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D02",
    "description": "Ler palavras."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D03",
    "description": "Ler frases."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D04",
    "description": "Localizar informações explícitas em textos."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D05",
    "description": "Reconhecer a finalidade de um texto."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D06",
    "description": "Inferir o assunto de um texto."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D07",
    "description": "Inferir informações em textos verbais."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D08",
    "description": "Inferir informações em textos que articulam linguagem verbal e não verbal."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D01",
    "description": "Reconhecer o que os números naturais indicam em diferentes situações: quantidade, ordem, medida ou código de identificação."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D02",
    "description": "Identificar a posição ordinal de um objeto ou termo em uma sequência (1º, 2º etc.)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D03",
    "description": "Escrever números naturais de até 3 ordens em sua representação por algarismos ou em língua materna OU associar o registro numérico de números naturais de até 3 ordens ao registro em língua materna."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D04",
    "description": "Comparar OU ordenar quantidades de objetos (até 2 ordens)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D05",
    "description": "Comparar OU ordenar números naturais de até 3 ordens com ou sem suporte da reta numérica."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D06",
    "description": "Identificar a ordem ocupada por um algarismo OU seu valor posicional (ou valor relativo) em um número natural de até 3 ordens."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D07",
    "description": "Calcular o resultado de adições ou subtrações, envolvendo números naturais de até 3 ordens."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D08",
    "description": "Compor OU decompor números naturais de até 3 ordens por meio de diferentes adições."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D09",
    "description": "Resolver problemas de adição ou de subtração, envolvendo números naturais de até 3 ordens, com os significados de juntar, acrescentar, separar ou retirar."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D10",
    "description": "Resolver problemas de multiplicação ou de divisão (por 2, 3, 4 ou 5), envolvendo números naturais, com os significados de formação de grupos iguais ou proporcionalidade (incluindo dobro, metade, triplo ou terça parte)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D11",
    "description": "Analisar argumentações sobre a resolução de problemas de adição, subtração, multiplicação ou divisão envolvendo números naturais."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D12",
    "description": "Identificar a classificação OU classificar objetos ou representações por figuras, por meio de atributos, tais como cor, forma e medida."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D13",
    "description": "Inferir OU descrever atributos ou propriedades comuns que os elementos que constituem uma sequência de números naturais apresentam."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D14",
    "description": "Inferir o padrão ou a regularidade de uma sequência de números naturais ordenados, de objetos ou de figuras."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D15",
    "description": "Inferir os elementos ausentes em uma sequência de números naturais ordenados, de objetos ou de figuras."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D16",
    "description": "Identificar a localização OU a descrição/esboço do deslocamento de pessoas e/ou de objetos em representações bidimensionais (mapas, croquis, etc.)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D17",
    "description": "Reconhecer/nomear figuras geométricas espaciais (cubo, bloco retangular, pirâmide, cone, cilindro e esfera), relacionando-as com objetos do mundo físico."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D18",
    "description": "Reconhecer/nomear figuras geométricas planas (círculo, quadrado, retângulo e triângulo)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D19",
    "description": "Descrever OU esboçar o deslocamento de pessoas e/ou objetos em representações bidimensionais (mapas, croquis etc.) ou plantas de ambientes, de acordo com condições dadas."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D20",
    "description": "Comparar comprimentos, capacidades ou massas OU ordenar imagens de objetos com base na comparação visual de seus comprimentos, capacidades ou massas."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D21",
    "description": "Estimar/inferir medida de comprimento, capacidade ou massa de objetos, utilizando unidades de medida convencionais ou não OU medir comprimento, capacidade ou massa de objetos."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D22",
    "description": "Identificar a medida do comprimento, da capacidade ou da massa de objetos, dada a imagem de um instrumento de medida."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D23",
    "description": "Reconhecer unidades de medida e/ou instrumentos utilizados para medir comprimento, tempo, massa ou capacidade."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D24",
    "description": "Identificar sequência de acontecimentos relativos a um dia."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D25",
    "description": "Identificar datas, dias da semana ou meses do ano em calendário OU escrever uma data, apresentando o dia, o mês e o ano."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D26",
    "description": "Relacionar valores de moedas e/ou cédulas do sistema monetário brasileiro, com base nas imagens desses objetos."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D27",
    "description": "Determinar a data de início, a data de término ou a duração de um acontecimento entre duas datas."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D28",
    "description": "Determinar o horário de início, o horário de término ou a duração de um acontecimento."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D29",
    "description": "Resolver problemas que envolvam moedas e/ou cédulas do sistema monetário brasileiro."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D30",
    "description": "Classificar resultados de eventos cotidianos aleatórios como “pouco prováveis”, “muito prováveis”, “certos” ou “impossíveis”."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D31",
    "description": "Ler/identificar OU comparar dados estatísticos ou informações expressos em tabelas (simples ou de dupla entrada)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D32",
    "description": "Ler/identificar OU comparar dados estatísticos expressos em gráficos (barras simples, colunas simples ou pictóricos)."
  },
  {
    "stageCode": "2EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D33",
    "description": "Representar os dados de uma pesquisa estatística ou de um levantamento em listas, tabelas (simples ou de dupla entrada) ou gráficos (barras simples, colunas simples ou pictóricos)."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D01",
    "description": "Localizar informações explícitas em um texto."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D02",
    "description": "Estabelecer relações entre partes de um texto, identificando repetições ou substituições que contribuem para a continuidade de um texto."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D03",
    "description": "Inferir o sentido de uma palavra ou expressão."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D04",
    "description": "Inferir uma informação implícita em um texto."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D05",
    "description": "Interpretar texto com auxílio de material gráfico diverso (propagandas, quadrinhos, fotos etc.)."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D06",
    "description": "Identificar o tema de um texto."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D07",
    "description": "Identificar o conflito gerador do enredo e os elementos que constroem a narrativa."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D08",
    "description": "Estabelecer relação causa/consequência entre partes e elementos do texto."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D09",
    "description": "Identificar a finalidade de textos de diferentes gêneros."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D10",
    "description": "Identificar as marcas linguísticas que evidenciam o locutor e o interlocutor de um texto."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D11",
    "description": "Distinguir um fato da opinião relativa a esse fato."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D12",
    "description": "Estabelecer relações lógico-discursivas presentes no texto, marcadas por conjunções, advérbios etc."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D13",
    "description": "Identificar efeitos de ironia ou humor em textos variados."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D14",
    "description": "Identificar o efeito de sentido decorrente do uso da pontuação e de outras notações."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D15",
    "description": "Reconhecer diferentes formas de tratar uma informação na comparação de textos que abordam o mesmo tema, em função das condições em que ele foi produzido e daquelas em que será recebido."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D01",
    "description": "Identificar a localização/movimentação de objeto em mapas, croquis e outras representações gráficas."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D02",
    "description": "Identificar propriedades comuns e diferenças entre poliedros e corpos redondos, relacionando figuras tridimensionais com suas planificações."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D03",
    "description": "Identificar propriedades comuns e diferenças entre figuras bidimensionais pelo número de lados, pelos tipos de ângulos."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D04",
    "description": "Identificar quadriláteros observando as posições relativas entre seus lados (paralelos, concorrentes, perpendiculares)."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D05",
    "description": "Reconhecer a conservação ou modificação de medidas dos lados, do perímetro, da área em ampliação e/ou redução de figuras poligonais, usando malhas quadriculadas."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D06",
    "description": "Estimar a medida de grandezas utilizando unidades de medida convencionais ou não."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D07",
    "description": "Resolver problemas significativos utilizando unidades de medida padronizadas como km/m/cm/mm, kg/g/mg, l/ml."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D08",
    "description": "Estabelecer relações entre unidades de medida de tempo."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D09",
    "description": "Estabelecer relações entre o horário de início e término e/ou o intervalo da duração de um evento ou acontecimento."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D10",
    "description": "Num problema, estabelecer trocas entre cédulas e moedas do sistema monetário brasileiro, em função de seus valores."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D11",
    "description": "Resolver problema envolvendo o cálculo do perímetro de figuras planas, desenhadas em malhas quadriculadas."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D12",
    "description": "Resolver problema envolvendo o cálculo ou estimativa de áreas de figuras planas, desenhadas em malhas quadriculadas."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D13",
    "description": "Reconhecer e utilizar características do sistema de numeração decimal, tais como agrupamentos e trocas na base 10 e princípio do valor posicional."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D14",
    "description": "Identificar a localização de números naturais na reta numérica."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D15",
    "description": "Reconhecer a decomposição de números naturais nas suas diversas ordens."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D16",
    "description": "Reconhecer a composição e a decomposição de números naturais em sua forma polinomial."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D17",
    "description": "Calcular o resultado de uma adição ou subtração de números naturais."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D18",
    "description": "Calcular o resultado de uma multiplicação ou divisão de números naturais."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D19",
    "description": "Resolver problema com números naturais, envolvendo diferentes significados da adição ou subtração: juntar, alteração de um estado inicial (positiva ou negativa), comparação e mais de uma transformação (positiva ou negativa)."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D20",
    "description": "Resolver problema com números naturais, envolvendo diferentes significados da multiplicação ou divisão: multiplicação comparativa, ideia de proporcionalidade, configuração retangular e combinatória."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D21",
    "description": "Identificar diferentes representações de um mesmo número racional."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D22",
    "description": "Identificar a localização de números racionais, representados na forma decimal na reta numérica."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D23",
    "description": "Resolver problema utilizando a escrita decimal de cédulas e moedas do sistema monetário brasileiro."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D24",
    "description": "Identificar fração como representação que pode estar associada a diferentes significados."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D25",
    "description": "Resolver problema com números racionais expressos na forma decimal, envolvendo diferentes significados da adição ou subtração."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D26",
    "description": "Resolver problema envolvendo noções de porcentagem (25%, 50%, 100%)."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D27",
    "description": "Ler informações e dados apresentados em tabelas."
  },
  {
    "stageCode": "5EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D28",
    "description": "Ler informações e dados apresentados em gráficos (particularmente, em gráficos de colunas)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D01",
    "description": "Localizar informações explícitas em um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D02",
    "description": "Estabelecer relações entre partes de um texto, identificando repetições ou substituições que contribuem para a continuidade de um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D03",
    "description": "Inferir o sentido de uma palavra ou expressão."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D04",
    "description": "Inferir uma informação implícita em um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D05",
    "description": "Interpretar texto com auxílio de material gráfico diverso (propagandas, quadrinhos, fotos etc.)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D06",
    "description": "Identificar o tema de um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D07",
    "description": "Identificar a tese de um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D08",
    "description": "Estabelecer relação entre a tese e os argumentos oferecidos para sustentá-la."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D09",
    "description": "Diferenciar as partes principais das secundárias em um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D10",
    "description": "Identificar o conflito gerador do enredo e os elementos que constroem a narrativa."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D11",
    "description": "Estabelecer relação causa/consequência entre partes e elementos do texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D12",
    "description": "Identificar a finalidade de textos de diferentes gêneros."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D13",
    "description": "Identificar as marcas linguísticas que evidenciam o locutor e o interlocutor de um texto."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D14",
    "description": "Distinguir um fato da opinião relativa a esse fato."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D15",
    "description": "Estabelecer relações lógico-discursivas presentes no texto, marcadas por conjunções, advérbios etc."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D16",
    "description": "Identificar efeitos de ironia ou humor em textos variados."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D17",
    "description": "Reconhecer o efeito de sentido decorrente do uso da pontuação e de outras notações."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D18",
    "description": "Reconhecer o efeito de sentido decorrente da escolha de uma determinada palavra ou expressão."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D19",
    "description": "Reconhecer o efeito de sentido decorrente da exploração de recursos ortográficos e/ou morfossintáticos."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D20",
    "description": "Reconhecer diferentes formas de tratar uma informação na comparação de textos que tratam do mesmo tema, em função das condições em que ele foi produzido e daquelas em que será recebido."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "PORTUGUESE",
    "code": "D21",
    "description": "Reconhecer posições distintas entre duas ou mais opiniões relativas ao mesmo fato ou ao mesmo tema."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D01",
    "description": "Identificar a localização/movimentação de objeto em mapas, croquis e outras representações gráficas."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D02",
    "description": "Identificar propriedades comuns e diferenças entre figuras bidimensionais e tridimensionais, relacionando-as com as suas planificações."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D03",
    "description": "Identificar propriedades de triângulos pela comparação de medidas de lados e ângulos."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D04",
    "description": "Identificar relação entre quadriláteros por meio de suas propriedades."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D05",
    "description": "Reconhecer a conservação ou modificação de medidas dos lados, do perímetro, da área em ampliação e/ou redução de figuras poligonais, usando malhas quadriculadas."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D06",
    "description": "Reconhecer ângulos como mudança de direção ou giros, identificando ângulos retos e não retos."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D07",
    "description": "Reconhecer que as imagens de uma figura construída por uma transformação homotética são semelhantes, identificando propriedades e/ou medidas que se modificam ou não se alteram."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D08",
    "description": "Resolver problema utilizando propriedades dos polígonos (soma de seus ângulos internos, número de diagonais, cálculo da medida de cada ângulo interno nos polígonos regulares)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D09",
    "description": "Interpretar informações apresentadas por meio de coordenadas cartesianas."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D10",
    "description": "Utilizar relações métricas do triângulo retângulo para resolver problemas significativos."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D11",
    "description": "Reconhecer círculo/circunferência, seus elementos e algumas de suas relações."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D12",
    "description": "Resolver problema envolvendo o cálculo de perímetro de figuras planas."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D13",
    "description": "Resolver problema envolvendo o cálculo de área de figuras planas."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D14",
    "description": "Resolver problema envolvendo noções de volume."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D15",
    "description": "Resolver problema utilizando relações entre diferentes unidades de medida."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D16",
    "description": "Identificar a localização de números inteiros na reta numérica."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D17",
    "description": "Identificar a localização de números racionais na reta numérica."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D18",
    "description": "Efetuar cálculos com números inteiros, envolvendo as operações (adição, subtração, multiplicação, divisão, potenciação)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D19",
    "description": "Resolver problema com números naturais, envolvendo diferentes significados das operações (adição, subtração, multiplicação, divisão, potenciação)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D20",
    "description": "Resolver problema com números inteiros, envolvendo as operações (adição, subtração, multiplicação, divisão, potenciação)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D21",
    "description": "Reconhecer as diferentes representações de um número racional."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D22",
    "description": "Identificar fração como representação que pode estar associada a diferentes significados."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D23",
    "description": "Identificar frações equivalentes."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D24",
    "description": "Reconhecer as representações decimais dos números racionais como uma extensão do sistema de numeração decimal, identificando a existência de “ordens” como décimos, centésimos e milésimos."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D25",
    "description": "Efetuar cálculos que envolvam operações com números racionais (adição, subtração, multiplicação, divisão, potenciação)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D26",
    "description": "Resolver problema com números racionais, envolvendo as operações (adição, subtração, multiplicação, divisão, potenciação)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D27",
    "description": "Efetuar cálculos simples com valores aproximados de radicais."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D28",
    "description": "Resolver problema que envolva porcentagem."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D29",
    "description": "Resolver problema que envolva variação proporcional, direta ou inversa, entre grandezas."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D30",
    "description": "Calcular o valor numérico de uma expressão algébrica."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D31",
    "description": "Resolver problema que envolva equação do 2º grau."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D32",
    "description": "Identificar a expressão algébrica que expressa uma regularidade observada em sequências de números ou figuras (padrões)."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D33",
    "description": "Identificar uma equação ou inequação do 1º grau que expressa um problema."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D34",
    "description": "Identificar um sistema de equações do 1º grau que expressa um problema."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D35",
    "description": "Identificar a relação entre as representações algébrica e geométrica de um sistema de equações do 1º grau."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D36",
    "description": "Resolver problema envolvendo informações apresentadas em tabelas e/ou gráficos."
  },
  {
    "stageCode": "9EF",
    "disciplineCode": "MATHEMATICS",
    "code": "D37",
    "description": "Associar informações apresentadas em listas e/ou tabelas simples aos gráficos que as representam e vice-versa."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D01",
    "description": "Localizar informações explícitas em um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D02",
    "description": "Estabelecer relações entre partes de um texto, identificando repetições ou substituições que contribuem para a continuidade de um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D03",
    "description": "Inferir o sentido de uma palavra ou expressão."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D04",
    "description": "Inferir uma informação implícita em um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D05",
    "description": "Interpretar texto com auxílio de material gráfico diverso (propagandas, quadrinhos, fotos etc.)."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D06",
    "description": "Identificar o tema de um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D07",
    "description": "Identificar a tese de um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D08",
    "description": "Estabelecer relação entre a tese e os argumentos oferecidos para sustentá-la."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D09",
    "description": "Diferenciar as partes principais das secundárias em um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D10",
    "description": "Identificar o conflito gerador do enredo e os elementos que constroem a narrativa."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D11",
    "description": "Estabelecer relações causa/consequência entre partes e elementos do texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D12",
    "description": "Identificar a finalidade de textos de diferentes gêneros."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D13",
    "description": "Identificar as marcas linguísticas que evidenciam o locutor e o interlocutor de um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D14",
    "description": "Distinguir um fato da opinião relativa a esse fato."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D15",
    "description": "Estabelecer relações lógico-discursivas presentes no texto, marcadas por conjunções, advérbios etc."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D16",
    "description": "Identificar efeitos de ironia ou humor em textos variados."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D17",
    "description": "Reconhecer o efeito de sentido decorrente do uso da pontuação e de outras notações."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D18",
    "description": "Reconhecer o efeito de sentido decorrente da escolha de uma determinada palavra ou expressão."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D19",
    "description": "Reconhecer o efeito de sentido decorrente da exploração de recursos ortográficos e/ou morfossintáticos."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D20",
    "description": "Reconhecer diferentes formas de tratar uma informação na comparação de textos que tratam do mesmo tema, em função das condições em que ele foi produzido e daquelas em que será recebido."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "PORTUGUESE",
    "code": "D21",
    "description": "Reconhecer posições distintas entre duas ou mais opiniões relativas ao mesmo fato ou ao mesmo tema."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D01",
    "description": "Identificar figuras semelhantes mediante o reconhecimento de relações de proporcionalidade."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D02",
    "description": "Reconhecer aplicações das relações métricas do triângulo retângulo em um problema que envolva figuras planas ou espaciais."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D03",
    "description": "Relacionar diferentes poliedros ou corpos redondos com suas planificações ou vistas."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D04",
    "description": "Identificar a relação entre o número de vértices, faces e/ou arestas de poliedros expressa em um problema."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D05",
    "description": "Resolver problema que envolva razões trigonométricas no triângulo retângulo (seno, cosseno, tangente)."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D06",
    "description": "Identificar a localização de pontos no plano cartesiano."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D07",
    "description": "Interpretar, geometricamente, os coeficientes da equação de uma reta."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D08",
    "description": "Identificar a equação de uma reta apresentada a partir de dois pontos dados ou de um ponto e sua inclinação."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D09",
    "description": "Relacionar a determinação do ponto de interseção de duas ou mais retas com a resolução de um sistema de equações com duas incógnitas."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D10",
    "description": "Reconhecer, dentre as equações do 2º grau com duas incógnitas, as que representam circunferências."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D11",
    "description": "Resolver problema envolvendo o cálculo de perímetro de figuras planas."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D12",
    "description": "Resolver problema envolvendo o cálculo de área de figuras planas."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D13",
    "description": "Resolver problema envolvendo a área total e/ou volume de um sólido (prisma, pirâmide, cilindro, cone, esfera)."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D14",
    "description": "Identificar a localização de números reais na reta numérica."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D15",
    "description": "Resolver problema que envolva variação proporcional, direta ou inversa, entre grandezas."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D16",
    "description": "Resolver problema que envolva porcentagem."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D17",
    "description": "Resolver problema envolvendo equação do 2º grau."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D18",
    "description": "Reconhecer expressão algébrica que representa uma função a partir de uma tabela."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D19",
    "description": "Resolver problema envolvendo uma função do 1º grau."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D20",
    "description": "Analisar crescimento/decrescimento, zeros de funções reais apresentadas em gráficos."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D21",
    "description": "Identificar o gráfico que representa uma situação descrita em um texto."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D22",
    "description": "Resolver problema envolvendo P.A./P.G., dada a fórmula do termo geral."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D23",
    "description": "Reconhecer o gráfico de uma função polinomial de 1º grau por meio de seus coeficientes."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D24",
    "description": "Reconhecer a representação algébrica de uma função do 1º grau, dado o seu gráfico."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D25",
    "description": "Resolver problemas que envolvam os pontos de máximo ou de mínimo no gráfico de uma função polinomial do 2º grau."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D26",
    "description": "Relacionar as raízes de um polinômio com sua decomposição em fatores do 1º grau."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D27",
    "description": "Identificar a representação algébrica e/ou gráfica de uma função exponencial."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D28",
    "description": "Identificar a representação algébrica e/ou gráfica de uma função logarítmica, reconhecendo-a como inversa da função exponencial."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D29",
    "description": "Resolver problema que envolva função exponencial."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D30",
    "description": "Identificar gráficos de funções trigonométricas (seno, cosseno, tangente), reconhecendo suas propriedades."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D31",
    "description": "Determinar a solução de um sistema linear, associando-o à uma matriz."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D32",
    "description": "Resolver problema de contagem utilizando o princípio multiplicativo ou noções de permutação simples, arranjo simples e/ou combinação simples."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D33",
    "description": "Calcular a probabilidade de um evento."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D34",
    "description": "Resolver problema envolvendo informações apresentadas em tabelas e/ou gráficos."
  },
  {
    "stageCode": "3EM",
    "disciplineCode": "MATHEMATICS",
    "code": "D35",
    "description": "Associar informações apresentadas em listas e/ou tabelas simples aos gráficos que as representam e vice-versa."
  }
] as const;

async function main() {
  const matrix = await prisma.referenceMatrix.upsert({
    where: { code: "SAEPE_2025_SOMATIVA" },
    update: {
      name: "SAEPE 2025 - Avaliação Somativa",
      year: 2025,
      evaluationType: "SOMATIVA",
      isActive: true,
    },
    create: {
      code: "SAEPE_2025_SOMATIVA",
      name: "SAEPE 2025 - Avaliação Somativa",
      year: 2025,
      evaluationType: "SOMATIVA",
      isActive: true,
    },
  });

  const stageDefinitions = [
    { code: "2EF", name: "2º ano do Ensino Fundamental" },
    { code: "5EF", name: "5º ano do Ensino Fundamental" },
    { code: "9EF", name: "9º ano do Ensino Fundamental" },
    { code: "3EM", name: "3ª série do Ensino Médio" },
  ] as const;

  const disciplineDefinitions = [
    { code: "PORTUGUESE", name: "Língua Portuguesa" },
    { code: "MATHEMATICS", name: "Matemática" },
  ] as const;

  const stages = new Map<string, string>();
  for (const item of stageDefinitions) {
    const stage = await prisma.stage.upsert({
      where: { code: item.code },
      update: { name: item.name, isActive: true },
      create: { code: item.code, name: item.name, isActive: true },
    });
    stages.set(item.code, stage.id);
  }

  const disciplines = new Map<string, string>();
  for (const item of disciplineDefinitions) {
    const discipline = await prisma.discipline.upsert({
      where: { code: item.code },
      update: { name: item.name, isActive: true },
      create: { code: item.code, name: item.name, isActive: true },
    });
    disciplines.set(item.code, discipline.id);
  }

  for (const item of descriptors) {
    const stageId = stages.get(item.stageCode);
    const disciplineId = disciplines.get(item.disciplineCode);

    if (!stageId || !disciplineId) {
      throw new Error(`Relacionamento inválido para ${item.stageCode} / ${item.disciplineCode}`);
    }

    await prisma.descriptor.upsert({
      where: {
        matrixId_stageId_disciplineId_code: {
          matrixId: matrix.id,
          stageId,
          disciplineId,
          code: item.code,
        },
      },
      update: {
        description: item.description,
        isActive: true,
      },
      create: {
        code: item.code,
        description: item.description,
        matrixId: matrix.id,
        stageId,
        disciplineId,
        isActive: true,
      },
    });
  }

  console.log(`Seed concluído: ${descriptors.length} descritores do SAEPE 2025 cadastrados/atualizados.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
