/**
 * Exportação de PDF para currículo.
 *
 * Estratégia: renderiza o currículo num container oculto do DOM, chama
 * window.print() e deixa o navegador gerar o PDF via "Imprimir como PDF".
 * Esta abordagem produz PDF de texto (selecionável, acessível a leitores de
 * tela e a ATS), ao contrário de conversões para imagem/canvas que tornam o
 * texto ilegível a máquinas.
 *
 * Todas as funções de preparação de dados são puras e testáveis; apenas a
 * chamada de impressão depende do navegador (mockada nos testes).
 */

import type { ResumeData } from '../types/resume';

const PRINT_CONTAINER_ID = 'ats-resume-print';

/** Monta o HTML para impressão a partir dos dados do currículo. */
export function buildPrintHtml(resume: ResumeData): string {
  const { personal, summary, experience, education, skills, languages, certifications } = resume;

  const escapeHtml = (text: string): string =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const bullets = (items: string[]): string =>
    items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');

  const experienceHtml = experience
    .map(
      (item) => `
    <section class="resume-section">
      <h2>${escapeHtml(item.position)}</h2>
      <h3>${escapeHtml(item.company)}</h3>
      <p class="dates">${escapeHtml(item.startDate)} – ${item.current ? 'Presente' : escapeHtml(item.endDate)}</p>
      <p class="location">${escapeHtml(item.location)}</p>
      ${item.description.length > 0 ? `<ul>${bullets(item.description)}</ul>` : ''}
    </section>
  `
    )
    .join('');

  const educationHtml = education
    .map(
      (item) => `
    <section class="resume-section">
      <h2>${escapeHtml(item.degree)}</h2>
      <h3>${escapeHtml(item.institution)}</h3>
      <p class="dates">${escapeHtml(item.startDate)} – ${item.current ? 'Presente' : escapeHtml(item.endDate)}</p>
      <p class="field">${escapeHtml(item.field)}</p>
    </section>
  `
    )
    .join('');

  const skillsHtml = skills
    .map((skill) => `<span class="skill-tag">${escapeHtml(skill.name)}</span>`)
    .join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<style>
  @page { margin: 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #111827;
    font-size: 11pt;
    line-height: 1.5;
    margin: 0;
  }
  .resume-header { text-align: center; border-bottom: 2px solid #111827; padding-bottom: 12px; margin-bottom: 18px; }
  .resume-header h1 { margin: 0; font-size: 22pt; letter-spacing: 0.5px; }
  .resume-header .contact { font-size: 9pt; color: #6b7280; margin-top: 6px; }
  .resume-header .contact a { color: #6b7280; text-decoration: none; }
  .resume-section { margin-bottom: 14px; }
  .resume-section h2 { margin: 0 0 4px 0; font-size: 12pt; text-transform: uppercase; letter-spacing: 1px; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; }
  .resume-section h3 { margin: 2px 0 0 0; font-size: 10.5pt; }
  .resume-section p { margin: 2px 0; font-size: 10pt; }
  .dates { color: #6b7280; font-size: 9.5pt; }
  .location { color: #6b7280; font-size: 9.5pt; }
  ul { margin: 4px 0 0 0; padding-left: 18px; }
  li { margin-bottom: 2px; font-size: 10pt; }
  .skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
  .skill-tag { border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px 8px; font-size: 9pt; color: #374151; background: #f9fafb; }
  .two-col { display: flex; gap: 18px; }
  .two-col > div { flex: 1; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
  }
</style>
</head>
<body>
  <header class="resume-header">
    <h1>${escapeHtml(personal.name)}</h1>
    <div class="contact">
      ${escapeHtml(personal.email)} &bull; ${escapeHtml(personal.phone)} &bull; ${escapeHtml(personal.location)}
      ${personal.website ? ` &bull; <a href="${escapeHtml(personal.website)}">${escapeHtml(personal.website)}</a>` : ''}
      ${personal.linkedin ? ` &bull; <a href="${escapeHtml(personal.linkedin)}">${escapeHtml(personal.linkedin)}</a>` : ''}
      ${personal.github ? ` &bull; <a href="${escapeHtml(personal.github)}">${escapeHtml(personal.github)}</a>` : ''}
    </div>
  </header>

  ${summary ? `<section class="resume-section"><h2>Resumo profissional</h2><p>${escapeHtml(summary)}</p></section>` : ''}

  ${experience.length > 0 ? `<section class="resume-section"><h2>Experiência</h2>${experienceHtml}</section>` : ''}
  ${education.length > 0 ? `<section class="resume-section"><h2>Formação</h2>${educationHtml}</section>` : ''}
  ${skills.length > 0 ? `<section class="resume-section"><h2>Habilidades</h2><div class="skills">${skillsHtml}</div></section>` : ''}
  ${languages.length > 0 ? `<section class="resume-section"><h2>Idiomas</h2><p>${languages.map(escapeHtml).join(', ')}</p></section>` : ''}
  ${certifications.length > 0 ? `<section class="resume-section"><h2>Certificações</h2><ul>${certifications.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul></section>` : ''}
</body>
</html>
`;
}

/** Abre o currículo numa janela de impressão para gerar PDF. */
export function printToPdf(resume: ResumeData): void {
  const html = buildPrintHtml(resume);
  const existing = document.getElementById(PRINT_CONTAINER_ID);
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = PRINT_CONTAINER_ID;
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.zIndex = '9999';
  container.style.background = '#ffffff';
  container.innerHTML = html;
  document.body.appendChild(container);

  window.print();

  document.body.removeChild(container);
}

/** Diz se o ambiente suporta impressão para PDF (navegador com window.print). */
export function supportsPrintToPdf(): boolean {
  return typeof window !== 'undefined' && typeof window.print === 'function';
}
