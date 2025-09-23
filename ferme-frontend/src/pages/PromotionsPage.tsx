import type { FC } from 'react';

const PromotionsPage: FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Иконка в стиле construction/development */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-24 w-24 mx-auto mb-6 text-blue-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
          />
        </svg>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Страница находится в разработке
        </h1>
        
        <p className="text-gray-600 mb-8">
          Мы работаем над новыми акциями и специальными предложениями. 
          Скоро здесь появится много интересного!
        </p>

        <div className="flex justify-center gap-3">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;
