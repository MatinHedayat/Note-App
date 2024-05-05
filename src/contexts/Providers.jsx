import NotesProvider from './NotesProvider';
import UserProvider from './UserProvider';

export default function Providers({ children }) {
  return (
    <NotesProvider>
      <UserProvider>{children}</UserProvider>
    </NotesProvider>
  );
}
