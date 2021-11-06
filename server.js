const express = require('express');
const path = require('path');
const fs = require("fs")

const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {
    let noteNew = req.body;
    noteNew.id = uuidv4();
    let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notesList.push(noteNew);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(notesList));
    res.json(notesList);
});



app.listen(PORT, () => console.log(`App listening on port ${PORT}`));