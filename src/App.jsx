import { Route, Routes } from 'react-router-dom';
import { AddNote, Bookmarks, EditNote, NoteList, User } from './pages/exporter';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<NoteList />} />
        <Route path='/add-note' element={<AddNote />} />
        <Route path='/edit-note' element={<EditNote />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </>
  );
}
