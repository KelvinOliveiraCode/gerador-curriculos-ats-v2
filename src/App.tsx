import { useState } from 'react';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import PdfExport from './components/PdfExport';
import LinkedInImport from './components/LinkedInImport';
import type { ResumeData } from './types/resume';
import { INITIAL_RESUME_DATA } from './types/resume';

/**
 * Shell da aplicação.
 *
 * Layout de duas colunas (editor à esquerda, pré-visualização à direita) com
 * botões de importação LinkedIn e exportação PDF no topo. Aplicativo de página
 * única, todo o estado em memória.
 */
export default function App() {
  const [draft, setDraft] = useState<ResumeData>(INITIAL_RESUME_DATA);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-line bg-paper sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink text-lg">Gerador de Currículos ATS v2</span>
            <span className="text-muted text-sm">• Frontend · React 18 · TypeScript · Tailwind</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <LinkedInImport onImport={(imported) => setDraft({ ...draft, ...imported })} />
            <PdfExport resume={draft} />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 space-y-4">
          <h2 className="text-ink font-semibold text-lg">Editor</h2>
          <ResumeEditor resume={draft} onChange={setDraft} />
        </section>

        <section className="lg:col-span-5 space-y-4">
          <h2 className="text-ink font-semibold text-lg">Pré-visualização</h2>
          <ResumePreview resume={draft} />
        </section>
      </main>
    </div>
  );
}
