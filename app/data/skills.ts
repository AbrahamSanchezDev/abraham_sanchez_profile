import skillsData from "./skills.json";

export interface SkillCategory {
  id: string;
  categoryTitle: string;
  iconName: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = skillsData.skillCategories as SkillCategory[];
