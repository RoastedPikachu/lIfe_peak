import express from "express";

import cors from "cors";

import bodyParser from "body-parser";

import bcrypt from "bcryptjs";

import db from "./database";

import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const SECRET_KEY =
  "a4b3b679268e4582b61f969c8c62e73959dfcbddeff7fcc25f5016e8ff495cf593b94ee109ea8d9af520a7d5a6fda654206ca7c8080b8b97d735d98803db0b7c5258b1be1231daf53b78b5f59211863336795b9fd9317ece3a0f719bfb63f1e4e2649a85a996ceb65cb6b5ef24a81a88357602629bdc0dec3491d4103856e29d";

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

interface RegisterRequest {
  username: string;
  password: string;
}

app.post("/api/auth/signUp", async (req, res): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Все поля обязательны" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword],
      (err) => {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            res.status(400).json({ error: "Имя пользователя уже занято" });
            return;
          }
          res.status(500).json({ error: "Ошибка сервера" });
          return;
        }
        res
          .status(201)
          .json({ message: "Пользователь успешно зарегистрирован" });
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Ошибка хэширования пароля" });
  }
});

app.post("/api/auth/signIn", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Все поля обязательны" });
    return;
  }

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, row) => {
      if (err) {
        res.status(500).json({ error: "Ошибка сервера" });
        return;
      }

      if (!row) {
        res.status(400).json({ error: "Неверное имя пользователя или пароль" });
        return;
      }

      try {
        const isPasswordValid = await bcrypt.compare(password, row.password);
        if (!isPasswordValid) {
          res
            .status(400)
            .json({ error: "Неверное имя пользователя или пароль" });
          return;
        }

        const token = jwt.sign(
          { id: row.id, username: row.username },
          SECRET_KEY,
          {
            expiresIn: "1h",
          },
        );

        res.status(200).json({ message: "Успешный вход", token });
      } catch (err) {
        res.status(500).json({ error: "Ошибка проверки пароля" });
      }
    },
  );
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
