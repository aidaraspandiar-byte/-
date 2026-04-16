
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SmartphoneIcon, ExternalLinkIcon } from 'lucide-react';

interface QRCodePageProps {
  onContinue: () => void;
}

export const QRCodePage: React.FC<QRCodePageProps> = ({ onContinue }) => {
  const SHARED_URL = 'https://ais-pre-yfkfjbv25cciibg54vpytt-483936697092.asia-southeast1.run.app';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 p-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-lg w-full z-10">
        <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
              <SmartphoneIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">СТРАЖ 1.0</h1>
            <p className="text-slate-500 text-lg font-medium">Интеллектуальный мониторинг безопасности</p>
          </div>

          <div className="relative group inline-block p-6 bg-white rounded-3xl shadow-inner border-2 border-slate-100 mb-8 transition-transform hover:scale-105 duration-300">
            <QRCodeSVG 
              value={SHARED_URL} 
              size={220} 
              level="H"
              includeMargin={false}
              imageSettings={{
                src: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Scan Me
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onContinue}
              className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <span>Запустить систему</span>
              <ExternalLinkIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <p className="text-slate-400 text-sm">
              Наведите камеру телефона на QR-код для интерактивного участия
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Проект разработан в рамках конкурса "Мастер года"
          </p>
        </div>
      </div>
    </div>
  );
};
