"use client";
import React from "react";

import { Button, Form, Input } from "antd";

import "./AuthForm.css";

const AuthForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="formWrapper">
      <Form
        layout={"vertical"}
        autoComplete={"off"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="formWrapper-form"
      >
        <h1 className="form-title">Вход</h1>

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
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
