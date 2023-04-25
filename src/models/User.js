import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        data: {
            name: String,
            lastname: String,
            city: String,
            address: String,
            postalCode: String,
            phoneNumber: String,
            profilePhoto: String,
        },
        cart: [],
        purchases: [],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//Creo un metodo estatico en el userSchema para encriptar el password
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword); // compara los dos passwords encriptados y devuelve un booleano
};

export default model("User", userSchema);
