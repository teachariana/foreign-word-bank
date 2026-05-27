const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Create or open database file
const db = new sqlite3.Database("words.db");

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    english TEXT,
    foreignWord TEXT
  )
`);

// Get all words
app.get("/words", (req, res) => {
  db.all("SELECT * FROM words ORDER BY id DESC", (err, rows) => {
    res.json(rows);
  });
});

// Add a word
app.post("/words", (req, res) => {
  const { english, foreignWord } = req.body;

  db.run(
    "INSERT INTO words (english, foreignWord) VALUES (?, ?)",
    [english, foreignWord],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

// Delete a word
app.delete("/words/:id", (req, res) => {
  db.run("DELETE FROM words WHERE id = ?", req.params.id, () => {
    res.json({ success: true });
  });
});
app.put("/words/:id", (req, res) => {
  const { english, foreignWord } = req.body;

  db.run(
    "UPDATE words SET english = ?, foreignWord = ? WHERE id = ?",
    [english, foreignWord, req.params.id],
    function () {
      res.json({ success: true });
    }
  );
});
// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});