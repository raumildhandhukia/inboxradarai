"use client";
import "./styles.scss";
import "./dark.scss";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { MenuBar } from "./menu-bar";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";
import { Toolbar } from "./toolbar";
import FloatingTips from "./floating-tips";
import { TextSelection } from "prosemirror-state";
import { start } from "repl";

interface EditorProps {
  useAI?: boolean;
  setUseAI?: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  expandButton?: boolean;
  handleButtonClick?: () => void;
  placeholderString?: string;
  emailBody?: string;
}

export const Editor: React.FC<EditorProps> = ({
  useAI,
  setUseAI,
  content,
  setContent,
  className,
  expandButton,
  handleButtonClick,
  placeholderString,
  emailBody,
}) => {
  const [floatingText, setFloatingText] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const editorRef = useRef(null);
  const [gettingSuggestions, startTransition] = useTransition();
  const [showFloatingTips, setShowFloatingTips] = useState(false); // State to control floating tips visibility

  const handleUpdate = (content: string) => {
    setContent(content);
  };

  const editor = useEditor({
    onUpdate: (e: any) => {
      handleUpdate(e.editor.getHTML());
    },
    content: content,
    immediatelyRender: false,
    autofocus: false,
    extensions: [
      Document,
      Highlight,
      TaskList,
      TaskItem,
      Paragraph,
      Text,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph") {
            return placeholderString || "Start writing here...";
          }
          return "";
        },
        showOnlyCurrent: true, // Show placeholder in all paragraphs, not just the current one
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none",
      },
    },
  });
  function showFloatingTipComponent(): boolean {
    if (!editor) return false; // Ensure the editor is defined
    if (!editor.view.hasFocus()) return false; // if editor is not focused return false
    const { state } = editor;
    const { doc, selection } = state;
    const { from, to } = selection;
    // Get the total length of the document
    const endOfDocument = doc.content.size - 1;
    // Check if the cursor is at the end of the document
    if (from === endOfDocument && to === endOfDocument) {
      return true;
    }
    // Get the text after the cursor
    const textAfterCursor = doc.textBetween(to, endOfDocument, "", "\n");

    // Check if the text after the cursor consists only of white spaces
    const isOnlyWhiteSpaces = /^\s*$/.test(textAfterCursor);
    return isOnlyWhiteSpaces;
  }

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "Tab" && useAI) {
        event.preventDefault();
        if (
          showFloatingTips &&
          floatingText &&
          editor &&
          showFloatingTipComponent()
        ) {
          const { state, view } = editor;
          const { from } = state.selection;

          // Create a transaction to insert text
          const transaction = state.tr.insertText(floatingText, from);

          // Set cursor position after the inserted content
          const newPos = from + floatingText.length - 2;
          const textSelection = TextSelection.create(transaction.doc, newPos);
          transaction.setSelection(textSelection);

          view.dispatch(transaction);

          setShowFloatingTips(false);
          setFloatingText(null);
        } else if (editor && showFloatingTipComponent()) {
          startTransition(async () => {
            const res = await fetch("/api/ai/autocomplete", {
              method: "POST",
              body: JSON.stringify({
                context: getPlainTextFromHTML(content),
                emailBody: getPlainTextFromHTML(emailBody || ""),
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              const data = await res.text();
              setFloatingText(data);
              setShowFloatingTips(true);
            }
          });
        }
      }
      if (event.key === "Escape") {
        setShowFloatingTips(false);
        setFloatingText(null);
      }
    };

    const editorElement = editorRef.current as HTMLElement | null;
    editorElement?.addEventListener("keydown", handleKeyDown);

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [editor, showFloatingTips, floatingText, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="!max-w-full">
      <div
        className={cn(`editor transition-all  !overflow-x-hidden`, className)}
      >
        {editor && (
          <Toolbar
            useAI={useAI}
            setUseAI={setUseAI}
            editor={editor}
            expandButton={expandButton}
            handleButtonClick={handleButtonClick}
          />
        )}
        <div className="">
          <EditorContent
            ref={editorRef}
            className="editor__content dark:bg-black text-black dark:text-white"
            editor={editor}
          />
        </div>
      </div>
      {useAI && showFloatingTipComponent() && (
        <FloatingTips
          editor={editor}
          editorRef={editorRef}
          gettingSuggestions={gettingSuggestions}
        >
          {floatingText}
        </FloatingTips>
      )}
    </div>
  );
};
const getPlainTextFromHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export default Editor;
