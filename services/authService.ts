
export const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  // В реальном приложении здесь будет вызов API к бэкенду
  return new Promise(resolve => {
    setTimeout(() => {
      if (email.toLowerCase() === 'admin@school.com' && password === 'password123') {
        resolve({ success: true, message: 'Вход выполнен успешно!' });
      } else {
        resolve({ success: false, message: 'Неверный email или пароль.' });
      }
    }, 500); // Имитация задержки сети
  });
};
