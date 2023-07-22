// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const data = require('./data');

// Use body parser to get data from POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(data.comments);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = data.comments[id];
  if (comment) {
    res.json(comment);
  } else {
    res.json({ error: 'Comment doesn\'t exist' });
  }
});

// POST /comments
app.post('/comments', (req, res) => {
  const comment = req.body;
  const id = data.comments.length;
  data.comments.push(comment);
  res.json(id);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  if (data.comments[id]) {
    data.comments[id] = comment;
    res.json(id);
  } else {
    res.json({ error: 'Comment doesn\'t exist' });
  }
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  if (data.comments[id]) {
    data.comments.splice(id, 1);
    res.json(id);
  } else {
    res.json({ error: 'Comment doesn\'t exist' });
  }
});

// Start server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});