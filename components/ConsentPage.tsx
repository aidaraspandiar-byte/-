
import React, { useState } from 'react';

type View = 'home' | 'student' | 'dashboard' | 'legal' | 'micro' | 'data-entry' | 'main' | 'test' | 'consent' | 'login' | 'qr';

interface ConsentPageProps {
  navigate: (view: View) => void;
}

export const ConsentPage: React.FC<ConsentPageProps> = ({ navigate }) => {
  const [hasConsented, setHasConsented] = useState(false);

  const handleContinue = () => {
    if (hasConsented) {
      navigate('data-entry');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -m-8 bg-gray-100">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Согласие на обработку данных</h2>
          <p className="mt-2 text-md text-gray-600">
            Прежде чем мы начнем, пожалуйста, ознакомьтесь с условиями.
          </p>
        </div>

        <div className="mt-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-800 text-sm space-y-3">
          <p>
            Для проведения анонимного опроса и анализа ваших ответов нам необходимо ваше согласие.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Ваши ответы будут обработаны искусственным интеллектом для формирования <strong>персонализированных рекомендаций</strong>.</li>
            <li>Все данные используются <strong>строго конфиденциально</strong> и в обезличенном виде.</li>
            <li>Ваше имя и класс нужны только для первоначальной идентификации и не будут передаваться в ИИ-модель.</li>
          </ul>
          <p>
            Нажимая "Принять и продолжить", вы подтверждаете, что прочитали и поняли эти условия.
          </p>
        </div>

        <div className="mt-8">
          <label className="flex items-center p-4 bg-gray-50 rounded-lg border has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-300 transition-colors cursor-pointer">
            <input 
              type="checkbox" 
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
            />
            <span className="ml-3 text-sm text-gray-700 font-medium select-none">
              Я понимаю и соглашаюсь с условиями обработки данных для анализа.
            </span>
          </label>
        </div>

        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={!hasConsented}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Принять и продолжить
          </button>
        </div>
      </div>
    </div>
  );
};
