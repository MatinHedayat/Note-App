import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateNoteBtn() {
  return (
    <Link to='/add-note'>
      <button className='bg-slate-700 w-16 h-16 fixed z-40 bottom-20 flex items-center justify-center outline-2 outline-slate-700 rounded-full plus-shadow inset-x-1/2 -translate-x-1/2 sm:bottom-28 dark:bg-slate-700 dark:outline-slate-700'>
        <FaPlus className='text-aliceblue' />

        <div className='absolute inset-0 outline outline-2 outline-slate-700 rounded-full animate-ping'></div>
      </button>
    </Link>
  );
}
