import { useRef, useState } from "react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useNotesDispatchContext } from "../contexts/NotesProvider";
import { DELETE_NOTE, EDIT_NOTE, UPDATE_NOTE } from "../contexts/actionTypes";
import { BsThreeDotsVertical } from "react-icons/bs";
import useOutsideFocus from "../hooks/useOutsideFocus";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaInfoCircleSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

export default function NoteItem({ note }) {
  const navigate = useNavigate();
  const dispatch = useNotesDispatchContext();

  const itemMenuRef = useRef();
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const itemMenuCN = isItemMenuOpen
    ? "opacity-100 visible right-7 scale-100"
    : "opacity-0 invisible right-4 scale-90";
  useOutsideFocus(itemMenuRef, () => setIsItemMenuOpen(false));

  const [isMarked, setIsMarked] = useState(note.isMarked);
  const handleUpdateNote = () => {
    setIsMarked(!isMarked);
    dispatch({ type: UPDATE_NOTE, payload: note.id });
  };

  return (
    <div
      className={`px-2 py-4 rounded-2xl shadow-xl sm:w-[80%] sm:px-4 sm:py-5 ${note.background}`}
    >
      <div className='flex items-center justify-between mb-6 sm:mb-10'>
        <span></span>

        <div className='relative flex px-1' ref={itemMenuRef}>
          <button onClick={() => setIsItemMenuOpen(!isItemMenuOpen)}>
            <BsThreeDotsVertical className='sm:text-xl' />
          </button>

          <div
            className={`bg-aliceblue/50 w-44 flex flex-col gap-y-1 absolute top-0 px-2.5 py-4 backdrop-blur-sm rounded-3xl shadow-xl transition-all duration-300 ${itemMenuCN}`}
          >
            <button
              className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-sm font-semibold pl-4 py-2 rounded-xl'
              onClick={() => navigate("/edit-note", { state: note })}
            >
              <FiEdit3 className='text-base' />
              Edit
            </button>

            <button
              className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-sm font-semibold pl-4 py-2 rounded-xl'
              onClick={handleUpdateNote}
            >
              {isMarked ? (
                <RiBookmarkFill
                  className={`text-base ${isMarked ? "animate-opacity" : ""}`}
                />
              ) : (
                <RiBookmarkLine
                  className={`text-base ${isMarked ? "" : "animate-opacity"}`}
                />
              )}
              {isMarked ? "Marked" : "!Marked"}
            </button>

            <button
              className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-sm font-semibold pl-4 py-2 rounded-xl'
              onClick={() => dispatch({ type: DELETE_NOTE, payload: note.id })}
            >
              <RiDeleteBin6Line className='text-base' />
              Delete
            </button>

            <button className='bg-aliceblue/80 w-full flex items-center gap-x-2 text-slate-500 text-left text-sm font-semibold pl-4 py-2 rounded-xl'>
              <LiaInfoCircleSolid className='text-base' />
              More info
            </button>
          </div>
        </div>
      </div>

      <p className='bg-slate-200/40 font-medium leading-5 p-4 rounded-2xl sm:text-lg sm:py-6 sm:px-5'>
        {note.title}
      </p>

      {note.desc.length ? (
        <p className='bg-slate-200/40 text-sm font-medium p-4 mt-2 mb-4 rounded-2xl sm:text-base sm:py-6 sm:px-5 sm:mt-3'>
          {note.desc}
        </p>
      ) : (
        <div className='mb-4'></div>
      )}

      <div className='flex items-center justify-between px-2'>
        <button
          className='bg-slate-100/30 px-3 py-1.5 flex items-center gap-2 rounded-lg sm:px-4 sm:py-2'
          onClick={handleUpdateNote}
        >
          {isMarked ? (
            <RiBookmarkFill
              className={`text-slate-800 sm:text-lg ${
                isMarked ? "animate-opacity" : ""
              }`}
            />
          ) : (
            <RiBookmarkLine
              className={`text-slate-800 sm:text-lg ${
                isMarked ? "" : "animate-opacity"
              }`}
            />
          )}

          {isMarked ? (
            <span className='text-sm font-medium hidden sm:inline'>
              Bookmarked
            </span>
          ) : (
            <span className='text-sm font-medium hidden sm:inline'>
              Not Marked
            </span>
          )}
        </button>

        <div className='bg-slate-100/30 flex gap-2 px-3 py-1.5 rounded-lg sm:px-4 sm:py-2 sm:gap-4'>
          <span className='text-[0.7rem] font-medium text-black/80 sm:text-sm sm:font-semibold'>
            {new Date(note.creationTime).toLocaleTimeString("en-US")}
          </span>

          <span className='text-[0.7rem] font-medium text-black/80 sm:text-sm sm:font-semibold sm:hidden'>
            {new Date(note.creationTime).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })}
          </span>
          <span className='text-[0.7rem] hidden font-medium text-black/80 sm:text-sm sm:font-semibold sm:inline'>
            {new Date(note.creationTime).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
