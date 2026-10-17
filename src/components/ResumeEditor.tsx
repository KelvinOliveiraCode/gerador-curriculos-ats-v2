import { useState } from 'react';
import type { ResumeData } from '../types/resume';
import FormField from './FormField';
import SectionEditor from './SectionEditor';

interface ResumeEditorProps {
  resume: ResumeData;
  onChange: (resume: ResumeData) => void;
}

const TEMPLATES: readonly string[] = ['classic', 'modern', 'minimal'];

/**
 * Editor principal do currículo.
 *
 * Renderiza todos os campos editáveis (dados pessoais, resumo, experiência,
 * formação, skills, idiomas, certificações) e um seletor de template. Cada
 * alteração dispara onChange com o novo estado completo, mantendo o fluxo de
 * dados unidirecional.
 */
export default function ResumeEditor({ resume, onChange }: ResumeEditorProps) {
  const [showLanguagesCerts, setShowLanguagesCerts] = useState(false);

  const setPersonal = (field: keyof ResumeData['personal'], value: string) => {
    onChange({
      ...resume,
      personal: { ...resume.personal, [field]: value },
    });
  };

  const setSummary = (value: string) => {
    onChange({ ...resume, summary: value });
  };

  const setTemplate = (value: string) => {
    onChange({ ...resume, template: value as ResumeData['template'] });
  };

  // Experiência
  const addExperience = () => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: [],
    };
    onChange({ ...resume, experience: [...resume.experience, item] });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...resume,
      experience: resume.experience.filter((e) => e.id !== id),
    });
  };

  const updateExperienceField = (id: string, field: string, value: string) => {
    onChange({
      ...resume,
      experience: resume.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const toggleCurrentJob = (id: string) => {
    onChange({
      ...resume,
      experience: resume.experience.map((e) =>
        e.id === id ? { ...e, current: !e.current, endDate: !e.current ? '' : e.endDate } : e
      ),
    });
  };

  const addBullet = (id: string) => {
    onChange({
      ...resume,
      experience: resume.experience.map((e) =>
        e.id === id ? { ...e, description: [...e.description, ''] } : e
      ),
    });
  };

  const removeBullet = (id: string, index: number) => {
    onChange({
      ...resume,
      experience: resume.experience.map((e) =>
        e.id === id
          ? { ...e, description: e.description.filter((_, i) => i !== index) }
          : e
      ),
    });
  };

  const updateBullet = (id: string, index: number, value: string) => {
    onChange({
      ...resume,
      experience: resume.experience.map((e) => {
        if (e.id !== id) return e;
        const description = [...e.description];
        description[index] = value;
        return { ...e, description };
      }),
    });
  };

  // Educação
  const addEducation = () => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange({ ...resume, education: [...resume.education, item] });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...resume,
      education: resume.education.filter((e) => e.id !== id),
    });
  };

  const updateEducationField = (id: string, field: string, value: string) => {
    onChange({
      ...resume,
      education: resume.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const toggleCurrentEdu = (id: string) => {
    onChange({
      ...resume,
      education: resume.education.map((e) =>
        e.id === id ? { ...e, current: !e.current, endDate: !e.current ? '' : e.endDate } : e
      ),
    });
  };

  // Skills
  const addSkill = () => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: '',
    };
    onChange({ ...resume, skills: [...resume.skills, item] });
  };

  const removeSkill = (id: string) => {
    onChange({ ...resume, skills: resume.skills.filter((s) => s.id !== id) });
  };

  const updateSkill = (id: string, value: string) => {
    onChange({
      ...resume,
      skills: resume.skills.map((s) => (s.id === id ? { ...s, name: value } : s)),
    });
  };

  // Idiomas / certificações (lista simples de strings)
  const updateLanguages = (value: string) => {
    onChange({ ...resume, languages: value.split(',').map((s) => s.trim()).filter(Boolean) });
  };

  const updateCertifications = (value: string) => {
    onChange({
      ...resume,
      certifications: value.split('\n').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="space-y-5">
      {/* Dados pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Nome completo"
          value={resume.personal.name}
          onChange={(v) => setPersonal('name', v)}
          placeholder="João da Silva"
        />
        <FormField
          label="E-mail"
          value={resume.personal.email}
          onChange={(v) => setPersonal('email', v)}
          type="email"
          placeholder="joao@email.com"
        />
        <FormField
          label="Telefone"
          value={resume.personal.phone}
          onChange={(v) => setPersonal('phone', v)}
          placeholder="+55 11 99999-9999"
        />
        <FormField
          label="Localização"
          value={resume.personal.location}
          onChange={(v) => setPersonal('location', v)}
          placeholder="São Paulo, SP"
        />
        <FormField
          label="Website / Portfólio"
          value={resume.personal.website ?? ''}
          onChange={(v) => setPersonal('website', v)}
          type="url"
          placeholder="https://joao.dev"
        />
        <FormField
          label="LinkedIn"
          value={resume.personal.linkedin ?? ''}
          onChange={(v) => setPersonal('linkedin', v)}
          type="url"
          placeholder="https://linkedin.com/in/joao"
        />
        <FormField
          label="GitHub"
          value={resume.personal.github ?? ''}
          onChange={(v) => setPersonal('github', v)}
          type="url"
          placeholder="https://github.com/joao"
        />
      </div>

      {/* Resumo */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted block">Resumo profissional</label>
        <textarea
          value={resume.summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="block w-full rounded border border-line px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Resumo breve da sua trajetória profissional..."
        />
      </div>

      {/* Template */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted block">Template</label>
        <div className="flex gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl}
              type="button"
              onClick={() => setTemplate(tpl)}
                className={`px-3 py-1.5 rounded text-xs border ${
                  resume.template === tpl
                    ? 'bg-accent text-paper border-accent'
                    : 'bg-paper text-ink border-line hover:border-accent'
                }`}
              >
                {tpl.charAt(0).toUpperCase() + tpl.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Experiência */}
      <SectionEditor
        title="Experiência"
        items={resume.experience}
        onAdd={addExperience}
        onRemove={removeExperience}
        emptyMessage="Nenhuma experiência cadastrada."
        renderItem={(job) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField
              label="Cargo"
              value={job.position}
              onChange={(v) => updateExperienceField(job.id, 'position', v)}
              placeholder="Desenvolvedor Frontend"
            />
            <FormField
              label="Empresa"
              value={job.company}
              onChange={(v) => updateExperienceField(job.id, 'company', v)}
              placeholder="Empresa Ltda."
            />
            <div className="flex flex-col gap-2">
              <FormField
                label="Início"
                value={job.startDate}
                onChange={(v) => updateExperienceField(job.id, 'startDate', v)}
                type="date"
              />
              <div className="flex items-end gap-2">
                <label className="text-xs font-medium text-muted flex items-center gap-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={job.current}
                    onChange={() => toggleCurrentJob(job.id)}
                    className="rounded border-line text-accent focus:ring-accent"
                  />
                  Atual
                </label>
                {!job.current && (
                  <FormField
                    label="Término"
                    value={job.endDate}
                    onChange={(v) => updateExperienceField(job.id, 'endDate', v)}
                    type="date"
                  />
                )}
              </div>
            </div>
            <FormField
              label="Localização"
              value={job.location}
              onChange={(v) => updateExperienceField(job.id, 'location', v)}
              placeholder="Cidade, UF"
            />
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-medium text-muted block">Descrição (balas)</label>
              <div className="space-y-2">
                {job.description.map((bullet, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={bullet}
                      onChange={(e) => updateBullet(job.id, i, e.target.value)}
                      placeholder="Realização ou responsabilidade..."
                      className="flex-1 border border-line rounded px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(job.id, i)}
                      disabled={job.description.length <= 1}
                      className="text-xs text-red-600 hover:underline p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBullet(job.id)}
                  className="text-xs text-accent hover:underline self-start p-0 border-none bg-transparent"
                >
                  + adicionar bala
                </button>
              </div>
            </div>
          </div>
        )}
      />

      {/* Formação */}
      <SectionEditor
        title="Formação"
        items={resume.education}
        onAdd={addEducation}
        onRemove={removeEducation}
        emptyMessage="Nenhuma formação cadastrada."
        renderItem={(edu) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField
              label="Curso / Graduação"
              value={edu.degree}
              onChange={(v) => updateEducationField(edu.id, 'degree', v)}
              placeholder="Ciência da Computação"
            />
            <FormField
              label="Instituição"
              value={edu.institution}
              onChange={(v) => updateEducationField(edu.id, 'institution', v)}
              placeholder="Universidade"
            />
            <div className="flex flex-col gap-2">
              <FormField
                label="Início"
                value={edu.startDate}
                onChange={(v) => updateEducationField(edu.id, 'startDate', v)}
                type="date"
              />
              <div className="flex items-end gap-2">
                <label className="text-xs font-medium text-muted flex items-center gap-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={() => toggleCurrentEdu(edu.id)}
                    className="rounded border-line text-accent focus:ring-accent"
                  />
                  Cursando
                </label>
                {!edu.current && (
                  <FormField
                    label="Término"
                    value={edu.endDate}
                    onChange={(v) => updateEducationField(edu.id, 'endDate', v)}
                    type="date"
                  />
                )}
              </div>
            </div>
            <FormField
              label="Área"
              value={edu.field}
              onChange={(v) => updateEducationField(edu.id, 'field', v)}
              placeholder="Bacharelado"
            />
          </div>
        )}
      />

      {/* Skills */}
      <SectionEditor
        title="Habilidades"
        items={resume.skills}
        onAdd={addSkill}
        onRemove={removeSkill}
        emptyMessage="Nenhuma habilidade cadastrada."
        renderItem={(skill) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              label="Habilidade"
              value={skill.name}
              onChange={(v) => updateSkill(skill.id, v)}
              placeholder="TypeScript"
            />
          </div>
        )}
      />

      {/* Idiomas e certificações (colapsável) */}
      <div className="border border-line rounded-lg p-3">
        <button
          type="button"
          onClick={() => setShowLanguagesCerts((s) => !s)}
          className="flex items-center gap-2 text-xs font-medium text-accent border-none bg-transparent p-0 w-full justify-start"
        >
          {showLanguagesCerts ? '▲' : '▼'} Idiomas e certificações
        </button>
        {showLanguagesCerts && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted block">Idiomas (separados por vírgula)</label>
              <input
                value={resume.languages.join(', ')}
                onChange={(e) => updateLanguages(e.target.value)}
                placeholder="Português, Inglês"
                className="w-full border border-line rounded px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted block">Certificações (uma por linha)</label>
              <textarea
                value={resume.certifications.join('\n')}
                onChange={(e) => updateCertifications(e.target.value)}
                rows={3}
                className="block w-full rounded border border-line px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="AWS Cloud Practitioner\nScrum Fundamentals"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
