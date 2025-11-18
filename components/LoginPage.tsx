
import React, { useState } from 'react';
import { login } from '../services/authService';
import { BriefcaseIcon, LogoutIcon } from './icons/Icons';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    setIsLoading(false);
    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -m-8 bg-gray-100">
      <div className="max-w-md w-full mx-auto p-4">
        <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
                <div className="bg-indigo-100 p-4 rounded-full">
                    <BriefcaseIcon className="w-10 h-10 text-indigo-600" />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Вход для специалиста</h1>
            <p className="text-lg text-gray-600 mt-2">Введите ваши данные для доступа к панели.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg flex items-center justify-center disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Вход...
                </>
              ) : 'Войти'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              <LogoutIcon className="w-4 h-4 mr-2 transform rotate-180" />
              Вернуться к выбору роли
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};