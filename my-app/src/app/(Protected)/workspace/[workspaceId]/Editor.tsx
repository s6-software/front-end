"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

interface NewEditorProps {
  NoteName: string;
  NoteId: string;
  WorkspaceId: string;
}
const defaultBlocks = [
  {
    id: "cVj8kADSt-",
    type: "header",
    data: {
      text: "Welcome",
      level: 2,
    },
  },
];
export default function NewEditor({
  NoteName,
  NoteId,
  WorkspaceId,
}: NewEditorProps) {
  const { data: session, status } = useSession();
  const [editorData, setEditorData] = useState<OutputData>({
    time: 1701973129871,
    blocks: [],
    version: "2.28.2",
  });
  const [noteTitle, setNoteTitle] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();
  const webSocket = useRef<SocketIOClient.Socket>();

  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      webSocket.current = io("http://localhost:3456", {
        auth: {
          token: session?.user?.email,
        },
      });
      console.log("receiving data from", NoteId, editorData);
      webSocket.current.emit("open-note", WorkspaceId, NoteId);
      webSocket.current.on("opened-note", (product: OutputData) => {
        setInitialize(false);
        setEditorData(product);
      });

      return () => {
        webSocket.current?.disconnect();
      };
    }
  }, [NoteId]);
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
                console.log(outputData);
                setEditorData(outputData);
                webSocket.current?.emit(
                  "update-note",
                  WorkspaceId,
                  NoteId,
                  outputData
                );
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
    if (typeof window !== "undefined" && ref.current) {
      ref.current.isReady
        .then(() => {
          if (ref.current && !initialize) {
            setInitialize(true);
            ref.current.render(editorData);
          }
        })
        .catch((error: any) => {
          console.log("Editor.js is not ready yet", error);
        });
    }
  }, [editorData]);

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
    setNoteTitle(NoteName);
  }, [NoteName]);

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
