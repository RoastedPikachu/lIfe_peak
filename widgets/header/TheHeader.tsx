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

    changeIsAuthorized(checkAuthStatus());
  };

  useEffect(() => {
    changeIsAuthorized(checkAuthStatus());
  }, []);
  return (
    <header className="header">
      <Image
        src={"/static/FullLogo.svg"}
        alt="Логотип: Life_Peak"
        width={160}
        height={40}
        className="header-logo"
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
          <Button type={"primary"} onClick={signOut}>
            Выйти
          </Button>
        )}
      </nav>
    </header>
  );
};

export default TheHeader;
