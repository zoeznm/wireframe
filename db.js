const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users.db'); // 파일 데이터베이스

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)");
});

module.exports = db;
