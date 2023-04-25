import User from "../models/User.js";
import Product from "../models/Product.js";
import { v4 as uuid } from "uuid";

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

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

export const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedUser);
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
        res.status(200).json({ message: "ok" });
    }
};

export const modifyCartUnits = async (req, res) => {
    let { id, size, value } = req.body;
    if (value <= 0 || value >= 100) {
        return res.status(401).json({ message: "invalid value" });
    }
    let report = await modByValue(req.session.user, id, size, value);
    res.status(200).json({
        message: "Update request OK",
        data: report,
    });
};

async function modByValue(user, id, size, value) {
    let report = await User.updateOne(
        {
            username: user,
            cart: {
                $elemMatch: { id: id, size: size },
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
    let user = await User.findOne({ username: req.session.user });
    let newCart = user.cart.filter(
        (item) => item.id !== id || item.size !== size
    );
    user.cart = newCart;
    user.save();
    res.status(200).json(newCart);
}

export async function createPurchase(req, res) {
    // genere un ID de operacion (ver si no se hace solo)
    // guarde los archivos del carrito y los mande a "purchases" del user con el ID generado
    // Deje el carrito vacio
    // Devuelva un mensaje si todo salio bien o algo salio mal (json)

    try {
        let user = await User.findOne({ username: req.session.user });
        if (user.cart.length == 0) throw new Error("Cart is empty");
        let purchase = {
            orderId: uuid(),
            date: new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            }),
            data: await Promise.all(
                [...user.cart].map(async (item) => await buildItemCart(item))
            ),
        };
        user.purchases.push(purchase);
        user.cart = [];
        user.save();
        res.status(200).json({
            message: "Successfully Purchased",
            orderCode: purchase.orderId,
        });
    } catch (err) {
        res.status(202).json({
            message: "Something went wrong",
            error: err,
        });
    }
}

export async function getUserPurchases(req, res) {
    let user = await User.findOne({ username: req.session.user });
    res.status(200).json({ purchases: user.purchases });
}
