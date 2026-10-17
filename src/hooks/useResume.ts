/**
 * Hook de gerenciamento de estado do currículo.
 *
 * Mantém os dados do currículo em memória (localStorage opcional) e expõe
 * ações tipadas para o editor. Sem dependência de DOM direto além do
 * localStorage, que é opcional.
 */

import { useCallback, useState, useEffect } from 'react';
import type { ResumeData, ResumeTemplate } from '../types/resume';
import { INITIAL_RESUME_DATA } from '../types/resume';
import {
  addExperience,
  addEducation,
  addSkill,
  removeExperience,
  removeEducation,
  removeSkill,
  setExperienceDescription,
} from '../lib/resume-utils';
import { validateResume, isResumeValid } from '../lib/validation';

const STORAGE_KEY = 'ats-resume-v2-draft';

function loadFromStorage(): ResumeData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ResumeData;
  } catch {
    return null;
  }
}

function saveToStorage(resume: ResumeData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  } catch {
    // localStorage pode estar indisponível (modo privado). Ignora silenciosamente.
  }
}

export function useResume(initial?: Partial<ResumeData>) {
  const [resume, setResume] = useState<ResumeData>(() => {
    const stored = loadFromStorage();
    if (stored) return stored;
    return { ...INITIAL_RESUME_DATA, ...initial };
  });

  // Persiste alterações no localStorage (efeito colateral explícito).
  useEffect(() => {
    saveToStorage(resume);
  }, [resume]);

  const setField = useCallback(
    <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
      setResume((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const setPersonal = useCallback((updates: Partial<ResumeData['personal']>) => {
    setResume((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...updates },
    }));
  }, []);

  const setSummary = useCallback((value: string) => {
    setField('summary', value);
  }, [setField]);

  const setTemplate = useCallback((value: ResumeTemplate) => {
    setField('template', value);
  }, [setField]);

  const addExperienceItem = useCallback(() => {
    setResume((prev) => addExperience(prev));
  }, []);

  const addEducationItem = useCallback(() => {
    setResume((prev) => addEducation(prev));
  }, []);

  const addSkillItem = useCallback(() => {
    setResume((prev) => addSkill(prev));
  }, []);

  const removeExperienceItem = useCallback((id: string) => {
    setResume((prev) => removeExperience(prev, id));
  }, []);

  const removeEducationItem = useCallback((id: string) => {
    setResume((prev) => removeEducation(prev, id));
  }, []);

  const removeSkillItem = useCallback((id: string) => {
    setResume((prev) => removeSkill(prev, id));
  }, []);

  const updateExperienceDescription = useCallback(
    (id: string, index: number, text: string) => {
      setResume((prev) => setExperienceDescription(prev, id, index, text));
    },
    []
  );

  const errors = validateResume(resume);
  const valid = isResumeValid(resume);

  return {
    resume,
    setField,
    setPersonal,
    setSummary,
    setTemplate,
    addExperienceItem,
    addEducationItem,
    addSkillItem,
    removeExperienceItem,
    removeEducationItem,
    removeSkillItem,
    updateExperienceDescription,
    errors,
    valid,
  };
}
