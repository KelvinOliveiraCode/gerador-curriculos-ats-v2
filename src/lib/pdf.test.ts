import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildPrintHtml, printToPdf, supportsPrintToPdf } from '../lib/pdf';
import type { ResumeData } from '../types/resume';
import { INITIAL_RESUME_DATA } from '../types/resume';

const resume: ResumeData = {
  ...INITIAL_RESUME_DATA,
  personal: {
    name: 'Maria Souza',
    email: 'maria@email.com',
    phone: '+55 11 88888-8888',
    location: 'Rio de Janeiro, RJ',
    website: 'https://maria.dev',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/maria',
  },
  summary: 'Engenheira de software com foco em frontend.',
  experience: [
    {
      id: '1',
      company: 'Tech Ltda.',
      position: 'Desenvolvedora Frontend',
      startDate: '2022-01-01',
      endDate: '2024-06-30',
      current: false,
      location: 'São Paulo, SP',
      description: ['Criou componentes reutilizáveis', 'Reduziu tempo de build em 30%'],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Universidade X',
      degree: 'Bacharelado em Ciência da Computação',
      field: 'Bacharelado',
      startDate: '2018-02-01',
      endDate: '2022-12-15',
      current: false,
    },
  ],
  skills: [{ id: '1', name: 'TypeScript' }, { id: '2', name: 'React' }],
  languages: ['Português', 'Inglês'],
  certifications: ['AWS Cloud Practitioner'],
  template: 'classic',
};

describe('supportsPrintToPdf', () => {
  it('returns true when window.print is a function', () => {
    expect(supportsPrintToPdf()).toBe(true);
  });
});

describe('buildPrintHtml', () => {
  it('includes the candidate name and contact data', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('Maria Souza');
    expect(html).toContain('maria@email.com');
    expect(html).toContain('+55 11 88888-8888');
    expect(html).toContain('Rio de Janeiro, RJ');
  });

  it('includes the professional summary', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('Resumo profissional');
    expect(html).toContain('Engenheira de software com foco em frontend.');
  });

  it('includes experience with company, position, dates and bullets', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('Desenvolvedora Frontend');
    expect(html).toContain('Tech Ltda.');
    expect(html).toContain('2022-01-01');
    expect(html).toContain('Criou componentes reutilizáveis');
    expect(html).toContain('Reduziu tempo de build em 30%');
  });

  it('includes education with degree, institution and dates', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('Formação');
    expect(html).toContain('Bacharelado em Ciência da Computação');
    expect(html).toContain('Universidade X');
  });

  it('includes skills as tags', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('Habilidades');
    expect(html).toContain('TypeScript');
    expect(html).toContain('React');
  });

  it('includes languages and certifications', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('Idiomas');
    expect(html).toContain('Português');
    expect(html).toContain('Inglês');
    expect(html).toContain('Certificações');
    expect(html).toContain('AWS Cloud Practitioner');
  });

  it('escapes HTML special characters in user content', () => {
    const malicious = {
      ...resume,
      personal: { ...resume.personal, name: '<script>alert(1)</script>' },
    };
    const html = buildPrintHtml(malicious);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('produces a complete HTML document with doctype', () => {
    const html = buildPrintHtml(resume);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('</html>');
  });
});

describe('printToPdf', () => {
  let printSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    // Limpa eventuais containers de impressão remanescentes.
    const existing = document.getElementById('ats-resume-print');
    if (existing) existing.remove();
  });

  afterEach(() => {
    printSpy.mockRestore();
    const existing = document.getElementById('ats-resume-print');
    if (existing) existing.remove();
  });

  it('calls window.print exactly once', () => {
    printToPdf(resume);
    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  it('inserts and removes a print container in the DOM', () => {
    printToPdf(resume);
    expect(document.getElementById('ats-resume-print')).toBeNull();
  });

  it('does not throw when called', () => {
    expect(() => printToPdf(resume)).not.toThrow();
  });
});
