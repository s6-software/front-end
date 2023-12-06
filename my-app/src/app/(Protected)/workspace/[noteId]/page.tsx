"use client";
import { useEffect, useRef, useState } from "react";

import EditorJS, { OutputData } from "@editorjs/editorjs";
export default function Home({ params }: any) {
  return (
    <div className="bg-white flex w-full h-view">
      <div className="flex bg-gray-300 w-1/2 mx-auto justify-center">
        <div className="w-full h-screen my-auto overflow-auto">
          <NewEditor />
        </div>
      </div>
    </div>
  );
}

function NewEditor() {
  const [noteTitle, setNoteTitle] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
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
        className="flex w-full text-center text-2xl mt-2 p-4 bg-transparent border border-transparent focus:outline-none focus:ring-0"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <div id="editorjs"></div>
      <button onClick={save}>Save</button>
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

// const EditorComponent = () => {
//   const ejInstance = useRef();
//   const initEditor = () => {
//     const editor = new EditorJS({
//       holder: "editorjs",
//       onReady: () => {
//         ejInstance.current = editor;
//       },
//       autofocus: true,
//       onChange: async () => {
//         let content = await editor.saver.save();
//         console.log(content);
//       },
//       tools: {
//         header: {
//           class: Header,
//           inlineToolbar: ["link"],
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     if (ejInstance.current !== null) {
//       initEditor();
//     }
//     return () => {
//       ejInstance?.current?.destroy();
//       ejInstance.current = null;
//     };
//   }, []);

//   return <div id="editorjs"></div>;
// };
