"use client";
import React, { useState } from "react";

import { Avatar } from "antd";

import { UserOutlined } from "@ant-design/icons";

import "./userCard.css";

const UserCard = () => {
  const [user, setUser] = useState({} as any);

  return (
    <div className="userCard">
      <div>
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          className="userCard-avatar"
        />

        <p className="userCard-nickname">
          {Object.keys(user).length !== 0 ? user.name : "Я утка!"}
        </p>
      </div>

      <p className="userCard-description">
        {Object.keys(user).length !== 0
          ? user.description
          : "Я постоянно крякаю и клацаю по клавишам, очень люблю хлеб."}
      </p>
    </div>
  );
};

export default UserCard;
