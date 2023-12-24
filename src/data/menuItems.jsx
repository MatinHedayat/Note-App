import { FaHistory } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { GrMultiple } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";

export default [
  {
    title: "All Notes",
    icon: <GrMultiple />,
    miniSize: "md",
    size: "xl",
    path: "/",
    type: "link",
  },
  {
    title: "Create Note",
    icon: <CgNotes />,
    miniSize: "md",
    size: "xl",
    path: "/add-note",
    type: "link",
  },
  {
    title: "Bookmarks",
    icon: <IoBookmarks />,
    miniSize: "md",
    size: "xl",
    path: "/bookmarks",
    type: "link",
  },
  {
    title: "Dark Theme",
    icon: <MdOutlineDarkMode />,
    miniSize: "xl",
    size: "2xl",
    path: "",
    type: "",
  },
  ,
  {
    title: "Clear All",
    icon: <MdOutlineDeleteSweep />,
    miniSize: "xl",
    size: "2xl",
    path: "",
    type: "",
  }
];
