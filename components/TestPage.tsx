
import React, { useState, useMemo } from 'react';
import { testQuestions, TestQuestion } from '../services/testQuestions';

type View = 'home' | 'student' | 'dashboard' | 'legal' | 'micro' | 'data-entry' | 'main' | 'test' | 'consent' | 'login' | 'qr';

interface TestPageProps {
  navigate: (view: View) => void;
  studentName: string;
}

const SupportContacts: React.FC = () => (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6 rounded-md shadow-md" role="alert">
        <p className="font-bold">Важно помнить, что вы не одни!</p>
        <p>Если вам нужна помощь или вы просто хотите поговорить, вы можете обратиться по этим телефонам доверия. Это анонимно и бесплатно.</p>
        <ul className="list-disc list-inside mt-2">
            <li><strong>Национальная линия телефона доверия для детей и молодежи:</strong> 150</li>
            <li><strong>Телефон доверия психологической помощи:</strong> 111</li>
        </ul>
    </div>
);


export const TestPage: React.FC<TestPageProps> = ({ navigate, studentName }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSupportInfo, setShowSupportInfo] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    if (questionId === 'personal_3_meaningless' && value === 'yes') {
      alert('УВЕДОМЛЕНИЕ ПСИХОЛОГУ: Ученик указал на наличие мыслей об отсутствии смысла жизни. Рекомендуется немедленная конфиденциальная беседа.');
      setShowSupportInfo(true);
    }
  };

  const isQuestionVisible = (question: TestQuestion) => {
    if (!question.condition) return true;
    const parentAnswer = answers[question.condition.questionId];
    return parentAnswer && question.condition.values.includes(parentAnswer);
  };
  
  const answeredQuestionsCount = Object.keys(answers).length;
  const totalQuestions = useMemo(() => testQuestions.flatMap(s => s.questions).length, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за ваши ответы! Сейчас вы будете перенаправлены на главное меню.');
    navigate('main');
  };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Диагностический опросник</h2>
            <p className="text-lg text-gray-600 mb-6">
                Здравствуйте, {studentName}. Пожалуйста, ответьте на несколько вопросов. Ваши ответы конфиденциальны и помогут нам лучше понять ваше состояние.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10 border-t pt-8">
                {testQuestions.map(section => (
                    <fieldset key={section.id} className="space-y-6">
                        <legend className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2">{section.title}</legend>
                        {section.questions.filter(isQuestionVisible).map(question => (
                            <div key={question.id} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                                <label className="block text-md font-medium text-gray-800 mb-3">{question.text}</label>
                                <div className="space-y-2">
                                    {question.options.map(option => (
                                        <label key={option.value} className="flex items-center p-2 rounded-md hover:bg-indigo-100 transition-colors cursor-pointer">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option.value}
                                                checked={answers[question.id] === option.value}
                                                onChange={() => handleAnswerChange(question.id, option.value)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                required
                                            />
                                            <span className="ml-3 text-gray-700">{option.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </fieldset>
                ))}
                
                {showSupportInfo && <SupportContacts />}

                <div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Завершить опрос
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};
