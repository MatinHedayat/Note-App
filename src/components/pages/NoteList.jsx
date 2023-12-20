import { HiMenuAlt2 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  useNotesContext,
  useNotesDispatchContext,
} from "../../contexts/Provider";
import NoteItem from "../NoteItem";
import CreateNoteBtn from "../CreateNoteBtn";
import BackToTopBtn from "../BackToTopBtn";
import Menu from "../Menu";

export default function NoteList() {
  const notes = useNotesContext();
  const dispatch = useNotesDispatchContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const [searchValue, setSearchValue] = useState("");
  const [sortIsEarliest, setSortIsEarliest] = useState(true);

  // let sortedNotes = testNotes;
  // !sortIsEarliest
  //   ? (sortedNotes = [...testNotes].sort(
  //       (a, b) => new Date(a.creationTime) - new Date(b.creationTime)
  //     ))
  //   : sortedNotes;
  //   const result = [...testNotes];

  //   let sortedNotes = result;

  //   if (sortIsEarliest)
  //   console.log('first')
  // sortedNotes = [...testNotes].sort(
  //   (a, b) => new Date(a.creationTime) - new Date(b.creationTime)
  //   ); // b -a  => a > b ? -1 : 1

  //   if (!sortIsEarliest)
  //   console.log('tow')
  //     sortedNotes = [...testNotes].sort(
  //       (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
  //     ); // b -a  => a > b ? -1 : 1

  // console.log(sortedNotes);

  return (
    <div className='page'>
      <div className='bg-slate-700 h-12 flex items-center justify-between rounded-2xl overflow-hidden'>
        <button
          className='w-12 h-full flex items-center justify-center ml-2 sm:ml-4'
          onClick={() => setIsMenuOpen(true)}
        >
          <HiMenuAlt2 className='text-2xl text-aliceblue' />
        </button>

        <input
          className='bg-transparent text-aliceblue/60 text-[0.9rem] w-1/2 px-2 outline-none'
          type='text'
          value={searchValue}
          placeholder='Search ...'
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div className='h-full flex'>
          <button
            className='w-12 h-full flex items-center justify-center'
            onClick={() => {
              setSortIsEarliest(!sortIsEarliest);
            }}
          >
            {sortIsEarliest ? (
              <TbSortAscendingLetters
                className={`text-2xl text-aliceblue ${
                  sortIsEarliest ? "animate-rotateOpacity" : ""
                }`}
              />
            ) : (
              <TbSortDescendingLetters
                className={`text-2xl text-aliceblue ${
                  sortIsEarliest ? "" : "animate-rotateOpacity"
                }`}
              />
            )}
          </button>

          <Link to='/user'>
            <button className='w-12 h-full flex items-center justify-center mr-2 sm:mr-4'>
              <FaRegUserCircle className='text-2xl text-aliceblue' />
            </button>
          </Link>
        </div>
      </div>

      <div className='grid gap-x-2 gap-y-4 mt-8 sm:grid-cols-2'>
        {notes.map((note, index) => (
          <NoteItem key={note.id} note={note} index={index} />
        ))}
      </div>

      <Menu isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
      <CreateNoteBtn />
      <BackToTopBtn />
    </div>
  );
}
