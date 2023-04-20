// Modelo de dato para Products

import { Schema, model } from "mongoose";

// Dentro de Schema vamos a especificar lo que queremos que se guarde en la base de datos
const productSchema = new Schema(
    {
        model: String,
        gender: String,
        price: Number,
        rating: Number,
        stock: Object,
        imgs: Object,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Product", productSchema); // exportamos el modelo con el nombre "Product" basado en el productSchema escrito arriba
