import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateNoteBtn() {
  return (
    <Link to='add-note'>
        <button className='bg-slate-700 w-16 h-16 fixed bottom-40 right-6 flex items-center justify-center outline-2 outline-slate-700 rounded-full plus-shadow min-[875px]:inset-x-1/2 min-[875px]:-translate-x-1/2'>
          <FaPlus className='text-aliceblue' />

          <div className='absolute inset-0 outline outline-2 outline-slate-700 rounded-full animate-ping'></div>
        </button>
    </Link>
  );
}
