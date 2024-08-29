import React from "react";
import classNames from "classnames";
import { Editor } from "@tiptap/react";
import { useInView } from "react-cool-inview";
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiEmotionLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
  RiListOrdered,
  RiListUnordered,
  RiCodeBoxLine,
  RiLink,
  RiLinkUnlink,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiFormatClear,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiExpandDiagonalFill,
} from "react-icons/ri";

// import { setLink } from "../helpers";

import "./Toolbar.scss";
import { Bot, BotOff } from "lucide-react";

type ToolbarProps = {
  editor: Editor;
  expandButton?: boolean;
  handleButtonClick?: () => void;
  setUseAI?: () => void;
  useAI?: boolean;
};

function Toolbar({
  editor,
  expandButton,
  handleButtonClick,
  setUseAI,
  useAI,
}: ToolbarProps) {
  const isCursorOverLink = editor.getAttributes("link").href;

  const { observe, inView } = useInView({
    rootMargin: "-1px 0px 0px 0px",
    threshold: [1],
  });

  return (
    <div
      className={classNames("ToolbarContainer", { sticky: !inView })}
      ref={observe}
    >
      <div className="relative">
        <div className="Toolbar">
          <div
            className="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <RiBold />
          </div>
          <div
            className="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <RiItalic />
          </div>
          <div
            className="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <RiStrikethrough />
          </div>
          <div
            className="icon"
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <RiCodeSSlashLine />
          </div>

          <div className="divider"></div>
          <div
            className="icon"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <RiTextWrap />
          </div>
          <div
            className="icon"
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
          >
            <RiFormatClear />
          </div>
          <div className="divider"></div>
          <div
            className="icon"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <RiArrowGoBackLine />
          </div>
          <div
            className="icon"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <RiArrowGoForwardLine />
          </div>

          {expandButton && handleButtonClick && (
            <>
              <div className="divider"></div>
              <button className="" onClick={handleButtonClick}>
                <RiExpandDiagonalFill className="text-black" />
              </button>
            </>
          )}

          {setUseAI && (
            <>
              <div className="divider"></div>
              <div>
                <button className="text-black" onClick={setUseAI}>
                  {useAI ? <Bot /> : <BotOff />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { Toolbar };
