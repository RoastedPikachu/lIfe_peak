"use client";
import React from "react";

import { Button } from "antd";

const GoBackButton = () => {
  return (
    <Button
      type={"primary"}
      onClick={() => window.history.back()}
      className="notFoundSection-button"
    >
      Хочу обратно
    </Button>
  );
};

export default GoBackButton;
