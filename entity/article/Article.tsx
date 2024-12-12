"use client";
import React, { useState } from "react";

import "./article.css";
import Link from "next/link";

const Article: React.FC<{ article: any }> = ({ article }) => {
  const formatDate = () => {
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

    const date = new Date(article.createdAt);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  const getShortArticleContent = () => {
    const string = article.content;

    const pipeIndex = string.indexOf("|");

    if (pipeIndex === -1) {
      return string;
    }
    return string.substring(0, pipeIndex);
  };
  return (
    <Link href={`/article/${article.id}`}>
      <div className="article">
        <p className="article-title">
          {Object.keys(article).length !== 0
            ? article.title
            : "Заголовок статьи"}
        </p>

        <p className="article-text">
          {Object.keys(article).length !== 0
            ? `${getShortArticleContent()}…`
            : "Очень интересный и длинный текст статьи"}
        </p>

        <p className="article-date">
          {Object.keys(article).length !== 0 ? formatDate() : "Дата неизвестна"}
        </p>
      </div>
    </Link>
  );
};

export default Article;
