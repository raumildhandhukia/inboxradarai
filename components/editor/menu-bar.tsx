"use client";
import "./menu-bar.scss";

import React, { Fragment } from "react";

import { MenuItem } from "./menu-item";
import { ExpandIcon } from "lucide-react";
import { RiExpandDiagonalFill } from "react-icons/ri";

interface Props {
  editor: any;
  handleButtonClick?: () => void;
  expandButton?: boolean;
}

interface Item {
  icon?: string;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
  type?: string;
}

export const MenuBar: React.FC<Props> = ({
  editor,
  expandButton,
  handleButtonClick,
}) => {
  const items: Item[] = [
    {
      icon: "ri-bold",
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: "ri-italic",
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: "ri-strikethrough",
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: "ri-code-view",
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: "ri-mark-pen-line",
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: "ri-h-1",
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: "ri-h-2",
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    // {
    //   icon: "ri-paragraph",
    //   title: "Paragraph",
    //   action: () => editor.chain().focus().setParagraph().run(),
    //   isActive: () => editor.isActive("paragraph"),
    // },
    {
      icon: "ri-list-unordered",
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: "ri-list-ordered",
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: "ri-list-check-2",
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },

    {
      type: "divider",
    },
    {
      icon: "ri-double-quotes-l",
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: "ri-separator",
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: "divider",
    },
    {
      icon: "ri-text-wrap",
      title: "Hard Break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: "ri-format-clear",
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: "divider",
    },
    // {
    //   icon: "ri-arrow-go-back-line",
    //   title: "Undo",
    //   action: () => editor.chain().focus().undo().run(),
    // },
    // {
    //   icon: "ri-arrow-go-forward-line",
    //   title: "Redo",
    //   action: () => editor.chain().focus().redo().run(),
    // },
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className="divider" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
      {expandButton && handleButtonClick && (
        <button className="ml-auto mr-1" onClick={handleButtonClick}>
          <RiExpandDiagonalFill className="w-5" />
        </button>
      )}
    </div>
  );
};
