import { Platform } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import JSZip from "jszip";

import type { MockExamMaterial, MockExamMaterials, StudentVersionMaterial, AnswerSheetMaterial, AnswerKeyMaterial } from "./mockExamMaterialService";
import { getDisciplineLabel, getStageLabel } from "../components/materials/materialLabels";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildQuestionHtml(question: StudentVersionMaterial["questions"][number]) {
  const stimulus = question.stimulusText
    ? `<p class="stimulus">${escapeHtml(question.stimulusText)}</p>`
    : "";
  const image = question.stimulusAssetPath
    ? `<img class="stimulus-image" src="${escapeHtml(getQuestionAssetUrl(question.stimulusAssetPath))}" alt="${escapeHtml(question.stimulusAltText ?? "Imagem da questão")}" />`
    : "";
  const alternatives = question.alternatives
    .map((alternative) => `<li>${escapeHtml(alternative.label)}) ${escapeHtml(alternative.text)}</li>`)
    .join("");

  return `<article class="question">${stimulus}${image}<h2>${question.position}. ${escapeHtml(question.statement)}</h2><ul class="alternatives">${alternatives}</ul></article>`;
}

function getQuestionAssetUrl(path: string) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "";
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `${apiUrl}/question-assets/${encodedPath}`;
}

function buildStudentVersion(material: StudentVersionMaterial) {
  return `<div class="student-lines">Nome: ________________________________________________<br/><br/>Data: ____ / ____ / ______ &nbsp;&nbsp;&nbsp; Turma: __________________</div><p>${escapeHtml(material.instructions)}</p>${material.questions.map(buildQuestionHtml).join("")}`;
}

function buildAnswerSheet(material: AnswerSheetMaterial) {
  const rows = material.questions.map((question) => {
    const choices = question.alternatives.map((label) => `<td><span class="bubble">${escapeHtml(label)}</span></td>`).join("");
    return `<tr><th>${String(question.position).padStart(2, "0")}</th>${choices}</tr>`;
  }).join("");
  return `<div class="student-lines">Nome: ________________________________________________<br/><br/>Data: ____ / ____ / ______ &nbsp;&nbsp;&nbsp; Turma: __________________</div><p>Marque apenas uma alternativa por questão.</p><table class="answer-grid"><tbody>${rows}</tbody></table>`;
}

function buildAnswerKey(material: AnswerKeyMaterial) {
  const rows = material.questions.map((question) => `<tr><th>${String(question.position).padStart(2, "0")}</th><td><span class="answer">${escapeHtml(question.correctAnswer)}</span></td><td>${escapeHtml(question.descriptor.code)} — ${escapeHtml(question.descriptor.description)}</td></tr>`).join("");
  const skills = material.skills.map((skill) => `<li><strong>${escapeHtml(skill.code)}</strong> — ${escapeHtml(skill.description)} <span>(${skill.questionCount} questões: ${skill.positions.map((position) => String(position).padStart(2, "0")).join(", ")})</span></li>`).join("");
  return `<h2>Respostas corretas</h2><table class="key-grid"><thead><tr><th>Questão</th><th>Resposta</th><th>Habilidade</th></tr></thead><tbody>${rows}</tbody></table><h2>Habilidades avaliadas</h2><ul class="skills">${skills}</ul>`;
}

