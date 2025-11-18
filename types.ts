
export interface Student {
  id: number;
  name: string;
  class: string;
  school: string;
  riskLevel?: 'Низкий' | 'Средний' | 'Высокий';
  attendance: { month: string; percentage: number }[];
  grades: { subject: string; grade: number }[];
  incidents: string[];
}

export interface ScreeningAnswers {
  emotionalState: number;
  stressLevel: number;
  socialSkills: number;
  motivation: number;
  bullyingExperience: string;
  currentStateDescription: string;
}

export interface Recommendation {
  type: 'Психолог' | 'Кружок' | 'Нагрузка' | 'Микро-курс';
  title: string;
  description: string;
}

export interface AIAnalysisResult {
  riskLevel: 'Низкий' | 'Средний' | 'Высокий';
  riskCategory: string;
  summary: string;
  recommendations: Recommendation[];
  error?: string;
}

export interface SchoolData {
    totalStudents: number;
    riskDistribution: { name: string; value: number }[];
    riskDynamics: { month: string; highRiskCount: number; mediumRiskCount: number }[];
}

export interface MicroActivity {
  id: number;
  category: string;
  title: string;
  description: string;
  iconName: string;
}