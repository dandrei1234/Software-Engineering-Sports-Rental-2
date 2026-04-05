const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();

app.use(cors({
    origin: 'https://positivistic-carline-superblessed.ngrok-free.dev', 
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

try {
    // ROUTES FIXED: Removed '/api' from the require path
    const userRoutes = require('./users/userRoutes'); 
    userRoutes.setPool(database.pool);
    app.use('/api/users', userRoutes);

    const equipmentRoutes = require('./equipment/equipmentRoutes');
    equipmentRoutes.setPool(database.pool);
    app.use('/api/equipment', equipmentRoutes);

    const rentalRoutes = require('./rentals/rentalRoutes'); 
    rentalRoutes.setPool(database.pool);
    app.use('/api/rentals', rentalRoutes);
    
    console.log("✅ Routes loaded successfully");
} catch (err) {
    console.error("❌ FAILED TO LOAD ROUTES:", err.message);
}

const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});