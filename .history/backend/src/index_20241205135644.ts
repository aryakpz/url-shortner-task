
import express from 'express';
import urlRoutes from './routes/urlRoutes';  
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';

const app = express();
const cors=require("cors")
app.use(express.json())
app.use(cors());
app.use(express.json()); 
app.use('/api', urlRoutes);
app.use('')
app.use('/user',userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


