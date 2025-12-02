export default function Example() {
  return (
    <div className="flex items-center justify-center">
      <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#b197fc,#780EFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
      <div className="rainbow relative z-0 w-fit overflow-hidden p-0.5  rounded-full hover:scale-105 transition duration-300 active:scale-100">
        <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-[#2f3037]">
          View My Work
        </button>
      </div>
    </div>
  );
}
