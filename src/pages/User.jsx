import { useState } from "react";
import characters from "../data/characters";
import { useNavigate } from "react-router-dom";
import { useSetUserContext, useUserContext } from "../contexts/UserProvider";
import Menu from "../components/Menu";
import { HiMenuAlt2 } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";

export default function User() {
  const user = useUserContext();
  const { login, logout } = useSetUserContext();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const [name, setName] = useState(user.name);
  const [family, setFamily] = useState(user.family);
  const [character, setCharacter] = useState(user.character);

  const handleLoginUser = () => {
    if (!name) return;

    login(name, family, character);
    navigate("/");
  };

  const handleLogoutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div
      className='page'
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='bg-slate-700 h-16 flex items-center justify-between rounded-2xl overflow-hidden sm:px-6'>
        <button
          className='w-12 h-full flex items-center justify-center ml-2'
          onClick={() => setIsMenuOpen(true)}
        >
          <HiMenuAlt2 className='text-2xl text-aliceblue' />
        </button>

        <button
          className='bg-orange-300 px-4 py-2 mr-4 flex items-center gap-x-1.5 rounded-xl'
          onClick={() => navigate(-1)}
        >
          <BiLeftArrowAlt className='text-slate-700 text-lg' />
          <span className='text-slate-700 text-sm font-medium'>Back</span>
        </button>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-3 mt-12 mb-8'>
        {characters.map((char) => (
          <button
            className={`w-12 h-12 flex items-center justify-center rounded-full overflow-hidden transition-all ${
              character === char
                ? "outline-2 outline-slate-800 outline-offset-4 dark:outline-aliceblue/80"
                : ""
            } sm:w-16 sm:h-16`}
            key={char}
            onClick={() => setCharacter(char)}
          >
            <img
              className={`w-full h-full transition-all`}
              src={char}
              alt='character'
            />
          </button>
        ))}
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-col gap-4 sm:flex-row mb-8'>
          <input
            className='bg-slate-400/50 text-slate-800 font-semibold placeholder-slate-800/80 px-4 py-3 border-4 border-slate-600 outline-none rounded-3xl shadow-xl sm:w-1/2'
            type='text'
            value={name}
            placeholder='Enter your name ...'
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className='bg-slate-400/50 text-slate-800 font-semibold placeholder-slate-800/80 px-4 py-3 border-4 border-slate-600 outline-none rounded-3xl shadow-xl sm:w-1/2'
            type='text'
            value={family}
            placeholder='Enter your family ...'
            onChange={(e) => setFamily(e.target.value)}
          />
        </div>

        <div className='flex items-center justify-end gap-x-2'>
          <button
            className='text-slate-600 font-bold w-28 py-2.5 border-[3px] border-slate-600 rounded-2xl dark:text-slate-500'
            onClick={handleLogoutUser}
          >
            Logout
          </button>

          <button
            className='bg-slate-600 text-aliceblue font-bold w-28 py-2.5 border-[3px] border-slate-600 rounded-2xl'
            onClick={handleLoginUser}
          >
            Login
          </button>
        </div>
      </div>

      <Menu isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
    </motion.div>
  );
}
