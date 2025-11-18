
import React from 'react';
import { UserIcon, DashboardIcon, BookOpenIcon, PlusCircleIcon, ScaleIcon } from './icons/Icons';

type View = 'home' | 'student' | 'dashboard' | 'legal' | 'micro' | 'data-entry' | 'main' | 'test' | 'consent' | 'login' | 'qr';

interface MainPageProps {
  navigate: (view: View) => void;
}

const NavCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-indigo-500 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-start text-left"
    >
        <div className="bg-indigo-100 p-3 rounded-full mr-5 flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);


export const MainPage: React.FC<MainPageProps> = ({ navigate }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Главное меню</h2>
        <p className="text-lg text-gray-600">Выберите раздел для продолжения работы.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NavCard 
            title="Анализ профиля ученика"
            description="Индивидуальный анализ, анкетирование и персональные рекомендации."
            icon={<UserIcon className="w-8 h-8 text-indigo-600" />}
            onClick={() => navigate('student')}
        />
        <NavCard 
            title="Социальная аналитика школы"
            description="Обзор групп риска, отслеживание динамики и прогнозы от ИИ."
            icon={<DashboardIcon className="w-8 h-8 text-indigo-600" />}
            onClick={() => navigate('dashboard')}
        />
        <NavCard 
            title="Микро-активности и курсы"
            description="Ресурсы для саморазвития, управления стрессом и общения."
            icon={<BookOpenIcon className="w-8 h-8 text-indigo-600" />}
            onClick={() => navigate('micro')}
        />
        <NavCard 
            title="Регистрация"
            description="Добавьте данные нового ученика в систему вручную."
            icon={<PlusCircleIcon className="w-8 h-8 text-indigo-600" />}
            onClick={() => navigate('data-entry')}
        />
         <NavCard 
            title="Правовая информация"
            description="Условия использования, политика конфиденциальности и принципы работы."
            icon={<ScaleIcon className="w-8 h-8 text-indigo-600" />}
            onClick={() => navigate('legal')}
        />
      </div>
    </div>
  );
};
