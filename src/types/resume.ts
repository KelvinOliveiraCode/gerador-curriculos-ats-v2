/**
 * Modelo de dados do currículo.
 *
 * Todo campo é opcional por intenção: um currículo ATS-friendly não exige
 * preenchimento de seções que o usuário não tem. Os IDs gerados pelo cliente
 * são determinísticos (timestamp + contador) para testes reproduzíveis.
 */

/** Identificador de item de seção (experiência, educação). */
export type ItemId = string;

/** Templates disponíveis. ATS-friendly = sem colunas, sem imagens, texto puro. */
export type ResumeTemplate = 'classic' | 'modern' | 'minimal';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceItem {
  id: ItemId;
  company: string;
  position: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate: string; // ISO yyyy-mm-dd ou vazio se atual
  current: boolean;
  location: string;
  description: string[]; // uma bala por entrada
}

export interface EducationItem {
  id: ItemId;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface SkillItem {
  id: ItemId;
  name: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: string[];
  certifications: string[];
  template: ResumeTemplate;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const DEFAULT_TEMPLATE: ResumeTemplate = 'classic';

export const EMPTY_PERSONAL_INFO: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
};

export const EMPTY_EXPERIENCE: ExperienceItem = {
  id: '',
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  current: false,
  location: '',
  description: [],
};

export const EMPTY_EDUCATION: EducationItem = {
  id: '',
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  current: false,
};

export const EMPTY_SKILL: SkillItem = {
  id: '',
  name: '',
};

export const INITIAL_RESUME_DATA: ResumeData = {
  personal: { ...EMPTY_PERSONAL_INFO },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  template: DEFAULT_TEMPLATE,
};
