import React from "react";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";

import Article from "@/entity/article/Article";
import UserCard from "@/entity/userCard/UserCard";

export default function Home() {
  return <ContentPageWrapper>
    <main className="flex items-start gap-x-[60px] px-[60px]">
      <section className="relative mt-[30px] w-[calc(100%-420px)] h-auto">
        <Article/>
      </section>

      <aside className="w-[360px] h-[calc(100vh-60px)] border-l-[1px] border-[--color-black]">
        <UserCard/>
      </aside>
    </main>
  </ContentPageWrapper>;
}
