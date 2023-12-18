import { Route, Routes } from "react-router-dom";
import {
  AddNote,
  Bookmarks,
  EditNote,
  Hint,
  History,
  Login,
  NoteList,
  User,
} from "./components/pages/exporter";

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<NoteList />} />
        <Route path='add-note' element={<AddNote />} />
        <Route path='edit-note' element={<EditNote />} />
        <Route path='user' element={<User />} />
        <Route path='login' element={<Login />} />
        <Route path='hint' element={<Hint />} />
        <Route path='history' element={<History />} />
        <Route path='bookmarks' element={<Bookmarks />} />
      </Routes>
    </>
  );
}
