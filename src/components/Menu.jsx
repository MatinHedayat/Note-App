import { useRef, useState } from "react";
import useOutsideFocus from "../hooks/useOutsideFocus";
import menuItems from "../data/menuItems";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNotesDispatchContext } from "../contexts/Provider";
import { CLEAR_NOTES } from "../contexts/actionTypes";

export default function Menu({ isMenuOpen, handleCloseMenu }) {
  const menuCN = isMenuOpen ? "left-0 menu-shadow" : "-left-full shadow-none";

  const menuRef = useRef();
  useOutsideFocus(menuRef, handleCloseMenu);

  const [activeItem, setActiveItem] = useState("All Notes");
  const handleChangeActiveItem = (item) => {
    setActiveItem(item);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleChangeDarkMode = () => setIsDarkMode(!isDarkMode);

  const dispatch = useNotesDispatchContext();
  const handleClearAllNotes = () => dispatch({ type: CLEAR_NOTES });

  return (
    <div
      className={`bg-slate-700 w-10/12 max-w-sm pb-40 absolute z-50 top-0 rounded-ee-[10rem] rounded-es-3xl transition-all duration-700 ease-in-out ${menuCN}`}
      ref={menuRef}
    >
      <Link to='/user'>
        <button className='bg-slate-800 w-6/12 px-4 py-3 mt-12 ml-8 flex items-center gap-x-4 rounded-3xl min-[400px]:w-7/12'>
          <FaRegUserCircle className='text-2xl hidden text-aliceblue min-[250px]:inline' />
          <span className='text-aliceblue/80 text-xs min-[400px]:w-max'>
            Hi Matin
          </span>
        </button>
      </Link>

      <button
        className='bg-slate-500/30 absolute top-[3.2rem] right-[12%] p-3 rounded-full'
        onClick={handleCloseMenu}
      >
        <IoClose className='text-xl text-slate-300/70' />
      </button>

      <div className='flex flex-col gap-y-2 mt-20'>
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
                className={`w-[90%] relative flex items-center gap-x-4 px-4 pl-6 py-3 rounded-r-3xl hover:bg-slate-800 transition-all duration-100 min-[400px]:px-10`}
                key={item.title}
                onClick={handleChangeDarkMode}
              >
                <span
                  className={`text-${item.miniSize} text-slate-300/80 min-[400px]:text-${item.size}`}
                >
                  {item.icon}
                </span>

                <span className='text-sm text-aliceblue font-medium min-[400px]:text-base'>
                  {item.title}
                </span>

                <div className='bg-slate-500/80 w-6 h-2 absolute inset-y-1/2 -translate-y-1/2 right-5 rounded-xl transition-all duration-500 min-[400px]:right-12 min-[400px]:w-10 min-[400px]:h-3'>
                  <div
                    className={`w-3 h-3 absolute inset-y-1/2 -translate-y-1/2 left-0 border-2 border-slate-200/50 rounded-full transition-all duration-300 min-[400px]:w-4 min-[400px]:h-4 ${
                      isDarkMode
                        ? "bg-slate-900 ml-3 min-[400px]:ml-6"
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
                className={`${
                  activeItem === item.title ? "bg-slate-800" : ""
                } w-[90%] flex items-center gap-x-4 px-4 pl-6 py-3 rounded-r-3xl hover:bg-slate-800 transition-colors duration-100 min-[400px]:px-10`}
                key={item.title}
                onClick={handleClearAllNotes}
              >
                <span
                  className={`text-${item.miniSize} text-slate-300/80 min-[400px]:text-${item.size}`}
                >
                  {item.icon}
                </span>

                <span className='text-sm text-aliceblue font-medium min-[400px]:text-base'>
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
  return (
    <button
      className={`${
        activeItem === item.title ? "bg-slate-800" : ""
      } w-[90%] flex items-center gap-x-4 px-4 pl-6 py-3 rounded-r-3xl hover:bg-slate-800 transition-colors duration-100 min-[400px]:px-10`}
      onClick={() => handleChangeActiveItem(item.title)}
    >
      <span
        className={`text-${item.miniSize} text-slate-300/80 min-[400px]:text-xl`}
      >
        {item.icon}
      </span>

      <span className='text-sm text-aliceblue font-medium min-[400px]:text-base'>
        {item.title}
      </span>
    </button>
  );
}
