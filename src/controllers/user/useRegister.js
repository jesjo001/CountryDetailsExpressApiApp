import User from "../../models/User";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const registerUser = async(req, res) => {
    console.log("got here")

    if (!req.body) return res.status(400).send("User Email, password, first name, last name is required")

    const { username, first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)){
        res.status(400).send("All input is required");
    }

    // if(!validatePassword(password)) return res.status(400).json({
    //     message: "Password must contains at least 8 character including Small, Uppercase and Special characters"
    // })

    try {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        console.log(oldUser)

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);

    } catch (e) {
        console.log(e)
    }
}


const ValidateInput = ( first_name, last_name, email, password ) => {

    if(first_name === "" ) return res.send("Firstname must contain a value") 
}

const validatePassword = (password) => {
    //Minimum 8 characters
    //One Capital letter and oneSmall letter and a special character
    const regX = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/

    if(password.match(regX)) return true
    else return false
}