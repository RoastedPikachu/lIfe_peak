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

        <p className="userCard-nickname">Борис Карабут</p>
      </div>

      <p className="userCard-description">
        Студент, middle frontend разработчик, а также геймер. Здесь вы найдете
        статьи о веб-разработке, моем игровом опыте и размышлениях на стыке этих
        сфер.
      </p>
    </div>
  );
};

export default UserCard;
