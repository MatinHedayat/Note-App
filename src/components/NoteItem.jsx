import { useRef, useState } from "react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useNotesDispatchContext } from "../contexts/Provider";
import { DELETE_NOTE, UPDATE_NOTE } from "../contexts/actionTypes";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import useOutsideFocus from "../hooks/useOutsideFocus";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaInfoCircleSolid } from "react-icons/lia";

export default function NoteItem({ note, index }) {
  const dispatch = useNotesDispatchContext();
  const [isMarked, setIsMarked] = useState(note.isMarked);

  const handleUpdateNote = () => {
    setIsMarked(!isMarked);
    dispatch({ type: UPDATE_NOTE, payload: note.id });
  };

  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const itemMenuCN = isItemMenuOpen
    ? "opacity-100 visible right-7 scale-100"
    : "opacity-0 invisible right-4 scale-90";

  const itemMenuRef = useRef();
  useOutsideFocus(itemMenuRef, () => setIsItemMenuOpen(false));

  return (
    <div className={`px-2 py-4 rounded-xl shadow-xl ${note.background}`}>
      <div className='flex items-center justify-between mb-6'>
        <span></span>

        <div className='relative flex px-1' ref={itemMenuRef}>
          <button onClick={() => setIsItemMenuOpen(!isItemMenuOpen)}>
            <BsThreeDotsVertical />
          </button>

          <div
            className={`bg-aliceblue/50 w-36 flex flex-col gap-y-1 absolute top-0 px-2 py-3 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 ${itemMenuCN}`}
          >
            <Link to='edit-note'>
              <button className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-[0.82rem] font-medium pl-3 py-[0.3rem] rounded-lg'>
                <FiEdit3 className='text-sm' />
                Edit
              </button>
            </Link>

            <button
              className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-[0.82rem] font-medium pl-3 py-[0.3rem] rounded-lg'
              onClick={handleUpdateNote}
            >
              {isMarked ? (
                <RiBookmarkFill
                  className={`${isMarked ? "animate-opacity" : ""}`}
                />
              ) : (
                <RiBookmarkLine
                  className={`${isMarked ? "" : "animate-opacity"}`}
                />
              )}
              {isMarked ? "Marked" : "!Marked"}
            </button>

            <button
              className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-[0.82rem] font-medium pl-3 py-[0.3rem] rounded-lg'
              onClick={() => dispatch({ type: DELETE_NOTE, payload: note.id })}
            >
              <RiDeleteBin6Line className='text-sm' />
              Delete
            </button>

            <button className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-[0.82rem] font-medium pl-3 py-[0.3rem] rounded-lg'>
              <LiaInfoCircleSolid className='text-sm' />
              More info
            </button>
          </div>
        </div>
      </div>

      <p className='bg-slate-200/40 font-medium leading-5 p-4 rounded-xl'>
        {note.title}
      </p>

      <p className='bg-slate-200/40 text-sm font-medium p-4  mt-2 mb-4 rounded-xl'>
        {note.desc}
      </p>

      <div className='flex items-center justify-between px-2'>
        <button
          className='bg-slate-100/30 px-3 py-1 rounded-lg'
          onClick={handleUpdateNote}
        >
          {isMarked ? (
            <RiBookmarkFill
              className={`text-slate-800 ${isMarked ? "animate-opacity" : ""}`}
            />
          ) : (
            <RiBookmarkLine
              className={`text-slate-800 ${isMarked ? "" : "animate-opacity"}`}
            />
          )}
        </button>

        <div className='bg-slate-100/30 flex gap-2 px-3 py-1 rounded-lg'>
          <span className='text-[0.7rem] font-medium text-black/90'>
            {new Date(note.creationTime).toLocaleTimeString("en-US")}
          </span>

          <span className='text-[0.7rem] font-medium text-black/90'>
            {new Date(note.creationTime).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
