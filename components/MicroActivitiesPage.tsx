
import React, { useState } from 'react';
import { BrainIcon, UserIcon, BookOpenIcon, ScaleIcon, ActivityIcon, PlusCircleIcon } from './icons/Icons';
import type { MicroActivity } from '../types';

const iconConfig: { [key: string]: { component: React.FC<{ className?: string }>, color: string, name: string } } = {
  BrainIcon: { component: BrainIcon, color: 'text-indigo-500', name: 'Психология' },
  UserIcon: { component: UserIcon, color: 'text-teal-500', name: 'Социализация' },
  BookOpenIcon: { component: BookOpenIcon, color: 'text-purple-500', name: 'Продуктивность' },
  ScaleIcon: { component: ScaleIcon, color: 'text-orange-500', name: 'Конфликтология' },
  ActivityIcon: { component: ActivityIcon, color: 'text-sky-500', name: 'Здоровье' },
  BrainIconCreative: { component: BrainIcon, color: 'text-rose-500', name: 'Творчество' },
};

const iconOptions = Object.keys(iconConfig);

const ActivityCard: React.FC<{ activity: MicroActivity; isAdmin: boolean; onRemove?: (id: number) => void }> = ({ activity, isAdmin, onRemove }) => {
    const { component: IconComponent, color } = iconConfig[activity.iconName] || iconConfig.BookOpenIcon;
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col hover:shadow-xl hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-1 relative">
            {isAdmin && onRemove && (
                 <button 
                    onClick={() => onRemove(activity.id)} 
                    className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                    aria-label="Удалить активность"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
            <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <IconComponent className={`w-8 h-8 ${color}`} />
                </div>
                <div>
                    <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{activity.category}</span>
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h4>
                <p className="text-gray-600">{activity.description}</p>
            </div>
            <div className="mt-6">
                <button
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
                >
                    Начать
                </button>
            </div>
        </div>
    );
};

const NewActivityForm: React.FC<{ onAdd: (activity: Omit<MicroActivity, 'id'>) => void; onCancel: () => void; }> = ({ onAdd, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [iconName, setIconName] = useState(iconOptions[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !category) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }
        onAdd({ title, description, category, iconName });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Новая активность</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Название</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Описание</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Категория</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Иконка</label>
                     <select value={iconName} onChange={e => setIconName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        {iconOptions.map(name => (
                            <option key={name} value={name}>{iconConfig[name].name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Отмена</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Добавить</button>
                </div>
            </form>
        </div>
    )
}

interface MicroActivitiesPageProps {
  activities: MicroActivity[];
  userRole: 'admin' | 'user' | null;
  addActivity?: (activity: Omit<MicroActivity, 'id'>) => void;
  removeActivity?: (id: number) => void;
}


export const MicroActivitiesPage: React.FC<MicroActivitiesPageProps> = ({ activities, userRole, addActivity, removeActivity }) => {
    const [isAdding, setIsAdding] = useState(false);
    const isAdmin = userRole === 'admin';

    const handleAdd = (activity: Omit<MicroActivity, 'id'>) => {
        if (addActivity) {
            addActivity(activity);
            setIsAdding(false);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Микро-активности и курсы</h2>
                    <p className="text-lg text-gray-600 mt-1">Ресурсы для саморазвития, управления стрессом и улучшения навыков общения.</p>
                </div>
                {isAdmin && (
                    <div className="mt-4 md:mt-0">
                        {!isAdding && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
                            >
                                <PlusCircleIcon className="w-5 h-5" />
                                <span className="ml-2">Добавить активность</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
            
            {isAdmin && isAdding && addActivity && (
                <NewActivityForm onAdd={handleAdd} onCancel={() => setIsAdding(false)} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity) => (
                    <ActivityCard 
                        key={activity.id} 
                        activity={activity}
                        isAdmin={isAdmin}
                        onRemove={removeActivity}
                    />
                ))}
            </div>
        </div>
    );
};