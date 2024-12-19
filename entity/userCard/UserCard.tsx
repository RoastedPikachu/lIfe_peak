import React from "react";

import { Avatar } from "antd";

import "./userCard.css";

const UserCard = () => {
  return (
    <div className="userCard">
      <div>
        <Avatar
          size={64}
          src={"/static/UKAvatar.svg"}
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          className="userCard-avatar"
        />

        <p className="userCard-nickname">УК Фиксики Интернешнл</p>
      </div>

      <p className="userCard-description">
        Обеспечиваем комфорт и безопасность жильцов ЖК уже 15 лет.
        Профессиональный подход, быстрое решение проблем, прозрачная отчетность.
        Мы заботимся о ваших домах!
      </p>
    </div>
  );
};

export default UserCard;
