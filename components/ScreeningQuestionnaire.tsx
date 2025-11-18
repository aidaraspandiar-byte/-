import React, { useState } from 'react';
import type { ScreeningAnswers } from '../types';

interface ScreeningQuestionnaireProps {
  onSubmit: (answers: ScreeningAnswers) => void;
  isAnalyzing: boolean;
}

const Slider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => (
    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Плохо</span>
            <input type="range" min="1" max="10" value={value} onChange={onChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <span className="text-sm text-gray-500">Отлично</span>
        </div>
        <div className="text-center mt-1 font-semibold text-indigo-600">{value}</div>
    </div>
);

export const ScreeningQuestionnaire: React.FC<ScreeningQuestionnaireProps> = ({ onSubmit, isAnalyzing }) => {
  const [answers, setAnswers] = useState<ScreeningAnswers>({
    emotionalState: 5,
    stressLevel: 5,
    socialSkills: 5,
    motivation: 5,
    bullyingExperience: 'Нет',
    currentStateDescription: '',
  });

  const handleChange = (field: keyof ScreeningAnswers, value: string | number) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Анкета SEL/Wellbeing</h3>
      
      <form onSubmit={handleSubmit}>
        <Slider label="1. Оцените ваше обычное эмоциональное состояние в школе (от 1 до 10)." value={answers.emotionalState} onChange={(e) => handleChange('emotionalState', parseInt(e.target.value))} />
        <Slider label="2. Оцените ваш уровень стресса (где 1 - очень высокий, 10 - очень низкий)." value={answers.stressLevel} onChange={(e) => handleChange('stressLevel', parseInt(e.target.value))} />
        <Slider label="3. Как вы оцениваете ваши отношения с одноклассниками (от 1 до 10)?" value={answers.socialSkills} onChange={(e) => handleChange('socialSkills', parseInt(e.target.value))} />
        <Slider label="4. Насколько вы мотивированы учиться в последнее время (от 1 до 10)?" value={answers.motivation} onChange={(e) => handleChange('motivation', parseInt(e.target.value))} />
        
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">5. Сталкивались ли вы с насмешками или травлей (буллингом) в школе?</label>
            <div className="flex items-center space-x-4">
                <label><input type="radio" value="Нет" checked={answers.bullyingExperience === 'Нет'} onChange={(e) => handleChange('bullyingExperience', e.target.value)} className="mr-2" />Нет</label>
                <label><input type="radio" value="Иногда" checked={answers.bullyingExperience === 'Иногда'} onChange={(e) => handleChange('bullyingExperience', e.target.value)} className="mr-2" />Иногда</label>
                <label><input type="radio" value="Часто" checked={answers.bullyingExperience === 'Часто'} onChange={(e) => handleChange('bullyingExperience', e.target.value)} className="mr-2" />Часто</label>
            </div>
        </div>

        <div className="mb-8">
            <label htmlFor="currentStateDescription" className="block text-gray-700 text-sm font-bold mb-2">6. Опишите ваше текущее состояние или что вас беспокоит (необязательно)</label>
            <textarea
                id="currentStateDescription"
                rows={4}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={answers.currentStateDescription}
                onChange={(e) => handleChange('currentStateDescription', e.target.value)}
                placeholder="Например: 'Чувствую усталость от учебы', 'Сложно общаться с одноклассниками'..."
            ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isAnalyzing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isAnalyzing ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Анализ...
                </>
            ) : 'Отправить и получить рекомендации'}
        </button>
      </form>
    </div>
  );
};
