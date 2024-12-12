"use client";
import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";

import { EditorState, convertToRaw } from "draft-js";

import { Button } from "antd";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    setContent(rawContent);
  };

  return (
    <div className="mt-[30px] w-full">
      {editorLoaded && (
        <>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            toolbarClassName="rdw-tb-1"
            wrapperClassName="rdw-wrapper-1"
            editorClassName="rdw-editor-1 mt-[20px] px-[16px] border-[1px]"
          />

          <Button type={"primary"} onClick={handleSubmit} className="mt-[20px]">
            Создать
          </Button>

          {content && (
            <pre>
              <code>{JSON.stringify(content, null, 2)}</code>
            </pre>
          )}
        </>
      )}
    </div>
  );
};

export default TextEditor;
