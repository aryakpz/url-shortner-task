
import express from 'express';
import urlRoutes from './routes/urlRoutes';  
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';

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
app.use('/user',userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}


am i change the cors when  i use the authentication token  const{data}=useQuery({
        queryKey:['urls'],
        queryFn:async()=>{
            const response =await axios.get("http://localhost:5000/api/dashboard",{
                headers:{
                    'Authorization':`Bearer ${token}`
                 }
              
            })
             return response.data
        }
    })
    console.log("dashboard",data)


like this

const app = express();
const cors=require("cors")
app.use(express.json())
app.use(cors());
app.use(express.json()); 
app.use('/api', urlRoutes);
app.use('/user',userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


