const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { poolPromise, sql } = require('./config/dbconfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/testdb', async ( res) => {
	try {
		alert('testdb endpoint hit');
		const pool = await poolPromise;
		if (!pool) {
			return res.status(503).json({ error: 'Database service unavailable' });
		}
		const result = await pool.request().query('SELECT 1 AS number');
		res.json(result.recordset);
	} catch (err) {
		console.error('DB test error', err);
		res.status(500).json({ error: 'DB error', details: err.message });
	}
});

app.post('/api/auth/register', async (req, res) => {
	const { username, email, phone, password } = req.body;
	if (!username || !email || !phone || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	try {
		const hashed = await bcrypt.hash(password, 10);
		const pool = await poolPromise;

		if (!pool) {
			return res.status(503).json({ message: 'Database service unavailable' });
		}

		const insertQuery = `INSERT INTO Users (username, email, phone, password) VALUES (@username, @email, @phone, @password)`;

		await pool.request()
			.input('username', sql.VarChar(100), username)
			.input('email', sql.VarChar(255), email)
			.input('phone', sql.VarChar(20), phone)
			.input('password', sql.VarChar(255), hashed)
			.query(insertQuery);

		res.status(201).json({ message: 'User registered' });
	} catch (err) {
		console.error('Registration error', err);
		res.status(500).json({ message: 'Registration failed', error: err.message });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
