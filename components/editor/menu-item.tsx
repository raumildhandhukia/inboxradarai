import "./menu-item.scss";
import "remixicon/fonts/remixicon.css";

import React from "react";

interface Item {
  icon?: string;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
  type?: string;
}

export const MenuItem: React.FC<Item> = ({
  icon,
  title,
  action,
  isActive = null,
}) => (
  <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
  >
    <i className={icon}></i>
  </button>
);
