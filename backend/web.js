const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cafe_db'
});

conn.on('error', (err) => {
  console.error('Database error:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('Database connection had a fatal error.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_CLOSE') {
    console.error('Database connection was manually closed.');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.');
  }
  if (err.code === 'ER_AUTHENTICATION_USER_MISMATCH') {
    console.error('Database authentication failed.');
  }
});

app.get('/customer', (req, res) => {
  const sql = 'SELECT * FROM customer';
  
  conn.query(sql, (err, results) => {
    if (err) {
      // It's good practice to handle potential DB errors
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM menu';
  
  conn.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST - Add new product
app.post('/products', (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  
  const { name, price, description } = req.body || {};
  
  if (!name || !price || !description) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      received: req.body,
      required: ['name', 'price', 'description']
    });
  }
  
  const sql = 'INSERT INTO menu (name, price, description) VALUES (?, ?, ?)';
  
  conn.query(sql, [name, price, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Product added successfully', id: result.insertId });
  });
});

// PUT - Update product
app.put('/products/:id', (req, res) => {
  const { name, price, description } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE menu SET name = ?, price = ?, description = ? WHERE id = ?';
  
  conn.query(sql, [name, price, description, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// DELETE - Remove product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM menu WHERE id = ?';
  
  conn.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

app.get('/', (req, res) => {
    res.send('Cafe API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});