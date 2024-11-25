import React from "react";

import Image from "next/image";

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
    </header>
  );
};

export default TheHeader;
