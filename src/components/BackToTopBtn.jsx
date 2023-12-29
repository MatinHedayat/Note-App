import { useEffect, useState } from 'react';
import { IoChevronUp } from 'react-icons/io5';

export default function BackToTopBtn() {
  const [isBtnShow, setIsBtnShow] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 100 ? setIsBtnShow(true) : setIsBtnShow(false);
    });
  }, []);

  const backToTopBtnCN = isBtnShow
    ? 'opacity-100 right-8 sm:right-12'
    : 'opacity-100 -right-full';

  return (
    <button
      className={`bg-slate-700/80 w-12 h-12 fixed z-40 bottom-[5.5rem] flex items-center justify-center backdrop-blur-sm rounded-xl transition-all duration-300 sm:bottom-28 ${backToTopBtnCN}`}
      onClick={handleBackToTop}
    >
      <IoChevronUp className='text-slate-200 text-lg' />
    </button>
  );
}
