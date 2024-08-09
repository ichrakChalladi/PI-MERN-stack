const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Remplace body-parser.json()

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

// Gestion des routes non trouvées
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Lancement du serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
