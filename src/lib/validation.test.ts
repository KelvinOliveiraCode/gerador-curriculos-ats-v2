import { describe, it, expect } from 'vitest';
import {
  validateResume,
  validatePersonalInfo,
  isResumeValid,
  errorForField,
} from '../lib/validation';
import type { ResumeData } from '../types/resume';
import { INITIAL_RESUME_DATA } from '../types/resume';

const basePersonal = {
  name: 'João da Silva',
  email: 'joao@email.com',
  phone: '+55 11 99999-9999',
  location: 'São Paulo, SP',
};

function resumeWith(personal: Partial<ResumeData['personal']>): ResumeData {
  return {
    ...INITIAL_RESUME_DATA,
    personal: { ...basePersonal, ...personal },
  };
}describe('validatePersonalInfo', () => {
  it('returns no errors when all required fields are present and valid', () => {
    const errors = validatePersonalInfo(basePersonal);
    expect(errors).toEqual([]);
  });

  it('reports missing name', () => {
    const errors = validatePersonalInfo({ ...basePersonal, name: '' });
    expect(errors).toContainEqual({ field: 'name', message: 'Nome completo é obrigatório.' });
  });

  it('reports missing email', () => {
    const errors = validatePersonalInfo({ ...basePersonal, email: '' });
    expect(errors).toContainEqual({ field: 'email', message: 'E-mail é obrigatório.' });
  });

  it('reports invalid email format', () => {
    const errors = validatePersonalInfo({ ...basePersonal, email: 'nao-e-um-email' });
    expect(errors).toContainEqual({ field: 'email', message: 'E-mail inválido.' });
  });

  it('reports missing phone', () => {
    const errors = validatePersonalInfo({ ...basePersonal, phone: '' });
    expect(errors).toContainEqual({ field: 'phone', message: 'Telefone é obrigatório.' });
  });

  it('accumulates all errors instead of stopping at the first', () => {
    const errors = validatePersonalInfo({ name: '', email: '', phone: '', location: '' });
    const fields = errors.map((e) => e.field);
    expect(fields).toEqual(['name', 'email', 'phone']);
  });
});

describe('validateResume', () => {
  it('returns no errors for a valid resume', () => {
    expect(validateResume(resumeWith({}))).toEqual([]);
  });

  it('propagates personal info errors', () => {
    const errors = validateResume(resumeWith({ email: '' }));
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe('email');
  });
});

describe('isResumeValid', () => {
  it('returns true for a valid resume', () => {
    expect(isResumeValid(resumeWith({}))).toBe(true);
  });

  it('returns false when validation fails', () => {
    expect(isResumeValid(resumeWith({ name: '' }))).toBe(false);
  });
});

describe('errorForField', () => {
  it('returns the message for the requested field', () => {
    const errors = validateResume(resumeWith({ email: '' }));
    expect(errorForField(errors, 'email')).toBe('E-mail é obrigatório.');
  });

  it('returns undefined when the field has no error', () => {
    const errors = validateResume(resumeWith({ email: '' }));
    expect(errorForField(errors, 'phone')).toBeUndefined();
  });
});
