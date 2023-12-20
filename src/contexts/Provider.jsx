import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE, UPDATE_NOTE } from "./actionTypes";

const notesReducer = (notes, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return [...notes, payload];

    case EDIT_NOTE:
      return notes.map((note) => (note.id === payload.id ? payload : note));

    case DELETE_NOTE:
      return notes.filter((note) => note.id !== payload);

    case UPDATE_NOTE:
      return notes.map((note) =>
        note.id === payload ? { ...note, isMarked: !note.isMarked } : note
      );
  }
};

const NotesContext = createContext();
const NotesDispatchContext = createContext();

const initialState = JSON.parse(localStorage.getItem("notes")) || [];

export default function Provider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, initialState);
  console.log(notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export const useNotesContext = () => useContext(NotesContext);
export const useNotesDispatchContext = () => useContext(NotesDispatchContext);
