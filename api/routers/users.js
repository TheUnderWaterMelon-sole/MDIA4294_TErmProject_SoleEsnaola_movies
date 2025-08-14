// Route: api/routers/users.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../db');

const usersRouter = express.Router();

// Secret key for JWT (store this securely in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Sign-up route
usersRouter.post(
  '/',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // if express-validator returns errors, stop running the route handler and send an error response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert the new user into the database
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('SQL Error:', err.code, err.sqlMessage, err.sql);
        return res.status(500).json({
          message: 'Database error',
          error: err.code,
          sqlMessage: err.sqlMessage,
          sql: err.sql,
        });
      }

      //Send successful response
      res
        .status(201)
        .json({
          message: 'user registered successfully',
          userId: result.insertId,
        });
    });
  }
);

// Sign in route
usersRouter.post(
  '/sign-in',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    // Note that SELECT always returns an array of objects, even if we're only requiesting one record
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [userRecord] = await db.promise().query(sql, [email]);

    if (userRecord.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userRecord[0];

    // compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token to the client
    res.json({ message: 'Login successful', token: token });
  }
);

module.exports = usersRouter;
