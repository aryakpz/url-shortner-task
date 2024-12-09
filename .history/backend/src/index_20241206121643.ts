
import express from 'express';
import urlRoutes from './routes/urlRoutes';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';

const corsOptions = {
    allowedHeaders: ['Authorization'], // Allow 'Authorization' header for token
};
const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST","p"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use('/api', urlRoutes);
app.use('/user', userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


