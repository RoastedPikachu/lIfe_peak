"use client";
import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import axios from "axios";

import { apiPort, getTokenFromLocalStorage } from "@/utils";

import { Button } from "antd";

import TextArea from "antd/es/input/TextArea";

import "./commentsBlock.css";

const CommentsBlock = () => {
  const params = useParams();

  const [comments, setComments] = useState([] as any);

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const getComments = () => {
    axios
      .get(`${apiPort}/articles/${params.articleId}/comments`)
      .then((res) => {
        setComments(res.data);
      });
  };

  const getUsername = () => {
    const token = getTokenFromLocalStorage();

    axios
      .get(`${apiPort}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
      });
  };

  const addComment = () => {
    axios.post(
      `${apiPort}/comments/${params.articleId}`,
      {
        username: username,
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  const formatDate = (startDate: Date) => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const date = new Date(startDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  useEffect(() => {
    getUsername();

    const commentsInterval = setInterval(() => getComments(), 500);

    return () => {
      clearInterval(commentsInterval);
    };
  }, []);
  return (
    <section className="commentsBlock">
      <h2 className="commentsBlock-title">Комментарии:</h2>

      <TextArea
        maxLength={200}
        onChange={(event) => setText(event.target.value)}
        className="commentsBlock-textarea"
      />

      <Button type={"primary"} onClick={addComment} className="mb-[15px]">
        Отправить
      </Button>

      <div className="commentsWrapper">
        {comments.length ? (
          comments.map((comment) => (
            <div key={comment.id} className="commentsWrapper-comment">
              <p className="commentsWrapper-comment-name">{comment.username}</p>

              <p className="commentsWrapper-comment-date">
                {formatDate(comment.createdAt)}
              </p>

              <p className="commentsWrapper-comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default CommentsBlock;
