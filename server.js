require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/auth');

const app = express();
app.use(express.json());

// Offentligt endpoint
app.get('/', (req, res) => res.json({ besked: 'API kører' }));

// Login-route
app.use('/api', authRoutes);

// Beskyttet endpoint — kræver gyldig JWT
app.get('/api/profil', verifyToken, (req, res) => {
  res.json({ bruger: req.user.username, hemmeligData: 'Du er logget ind!' });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server kører på port ${process.env.PORT || 3000}`)
);