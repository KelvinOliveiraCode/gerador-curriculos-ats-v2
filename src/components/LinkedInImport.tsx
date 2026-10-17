import { useState } from 'react';
import { UploadIcon } from './Icons';
import type { ResumeData } from '../types/resume';

/**
 * Importação de currículo do LinkedIn (MVP).
 *
 * O LinkedIn exige autenticação e não expõe API pública de exportação sem
 * chave. Esta tela é um auxiliar de importação manual: o usuário cola a URL
 * do perfil e o link é gravado no rascunho. Todos os dados são tratados
 * localmente, sem requisições de rede.
 */
interface LinkedInImportProps {
  onImport: (data: Partial<ResumeData['personal']>) => void;
}

export default function LinkedInImport({ onImport }: LinkedInImportProps) {
  const [open, setOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');

  const handleImport = () => {
    if (!profileUrl.trim()) return;
    onImport({ linkedin: profileUrl.trim() });
    setProfileUrl('');
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded border text-xs font-medium text-accent border-line hover:bg-accent/5 hover:border-accent transition"
      >
        <UploadIcon size={14} /> Importar LinkedIn
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="bg-paper border border-line rounded-lg p-5 w-full max-w-md shadow-lg">
            <h3 className="text-sm font-semibold text-ink mb-3">Importar do LinkedIn</h3>
            <p className="text-xs text-muted mb-4">
              Cole a URL do perfil do LinkedIn. O restante dos dados é preenchido no editor.
            </p>
            <input
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://linkedin.com/in/usuario"
              className="w-full border border-line rounded px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded text-xs text-muted border border-line hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!profileUrl.trim()}
                className="px-3 py-1 rounded text-xs text-paper bg-ink hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Importar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
