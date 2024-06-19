import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FaStar } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";

import { BsPeopleFill } from "react-icons/bs";

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/raumildhandhukia",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/raumild/",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://www.x.com/RaumilDhandhuk2",
  },
];

export const sidebarItems = [
  { id: 1, icon: <IconHome size={20} />, text: "Primary" },
  { id: 2, icon: <FaStar size={20} />, text: "Promotions" },
  { id: 3, icon: <BsPeopleFill size={20} />, text: "Social" },
  { id: 4, icon: <MdOutlineUpdate size={20} />, text: "Updates" },
];
