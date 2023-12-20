import { HiMenuAlt2 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNotesContext } from "../../contexts/Provider";
import NoteItem from "../NoteItem";
import BackToTopBtn from "../BackToTopBtn";
import Menu from "../Menu";

export default function Bookmarks() {
  const notes = useNotesContext();
  const result = notes.filter((note) => note.isMarked);
  const [bookmarks, setBookmarks] = useState(notes.filter((note) => note.isMarked));

  useEffect(() => {
    setFormattedNotes(notes.filter((note) => note.isMarked));
  }, [notes]);

  const [formattedNotes, setFormattedNotes] = useState(bookmarks);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const [searchValue, setSearchValue] = useState("");
  const handleSearchingNotes = () => {
    setFormattedNotes(
      bookmarks.filter((note) => {
        const filterCondition =
          note.title.toLowerCase().match(searchValue.toLowerCase()) ||
          note.desc.toLowerCase().match(searchValue.toLowerCase());
        if (filterCondition) return note;
      })
    );
  };

  useEffect(handleSearchingNotes, [searchValue]);

  const [sortIsEarliest, setSortIsEarliest] = useState(true);
  useEffect(() => {
    if (!formattedNotes.length) return;

    if (sortIsEarliest) {
      setFormattedNotes(
        [...bookmarks].sort(
          (a, b) => new Date(a.creationTime) - new Date(b.creationTime)
        )
      );
    }

    if (!sortIsEarliest) {
      setFormattedNotes(
        [...bookmarks].sort(
          (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
        )
      );
    }
  }, [sortIsEarliest]);

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
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearchingNotes();
          }}
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
        {[...formattedNotes].map((note, index) => (
          <NoteItem key={note.id} note={note} index={index} />
        ))}
      </div>

      {!bookmarks.length ? (
        <div className='text-sm text-center block w-full text-slate-800 mt-8'>
          Bookmark list is empty ...
        </div>
      ) : (
        !formattedNotes.length && (
          <div className='text-sm text-center block w-full text-slate-800 mt-8'>
            No results found ...
          </div>
        )
      )}

      <Menu isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
      <BackToTopBtn />
    </div>
  );
}
