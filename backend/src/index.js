const express = require('express');
const cors = require('cors');
require('dotenv').config();

const prisma = require('./prisma');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const taskRoutes = require('./routes/taskRoutes'); // ✅ MOVE HERE

const app = express();

// ✅ Middlewares
app.use(cors({
    origin: "*"
}));
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // ✅ BEFORE listen
app.use(require('./middlewares/errorMiddleware'));

// ✅ Root Route
app.get('/', (req, res) => {
    res.send('Backend API running 🚀');
});

// ✅ Test DB Route
app.get('/test-db', async (req, res) => {
    try {
        const data = await prisma.organization.findMany();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔒 Protected Route
app.get('/protected', authMiddleware, (req, res) => {
    res.json({
        message: "You are authorized 🎉",
        user: req.user
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});