import { useState } from "react";
import backgrounds from "../../data/backgrounds";
import { HiMenuAlt2 } from "react-icons/hi";
import Menu from "../Menu";
import { FaCheck } from "react-icons/fa6";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useNotesDispatchContext } from "../../contexts/Provider";
import { ADD_NOTE } from "../../contexts/actionTypes";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function AddNote() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const [isMarked, setIsMarked] = useState(false);
  const [color, setColor] = useState("bg-slate-500");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useNotesDispatchContext();
  const navigate = useNavigate();

  const handleAddNote = () => {
    if (!title) return;
    dispatch({
      type: ADD_NOTE,
      payload: {
        id: Date.now(),
        title,
        desc,
        isMarked,
        background: color,
        creationTime: new Date().toISOString(),
      },
    });

    navigate("/");
  };

  return (
    <div className='page'>
      <div className='bg-slate-700 h-12 flex items-center justify-between rounded-2xl overflow-hidden sm:px-6'>
        <button
          className='w-12 h-full flex items-center justify-center ml-2'
          onClick={() => setIsMenuOpen(true)}
        >
          <HiMenuAlt2 className='text-2xl text-aliceblue' />
        </button>

        <div className='flex items-center gap-x-2 sm:gap-x-3'>
          <Link to='/'>
            <button
              className='bg-orange-300 px-2 py-1 flex items-center gap-x-1.5 rounded-xl ss:px-3'
              onClick={handleAddNote}
            >
              <BiLeftArrowAlt className='text-slate-700 text-lg' />
              <span className='text-slate-700 text-sm font-medium'>Back</span>
            </button>
          </Link>

          <button
            className='bg-green-300 px-2 py-1 mr-2 flex items-center gap-x-1.5 rounded-xl ss:px-3 ss:mr-4'
            onClick={handleAddNote}
          >
            <FaCheck className='text-slate-700 text-sm' />
            <span className='text-slate-700 text-sm font-medium'>Save</span>
          </button>
        </div>
      </div>

      <div className='flex items-center mt-12 mb-10'>
        <h2 className='w-3/5 text-2xl capitalize font-bold pr-4 ss:text-3xl sm:text-5xl'>
          Create and design your notes
        </h2>

        <div className='w-2/5 max-w-[260px]'>
          <img src='images/create-note.png' alt='create-note' />
        </div>
      </div>

      <div className='flex items-center justify-between px-2 mb-4'>
        <button
          className='bg-slate-200 flex items-center gap-x-2 text-slate-600 text-left text-sm font-medium px-2 py-2 rounded-lg'
          onClick={() => setIsMarked(!isMarked)}
        >
          {isMarked ? (
            <RiBookmarkFill
              className={`text-xl ${isMarked ? "animate-opacity" : ""}`}
            />
          ) : (
            <RiBookmarkLine
              className={`text-xl ${isMarked ? "" : "animate-opacity"}`}
            />
          )}
          {isMarked ? "Bookmarked" : "Not Marked"}
        </button>

        <div className='max-w-[40%] flex flex-wrap items-center justify-end gap-2 ss:max-w-none'>
          {backgrounds.map((item) => (
            <button
              className={`border-4 border-aliceblue/50 rounded-lg ${
                item.color
              } ${color === item.color ? "w-6 h-6" : "w-5 h-5"}`}
              key={item.id}
              onClick={() => setColor(item.color)}
            ></button>
          ))}
        </div>
      </div>

      <div
        className={`px-2 py-6 flex flex-col gap-4 rounded-3xl shadow-xl transition-colors sm:flex-row ${color}`}
      >
        <textarea
          className='bg-slate-100/60 min-h-[10rem] font-medium text-[0.95rem] text-slate-800/90 p-4 pt-6 leading-5 placeholder-slate-800/90 outline-none rounded-2xl shadow-xl sm:w-1/2'
          placeholder='Write your title ...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>

        <textarea
          className='bg-slate-100/60 min-h-[10rem] font-medium text-[0.95rem] text-slate-800/90 p-4 pt-6 leading-5 placeholder-slate-800/90 outline-none rounded-2xl shadow-xl sm:w-1/2'
          placeholder='Write your description ...'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <Menu isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
    </div>
  );
}
