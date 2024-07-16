import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({
        message: "API is working",
    });
};

export const updateUser = async (request, res, next) => {
    //if the user is actual owner of this account then only he can update the data
    if (request.user.id !== request.params.id) { //this params is that specified in route :id
        //return response.status(403).json("You are not allowed to update this account");
        return next(errorHandler(403, "You are not allowed to update this account"));
    }
    //if user is owner then update the data
    try {
        //now for update some user may update single entry some update all so handle that accordingly, also there will be some handling on client side as well
        if (request.body.password) {
            request.body.password = bcryptjs.hashSync(request.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set: {
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                profilePicture: request.body.profilePicture,
            } //this $set is used to update only the fields that are passed
        },
        { new: true} //this will return the updated data  
    );
    //we don't wanna send password
    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);  

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (request, res, next) => {
    //if the user is actual owner of this account then only he can delete the data
    if (request.user.id !== request.params.id) { //this params is that specified in route :id
        //return response.status(403).json("You are not allowed to delete this account");
        return next(errorHandler(403, "You are not allowed to delete this account"));
    }
    try {
        await User.findByIdAndDelete(request.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
};
