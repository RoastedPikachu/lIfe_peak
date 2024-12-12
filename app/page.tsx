import React from "react";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";
import ArticlesSection from "@/widgets/articlesSection/ArticlesSection";

import UserCard from "@/entity/userCard/UserCard";

export default function Home() {
  return (
    <ContentPageWrapper>
      <main className="flex items-start gap-x-[60px] px-[calc((100vw-1320px)/2)]">
        <ArticlesSection />

        <aside className="w-[360px] h-[calc(100vh-60px)] border-l-[1px] border-[--color-black]">
          <UserCard />
        </aside>
      </main>
    </ContentPageWrapper>
  );
}
