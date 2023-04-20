import User from "../models/User.js";

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
