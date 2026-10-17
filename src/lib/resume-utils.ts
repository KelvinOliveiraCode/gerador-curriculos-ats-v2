/**
 * Utilitários puros para dados de currículo.
 *
 * Sem efeitos colaterais, sem dependência de DOM. Determinísticos: dados
 * iguais produzem saída igual, o que torna os testes reproduzíveis.
 */

import type { ResumeData } from '../types/resume';
import {
  EMPTY_EXPERIENCE,
  EMPTY_EDUCATION,
  EMPTY_SKILL,
} from '../types/resume';

let counter = 0;

/** Gera um ID estável para um novo item de seção. */
export function generateId(): string {
  counter += 1;
  return `${Date.now()}-${counter}`;
}

/** Adiciona um item de experiência em branco ao currículo. */
export function addExperience(resume: ResumeData): ResumeData {
  return {
    ...resume,
    experience: [...resume.experience, { ...EMPTY_EXPERIENCE, id: generateId() }],
  };
}

/** Adiciona um item de educação em branco ao currículo. */
export function addEducation(resume: ResumeData): ResumeData {
  return {
    ...resume,
    education: [...resume.education, { ...EMPTY_EDUCATION, id: generateId() }],
  };
}

/** Adiciona uma skill em branco ao currículo. */
export function addSkill(resume: ResumeData): ResumeData {
  return {
    ...resume,
    skills: [...resume.skills, { ...EMPTY_SKILL, id: generateId() }],
  };
}

/** Remove um item de experiência pelo id. */
export function removeExperience(resume: ResumeData, id: string): ResumeData {
  return {
    ...resume,
    experience: resume.experience.filter((item) => item.id !== id),
  };
}

/** Remove um item de educação pelo id. */
export function removeEducation(resume: ResumeData, id: string): ResumeData {
  return {
    ...resume,
    education: resume.education.filter((item) => item.id !== id),
  };
}

/** Remove uma skill pelo id. */
export function removeSkill(resume: ResumeData, id: string): ResumeData {
  return {
    ...resume,
    skills: resume.skills.filter((item) => item.id !== id),
  };
}

/** Atualiza o texto de uma bala de descrição de experiência. */
export function setExperienceDescription(
  resume: ResumeData,
  id: string,
  index: number,
  text: string
): ResumeData {
  return {
    ...resume,
    experience: resume.experience.map((item) => {
      if (item.id !== id) return item;
      const description = [...item.description];
      description[index] = text;
      return { ...item, description };
    }),
  };
}

/** Conta o total de balas de descrição em todas as experiências. */
export function countBulletPoints(resume: ResumeData): number {
  return resume.experience.reduce((total, item) => total + item.description.length, 0);
}

/** Retorna a data de término exibível (atual → "Presente"). */
export function endDateLabel(item: { endDate: string; current: boolean }): string {
  if (item.current || !item.endDate) return 'Presente';
  return item.endDate;
}

// Estado inicial (consts reexportadas do módulo de tipos).
export { EMPTY_EXPERIENCE, EMPTY_EDUCATION, EMPTY_SKILL };

