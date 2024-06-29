import jwt from "jsonwebtoken"; //importing jwt to verify the token
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; //we have named this access_token see auth.controller.js for more info on this, also add cookieparser to your application
    if (!token) return next(errorHandler(401, 'Access Denied! You are not authenticated'))  //if token is not present then return this message
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { //verifying the token
        if (err) return next(errorHandler(403, 'Token is not valid')); //if token is invalid then return this message
        req.user = user; //if token is valid then user is set to req.user
        next(); //calling the next middleware -> means that in routes you passed updateUser here that will be called implementation for this will be in controllers
    });
};