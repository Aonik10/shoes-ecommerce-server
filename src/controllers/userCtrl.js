import User from "../models/User.js";
import Product from "../models/Product.js";
import { response } from "express";

export const createUser = async (req, res) => {
    const { username, password, data } = req.body;
    const newUser = new User({
        username,
        password: await User.encryptPassword(password),
        data,
        cart: [],
    });
    const savedUser = newUser.save();
    res.status(200).json(await savedUser);
};

export const addToCart = async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
        let user = await User.findOne({ username: req.session.user });
        let inCartProduct = user.cart.find(
            (p) => p.id == product._id && p.size == req.body.size
        );
        if (inCartProduct) inCartProduct.units++;
        else
            user.cart.push({
                ...req.body,
                units: 1,
            });
        await user.save();
        res.status(204).json();
    }
};

export const modCartUnitByOne = async (req, res) => {
    let { id, size, value } = req.body;
    let report = await modByOne(req.session.user, id, size, value);
    res.status(200).json({
        message: "Update request OK",
        data: report,
    });
};

export const modifyCartUnitByValue = async (req, res) => {
    let { id, size, value } = req.body;
    let report = await modByValue(req.session.user, id, size, value);
    res.status(200).json({
        message: "Update request OK",
        data: report,
    });
};

async function modByOne(user, id, size, unit) {
    let report = await User.updateOne(
        {
            username: user,
            cart: {
                $elemMatch: { id: id },
                $elemMatch: { size: size },
            },
        },
        { $inc: { "cart.$.units": unit } }
    );
    return report;
}

async function modByValue(user, id, size, value) {
    let report = await User.updateOne(
        {
            username: user,
            cart: {
                $elemMatch: { id: id },
                $elemMatch: { size: size },
            },
        },
        { $set: { "cart.$.units": value } }
    );
    return report;
}

export const getUserCart = async (req, res) => {
    const user = await User.findOne({ username: req.session.user });
    let userCart = await Promise.all(
        user.cart.map(async (item) => await buildItemCart(item))
    );
    res.status(200).json(userCart);
};

async function buildItemCart(item) {
    const product = await Product.findOne({ _id: item.id });
    return {
        id: item.id,
        model: product.model,
        price: product.price,
        img: product.imgs.side,
        units: item.units,
        size: item.size,
    };
}

export async function removeFromCart(req, res) {
    const { id, size } = req.body;
    let user = await User.findOne({ username: "emp10999@gmail.com" });
    let newCart = user.cart.filter(
        (item) => item.id !== id || item.size !== size
    );
    console.log(user.cart);
    user.cart = newCart;
    console.log(user.cart);
    user.save();
    res.status(200).json(newCart);
}
