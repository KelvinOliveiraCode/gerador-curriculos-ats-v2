/**
 * Validação de dados do currículo.
 *
 * Regras mínimas para um currículo ATS válido: nome e e-mail são obrigatórios,
 * o e-mail deve ter formato válido. As demais seções são opcionais por
 * intenção (currículos iniciais podem não ter experiência, por exemplo).
 *
 * Todas as funções são puras e determinísticas.
 */

import type { ResumeData, ValidationError, PersonalInfo } from '../types/resume';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valida os dados pessoais. Retorna lista de erros (vazia se válido). */
export function validatePersonalInfo(personal: PersonalInfo): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!personal.name?.trim()) {
    errors.push({ field: 'name', message: 'Nome completo é obrigatório.' });
  }

  if (!personal.email?.trim()) {
    errors.push({ field: 'email', message: 'E-mail é obrigatório.' });
  } else if (!EMAIL_REGEX.test(personal.email.trim())) {
    errors.push({ field: 'email', message: 'E-mail inválido.' });
  }

  if (!personal.phone?.trim()) {
    errors.push({ field: 'phone', message: 'Telefone é obrigatório.' });
  }

  return errors;
}

/** Valida o currículo completo. Retorna lista de erros (vazia se válido). */
export function validateResume(resume: ResumeData): ValidationError[] {
  return validatePersonalInfo(resume.personal);
}

/** Diz se o currículo é válido (sem erros de validação). */
export function isResumeValid(resume: ResumeData): boolean {
  return validateResume(resume).length === 0;
}

/** Retorna o primeiro erro de um campo, se houver. */
export function errorForField(
  errors: ValidationError[],
  field: string
): string | undefined {
  return errors.find((error) => error.field === field)?.message;
}
