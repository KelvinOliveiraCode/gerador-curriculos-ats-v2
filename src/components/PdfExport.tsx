import { PrintIcon } from './Icons';
import type { ResumeData } from '../types/resume';
import { printToPdf, supportsPrintToPdf } from '../lib/pdf';

/**
 * Botão de exportação para PDF.
 *
 * Aciona window.print() sobre uma cópia oculta do currículo, produzindo um
 * PDF de texto (selecionável e legível por ATS). Se o navegador não suportar
 * impressão, o botão fica desabilitado com aviso.
 */
interface PdfExportProps {
  resume: ResumeData;
}

export default function PdfExport({ resume }: PdfExportProps) {
  const supported = supportsPrintToPdf();

  return (
    <button
      type="button"
      onClick={() => printToPdf(resume)}
      disabled={!supported}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition ${
        supported
          ? 'bg-ink text-paper border-ink hover:bg-accent hover:border-accent'
          : 'bg-line text-muted border-line cursor-not-allowed'
      }`}
    >
      <PrintIcon size={16} /> Exportar PDF
    </button>
  );
}
