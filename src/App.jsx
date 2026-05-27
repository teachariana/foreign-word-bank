import { useEffect, useState } from "react";

const API = "http://localhost:3001/words";

export default function App() {
  const [words, setWords] = useState([]);
  const [english, setEnglish] = useState("");
  const [foreign, setForeign] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
const [editEnglish, setEditEnglish] = useState("");
const [editForeign, setEditForeign] = useState("");

  // Load words from database
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setWords);
  }, []);

  // Add word
  async function addWord() {
    if (!english || !foreign) return;

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        english,
        foreignWord: foreign,
      }),
    });

    const data = await res.json();

    setWords([
      { id: data.id, english, foreignWord: foreign },
      ...words,
    ]);

    setEnglish("");
    setForeign("");
  }

  // Delete word
  async function deleteWord(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });

    setWords(words.filter((w) => w.id !== id));
  }
  function startEdit(word) {
  setEditingId(word.id);
  setEditEnglish(word.english);
  setEditForeign(word.foreignWord);
}

async function saveEdit(id) {
  await fetch(`http://localhost:3001/words/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      english: editEnglish,
      foreignWord: editForeign,
    }),
  });

  setWords(
    words.map((w) =>
      w.id === id
        ? { ...w, english: editEnglish, foreignWord: editForeign }
        : w
    )
  );

  setEditingId(null);
}

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Foreign Language Word Bank (Database)</h1>
<input
  placeholder="Search words..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ marginBottom: 20, display: "block" }}
/>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="English word"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />

        <input
          placeholder="Foreign word"
          value={foreign}
          onChange={(e) => setForeign(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        <button onClick={addWord} style={{ marginLeft: 10 }}>
          Add
        </button>
      </div>

      <ul>
      {words
  .filter((word) => {
    const term = search.toLowerCase();

    return (
      word.english.toLowerCase().includes(term) ||
      word.foreignWord.toLowerCase().includes(term)
    );
  })
  .map((word) => (
          <li key={word.id}>
  {editingId === word.id ? (
    <>
      <input
        value={editEnglish}
        onChange={(e) => setEditEnglish(e.target.value)}
      />
      <input
        value={editForeign}
        onChange={(e) => setEditForeign(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <button onClick={() => saveEdit(word.id)}>Save</button>
      <button onClick={() => setEditingId(null)}>Cancel</button>
    </>
  ) : (
    <>
      <strong>{word.english}</strong> → {word.foreignWord}

      <button
        onClick={() => startEdit(word)}
        style={{ marginLeft: 10 }}
      >
        Edit
      </button>

      <button
        onClick={() => deleteWord(word.id)}
        style={{ marginLeft: 10 }}
      >
        Delete
      </button>
    </>
  )}
</li>
        ))}
      </ul>
    </div>
  );
}