
import React, { useState, useCallback, useMemo } from 'react';
import { students as mockStudents, initialActivities } from './services/mockData';
import { analyzeStudentData } from './services/geminiService';
import type { Student, ScreeningAnswers, AIAnalysisResult, MicroActivity } from './types';
import { ScreeningQuestionnaire } from './components/ScreeningQuestionnaire';
import { StudentProfile } from './components/StudentProfile';
import { SchoolDashboard } from './components/SchoolDashboard';
import { HomePage } from './components/HomePage';
import { LegalPage } from './components/LegalPage';
import { MicroActivitiesPage } from './components/MicroActivitiesPage';
import { MainPage } from './components/MainPage';
import { DataEntryPage } from './components/DataEntryPage';
import { TestPage } from './components/TestPage';
import { ConsentPage } from './components/ConsentPage';
import { LoginPage } from './components/LoginPage';
import { QRCodePage } from './components/QRCodePage';
import { UserIcon, DashboardIcon, ScaleIcon, BookOpenIcon, PlusCircleIcon } from './components/icons/Icons';

type View = 'home' | 'student' | 'dashboard' | 'legal' | 'micro' | 'data-entry' | 'main' | 'test' | 'consent' | 'login' | 'qr';
type UserRole = 'admin' | 'user';

export default function App() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [activities, setActivities] = useState<MicroActivity[]>(initialActivities);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(students[0]?.id ?? null);
  const [currentView, setCurrentView] = useState<View>('qr');
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const selectedStudent = students.find(s => s.id === selectedStudentId) || null;

  const handleAddStudents = (newStudents: Student[]) => {
    setStudents(prev => [...prev, ...newStudents]);
  };

  const handleAddActivity = (activity: Omit<MicroActivity, 'id'>) => {
    setActivities(prev => [...prev, { ...activity, id: Date.now() }]);
  };

  const handleRemoveActivity = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту активность?')) {
        setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  const studentsBySchool: Record<string, Student[]> = useMemo(() => {
    const schools: Record<string, Student[]> = {};
    students.forEach((student) => {
      if (!schools[student.school]) {
        schools[student.school] = [];
      }
      schools[student.school].push(student);
    });
    return schools;
  }, [students]);

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = parseInt(event.target.value, 10);
    setSelectedStudentId(studentId);
    setAnalysisResult(null); // Reset analysis when student changes
  };

  const handleScreeningSubmit = useCallback(async (answers: ScreeningAnswers) => {
    if (!selectedStudent) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    const result = await analyzeStudentData(selectedStudent, answers);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  }, [selectedStudent]);
  
  const navigate = (view: View) => {
    if (view === 'main' && userRole === 'user') {
        setCurrentView('micro');
        return;
    }
    if (view === 'home' || view === 'qr') {
        handleLogout();
        return;
    }
    setCurrentView(view);
  };
  
  const handleLogout = () => {
    setUserRole(null);
    setIsAdminAuthenticated(false);
    setCurrentView('qr');
    setSelectedStudentId(null);
    setAnalysisResult(null);
  };

  const NavButton: React.FC<{view: View, label: string, icon: React.ReactNode, isUserNav?: boolean}> = ({view, label, icon, isUserNav}) => (
     <button
        onClick={() => navigate(view)}
        className={`flex items-center justify-center w-full md:w-auto px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          currentView === view
            ? 'bg-indigo-600 text-white shadow'
            : isUserNav 
            ? 'text-gray-100 hover:bg-indigo-500' 
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </button>
  );

  const renderAdminContent = () => {
    switch (currentView) {
      case 'student':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <label htmlFor="student-select" className="block text-lg font-medium text-gray-700 mb-2">
                  Выберите ученика
                </label>
                <select
                  id="student-select"
                  value={selectedStudentId ?? ''}
                  onChange={handleStudentChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {Object.entries(studentsBySchool).map(([school, schoolStudents]) => (
                    <optgroup key={school} label={school}>
                      {schoolStudents.map(s => (
                        <option key={s.id} value={s.id}>{s.name} - {s.class}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <ScreeningQuestionnaire onSubmit={handleScreeningSubmit} isAnalyzing={isAnalyzing} />
            </div>
            <div className="lg:col-span-2">
              <StudentProfile student={selectedStudent} analysis={analysisResult} isAnalyzing={isAnalyzing} />
            </div>
          </div>
        );
      case 'dashboard':
        return <SchoolDashboard students={students} />;
      case 'data-entry':
        return <DataEntryPage students={students} addStudents={handleAddStudents} navigate={navigate} setSelectedStudentId={setSelectedStudentId} userRole="admin" />;
      case 'legal':
        return <LegalPage />;
      case 'micro':
        return <MicroActivitiesPage activities={activities} userRole={userRole} addActivity={handleAddActivity} removeActivity={handleRemoveActivity} />;
      case 'main':
      default:
        return <MainPage navigate={navigate} />;
    }
  };

  const renderUserContent = () => {
    switch(currentView) {
        case 'consent':
            return <ConsentPage navigate={navigate} />;
        case 'data-entry':
             return <DataEntryPage students={students} addStudents={handleAddStudents} navigate={navigate} setSelectedStudentId={setSelectedStudentId} userRole="user"/>;
        case 'test':
             return <TestPage navigate={navigate} studentName={selectedStudent?.name || 'ученика'}/>;
        case 'micro':
            return <MicroActivitiesPage activities={activities} userRole={userRole} />;
        case 'legal':
            return <LegalPage />;
        default:
            // Fallback for user, maybe navigate to a safe page
            return <MicroActivitiesPage activities={activities} userRole={userRole} />;
    }
  };
  
  if (currentView === 'qr') {
      return <QRCodePage onContinue={() => setCurrentView('home')} />;
  }

  if (!userRole) {
    return <HomePage onRoleSelect={(role, view) => {
        setUserRole(role);
        setCurrentView(view);
    }}/>
  }

  if (userRole === 'admin' && !isAdminAuthenticated) {
    return <LoginPage 
        onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            setCurrentView('main');
        }}
        onBack={() => setUserRole(null)}
    />;
  }


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {userRole === 'admin' && isAdminAuthenticated && (
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 
                    className="text-2xl font-bold text-indigo-700 cursor-pointer hover:text-indigo-900 transition-colors text-center md:text-left"
                    onClick={() => navigate('main')}
                >
                    ИИ-система выявления рисков
                </h1>
                 <nav className="w-full mt-4 md:w-auto md:mt-0">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:bg-gray-100 md:p-1 md:rounded-lg">
                        <NavButton view="student" label="Профиль ученика" icon={<UserIcon className="w-5 h-5"/>} />
                        <NavButton view="dashboard" label="Дашборд школы" icon={<DashboardIcon className="w-5 h-5" />} />
                        <NavButton view="data-entry" label="Внести данные" icon={<PlusCircleIcon className="w-5 h-5" />} />
                        <NavButton view="micro" label="Микро-активности" icon={<BookOpenIcon className="w-5 h-5" />} />
                        <NavButton view="legal" label="Правовая инфо" icon={<ScaleIcon className="w-5 h-5" />} />
                        <button onClick={handleLogout} className="flex items-center justify-center w-full md:w-auto px-4 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-red-500 hover:text-white">
                           <span className="ml-2">Выйти</span>
                        </button>
                    </div>
                </nav>
              </div>
            </div>
          </header>
      )}

      {userRole === 'user' && currentView !== 'data-entry' && currentView !== 'test' && currentView !== 'consent' && (
         <header className="bg-indigo-700 shadow-md text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-2xl font-bold text-center md:text-left">
                    Панель поддержки
                </h1>
                 <nav className="w-full mt-4 md:w-auto md:mt-0">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <NavButton view="test" label="Пройти опрос" icon={<UserIcon className="w-5 h-5"/>} isUserNav />
                        <NavButton view="micro" label="Микро-активности" icon={<BookOpenIcon className="w-5 h-5" />} isUserNav />
                        <NavButton view="legal" label="Правовая инфо" icon={<ScaleIcon className="w-5 h-5" />} isUserNav />
                        <button onClick={() => navigate('qr')} className="flex items-center justify-center w-full md:w-auto px-4 py-2 text-sm font-medium rounded-md transition-colors text-gray-100 hover:bg-red-500">
                           <span className="ml-2">Выйти</span>
                        </button>
                    </div>
                </nav>
              </div>
            </div>
          </header>
      )}


      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userRole === 'admin' && isAdminAuthenticated ? renderAdminContent() : renderUserContent()}
      </main>
    </div>
  );
}