"use client";
import { use, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import io from "socket.io-client";

interface NewEditorProps {
  initNoteTitle: string;
}

export default function NewEditor({ initNoteTitle }: NewEditorProps) {
  const [editorData, setEditorData] = useState<OutputData | undefined>({
    time: 1701973129871,
    blocks: [
      {
        id: "cVj8kADSt-",
        type: "header",
        data: {
          text: "Welcome",
          level: 2,
        },
      },
      {
        id: "QYre-c6_V4",
        type: "paragraph",
        data: {
          text: "looks like this is your first note. try creating some text or adding images",
        },
      },
      {
        id: "JNWkPfAXJU",
        type: "paragraph",
        data: {
          text: "or try making a todo list",
        },
      },
      {
        id: "cYrzbhjTk3",
        type: "checklist",
        data: {
          items: [
            {
              text: "task 1",
              checked: false,
            },
            {
              text: "task 2",
              checked: false,
            },
            {
              text: "finished task 3",
              checked: true,
            },
          ],
        },
      },
    ],
    version: "2.28.2",
  });
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
        data: editorData,
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
        onChange: () => {
          if (ref.current) {
            ref.current
              .save()
              .then((outputData) => {
                // console.log(outputData)
                // handleInputChange(JSON.stringify(outputData));
              })
              .catch((error: any) => {
                console.log("Saving failed: ", error);
              });
          }
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

  useEffect(() => {
    setNoteTitle(initNoteTitle);
  }, [initNoteTitle]);
  return (
    <>
      <input
        className="flex w-full font-bold text-center text-3xl mt-2 p-4 bg-transparent border border-transparent focus:outline-none focus:ring-0"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <div id="editorjs"></div>
    </>
  );
}
