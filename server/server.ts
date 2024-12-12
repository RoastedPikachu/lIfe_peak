import express from "express";

import cors from "cors";

import bodyParser from "body-parser";

import bcrypt from "bcryptjs";

import db from "./database";

import { getUsernameFromToken, SECRET_KEY } from "@/utils";

import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;

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

app.post("/api/auth/signIn", (req: any, res: any) => {
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
            expiresIn: "720h",
          },
        );

        res.status(200).json({ message: "Успешный вход", token });
      } catch (err) {
        res.status(500).json({ error: "Ошибка проверки пароля" });
      }
    },
  );
});

app.get("/api/user", (req: any, res: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }

  const token = authHeader.split(" ")[1];
  const username = getUsernameFromToken(token);

  if (!username) {
    return res.status(401).json({ error: "Неверный или истёкший токен" });
  }

  res.status(200).json({ username });
});

app.post("/api/articles", (req: any, res: any) => {
  const { title, content } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO articles (title, content) VALUES (?, ?)",
    );

    const result = stmt.run(title, content) as any;

    const article = db
      .prepare("SELECT * FROM articles WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: "Невозможно создать статью" });
  }
});

app.get("/api/articles", (req: any, res: any) => {
  db.all("SELECT * FROM articles", [], (err, rows) => {
    if (err) {
      console.error("Ошибка при выполнении запроса:", err.message);

      res.status(500).json({ error: "Невозможно получить статьи" });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get("/api/articles/:id", (req: any, res: any) => {
  const articleId = req.params.id;

  db.get("SELECT * FROM articles WHERE id = ?", [articleId], (err, row) => {
    if (err) {
      console.error("Ошибка при выполнении запроса:", err.message);

      res.status(500).json({ error: "Невозможно получить статью" });
    } else if (!row) {
      res.status(404).json({ error: "Статья не найдена" });
    } else {
      res.status(200).json(row);
    }
  });
});

app.post("/api/comments/:articleId", (req: any, res: any) => {
  const articleId = parseInt(req.params.articleId, 10);

  const { text, username } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO comments (text, username, articleId) VALUES (?, ?, ?)",
    );

    const result = stmt.run(text, username, articleId) as any;

    const comment = db
      .prepare("SELECT * FROM comments WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: "Невозможно создать комментарий" });
  }
});

app.get("/api/articles/:articleId/comments", (req: any, res: any) => {
  const articleId = parseInt(req.params.articleId, 10);

  try {
    db.all(
      "SELECT * FROM comments WHERE articleId = ?",
      [articleId],
      (err, rows) => {
        if (err) {
          console.error("Ошибка при выполнении запроса:", err.message);

          res.status(500).json({ error: "Невозможно получить статьи" });
        } else {
          res.status(200).json(rows);
        }
      },
    );
  } catch (error) {
    res.status(500).json({ error: "Невозможно получить комментарии" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
