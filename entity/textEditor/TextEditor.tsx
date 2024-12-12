"use client";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

import { EditorState, convertToRaw } from "draft-js";

import { Button, Input } from "antd";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const TextEditor = () => {
  const router = useRouter();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [content, setContent] = useState({} as any);

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const getTokenFromLocalStorage = () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Ошибка при получении токена из localStorage:", error);

      return null;
    }
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState) as string;

    setContent(rawContent);
  };

  useEffect(() => {
    console.table(content.blocks);
  }, [content]);

  useEffect(() => {
    setEditorLoaded(true);

    const token = getTokenFromLocalStorage();

    if (
      token !==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzM0MDA3NDUwLCJleHAiOjE3MzQwMTEwNTB9.o0OYIVl7F_fwJinP8IgM_udWtIYvYGCKMREFgewOwR8"
    ) {
      router.push("/");
    }
  }, []);
  return (
    <div className="mt-[30px] w-full">
      <Input />

      {editorLoaded && (
        <>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            toolbarClassName="rdw-tb-1"
            wrapperClassName="rdw-wrapper-1"
            editorClassName="rdw-editor-1 mt-[20px] px-[16px] max-w-[900px] border-[1px]"
          />

          <Button type={"primary"} onClick={handleSubmit} className="mt-[20px]">
            Создать
          </Button>
        </>
      )}
    </div>
  );
};

export default TextEditor;
