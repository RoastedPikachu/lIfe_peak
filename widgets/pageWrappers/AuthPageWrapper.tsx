import React from "react";

import TheHeader from "@/widgets/header/TheHeader";

import AuthForm from "@/feature/authForm/AuthForm";

const AuthPageWrapper = () => {
  return (
    <>
      <TheHeader />

      <AuthForm />
    </>
  );
};

export default AuthPageWrapper;
