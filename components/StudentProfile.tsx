import React from 'react';
import type { Student, AIAnalysisResult, Recommendation } from '../types';
import { AttendanceChart, GradesChart } from './charts/Charts';
import { BrainIcon, BookOpenIcon, ActivityIcon, MinusCircleIcon } from './icons/Icons';

interface StudentProfileProps {
  student: Student | null;
  analysis: AIAnalysisResult | null;
  isAnalyzing: boolean;
}

const getRiskColorClasses = (riskLevel: AIAnalysisResult['riskLevel'] | null) => {
    if (!riskLevel) return 'bg-gray-100 text-gray-800';
    switch (riskLevel) {
        case 'Низкий': return 'bg-green-100 text-green-800 border-green-400';
        case 'Средний': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
        case 'Высокий': return 'bg-red-100 text-red-800 border-red-400';
        default: return 'bg-gray-100 text-gray-800 border-gray-400';
    }
};

const RecommendationIcon: React.FC<{type: Recommendation['type']}> = ({ type }) => {
    const commonClasses = "w-8 h-8 mr-4";
    switch (type) {
        case 'Психолог': return <BrainIcon className={`${commonClasses} text-indigo-500`} />;
        case 'Микро-курс': return <BookOpenIcon className={`${commonClasses} text-teal-500`} />;
        case 'Кружок': return <ActivityIcon className={`${commonClasses} text-purple-500`} />;
        case 'Нагрузка': return <MinusCircleIcon className={`${commonClasses} text-orange-500`} />;
        default: return null;
    }
};

const AnalysisLoader = () => (
    <div className="p-6 rounded-lg shadow-md border bg-gray-50 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
);


export const StudentProfile: React.FC<StudentProfileProps> = ({ student, analysis, isAnalyzing }) => {
  if (!student) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">Выберите ученика для просмотра профиля</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
        <p className="text-lg text-gray-600">Класс: {student.class}</p>
      </div>

      {isAnalyzing ? (
          <AnalysisLoader />
      ) : analysis && (
        <div className={`p-6 rounded-lg shadow-md border-l-4 ${getRiskColorClasses(analysis.riskLevel)}`}>
            <h3 className="text-xl font-bold mb-2">Результат ИИ-анализа</h3>
            <div className="flex items-center mb-4">
                <span className="font-semibold mr-2">Уровень риска:</span>
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${getRiskColorClasses(analysis.riskLevel)}`}>{analysis.riskLevel}</span>
            </div>
            <p className="mb-2"><span className="font-semibold">Категория риска:</span> {analysis.riskCategory}</p>
            <p><span className="font-semibold">Резюме:</span> {analysis.summary}</p>
             {analysis.error && (
                <details className="mt-4 bg-red-50 border border-red-200 rounded-md p-2 text-sm">
                    <summary className="font-medium text-red-800 cursor-pointer">Показать детали ошибки</summary>
                    <pre className="mt-2 text-xs text-red-900 whitespace-pre-wrap font-mono bg-white p-2 rounded-sm overflow-auto max-h-48">{analysis.error}</pre>
                </details>
            )}
        </div>
      )}
      
      {analysis && analysis.recommendations.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Рекомендованный план поддержки</h3>
            <div className="space-y-4">
                {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <RecommendationIcon type={rec.type} />
                        <div>
                            <h4 className="font-bold text-gray-900">{rec.title} <span className="text-sm font-medium text-gray-500">({rec.type})</span></h4>
                            <p className="text-gray-600">{rec.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Динамика посещаемости</h3>
            <AttendanceChart data={student.attendance} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Динамика успеваемости</h3>
            <GradesChart data={student.grades} />
        </div>
      </div>
       <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Зафиксированные инциденты и жалобы</h3>
        {student.incidents.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {student.incidents.map((incident, index) => <li key={index}>{incident}</li>)}
          </ul>
        ) : (
          <p className="text-gray-500">Инцидентов не зафиксировано.</p>
        )}
      </div>

    </div>
  );
};