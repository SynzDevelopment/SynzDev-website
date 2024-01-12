const express = require('express');
const app = express();
const port = 5028;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Define a route for the root ("/")
app.get('/', (req, res) => {
  res.render('index', { message: 'Hello, this is the root route!' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { message: 'Hello, this is the root route!' });
});

app.get('/mira', (req, res) => {
  res.render('mira', { message: 'Hello, this is the root route!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});