// client/src/types/resume.ts
export interface ResumeData {
  name: string;
  email: string;
  address: string;
  phone: string;
  summary: string;
  education: string;
  experience: ExperienceItem[];
  skills: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}