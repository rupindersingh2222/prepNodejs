const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get('/users', (req, res) => {
  // Query parameters: /users?page=1&limit=10
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  res.json({ page, limit });
});
app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
}); 
