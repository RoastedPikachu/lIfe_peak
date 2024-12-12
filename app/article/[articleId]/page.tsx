"use client";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import axios from "axios";

import { apiPort } from "@/utils";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";

const Page = () => {
  const params = useParams();

  const [article, setArticle] = useState({} as any);

  const [content, setContent] = useState("");

  const getArticle = () => {
    axios.get(`${apiPort}/articles/${params.articleId}`).then((res) => {
      setArticle(res.data);
    });
  };

  useEffect(() => {
    getArticle();
  }, []);
  return (
    <ContentPageWrapper>
      <main className="clientMain">
        <h1 className="">
          {Object.keys(article as Object).length
            ? article.title
            : "Заголовок статьи"}
        </h1>

        <p>
          {Object.keys(article as Object).length
            ? content
            : "Содержимое статьи"}
        </p>
      </main>
    </ContentPageWrapper>
  );
};

export default Page;
