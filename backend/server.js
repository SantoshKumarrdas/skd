require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

connectDB(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/results', require('./routes/results'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
