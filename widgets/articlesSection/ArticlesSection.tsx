"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";

import Article from "@/entity/article/Article";

const ArticlesSection = () => {
  const [articles, setArticles] = useState([] as any);

  const getArticles = () => {
    axios.get("http://localhost:3001/api/articles").then((res) => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <section className="relative mt-[30px] w-[calc(100%-420px)] h-auto">
      {articles.length ? (
        articles.map((article) => (
          <Article key={article.id} article={article} />
        ))
      ) : (
        <></>
      )}
    </section>
  );
};

export default ArticlesSection;
