import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(express.json());

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
app.use('/api/auth', authRoutes);


//adding the middleware to handle the errors
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})
//passing next(error) in the catch block will run this middleware and error is shown