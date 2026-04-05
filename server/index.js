const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// DB Connection
const dbPath = path.resolve(__dirname, '../data/database.sqlite');
const db = new Database(dbPath);

// Routes
const dossiersRouter = require('./routes/dossiers')(db);
const assuresRouter = require('./routes/assures')(db);
const configRouter = require('./routes/config')(db);

app.use('/api/dossiers', dossiersRouter);
app.use('/api/assures', assuresRouter);
app.use('/api/config', configRouter);

// Serve Static Frontend (Production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
