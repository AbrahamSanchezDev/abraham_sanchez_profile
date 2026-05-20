import workExperienceData from "./experience.json";

export interface WorkMission {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  stackSummary: string;
  coreAchievement: string;
  highlights: string[];
}

export const workExperiences: WorkMission[] = workExperienceData as WorkMission[];
