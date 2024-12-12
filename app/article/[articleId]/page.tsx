import React from "react";

import ContentPageWrapper from "@/widgets/pageWrappers/ContentPageWrapper";
import ArticleContent from "@/widgets/articleContent/ArticleContent";

const Page = () => {
  return (
    <ContentPageWrapper>
      <main className="clientMain !block">
        <ArticleContent />
      </main>
    </ContentPageWrapper>
  );
};

export default Page;
