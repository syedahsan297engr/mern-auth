import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//I have used the previous uri in the .env file
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Not Connected');
        console.log({error});
    });

app.use('/api/user', userRoutes);