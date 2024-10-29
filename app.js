const express = require('express');
const app = express();
const PORT = process.env.PORT || 6969;

// Serve static files from the public directory
app.use(express.static('public'));

// Route to render index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
