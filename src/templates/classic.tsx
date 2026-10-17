import type { ResumeData } from '../types/resume';

/**
 * Template Classic.
 *
 * Layout de coluna única, sem imagens, sem colunas laterais. Texto puro e
 * semântico: ideal para leitura por ATS e impressão limpa.
 */
export default function Classic({ resume }: { resume: ResumeData }) {
  const { personal, summary, experience, education, skills, languages, certifications } = resume;

  return (
    <div className="max-w-[800px] mx-auto p-6 sm:p-8 text-ink leading-relaxed">
      <header className="text-center border-b border-ink pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{personal.name}</h1>
        <p className="text-sm text-muted flex items-center justify-center gap-2">
          {personal.email} • {personal.phone} • {personal.location}
        </p>
        <p className="text-sm text-muted mt-1 flex items-center justify-center gap-1">
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              className="text-accent hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {personal.github && (
            <a
              href={personal.github}
              className="text-accent hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              • GitHub
            </a>
          )}
        </p>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 border-b border-line pb-1">
            Resumo profissional
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 border-b border-line pb-1">
            Experiência
          </h2>
          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.id} className="mb-2">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-semibold">{job.position}</span>
                  <span className="text-muted text-xs">•</span>
                  <span className="font-medium">{job.company}</span>
                </div>
                <p className="text-xs text-muted mb-1">
                  {job.startDate} – {job.current ? 'Presente' : job.endDate}{' '}
                  {job.location && `• ${job.location}`}
                </p>
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
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 border-b border-line pb-1">
            Formação
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-semibold">{edu.degree}</span>
                  <span className="text-muted text-xs">•</span>
                  <span className="font-medium">{edu.institution}</span>
                </div>
                <p className="text-xs text-muted mb-1">
                  {edu.startDate} – {edu.current ? 'Presente' : edu.endDate}{' '}
                  {edu.field && `• ${edu.field}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 border-b border-line pb-1">
            Habilidades
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-block border border-line rounded px-2.5 py-1 text-xs text-muted"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 border-b border-line pb-1">
            Idiomas
          </h2>
          <p className="text-sm">{languages.join(', ')}</p>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 border-b border-line pb-1">
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
