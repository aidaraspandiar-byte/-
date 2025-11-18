
import type { Student, SchoolData, MicroActivity } from '../types';

export const students: Student[] = [
  {
    id: 1,
    name: 'Иван Петров',
    class: '9А',
    school: 'Школа-гимназия №175 "Жаңа ғасыр"',
    riskLevel: 'Высокий',
    attendance: [
      { month: 'Сен', percentage: 98 },
      { month: 'Окт', percentage: 95 },
      { month: 'Ноя', percentage: 96 },
      { month: 'Дек', percentage: 85 },
      { month: 'Янв', percentage: 82 },
      { month: 'Фев', percentage: 78 },
    ],
    grades: [
      { subject: 'Математика', grade: 4.5 },
      { subject: 'Физика', grade: 4.2 },
      { subject: 'Русский', grade: 4.8 },
      { subject: 'История', grade: 5.0 },
      { subject: 'Химия', grade: 3.5 },
    ],
    incidents: [
      'Конфликт с одноклассником (20.01)',
      'Жалоба от учителя на невнимательность (05.02)',
    ],
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    class: '10Б',
    school: 'Школа-гимназия №175 "Жаңа ғасыр"',
    riskLevel: 'Низкий',
    attendance: [
      { month: 'Сен', percentage: 100 },
      { month: 'Окт', percentage: 99 },
      { month: 'Ноя', percentage: 100 },
      { month: 'Дек', percentage: 98 },
      { month: 'Янв', percentage: 100 },
      { month: 'Фев', percentage: 99 },
    ],
    grades: [
      { subject: 'Математика', grade: 5.0 },
      { subject: 'Физика', grade: 4.9 },
      { subject: 'Русский', grade: 5.0 },
      { subject: 'История', grade: 5.0 },
      { subject: 'Химия', grade: 4.8 },
    ],
    incidents: [],
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    class: '8В',
    school: 'Школа-гимназия №175 "Жаңа ғасыр"',
    riskLevel: 'Средний',
    attendance: [
      { month: 'Сен', percentage: 90 },
      { month: 'Окт', percentage: 85 },
      { month: 'Ноя', percentage: 88 },
      { month: 'Дек', percentage: 92 },
      { month: 'Янв', percentage: 95 },
      { month: 'Фев', percentage: 93 },
    ],
    grades: [
      { subject: 'Математика', grade: 3.2 },
      { subject: 'Физика', grade: 3.0 },
      { subject: 'Русский', grade: 3.5 },
      { subject: 'История', grade: 4.0 },
      { subject: 'Химия', grade: 2.8 },
    ],
    incidents: ['Частые опоздания'],
  },
];

export const schoolData: SchoolData = {
    totalStudents: 1250,
    riskDistribution: [
        { name: 'Низкий', value: 950 },
        { name: 'Средний', value: 250 },
        { name: 'Высокий', value: 50 },
    ],
    riskDynamics: [
        { month: 'Сен', highRiskCount: 25, mediumRiskCount: 180 },
        { month: 'Окт', highRiskCount: 30, mediumRiskCount: 200 },
        { month: 'Ноя', highRiskCount: 35, mediumRiskCount: 210 },
        { month: 'Дек', highRiskCount: 45, mediumRiskCount: 240 },
        { month: 'Янв', highRiskCount: 55, mediumRiskCount: 260 },
        { month: 'Фев', highRiskCount: 50, mediumRiskCount: 250 },
    ],
};

export const initialActivities: MicroActivity[] = [
    {
      id: 1,
      category: 'Эмоциональная регуляция',
      title: '5-минутная медитация осознанности',
      description: 'Короткое упражнение, чтобы успокоить ум, снизить уровень стресса и вернуться в настоящий момент.',
      iconName: 'BrainIcon',
    },
    {
      id: 2,
      category: 'Социальные навыки',
      title: 'Тренинг "Активное слушание"',
      description: 'Научитесь лучше понимать собеседника, задавать правильные вопросы и строить доверительные отношения.',
      iconName: 'UserIcon',
    },
    {
      id: 3,
      category: 'Учебная мотивация',
      title: 'Микро-курс по технике «Помодоро»',
      description: 'Управляйте своим временем и концентрируйтесь на задачах с помощью этого популярного метода продуктивности.',
      iconName: 'BookOpenIcon',
    },
    {
        id: 4,
        category: 'Решение конфликтов',
        title: 'Практика "Я-высказывание"',
        description: 'Освойте простой, но эффективный способ выражать свои чувства и потребности, не обвиняя других.',
        iconName: 'ScaleIcon',
    },
    {
        id: 5,
        category: 'Физическая активность',
        title: 'Комплекс упражнений "Энергия"',
        description: 'Быстрая 5-минутная зарядка для снятия напряжения и повышения тонуса прямо на перемене.',
        iconName: 'ActivityIcon',
    },
    {
        id: 6,
        category: 'Творческое самовыражение',
        title: 'Арт-терапия: рисуем эмоции',
        description: 'Выразите свои чувства через рисунок. Не требует навыков рисования, только желание творить.',
        iconName: 'BrainIconCreative',
    }
];