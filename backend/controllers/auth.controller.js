import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => { //next added for dealing with middleware
    const { username, email, password } = req.body; //these names in brackets needs to be same as in models
    const hashedPassword = bcryptjs.hashSync(password, 10); //12 is the salt value    
    const newUser = new User({ username, email, password:hashedPassword }); //more salt value more computation
    try {
        await newUser.save(); //added await because save() is an async function, and we need to wait for it to finish
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);    
        //next(errorHandler(300, 'Custom Error')); //customized error    
    }
};

export const signin = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({  email });
        if (!user) {
            throw next(errorHandler(404, 'User not found'));
        }   
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw next(errorHandler(401, 'Invalid password'));
        }   
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
        //now u have token and can send it to the client through cookie or header
        //dont sent password to client
        const {password :hashedPassword, ...rest} = user._doc; //destructuring
        res.cookie('access_token', token, { httpOnly: true , expires: new Date(Date.now() + 3600000)})
           .status(200)
           .json(rest);  //sending rest of the user data (password excluded)
        //httpOnly means it can't be accessed by third party scripts  
    }
    catch (error) {
        next(error);
    }
}