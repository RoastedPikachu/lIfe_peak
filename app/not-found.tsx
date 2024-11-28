import React from "react";

import GoBackButton from "@/shared/GoBackButton";

import "./notFound.css";

const NotFound = () => {
  return (
    <main>
      <section className="notFoundSection">
        <h1 className="notFoundSection-title">404</h1>

        <p className="notFoundSection-description">
          Упс, похоже данная страница не найдена!
        </p>

        <p className="notFoundSection-explanation">
          Возможно вы неправильно ввели адрес страницы или такая страница не
          существует
        </p>

        <GoBackButton />
      </section>
    </main>
  );
};

export default NotFound;
