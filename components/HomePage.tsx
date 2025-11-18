
import React from 'react';
import { BriefcaseIcon, UserIcon } from './icons/Icons';

type View = 'home' | 'student' | 'dashboard' | 'micro' | 'data-entry' | 'main' | 'test' | 'consent' | 'login' | 'qr';

interface HomePageProps {
  onRoleSelect: (role: 'admin' | 'user', view: View) => void;
}

const RoleCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md text-left transform hover:scale-105 hover:shadow-2xl hover:border-indigo-400 transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-center">
      <div className="bg-indigo-100 p-4 rounded-full mr-6">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ onRoleSelect }) => {
  return (
    <div
      className="min-h-screen w-screen -translate-x-4 sm:-translate-x-6 lg:-translate-x-8 -translate-y-8 flex flex-col items-center justify-center text-center bg-cover bg-center relative p-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2832&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center w-full">
        <h1 className="text-7xl font-extrabold text-white mb-2 tracking-wider drop-shadow-lg">
          СТРАЖ
        </h1>
        <p className="text-2xl text-indigo-300 mb-8 drop-shadow-md">
          Eduvision
        </p>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12 drop-shadow-md">
          ИИ-система для раннего выявления социальных рисков и поддержки учащихся.
        </p>
        
        <div className="space-y-8 w-full flex flex-col items-center">
          <RoleCard 
            title="Я — специалист"
            description="Войти в панель управления для анализа данных."
            icon={<BriefcaseIcon className="w-10 h-10 text-indigo-600" />}
            onClick={() => onRoleSelect('admin', 'main')}
          />
          <RoleCard 
            title="Я — ученик"
            description="Пройти опрос для получения персональных рекомендаций."
            icon={<UserIcon className="w-10 h-10 text-indigo-600" />}
            onClick={() => onRoleSelect('user', 'consent')}
          />
        </div>
      </div>
    </div>
  );
};
