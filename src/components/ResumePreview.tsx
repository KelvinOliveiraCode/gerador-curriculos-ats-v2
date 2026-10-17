import type { ResumeData, ResumeTemplate } from '../types/resume';
import Classic from '../templates/classic';
import Modern from '../templates/modern';
import Minimal from '../templates/minimal';

const TEMPLATE_COMPONENTS: Record<ResumeTemplate, React.ComponentType<{ resume: ResumeData }>> = {
  classic: Classic,
  modern: Modern,
  minimal: Minimal,
};

/**
 * Pré-visualização do currículo renderizada no template selecionado.
 *
 * A pré-visualização usa os mesmos componentes de impressão do PDF, garantindo
 * que o que o usuário vê é o que será exportado (WYSIWYG).
 */
interface ResumePreviewProps {
  resume: ResumeData;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const Template = TEMPLATE_COMPONENTS[resume.template] || Classic;

  return (
    <div className="border border-line rounded-lg p-1 sm:p-2 bg-paper">
      <Template resume={resume} />
    </div>
  );
}
