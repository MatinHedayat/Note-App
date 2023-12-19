import { useEffect, useState } from "react";
import { IoChevronUp } from "react-icons/io5";

export default function BackToTopBtn() {
  const [isBtnShow, setIsBtnShow] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setIsBtnShow(true) : setIsBtnShow(false);
    });
  }, []);

  const backToTopBtnCN = isBtnShow
    ? "opacity-100 right-[2.1rem]"
    : "opacity-100 -right-10";

  return (
    <button
      className={`bg-slate-700/60 w-10 h-10 fixed bottom-20 flex items-center justify-center backdrop-blur-sm rounded-xl shadow-xl transition-all duration-300 ${backToTopBtnCN}`}
      onClick={handleBackToTop}
    >
      <IoChevronUp className='text-slate-200 text-lg' />
    </button>
  );
}
