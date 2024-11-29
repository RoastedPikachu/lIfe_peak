import React from "react";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";

import UserCard from "@/entity/userCard/UserCard";

export default function Home() {
  return <ContentPageWrapper>
    <main>
      <aside className="w-[360px] h-[calc(100vh-60px)] border-l-[1px] border-[--color-black]">
        <UserCard/>
      </aside>
    </main>
  </ContentPageWrapper>;
}
