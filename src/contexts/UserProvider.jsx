import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const SetUserContext = createContext();
const initialState = JSON.parse(localStorage.getItem("user")) || {
  name: "",
  family: "",
  character: "images/avatars/1.jpg",
};

export default function UserProvider({ children }) {
  const [user, setUser] = useState(initialState);

  useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]);

  const login = (name, family, character) =>
    setUser({ name, family, character });
  const logout = () =>
    setUser({ name: "", family: "", character: "images/avatars/1.jpg" });

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={{ login, logout }}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
export const useSetUserContext = () => useContext(SetUserContext);
