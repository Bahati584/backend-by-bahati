import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from './routes/userRoutes.js';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const port = process.env.PORT || 8000;


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
