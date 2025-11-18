
import React, { useState, useMemo } from 'react';
import type { Student } from '../types';

type View = 'home' | 'student' | 'dashboard' | 'legal' | 'micro' | 'data-entry' | 'main' | 'test' | 'consent' | 'login' | 'qr';

const subjects = ['Математика', 'Физика', 'Русский', 'История', 'Химия', 'Биология', 'Информатика'];
const riskLevels: Array<Student['riskLevel']> = ['Низкий', 'Средний', 'Высокий'];
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const generateRandomStudentData = (school: string, className: string, id: number, name: string): Omit<Student, 'id' | 'name' | 'class' | 'school'> => ({
    riskLevel: getRandomItem(riskLevels),
    attendance: ['Сен', 'Окт', 'Ноя', 'Дек', 'Янв', 'Фев'].map(month => ({ month, percentage: getRandomNumber(75, 100, 0) })),
    grades: subjects.slice(0, 5).map(subject => ({ subject, grade: getRandomNumber(2.5, 5.0) })),
    incidents: Math.random() > 0.7 ? ['Частые опоздания'] : [],
});

interface DataEntryPageProps {
    students: Student[];
    addStudents: (newStudents: Student[]) => void;
    navigate: (view: View) => void;
    setSelectedStudentId: (id: number) => void;
    userRole: 'admin' | 'user';
}

export const DataEntryPage: React.FC<DataEntryPageProps> = ({ students, addStudents, navigate, setSelectedStudentId, userRole }) => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    
    // State for admin view
    const [selectedSchool, setSelectedSchool] = useState('');
    const [newSchoolName, setNewSchoolName] = useState('');
    
    // State for user view
    const [userSchoolName, setUserSchoolName] = useState('');

    const existingSchools = useMemo(() => [...new Set(students.map(s => s.school))], [students]);
    
    const resetForm = () => {
        setName('');
        setClassName('');
        setUserSchoolName('');
        setSelectedSchool('');
        setNewSchoolName('');
    }

    const handleAddSingleStudent = (e: React.FormEvent) => {
        e.preventDefault();
        
        const school = userRole === 'user' 
            ? userSchoolName 
            : (selectedSchool === 'new' ? newSchoolName : selectedSchool);
        
        if (!name || !className || !school) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const newId = (students[students.length - 1]?.id ?? 0) + 1;
        const newStudent: Student = {
            id: newId,
            name,
            class: className,
            school,
            ...generateRandomStudentData(school, className, newId, name)
        };
        
        addStudents([newStudent]);
        setSelectedStudentId(newStudent.id);

        if (userRole === 'admin') {
           alert(`Ученик ${name} добавлен. Сейчас начнется краткий опрос.`);
        }
        
        resetForm();
        navigate('test');
    };
    
    if (userRole === 'user') {
        return (
            <div className="flex items-center justify-center min-h-screen -m-8 bg-gray-100">
                <div className="max-w-md w-full mx-auto p-4">
                    <div className="text-center mb-8">
                         <h1 className="text-4xl font-bold text-gray-800">Добро пожаловать!</h1>
                         <p className="text-lg text-gray-600 mt-2">Давайте познакомимся. Пожалуйста, введите ваши данные.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                        <form onSubmit={handleAddSingleStudent} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше ФИО</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg" 
                                    required 
                                    placeholder="Иванов Иван"
                                />
                            </div>
                            <div>
                                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">Учебное заведение</label>
                                <input 
                                    type="text"
                                    id="school"
                                    value={userSchoolName} 
                                    onChange={e => setUserSchoolName(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg" 
                                    required 
                                    placeholder="Название вашей школы"
                                />
                            </div>
                            <div>
                                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">Класс</label>
                                <input 
                                    type="text" 
                                    id="class"
                                    value={className} 
                                    onChange={e => setClassName(e.target.value)} 
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg" 
                                    placeholder="например, 9А" 
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
                            >
                                Начать опрос
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                    Регистрация ученика вручную
                </h2>
                 <p className="text-sm text-gray-600 mb-4">
                    После добавления ученика система сгенерирует для него случайные демо-данные (посещаемость, оценки) и перенаправит вас на страницу теста.
                </p>
                <form onSubmit={handleAddSingleStudent} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">ФИО ученика</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Учебное заведение</label>
                         <select value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
                            <option value="">Выберите школу</option>
                            {existingSchools.map(s => <option key={s} value={s}>{s}</option>)}
                            <option value="new">-- Добавить новую школу --</option>
                        </select>
                    </div>
                     {selectedSchool === 'new' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Название новой школы</label>
                            <input type="text" value={newSchoolName} onChange={e => setNewSchoolName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Класс</label>
                        <input type="text" value={className} onChange={e => setClassName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="например, 9А" required/>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
                         Добавить и перейти к опросу
                    </button>
                </form>
            </div>
        </div>
    );
};
