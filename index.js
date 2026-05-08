const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/db.js');
const authRoutes = require('./routes/auth.route.js');
const taskRoutes = require('./routes/taskCrud.route.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

dbConnect();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"]
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});