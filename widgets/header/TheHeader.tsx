"use client";
import React, { useEffect, useState } from "react";

import { checkAuthStatus, clearLocalStorage } from "@/utils";

import Image from "next/image";

import { Button } from "antd";

import "./TheHeader.css";

const TheHeader = () => {
  const [isAuthorized, changeIsAuthorized] = useState(false);

  const signOut = () => {
    clearLocalStorage();
  };

  useEffect(() => {
    changeIsAuthorized(checkAuthStatus());
  }, []);
  return (
    <header className="header">
      <Image
        src={"/static/FullLogo.svg"}
        alt="Логотип: Simple"
        width={160}
        height={40}
      />

      <nav>
        {!isAuthorized ? (
          <>
            <Button href="/auth/signUp" type={"primary"}>
              Регистрация
            </Button>

            <Button href="/auth/signIn" type={"text"}>
              Вход
            </Button>
          </>
        ) : (
          <Button href="/auth/signUp" type={"primary"} onClick={signOut}>
            Выйти
          </Button>
        )}
      </nav>
    </header>
  );
};

export default TheHeader;
