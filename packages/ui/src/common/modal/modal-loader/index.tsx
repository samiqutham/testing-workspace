import React from 'react'

export default function ModalLoader() {
    return (
        <div className="w-full h-[100%] relative flex justify-center items-center bottom-[45%]">
            <div className="relative w-[4.70rem] h-[0.80rem] bg-[#2f4553]   rounded-full overflow-hidden">
                {/* Moving pill */}
                <div className="absolute top-[0.125rem] bottom-[0.125rem] left-[0.125rem] w-4 bg-white rounded-full animate-slide will-change-transform"></div>

                <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          50% { transform: translateX(3.50rem); }
          100% { transform: translateX(0); }
        }
        .animate-slide {
          animation: slide 1s infinite;
        }
      `}</style>
            </div>
        </div>
    )
}
