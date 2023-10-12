const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

let notes = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuidv4(), 
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes = notes.filter(note => note.id !== noteId);
    res.json({ message: 'Note deleted' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});