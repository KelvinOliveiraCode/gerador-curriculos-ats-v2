# Gerador de Currículos ATS v2
# ATS-Friendly Resume Builder v2

Gerador de currículos otimizado para sistemas de rastreamento de candidatos (ATS), construído com React 18, TypeScript e Tailwind CSS. Oferece múltiplos templates, importação manual de perfil do LinkedIn e exportação de PDF de texto (selecionável e legível por ATS).

ATS-friendly resume builder with multiple templates, manual LinkedIn profile import, and text-based PDF export (selectable and ATS-readable). Built with React 18, TypeScript, and Tailwind CSS.

---

## Descrição / Description

**PT-BR:** A maioria dos sistemas ATS rejeita currículos com colunas, imagens, gráficos ou texto embutido em imagem. Este projeto gera currículos em HTML semântico, coluna única, sem imagens — o que o navegador imprime como PDF de texto puro. O resultado é selecionável, acessível a leitores de tela e legível por recrutadores e máquinas.

**EN:** Most ATS systems reject resumes with columns, images, charts, or text embedded in images. This project generates semantic, single-column HTML with no images — printed by the browser as plain-text PDF. The output is selectable, screen-reader accessible, and readable by recruiters and machines alike.

---

## Como usar / How to use

### Pré-requisitos / Prerequisites

Node.js 20+ e npm.

Node.js 20+ and npm.

### Instalação / Installation

```bash
cd gerador-curriculos-ats-v2
npm install
```

### Desenvolvimento / Development

```bash
npm run dev
```

Abre http://localhost:5173.

Opens http://localhost:5173.

### Build de produção / Production build

```bash
npm run build
```

Gera a pasta `dist/`.

Outputs the `dist/` folder.

### Preview de produção / Production preview

```bash
npm run preview
```

---

## Stack

- React 18
- TypeScript (modo strict)
- Tailwind CSS
- Vite
- Vitest (testes)

---

## Templates

Três templates, todos ATS-friendly (coluna única, sem imagens, texto puro):

**classic** — Cabeçalho centralizado, linhas de separação, seções claras.

**modern** — Cabeçalho com linha de destaque, datas alinhadas à direita, tags de habilidade coloridas.

**minimal** — Versão enxuta, espaçamento reduzido, sem cor de destaque. Máxima compatibilidade com ATS.

Three templates, all ATS-friendly (single column, no images, plain text):

**classic** — Centered header, divider lines, clear sections.

**modern** — Highlighted header line, right-aligned dates, colored skill tags.

**minimal** — Compact, reduced spacing, no accent color. Maximum ATS compatibility.

---

## Exportação de PDF / PDF export

Clique em **Exportar PDF** no cabeçalho. O aplicativo renderiza o currículo num container oculto e chama `window.print()`, que o navegador transforma em PDF via "Imprimir como PDF".

Vantagem dessa abordagem: o PDF contém texto de verdade (não imagem), então é selecionável, acessível e legível por ATS.

Click **Export PDF** in the header. The app renders the resume in a hidden container and calls `window.print()`, which the browser turns into a PDF via "Print to PDF".

Advantage: the PDF contains real text (not an image), so it is selectable, accessible, and ATS-readable.

---

## Importação do LinkedIn / LinkedIn import

O LinkedIn exige autenticação e não oferece API pública de exportação sem chave. Por isso, a importação é manual: cole a URL do perfil no botão **Importar LinkedIn** e preencha os dados no editor. Tudo é processado localmente, sem requisições de rede.

LinkedIn requires authentication and offers no public export API without a key. Import is therefore manual: paste the profile URL in **Import LinkedIn** and fill in the data in the editor. Everything is processed locally, with no network requests.

---

## Testes / Tests

```bash
npm test
```

Executa o conjunto Vitest (39 testes em 3 arquivos): validação de dados, utilitários de currículo e geração de HTML para impressão.

Runs the Vitest suite (39 tests in 3 files): data validation, resume utilities, and print HTML generation.

Todos os testes passam e o comando de build (`tsc --noEmit && vite build`) é executado sem erros.

All tests pass and the build command (`tsc --noEmit && vite build`) runs without errors.

---

## Licença / License

MIT License.

Copyright (c) 2026 Kelvin Oliveira.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Autor / Author

**Kelvin Oliveira**

Projeto desenvolvido para a área Frontend do plano de 50 projetos.

Project developed for the Frontend area of the 50-projects plan.
