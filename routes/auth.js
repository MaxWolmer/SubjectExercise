const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Demo-bruger (brug en rigtig database i produktion)
// Hash er genereret fra adgangskoden "kode123"
const bruger = {
  username: 'max',
  passwordHash: '$2b$10$3aYF1OODbNDZNZZHKLXyI.wsQ1AlX3.Rg3Za3WzGErccqNjJWk.FW'
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== bruger.username) {
    return res.status(401).json({ fejl: 'Forkert brugernavn' });
  }

  const ok = await bcrypt.compare(password, bruger.passwordHash);
  if (!ok) return res.status(401).json({ fejl: 'Forkert adgangskode' });

  // ✅ Udsted JWT
  const token = jwt.sign(
    { username: bruger.username, rolle: 'bruger' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;   // ← denne linje ER vigtigst — uden den crasjer serveren!