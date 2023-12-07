"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
export default function NewEditor() {
  // const [editorData, setEditorData] = useState<string | null>();
  const [noteTitle, setNoteTitle] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const Header = (await import("@editorjs/header")).default;
    const Checklist = (await import("@editorjs/checklist")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;
    const List = (await import("@editorjs/list")).default;

    if (typeof window !== "undefined" && !ref.current) {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          image: SimpleImage,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
      });

      ref.current = editor;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (isMounted) {
      init();

      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);

  const save = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          alert("Article data: " + JSON.stringify(outputData));
        })
        .catch((error: any) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <>
      <input
        className="flex w-full font-bold text-center text-3xl mt-2 p-4 bg-transparent border border-transparent focus:outline-none focus:ring-0"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <div id="editorjs"></div>
      <button
        onClick={save}
        className="bg-blue-500 text-white px-6 py-2 rounded-md absolute bottom-2 right-2"
      >
        Save
      </button>
    </>
  );
}
