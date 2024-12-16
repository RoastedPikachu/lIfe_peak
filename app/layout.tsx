import type { Metadata } from "next";

import { ConfigProvider } from "antd";

import "./globals.css";

export const metadata: Metadata = {
  title: "Life Peak",
  description: "Life Peak - personal blog for your life complex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#1e1e1e", colorPrimaryHover: "#1e1e1ecc" },
        }}
      >
        <body>{children}</body>
      </ConfigProvider>
    </html>
  );
}
