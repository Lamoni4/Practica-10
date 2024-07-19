const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const db = require('../config/db');

router.get('/users', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.post('/users', async (req, res) => {
    const { username, email, role } = req.body;
    console.log('Request body:', req.body);
    try {
        if (!username || !email || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [result] = await db.promise().query('INSERT INTO users (username, email, role) VALUES (?, ?, ?)', [username, email, role]);
        res.status(201).json({ id: result.insertId, username, email, role });
    } catch (err) {
        console.error('Error:', err); 
        res.status(500).json({ error: err.message });
    }
}),



router.put('/users/:id', upload.single('profilePicture'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        let profilePicture = req.file ? req.file.filename : null;

        await db.promise().query('UPDATE users SET name = ?, email = ?, password = ?, role = ?, profilePicture = ? WHERE id = ?', [name, email, password, role, profilePicture, id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.promise().query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
