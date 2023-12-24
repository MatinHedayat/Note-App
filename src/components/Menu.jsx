import { useEffect, useRef, useState } from "react";
import useOutsideFocus from "../hooks/useOutsideFocus";
import menuItems from "../data/menuItems";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNotesDispatchContext } from "../contexts/NotesProvider";
import { CLEAR_NOTES } from "../contexts/actionTypes";
import { useUserContext } from "../contexts/UserProvider";

export default function Menu({ isMenuOpen, handleCloseMenu }) {
  const menuCN = isMenuOpen ? "left-0 menu-shadow" : "-left-96 shadow-none";

  const menuRef = useRef();
  useOutsideFocus(menuRef, handleCloseMenu);

  const [activeItem, setActiveItem] = useState("All Notes");
  const handleChangeActiveItem = (item) => {
    setActiveItem(item);
  };

  const user = useUserContext();

  const dispatch = useNotesDispatchContext();
  const handleClearAllNotes = () => {
    dispatch({ type: CLEAR_NOTES });
    localStorage.removeItem("notes");
  };

  const initialState = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(initialState);
  const handleSwitchTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`bg-slate-700 w-10/12 max-w-sm pb-28 absolute z-50 top-0 rounded-ee-[10rem] rounded-es-3xl duration-500 sm:pb-40 ${menuCN}`}
      ref={menuRef}
    >
      <Link to='/user'>
        <button className='bg-slate-800 w-6/12 h-16 px-6 py-3 mt-12 ml-8 flex items-center gap-x-5 rounded-3xl ss:w-7/12'>
          {user?.name ? (
            <img
              className='w-10 h-10 rounded-full'
              src={user?.character}
              alt='character'
            />
          ) : (
            <FaRegUserCircle className='w-10 h-10 hidden text-aliceblue min-[250px]:inline' />
          )}
          <span className='text-aliceblue/80 capitalize text-xs ss:w-max'>
            Hi {!user?.name?.length ? "user" : user.name}
          </span>
        </button>
      </Link>

      <button
        className='bg-slate-500/30 absolute top-[3.5rem] right-[12%] p-3 rounded-full'
        onClick={handleCloseMenu}
      >
        <IoClose className='text-xl text-slate-300/70' />
      </button>

      <div className='flex flex-col gap-y-2 mt-16'>
        {menuItems.map((item) => {
          if (item.type === "link") {
            return (
              <Link key={item.title} to={item.path}>
                <MenuItem
                  item={item}
                  activeItem={activeItem}
                  handleChangeActiveItem={handleChangeActiveItem}
                />
              </Link>
            );
          }

          if (item.title === "Dark Theme") {
            return (
              <button
                className={`w-[90%] relative flex items-center gap-x-4 px-4 pl-6 py-3 rounded-r-3xl hover:bg-slate-800 transition-all duration-100 ss:px-10`}
                key={item.title}
                onClick={handleSwitchTheme}
              >
                <span
                  className={`text-${item.miniSize} text-slate-300/80 ss:text-${item.size}`}
                >
                  {item.icon}
                </span>

                <span className='text-sm text-aliceblue font-medium ss:text-base'>
                  {item.title}
                </span>

                <div className='bg-slate-500/80 w-6 h-2 absolute inset-y-1/2 -translate-y-1/2 right-5 rounded-xl transition-all duration-500 ss:right-12 ss:w-10 ss:h-3'>
                  <div
                    className={`w-3 h-3 absolute inset-y-1/2 -translate-y-1/2 left-0 border-2 border-slate-200/50 rounded-full transition-all duration-300 ss:w-4 ss:h-4 ${
                      theme === "dark"
                        ? "bg-slate-900 ml-3 ss:ml-6"
                        : "bg-slate-200/80"
                    }`}
                  ></div>
                </div>
              </button>
            );
          }

          if (item.title === "Clear All") {
            return (
              <button
                className='w-[90%] flex items-center gap-x-4 px-4 pl-6 py-3 rounded-r-3xl hover:bg-slate-800 transition-colors duration-100 ss:px-10'
                key={item.title}
                onClick={handleClearAllNotes}
              >
                <span
                  className={`text-${item.miniSize} text-slate-300/80 ss:text-${item.size}`}
                >
                  {item.icon}
                </span>

                <span className='text-sm text-aliceblue font-medium ss:text-base'>
                  {item.title}
                </span>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}

function MenuItem({ item, activeItem, handleChangeActiveItem }) {
  const location = useLocation();
  useEffect(() => {
    if (item.path === location.pathname) {
      handleChangeActiveItem(item.title);
    }
    if (location.pathname === "/user") {
      handleChangeActiveItem("");
    }
  });

  return (
    <button
      className={`${
        activeItem === item.title ? "bg-slate-800" : ""
      } w-[90%] flex items-center gap-x-4 px-4 pl-6 py-3 rounded-r-3xl hover:bg-slate-800 transition-colors duration-100 ss:px-10`}
    >
      <span className={`text-${item.miniSize} text-slate-300/80 ss:text-xl`}>
        {item.icon}
      </span>

      <span className='text-sm text-aliceblue font-medium ss:text-base'>
        {item.title}
      </span>
    </button>
  );
}
