
import React, { useState, useEffect } from 'react';

interface QRCodePageProps {
  onContinue: () => void;
}

export const QRCodePage: React.FC<QRCodePageProps> = ({ onContinue }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // We generate the QR code on the client side to get the correct current URL
    const currentUrl = window.location.href;
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`);
  }, []);

  return (
    <div
      className="min-h-screen w-screen -translate-x-4 sm:-translate-x-6 lg:-translate-x-8 -translate-y-8 flex flex-col items-center justify-center text-center bg-gray-100 p-4"
    >
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Система "Страж"</h1>
            <p className="text-md text-gray-600 mt-2">Сканируйте для доступа с мобильного устройства</p>
          </div>

          <div className="flex justify-center items-center my-8">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" width="250" height="250" className="rounded-lg shadow-md" />
            ) : (
              <div className="w-[250px] h-[250px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Генерация QR-кода...</p>
              </div>
            )}
          </div>
          
          <button
            onClick={onContinue}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg"
          >
            Продолжить на этом устройстве
          </button>
        </div>
      </div>
    </div>
  );
};
