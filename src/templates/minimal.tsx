import type { ResumeData } from '../types/resume';

/**
 * Template Minimal.
 *
 * Versão enxuta do Classic: espaçamento reduzido, sem destaque de cor, apenas
 * texto e linhas finas. Máxima compatibilidade com ATS.
 */
export default function Minimal({ resume }: { resume: ResumeData }) {
  const { personal, summary, experience, education, skills, languages, certifications } = resume;

  return (
    <div className="max-w-[760px] mx-auto p-4 sm:p-6 text-ink leading-tight">
      <header className="border-b border-line pb-3 mb-5">
        <h1 className="text-2xl font-bold tracking-tight mb-1">{personal.name}</h1>
        <p className="text-xs text-muted flex items-center justify-center gap-1">
          {personal.email} • {personal.phone} • {personal.location}
          {personal.linkedin && ` • ${personal.linkedin}`}
          {personal.github && ` • ${personal.github}`}
        </p>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-line pb-1">
            Resumo profissional
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-line pb-1">
            Experiência
          </h2>
          <div className="space-y-3">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-wrap items-baseline gap-1 mb-1">
                  <span className="font-medium">{job.position}</span>
                  <span className="text-muted text-xs">• {job.company}</span>
                  <span className="text-muted text-xs ml-auto">
                    {job.startDate} – {job.current ? 'Presente' : job.endDate}
                  </span>
                </div>
                <p className="text-xs text-muted mb-1">{job.location}</p>
                {job.description.length > 0 && (
                  <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                    {job.description.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-line pb-1">
            Formação
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap items-baseline gap-1 mb-1">
                  <span className="font-medium">{edu.degree}</span>
                  <span className="text-muted text-xs">• {edu.institution}</span>
                  <span className="text-muted text-xs ml-auto">
                    {edu.startDate} – {edu.current ? 'Presente' : edu.endDate}
                  </span>
                </div>
                <p className="text-xs text-muted">{edu.field}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-line pb-1">
            Habilidades
          </h2>
          <p className="text-sm">{skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-line pb-1">
            Idiomas
          </h2>
          <p className="text-sm">{languages.join(', ')}</p>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-line pb-1">
            Certificações
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
