const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for external CDNs (Tailwind, Google Fonts, etc.)
}));

// Compression middleware
app.use(compression());

// Static files
app.use(express.static('.', {
  maxAge: '1d', // Cache static assets for 1 day
  etag: true
}));

// Routes for all HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'menu.html'));
});

app.get('/our-story', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'our-story.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

app.get('/reservation', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'reservation.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🍽️  MZD Kebap website is running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});