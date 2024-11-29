"use client";
import React, {useState} from 'react';

import "./article.css";

const Article = () => {
    const [article, setArticle] = useState({});

    const getTodayDate = () => {
        const today = new Date();
        const day = today.getDate();
        const monthIndex = today.getMonth();
        const months = ["янв.", "фев.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сен.", "окт.", "нояб.", "дек."];
        const monthName = months[monthIndex];

        return `${day} ${monthName}`;
    }
    return (
        <div className="article">
            <p className="article-title">{Object.keys(article).length !== 0 ? article.title : "Заголовок статьи"}</p>

            <p className="article-text">{Object.keys(article).length !== 0 ? `${article.text.slice(0, 100)}…` : "Очень интересный и длинный текст статьи"}</p>

            <p className="article-date">{Object.keys(article).length !== 0 ? article.createdAt : getTodayDate()}</p>
        </div>
    );
};

export default Article;