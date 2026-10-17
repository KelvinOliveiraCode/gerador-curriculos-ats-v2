# BRIEF — gerador-curriculos-ats-v2

## Entregas / Deliverables

Projeto Frontend: gerador de currículos amigável a ATS (React 18, TypeScript, Tailwind CSS, exportação PDF).

Frontend project: ATS-friendly resume builder (React 18, TypeScript, Tailwind CSS, PDF export).

### Arquivos criados / Files created

| Caminho | Função |
|---------|--------|
| `package.json` | Manifesto npm (scripts: dev, build, test, preview) |
| `tsconfig.json` | TypeScript strict |
| `vite.config.ts` | Vite + Vitest (jsdom) |
| `tailwind.config.js` | Tokens de cor/tipografia Tailwind |
| `postcss.config.js` | Tailwind + Autoprefixer |
| `index.html` | Entrada da aplicação |
| `src/main.tsx` | Ponto de entrada React |
| `src/App.tsx` | Shell: editor + pré-visualização + ações |
| `src/index.css` | Tailwind directives + utilitários de impressão |
| `src/types/resume.ts` | Modelo de dados do currículo |
| `src/hooks/useResume.ts` | Estado do currículo + localStorage |
| `src/lib/validation.ts` | Validação de dados pessoais/currículo |
| `src/lib/resume-utils.ts` | Utilitários puros de currículo |
| `src/lib/pdf.ts` | Geração de HTML para impressão/PDF |
| `src/components/Icons.tsx` | Ícones inline SVG (sem dependência externa) |
| `src/components/FormField.tsx` | Campo de formulário com erro inline |
| `src/components/SectionEditor.tsx` | Editor genérico de seção de lista |
| `src/components/ResumeEditor.tsx` | Formulário principal do currículo |
| `src/components/ResumePreview.tsx` | Pré-visualização por template |
| `src/components/PdfExport.tsx` | Botão de exportação PDF (window.print) |
| `src/components/LinkedInImport.tsx` | Importação manual do LinkedIn (MVP) |
| `src/templates/classic.tsx` | Template classic |
| `src/templates/modern.tsx` | Template modern |
| `src/templates/minimal.tsx` | Template minimal |
| `src/lib/validation.test.ts` | Testes de validação (12) |
| `src/lib/resume-utils.test.ts` | Testes de utilitários (15) |
| `src/lib/pdf.test.ts` | Testes de geração PDF (12) |
| `README.md` | Documentação bilíngue PT-BR + EN |
| `BRIEF.md` | Este documento |

### Critérios de aceitação / Acceptance criteria

| Critério | Status | Como verificar |
|----------|--------|----------------|
| Exporta PDF válido | OK | `npm run build`, abra a app, clique em "Exportar PDF"; o navegador gera PDF de texto selecionável |
| Testes passam | OK | `npm test` → 39/39 passando |
| README PT/EN completo | OK | `README.md` com título, descrição, uso, testes, licença MIT, autor |

## Como verificar / How to verify

```bash
# 1. Instalar dependências
cd gerador-curriculos-ats-v2
npm install

# 2. Rodar o tipo-checagem
npx tsc --noEmit
# esperado: sem erros

# 3. Rodar os testes
npm test
# esperado: 39 passed, 0 failed

# 4. Build de produção
npm run build
# esperado: pasta dist/ gerada sem erros

# 5. Exportação PDF (manual)
npm run dev
# Abra http://localhost:5173, preencha o currículo e clique em "Exportar PDF"
# esperado: o navegador abre a caixa de impressão para gerar PDF
```

## Notas de implementação / Implementation notes

- **PDF de texto, não imagem:** a exportação usa `window.print()` sobre HTML semântico, produzindo PDF selecionável e legível por ATS (ao contrário de conversão para canvas/imagem).
- **Ícones locais:** SVG inline em `src/components/Icons.tsx`, sem dependência de pacote externo de ícones.
- **LinkedIn (MVP):** sem requisições de rede; o usuário cola a URL do perfil e preenche os dados no editor.
- **Determinismo:** IDs gerados com contador + timestamp; funções puras em `src/lib/` sem efeitos colaterais.
- **Armazenamento:** rascunho salvo em `localStorage` (chave `ats-resume-v2-draft`), opcional e silencioso em modo privado.
