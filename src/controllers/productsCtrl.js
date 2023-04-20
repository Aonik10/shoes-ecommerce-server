import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    const { model, gender, price, rating, stock, imgs } = req.body;
    const newProduct = new Product({
        model,
        gender,
        price,
        rating,
        stock,
        imgs,
    });
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

export const getProductsById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
};

export const getMenProducts = async (req, res) => {
    const menProducts = await Product.find({ gender: "men" });
    res.status(200).json(menProducts);
};

export const getWomenProducts = async (req, res) => {
    const womenProducts = await Product.find({ gender: "women" });
    res.status(200).json(womenProducts);
};

//admin

export const deleteProductById = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
};

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // new: true es para que devuelva los datos actualizados, sino por defecto retorna los datos viejos (los que fueron reemplazados digamos
    );
    res.status(200).json(updatedProduct);
};
