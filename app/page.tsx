import React from "react";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";
import ArticlesSection from "@/widgets/articlesSection/ArticlesSection";

import AuthorBlock from "@/widgets/authorBlock/AuthorBlock";

export default function Home() {
  return (
    <ContentPageWrapper>
      <main className="clientMain">
        <ArticlesSection />

        <AuthorBlock />
      </main>
    </ContentPageWrapper>
  );
}
