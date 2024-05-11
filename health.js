const express = require('express');

const app = express();
const PORT = 8000;

app.get('/health', (req, res) => {
  res.send();
});

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});