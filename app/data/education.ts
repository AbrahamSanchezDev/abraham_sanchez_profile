import educationData from "./education.json";

export interface EducationDegree {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export const educationHistory: EducationDegree[] = educationData as EducationDegree[];
