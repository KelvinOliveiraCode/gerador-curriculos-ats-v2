import { describe, it, expect, beforeEach } from 'vitest';
import {
  addExperience,
  addEducation,
  addSkill,
  removeExperience,
  removeEducation,
  removeSkill,
  setExperienceDescription,
  countBulletPoints,
  endDateLabel,
  generateId,
} from '../lib/resume-utils';
import type { ResumeData } from '../types/resume';
import { INITIAL_RESUME_DATA } from '../types/resume';
let resume: ResumeData;

beforeEach(() => {
  resume = { ...INITIAL_RESUME_DATA };
});

describe('generateId', () => {
  it('returns unique, increasing IDs across calls', () => {
    const first = generateId();
    const second = generateId();
    expect(first).not.toBe(second);
    // IDs carry a counter suffix; last segment should increment.
    expect(Number(second.split('-')[1])).toBe(Number(first.split('-')[1]) + 1);
  });
});

describe('addExperience', () => {
  it('appends a new experience item with a generated id', () => {
    const next = addExperience(resume);
    expect(next.experience).toHaveLength(1);
    expect(next.experience[0].id).toBeTruthy();
    expect(next.experience[0].company).toBe('');
    // Original is immutable.
    expect(resume.experience).toHaveLength(0);
  });
});

describe('addEducation', () => {
  it('appends a new education item with a generated id', () => {
    const next = addEducation(resume);
    expect(next.education).toHaveLength(1);
    expect(next.education[0].id).toBeTruthy();
    expect(resume.education).toHaveLength(0);
  });
});

describe('addSkill', () => {
  it('appends a new skill item with a generated id', () => {
    const next = addSkill(resume);
    expect(next.skills).toHaveLength(1);
    expect(next.skills[0].id).toBeTruthy();
    expect(resume.skills).toHaveLength(0);
  });
});

describe('removeExperience', () => {
  it('removes the item with the matching id and keeps others', () => {
    const withTwo = addExperience(addExperience(resume));
    const [first, second] = withTwo.experience;
    const next = removeExperience(withTwo, first.id);
    expect(next.experience).toHaveLength(1);
    expect(next.experience[0].id).toBe(second.id);
  });

  it('does nothing when id is not found', () => {
    const withOne = addExperience(resume);
    const next = removeExperience(withOne, 'nao-existe');
    expect(next.experience).toHaveLength(1);
  });
});

describe('removeEducation', () => {
  it('removes the item with the matching id', () => {
    const withTwo = addEducation(addEducation(resume));
    const [first] = withTwo.education;
    const next = removeEducation(withTwo, first.id);
    expect(next.education).toHaveLength(1);
  });
});

describe('removeSkill', () => {
  it('removes the item with the matching id', () => {
    const withTwo = addSkill(addSkill(resume));
    const [first] = withTwo.skills;
    const next = removeSkill(withTwo, first.id);
    expect(next.skills).toHaveLength(1);
  });
});

describe('setExperienceDescription', () => {
  it('updates the bullet at the given index for the matching experience', () => {
    const withOne = addExperience(resume);
    const id = withOne.experience[0].id;
    const next = setExperienceDescription(withOne, id, 0, 'Liderou o time frontend');
    expect(next.experience[0].description).toEqual(['Liderou o time frontend']);
  });

  it('does not affect other experiences', () => {
    const withTwo = addExperience(addExperience(resume));
    const [first] = withTwo.experience;
    const next = setExperienceDescription(withTwo, first.id, 0, 'bullet A');
    expect(next.experience[0].description).toEqual(['bullet A']);
    expect(next.experience[1].description).toEqual([]);
  });
});

describe('countBulletPoints', () => {
  it('returns zero when there are no experiences', () => {
    expect(countBulletPoints(resume)).toBe(0);
  });

  it('sums bullets across all experiences', () => {
    const r = addExperience(addExperience(resume));
    const [first, second] = r.experience;
    const withBullets = setExperienceDescription(setExperienceDescription(r, first.id, 0, 'a'), first.id, 1, 'b');
    const final = setExperienceDescription(withBullets, second.id, 0, 'c');
    expect(countBulletPoints(final)).toBe(3);
  });
});

describe('endDateLabel', () => {
  it('returns "Presente" for current items', () => {
    expect(endDateLabel({ endDate: '', current: true })).toBe('Presente');
  });

  it('returns "Presente" when endDate is empty', () => {
    expect(endDateLabel({ endDate: '', current: false })).toBe('Presente');
  });

  it('returns the stored end date otherwise', () => {
    expect(endDateLabel({ endDate: '2023-12-31', current: false })).toBe('2023-12-31');
  });
});
