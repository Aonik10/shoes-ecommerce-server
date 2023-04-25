import User from "../models/User.js";
import { transporter } from "./resources/emailTransporter.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (!userFound)
        return res
            .status(401)
            .json({ status: "Error", message: "User not found" });

    const matchPassword = await User.comparePassword(
        password,
        userFound.password
    );

    if (!matchPassword)
        return res.status(401).json({
            status: "Error",
            message: "Invalid Password",
        });

    req.session.regenerate((err) => {
        if (err) next(err);
        req.session.user = userFound.username;
        req.session.save((err) => {
            if (err) return next(err);
            res.json({
                status: "Success",
                message: "Correct",
                data: userFound.data,
            });
        });
    });
};

export const logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "Logged out succesfully" });
};

export const sendEmailMessage = (req, res) => {
    let mailOptions = {
        from: "emp10999@gmail.com",
        to: "emp10999@gmail.com",
        subject: `Ecommerce-shoes project email from ${req.body.name}`,
        text: `${req.body.email} writed:\n\n ${req.body.message}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json({ message: "An error ocurred", error: error });
        } else {
            res.status(200).json({
                message: "Email sent successfully",
                info: info.response,
            });
        }
    });
};
