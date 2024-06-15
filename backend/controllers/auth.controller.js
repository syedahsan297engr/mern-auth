import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const signup = async(req, res) => {
    const { username, email, password } = req.body; //these names in brackets needs to be same as in models
    const hashedPassword = bcryptjs.hashSync(password, 10); //12 is the salt value    
    const newUser = new User({ username, email, password:hashedPassword }); //more salt value more computation
    try {
        await newUser.save(); //added await because save() is an async function, and we need to wait for it to finish
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });       
    }
};