function buildPdfHtml(material: MockExamMaterial) {
  const title = material.kind === "student" ? "Versão do aluno" : material.kind === "answer-sheet" ? "Cartão-resposta" : "Gabarito do simulado";
  const subject = getDisciplineLabel(material.disciplineCode);
  const stage = getStageLabel(material.stageCode);
  const content = material.kind === "student"
    ? buildStudentVersion(material)
    : material.kind === "answer-sheet"
      ? buildAnswerSheet(material)
      : buildAnswerKey(material);

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(title)} - ${escapeHtml(stage)}</title><style>
    @page { size: A4; margin: 16mm 15mm; }
    * { box-sizing: border-box; }
    body { color: #172033; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.5; }
    header { text-align: center; padding-bottom: 14px; margin-bottom: 18px; border-bottom: 2px solid #286D9B; }
    header h1 { color: #111827; font-size: 17pt; margin: 0 0 3px; }
    header p { color: #475467; font-size: 10pt; margin: 0; }
    .student-lines { margin: 20px 0 24px; font-size: 10pt; }
    .question { margin: 0 0 20px; page-break-inside: avoid; break-inside: avoid; }
    .question h2 { font-size: 11pt; margin: 0 0 7px; }
    .stimulus { margin: 0 0 8px; white-space: pre-wrap; }
    .stimulus-image { display: block; max-width: 100%; max-height: 240px; object-fit: contain; margin: 8px auto; }
    .alternatives { list-style: none; padding-left: 0; margin: 6px 0; }
    .alternatives li { padding: 2px 0; }
    .descriptor { color: #475467; font-size: 9pt; margin: 8px 0 0; }
    .answer-grid, .key-grid { width: 100%; border-collapse: collapse; margin: 15px 0 24px; }
    .answer-grid th, .answer-grid td, .key-grid th, .key-grid td { border-bottom: 1px solid #D0D5DD; padding: 7px 9px; text-align: left; vertical-align: middle; }
    .answer-grid th { width: 18%; }
    .bubble, .answer { display: inline-flex; width: 25px; height: 25px; align-items: center; justify-content: center; border: 1px solid #667085; border-radius: 50%; font-size: 9pt; }
    .answer { border-color: #12B76A; background: #ECFDF3; color: #027A48; font-weight: bold; }
    .key-grid { font-size: 9pt; }
    .key-grid thead { background: #F2F4F7; }
    .key-grid th:nth-child(1) { width: 16%; }
    .key-grid th:nth-child(2) { width: 18%; }
    h2 { font-size: 12pt; margin: 22px 0 8px; }
    .skills { padding-left: 20px; }
    .skills li { margin: 8px 0; }
    .skills span { color: #667085; font-size: 9pt; }
  </style></head><body><header><h1>${escapeHtml(title)}</h1><p>${escapeHtml(subject)} — ${escapeHtml(stage)} · ${material.questionCount} questões</p></header>${content}</body></html>`;
}

async function printHtmlDocumentInBrowser(html: string) {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.title = "Documento para salvar como PDF";
  Object.assign(frame.style, {
    position: "fixed",
    width: "800px",
    height: "1100px",
    left: "0",
    top: "0",
    border: "0",
    opacity: "0",
    zIndex: "-1",
    pointerEvents: "none",
  });
  document.body.appendChild(frame);

  const printDocument = frame.contentDocument;
  const printWindow = frame.contentWindow;
  if (!printDocument || !printWindow) {
    frame.remove();
    throw new Error("Não foi possível preparar o documento para impressão.");
  }

  printDocument.open();
  printDocument.write(html);
  printDocument.close();

  const images = Array.from(printDocument.images);
  await Promise.all(images.map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      image.onload = () => resolve();
      image.onerror = () => resolve();
      window.setTimeout(resolve, 5000);
    });
  }));

  const cleanup = () => window.setTimeout(() => frame.remove(), 1000);
  printWindow.addEventListener("afterprint", cleanup, { once: true });
  window.setTimeout(cleanup, 60_000);
  printWindow.focus();
  printWindow.print();
}

export async function downloadMockExamMaterialPdf(material: MockExamMaterial) {
  const html = buildPdfHtml(material);

  if (Platform.OS === "web") {
    // expo-print's web implementation prints the current app page, not the supplied HTML.
    await printHtmlDocumentInBrowser(html);
    return "A janela de impressão foi aberta. Escolha ‘Salvar como PDF’ para baixar o arquivo.";
  }

  const result = await Print.printToFileAsync({ html, base64: false, width: 595, height: 842 });

  if (!(await Sharing.isAvailableAsync())) {
    throw new Error("O compartilhamento de arquivos não está disponível neste dispositivo.");
  }

  await Sharing.shareAsync(result.uri, {
    mimeType: "application/pdf",
    UTI: ".pdf",
    dialogTitle: "Salvar ou compartilhar PDF",
  });
  return "O PDF foi gerado. Escolha onde deseja salvar ou compartilhar o arquivo.";
}

export type MaterialExportFormat = "pdf" | "word" | "image" | "spreadsheet" | "print" | "share";

export type MaterialExportAction = { format: MaterialExportFormat; label: string };

export function getMaterialExportActions(kind: MockExamMaterial["kind"]): MaterialExportAction[] {
  if (kind === "student") {
    return [
      { format: "pdf", label: "PDF" },
      { format: "word", label: "Word" },
      { format: "print", label: "Imprimir" },
      { format: "share", label: "Compartilhar" },
    ];
  }
  if (kind === "answer-sheet") {
    return [
      { format: "pdf", label: "PDF" },
      { format: "image", label: "Imagem" },
      { format: "print", label: "Imprimir" },
      { format: "share", label: "Compartilhar" },
    ];
  }
  return [
    { format: "pdf", label: "PDF" },
    { format: "spreadsheet", label: "Planilha CSV" },
    { format: "share", label: "Compartilhar" },
  ];
}

function safeFilePart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
}

function getFileName(material: MockExamMaterial, extension: string) {
  const kind = material.kind === "student" ? "aluno" : material.kind === "answer-sheet" ? "cartao-resposta" : "gabarito";
  return `simulado-${safeFilePart(material.stageCode)}-${kind}-${material.requestId.slice(0, 8)}.${extension}`;
}

function downloadInBrowser(content: string, fileName: string, mimeType: string) {
  downloadBlobInBrowser(new Blob([content], { type: mimeType }), fileName);
}

function downloadBlobInBrowser(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportMockExamMaterialsZip(materials: MockExamMaterials) {
  const zip = new JSZip();
  zip.file(getFileName(materials.student, "doc"), buildPdfHtml(materials.student));
  zip.file(getFileName(materials["answer-sheet"], "svg"), buildAnswerSheetSvg(materials["answer-sheet"]));
  zip.file(getFileName(materials["answer-key"], "csv"), buildAnswerKeyCsv(materials["answer-key"]));
  zip.file(
    "LEIA-ME.txt",
    [
      "Materiais do simulado",
      "",
      "Versao do aluno: documento Word compativel (.doc).",
      "Cartao-resposta: imagem vetorial escalavel (.svg).",
      "Gabarito: planilha compativel com Excel (.csv).",
      "",
      "Os arquivos correspondem ao mesmo simulado e podem ser abertos nos formatos indicados.",
    ].join("\r\n"),
  );

  const fileName = `simulado-${safeFilePart(materials.student.stageCode)}-${materials.student.requestId.slice(0, 8)}-materiais.zip`;
  const generationOptions = {
    compression: "DEFLATE" as const,
    compressionOptions: { level: 6 },
  };

  if (Platform.OS === "web") {
    const blob = await zip.generateAsync({
      ...generationOptions,
      type: "blob",
    });
    downloadBlobInBrowser(blob, fileName);
    return `Pacote ZIP baixado: ${fileName}`;
  }

  const directory = FileSystem.documentDirectory;
  if (!directory) {
    throw new Error("Não foi possível acessar o armazenamento do dispositivo.");
  }

  const uri = `${directory}${fileName}`;
  const existing = await FileSystem.getInfoAsync(uri);
  if (existing.exists) {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  }

  const base64 = await zip.generateAsync({
    ...generationOptions,
    type: "base64",
  });
  await FileSystem.writeAsStringAsync(uri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (!(await Sharing.isAvailableAsync())) {
    throw new Error("O compartilhamento de arquivos não está disponível neste dispositivo.");
  }

  await Sharing.shareAsync(uri, {
    mimeType: "application/zip",
    UTI: "public.zip-archive",
    dialogTitle: fileName,
  });
  return "Pacote ZIP preparado. Escolha onde salvar ou compartilhar.";
}

function buildAnswerSheetSvg(material: AnswerSheetMaterial) {
  const width = 1000;
  const top = 250;
  const rowHeight = 62;
  const height = top + material.questions.length * rowHeight + 50;
  const rows = material.questions.map((question, index) => {
    const y = top + index * rowHeight;
    const bubbles = question.alternatives.map((label, choiceIndex) => {
      const x = 470 + choiceIndex * 105;
      return `<circle cx="${x}" cy="${y}" r="21" fill="#fff" stroke="#344054" stroke-width="2"/><text x="${x}" y="${y + 7}" text-anchor="middle" font-size="18" font-family="Arial" fill="#172033">${escapeHtml(label)}</text>`;
    }).join("");
    return `<line x1="70" y1="${y + 35}" x2="930" y2="${y + 35}" stroke="#eaecf0"/><text x="90" y="${y + 7}" font-size="19" font-family="Arial" font-weight="700" fill="#172033">${String(question.position).padStart(2, "0")}</text>${bubbles}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#fff"/><text x="500" y="55" text-anchor="middle" font-size="28" font-family="Arial" font-weight="700" fill="#172033">CARTÃO-RESPOSTA</text><text x="500" y="95" text-anchor="middle" font-size="18" font-family="Arial" fill="#344054">${escapeHtml(getDisciplineLabel(material.disciplineCode))} — ${escapeHtml(getStageLabel(material.stageCode))}</text><text x="70" y="145" font-size="16" font-family="Arial" fill="#344054">Nome: ____________________________________________</text><text x="70" y="190" font-size="16" font-family="Arial" fill="#344054">Data: ____ / ____ / ______     Turma: ______________</text>${rows}</svg>`;
}

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function buildAnswerKeyCsv(material: AnswerKeyMaterial) {
  const header = ["Questão", "Resposta correta", "Descritor", "Habilidade", "Disciplina", "Série", "Dificuldade", "Origem"];
  const rows = material.questions.map((question) => [
    question.position,
    question.correctAnswer,
    question.descriptor.code,
    question.descriptor.description,
    getDisciplineLabel(material.disciplineCode),
    getStageLabel(material.stageCode),
    question.difficulty ?? "Não informada",
    question.origin,
  ]);
  return `\uFEFF${[header, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n")}`;
}

async function saveAndShareNativeFile(fileName: string, content: string, mimeType: string, uti?: string) {
  const directory = FileSystem.documentDirectory;
  if (!directory) throw new Error("Não foi possível acessar o armazenamento do dispositivo.");
  const uri = `${directory}${fileName}`;
  const existing = await FileSystem.getInfoAsync(uri);
  if (existing.exists) await FileSystem.deleteAsync(uri, { idempotent: true });
  await FileSystem.writeAsStringAsync(uri, content, { encoding: FileSystem.EncodingType.UTF8 });
  if (!(await Sharing.isAvailableAsync())) throw new Error("O compartilhamento de arquivos não está disponível neste dispositivo.");
  await Sharing.shareAsync(uri, { mimeType, UTI: uti, dialogTitle: fileName });
}

async function saveAndShareNativePdf(material: MockExamMaterial) {
  const directory = FileSystem.documentDirectory;
  if (!directory) throw new Error("Não foi possível acessar o armazenamento do dispositivo.");
  const fileName = getFileName(material, "pdf");
  const uri = `${directory}${fileName}`;
  const existing = await FileSystem.getInfoAsync(uri);
  if (existing.exists) await FileSystem.deleteAsync(uri, { idempotent: true });
  const result = await Print.printToFileAsync({ html: buildPdfHtml(material), base64: false, width: 595, height: 842 });
  await FileSystem.moveAsync({ from: result.uri, to: uri });
  if (!(await Sharing.isAvailableAsync())) throw new Error("O compartilhamento de arquivos não está disponível neste dispositivo.");
  await Sharing.shareAsync(uri, { mimeType: "application/pdf", UTI: ".pdf", dialogTitle: fileName });
}

export async function exportMockExamMaterial(material: MockExamMaterial, requestedFormat: MaterialExportFormat) {
  const supported = getMaterialExportActions(material.kind).some(({ format }) => format === requestedFormat);
  if (!supported) throw new Error("Esse formato não está disponível para este material.");
  if (requestedFormat === "print") {
    const html = buildPdfHtml(material);
    if (Platform.OS === "web") await printHtmlDocumentInBrowser(html);
    else await Print.printAsync({ html });
    return "Material enviado para impressão.";
  }

  let format = requestedFormat;
  if (format === "share") {
    format = material.kind === "student" ? "word" : material.kind === "answer-sheet" ? "image" : "spreadsheet";
  }
  if (format === "pdf") {
    if (Platform.OS === "web") {
      await printHtmlDocumentInBrowser(buildPdfHtml(material));
      return "Escolha ‘Salvar como PDF’ na janela de impressão para baixar o arquivo.";
    }
    await saveAndShareNativePdf(material);
    return "PDF preparado. Escolha onde salvar ou compartilhar.";
  }

  let extension: string;
  let mimeType: string;
  let content: string;
  let uti: string | undefined;
  if (format === "word" && material.kind === "student") {
    extension = "doc";
    mimeType = "application/msword";
    uti = "com.microsoft.word.doc";
    content = buildPdfHtml(material);
  } else if (format === "image" && material.kind === "answer-sheet") {
    extension = "svg";
    mimeType = "image/svg+xml";
    uti = "public.svg-image";
    content = buildAnswerSheetSvg(material);
  } else if (format === "spreadsheet" && material.kind === "answer-key") {
    extension = "csv";
    mimeType = "text/csv;charset=utf-8";
    uti = "public.comma-separated-values-text";
    content = buildAnswerKeyCsv(material);
  } else {
    throw new Error("Formato de exportação inválido para este material.");
  }

  const fileName = getFileName(material, extension);
  if (Platform.OS === "web") {
    const file = new File([content], fileName, { type: mimeType });
    if (requestedFormat === "share" && navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: fileName });
      return "Arquivo compartilhado.";
    }
    downloadInBrowser(content, fileName, mimeType);
    return requestedFormat === "share"
      ? "O arquivo foi baixado. Use o menu do navegador para compartilhá-lo."
      : `Arquivo ${extension.toUpperCase()} baixado: ${fileName}`;
  }

  await saveAndShareNativeFile(fileName, content, mimeType, uti);
  return requestedFormat === "share"
    ? "Arquivo preparado para compartilhamento."
    : `Arquivo ${extension.toUpperCase()} preparado. Escolha onde salvar ou compartilhar.`;
}
