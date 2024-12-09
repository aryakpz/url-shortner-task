
import express from 'express';
import urlRoutes from './routes/urlRoutes';  
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';

const corsOptions = {
    origin: 'const corsOptions = {
  origin: 'http://localhost:3000', // Set this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow 'Authorization' header for token
};', // Set this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'], // Allow 'Authorization' header for token
  };
const app = express();
const cors=require("cors")
app.use(express.json())
app.use(cors(corsOptions));
app.use(express.json()); 
app.use('/api', urlRoutes);
app.use('/user',userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


