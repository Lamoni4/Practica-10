const db = require('../config/db.js');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results[0]);
    }
  });
};

exports.createUser = (req, res) => {
  const { username, email, role } = req.body;
  db.query('INSERT INTO users (username, email, role) VALUES (?, ?, ?)', [username, email, role], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, username, email, role });
    }
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  db.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?', [username, email, role, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, username, email, role });
    }
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'User deleted' });
    }
  });
};
