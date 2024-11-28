import React from "react";

import Image from "next/image";

import { Button } from "antd";

import "./TheHeader.css";

const TheHeader = () => {
  return (
    <header className="header ">
      <Image
        src={"/static/FullLogo.svg"}
        alt="Логотип: Simple"
        width={160}
        height={40}
      />

      <nav>
        <Button href="/auth/signUp" type={"primary"}>
          Регистрация
        </Button>

        <Button href="/auth/signIn" type={"text"}>
          Вход
        </Button>
      </nav>
    </header>
  );
};

export default TheHeader;
