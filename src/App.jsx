import { Route, Routes, useLocation } from "react-router-dom";
import {
  AddNote,
  Bookmarks,
  EditNote,
  NoteList,
  User,
} from "./pages/exporter";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<NoteList />} />
          <Route path='/add-note' element={<AddNote />} />
          <Route path='/edit-note' element={<EditNote />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
