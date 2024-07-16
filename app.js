const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 8060;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 사용자를 추가하는 엔드포인트
app.post('/add_user', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const stmt = db.prepare("INSERT INTO user (name, email) VALUES (?, ?)");
  stmt.run(name, email, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "User added successfully", userId: this.lastID });
  });
  stmt.finalize();
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
