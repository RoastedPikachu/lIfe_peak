"use client";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import axios from "axios";

import { apiPort } from "@/utils";

import CommentsBlock from "@/widgets/commentsBlock/CommentsBlock";

import "./articleContent.css";

const ArticleContent = () => {
  const params = useParams();

  const [article, setArticle] = useState({} as any);

  const [content, setContent] = useState("");

  const getArticle = () => {
    axios.get(`${apiPort}/articles/${params.articleId}`).then((res) => {
      setArticle(res.data);

      setContent(replacePipesWithNewlines(res.data.content));
    });
  };

  const replacePipesWithNewlines = (inputString: string) => {
    return inputString.replace(/\|/g, "\n");
  };

  useEffect(() => {
    getArticle();
  }, []);
  return (
    <>
      <section className="articleContent">
        <h1 className="articleContent-title">
          {Object.keys(article as Object).length
            ? article.title
            : "Заголовок статьи"}
        </h1>

        <p className="articleContent-text">
          {Object.keys(article as Object).length
            ? content
            : "Содержимое статьи"}
        </p>
      </section>

      <CommentsBlock />
    </>
  );
};

export default ArticleContent;
