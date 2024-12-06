import React from "react";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";

import TextEditor from "@/entity/textEditor/TextEditor";

const Page = () => {
  return (
    <ContentPageWrapper>
      <main className="my-[50px] px-[60px]">
        <h1 className="text-[2rem] text-left font-bold">Создание статьи</h1>

        <TextEditor />
      </main>
    </ContentPageWrapper>
  );
};

export default Page;
