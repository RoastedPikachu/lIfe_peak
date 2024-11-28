const Database = require("better-sqlite3");

const db = new Database("./blog.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL
  )
  `,
).run();

db.close();
