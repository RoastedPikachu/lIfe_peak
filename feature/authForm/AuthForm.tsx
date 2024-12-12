"use client";
import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import axios from "axios";

import { Button, Form, Input } from "antd";

import "./AuthForm.css";

const AuthForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [message, setMessage] = useState("");

  const handleRegister = async (username, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signUp",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setMessage(response.data.message);

      router.push("/auth/signIn");
    } catch (error) {
      console.error("Ошибка регистрации:", error);

      setMessage(error.response?.data?.message || "Произошла ошибка!");
    }
  };

  const handleLogin = async (username, password: string) => {
    try {
      axios
        .post(
          "http://localhost:3001/api/auth/signIn",
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((res) => {
          setMessage(res.data.message);

          if (res.data.message === "Успешный вход") {
            localStorage.setItem("token", res.data.token);

            router.push("/");
          }
        });
    } catch (error) {
      console.error("Ошибка входа:", error);

      setMessage(error.response?.data?.message || "Произошла ошибка!");
    }
  };

  const onFinish = (values) => {
    if (pathname.includes("signIn")) {
      handleLogin(values.username, values.password);
    } else {
      handleRegister(values.username, values.password);
    }
  };

  return (
    <div className="formWrapper">
      <Form
        layout={"vertical"}
        autoComplete={"off"}
        onFinish={onFinish}
        className="formWrapper-form"
      >
        <h1 className="form-title">
          {pathname.includes("signUp") ? "Регистрация" : "Вход"}
        </h1>

        <Form.Item
          label="Никнейм"
          name="username"
          rules={[{ required: true, message: "Пожалуйста введите никнейм!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="form-button">
            {pathname.includes("signUp") ? "Зарегестрироваться" : "Войти"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
