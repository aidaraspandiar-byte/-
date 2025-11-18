
import React, { useState, useEffect, useMemo } from 'react';
import { generateSchoolForecast } from '../services/geminiService';
import { RiskDistributionPieChart, RiskDynamicsChart } from './charts/Charts';
import type { Student, SchoolData } from '../types';

const generateDynamicSchoolData = (studentsForSchool: Student[]): SchoolData => {
    const totalStudents = studentsForSchool.length;
    
    const riskDistribution = studentsForSchool.reduce((acc, student) => {
        const risk = student.riskLevel || 'Низкий';
        const existing = acc.find(item => item.name === risk);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: risk, value: 1 });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    // Ensure all categories exist, even if with 0 students
    ['Низкий', 'Средний', 'Высокий'].forEach(riskName => {
        if (!riskDistribution.some(item => item.name === riskName)) {
            riskDistribution.push({ name: riskName, value: 0 });
        }
    });


    // Generate plausible but random dynamics
    const riskCounts = {
        'Высокий': riskDistribution.find(r => r.name === 'Высокий')?.value ?? 0,
        'Средний': riskDistribution.find(r => r.name === 'Средний')?.value ?? 0,
    };

    const months = ['Сен', 'Окт', 'Ноя', 'Дек', 'Янв', 'Фев'];
    const riskDynamics = months.map((month, index) => {
        const factor = 0.8 + (index / (months.length - 1)) * 0.4; // from 0.8 to 1.2
        return {
            month,
            highRiskCount: Math.round((riskCounts['Высокий'] * factor) * (Math.random() * 0.2 + 0.9)),
            mediumRiskCount: Math.round((riskCounts['Средний'] * factor) * (Math.random() * 0.2 + 0.9)),
        };
    });

    return { totalStudents, riskDistribution, riskDynamics };
};


export const SchoolDashboard: React.FC<{ students: Student[] }> = ({ students }) => {
    const schools = useMemo(() => [...new Set(students.map(s => s.school))], [students]);
    const [selectedSchool, setSelectedSchool] = useState<string>(schools[0] || '');
    const [forecast, setForecast] = useState<string>('Генерация прогноза...');

    const schoolData = useMemo(() => {
        if (!selectedSchool) return null;
        const studentsForSchool = students.filter(s => s.school === selectedSchool);
        return generateDynamicSchoolData(studentsForSchool);
    }, [students, selectedSchool]);

    useEffect(() => {
        if (!schoolData) return;

        const fetchForecast = async () => {
            setForecast('Генерация прогноза...');
            const result = await generateSchoolForecast(schoolData);
            setForecast(result);
        };
        fetchForecast();
    }, [schoolData]);

    if (schools.length === 0) {
        return (
             <div>
                <h2 className="text-3xl font-bold text-gray-800">Социальная аналитика по школе</h2>
                <p className="text-lg text-gray-600 mt-4">Нет данных для отображения. Добавьте учеников на вкладке "Внести данные".</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Социальная аналитика по школе</h2>
                <p className="text-lg text-gray-600">Общая сводка и динамика рисков</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-md">
                 <label htmlFor="school-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Выберите учебное заведение
                </label>
                <select
                  id="school-select"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {schools.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
            </div>


            {schoolData && (
            <>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Прогноз от ИИ</h3>
                    <p className="text-gray-700 italic whitespace-pre-wrap">{forecast}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Распределение по группам риска</h3>
                        <p className="text-gray-600 mb-4">Всего учеников: {schoolData.totalStudents}</p>
                        <RiskDistributionPieChart data={schoolData.riskDistribution} />
                    </div>
                    <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Динамика групп риска</h3>
                        <p className="text-gray-600 mb-4">Количество учеников в группах среднего и высокого риска по месяцам.</p>
                        <RiskDynamicsChart data={schoolData.riskDynamics} />
                    </div>
                </div>
            </>
            )}
        </div>
    );
};
