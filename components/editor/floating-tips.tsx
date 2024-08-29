import React, { ReactNode, useEffect, useRef, useState } from "react";
import { type Editor } from "@tiptap/react";
import { EditorView } from "@tiptap/pm/view";
import { minMax } from "@/lib/utils";
import { Kbd } from "@nextui-org/react";
import { posToDOMRect } from "@/lib/utils";
import { min } from "date-fns";
const FloatingTips = ({
  editor,
  children,
  editorRef,
}: {
  editor: Editor;
  children: ReactNode;
  editorRef: React.RefObject<HTMLDivElement>;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [tipsRightPos, setTipsRightPos] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateMenuPosition = () => {
      const from = editor.state.selection.from;
      const to = editor.state.selection.to;

      // const cursor = editor.view.coordsAtPos(from);
      const cords = posToDOMRect(editor.view, from, to);

      setPosition({
        top: cords.top + window.scrollY,
        left: cords.left + window.scrollX,
      });
      setVisible(true);
    };

    editor.on("transaction", updateMenuPosition);
    editor.on("selectionUpdate", updateMenuPosition);

    return () => {
      editor.off("transaction", updateMenuPosition);
      editor.off("selectionUpdate", updateMenuPosition);
    };
  }, [editor, editorRef]);
  const getDifference = () => {
    const rect = ref.current?.getBoundingClientRect();
    const editorRect = editorRef.current?.getBoundingClientRect();
    if (rect && editorRect) {
      const difference = editorRect?.right - rect?.right;
      return Math.min(0, difference);
    }
    return 0;
  };
  if (!visible) return null;

  return (
    <div
      style={{ top: position.top + 30, left: position.left - 35 }}
      className="absolute z-50"
    >
      <div className="relative">
        <div
          className="absolute -top-2 left-7 w-5 h-5 bg-gray-100 rotate-45 rounded full"
          id="diamond-to-point-cursor"
        ></div>
        <div
          ref={ref}
          className="bg-gray-100 px-6 py-2 rounded-2xl flex gap-2 justify-center items-center absolute"
          id="floating-tips"
          style={{
            top: 0,
            left: getDifference() - 20,
          }}
        >
          {children ? (
            <>
              <span className="text-muted-foreground text-sm w-max">
                {children}
              </span>
              <div className="flex gap-1 items-center bg-gray-200  px-3 rounded-2xl">
                <kbd className="text-xs">Tab</kbd>
                <Kbd keys={["tab"]} className="text-lg"></Kbd>
              </div>
              <div className="flex gap-1 items-center bg-gray-200  px-3 py-2 rounded-2xl">
                <kbd className="text-xs">Esc</kbd>
              </div>
            </>
          ) : (
            <>
              <span className="text-muted-foreground text-xs underline">
                Press
              </span>
              <div className="flex gap-1 items-center bg-gray-200  px-3 rounded-2xl">
                <kbd className="text-xs">Tab</kbd>
                <Kbd keys={["tab"]} className="text-lg"></Kbd>
              </div>
              <span className="text-muted-foreground text-xs underline w-max">
                to get AI suggestions.
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingTips;
