"use client";
import { useEffect, useRef, useState } from "react";

export default function Home({ params }: any) {
  return (
    <div className="bg-white flex w-full h-view">
      <div className="flex bg-gray-100 w-3/5 mx-auto justify-center">
        <div className="w-full h-screen my-auto overflow-y-auto overflow-x-hidden ml-auto">
          <NewEditor />
        </div>
      </div>
    </div>
  );
}

function NewEditor() {
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Checklist = (await import("@editorjs/checklist")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;
    const List = (await import("@editorjs/list")).default;
    if (!ref.current) {
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
      if (editorData) {
        editor.render(editorData);
      }
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
        .then((outputData: OutputData) => {
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

const ReactEditorJS = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  useEffect(() => {
    // Initialize Editor.js
    const editor = new EditorJS({
      // Editor configuration options go here
    });

    // Save the editor instance to the ref
    editorRef.current = editor;

    // Clean up on component unmount
    return () => {
      if (editorRef.current) {
        if (editorRef.current.destroy) {
          editorRef.current.destroy();
        }
      }
    };
  }, []);

  return (
    <div>
      <input
        className="flex w-full text-center text-2xl mt-2 p-4 bg-transparent border border-transparent focus:outline-none focus:ring-0"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <div id="editorjs"></div>
    </div>
  );
};
