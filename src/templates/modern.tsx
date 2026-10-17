import type { ResumeData } from '../types/resume';

/**
 * Template Modern.
 *
 * Mesmo conteúdo semântico do Classic, com cabeçalho destacado e linhas de
 * separação mais suaves. Sem colunas, sem imagens — continua ATS-friendly.
 */
export default function Modern({ resume }: { resume: ResumeData }) {
  const { personal, summary, experience, education, skills, languages, certifications } = resume;

  return (
    <div className="max-w-[800px] mx-auto p-6 sm:p-8 text-ink leading-relaxed">
      <header className="border-b-2 border-accent pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{personal.name}</h1>
        <p className="text-sm text-muted flex items-center gap-2">
          {personal.email} • {personal.phone} • {personal.location}
        </p>
        <p className="text-sm text-muted mt-2 flex flex-wrap gap-2">
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
            <span className="text-xs">•</span>
          )}
          {personal.github && (
            <a
              href={personal.github}
              className="text-accent hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </p>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
            Resumo profissional
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 border-b border-line pb-1">
            Experiência
          </h2>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-semibold text-lg">{job.position}</span>
                  <span className="text-accent text-xs font-bold ml-auto">
                    {job.startDate} – {job.current ? 'Presente' : job.endDate}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium">{job.company}</span>
                  {job.location && (
                    <span className="text-muted text-xs">• {job.location}</span>
                  )}
                </div>
                {job.description.length > 0 && (
                  <ul className="list-disc list-outside text-sm space-y-1 mt-2 pl-5">
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
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 border-b border-line pb-1">
            Formação
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-semibold">{edu.degree}</span>
                  <span className="text-accent text-xs font-bold ml-auto">
                    {edu.startDate} – {edu.current ? 'Presente' : edu.endDate}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium">{edu.institution}</span>
                  {edu.field && (
                    <span className="text-muted text-xs">• {edu.field}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 border-b border-line pb-1">
            Habilidades
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-block border border-accent/30 bg-accent/5 rounded px-3 py-1 text-xs text-accent font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
            Idiomas
          </h2>
          <p className="text-sm">{languages.join(', ')}</p>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 border-b border-line pb-1">
            Certificações
          </h2>
          <ul className="list-disc list-outside text-sm space-y-1 pl-5">
            {certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
