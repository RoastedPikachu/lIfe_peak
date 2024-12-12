import React from "react";

import UserCard from "@/entity/userCard/UserCard";

import "./authorBlock.css";

const AuthorBlock = () => {
  return (
    <>
      <div className="mobileAuthorBlock">
        <UserCard />
      </div>

      <aside className="authorBlock">
        <UserCard />
      </aside>
    </>
  );
};

export default AuthorBlock;
