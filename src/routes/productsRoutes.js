import { Router } from "express";
import {
    createProduct,
    deleteProductById,
    getMenProducts,
    getProducts,
    getProductsById,
    getWomenProducts,
} from "../controllers/productsCtrl.js";

const router = Router();

router.post("/", createProduct); // only wit the purpose to add products

router.get("/", getProducts); // returns an Array of [{products}]

router.get("/men", getMenProducts);

router.get("/women", getWomenProducts);

router.get("/:id", getProductsById);

router.delete("/:id", deleteProductById);

/*
router.get("/", (req, res) => {
    res.json(database.collections);
});


router.get("/men", (req, res) => {
    let men = database.collections.filter((product) => product.gender == "men");
    res.json(men);
});



router.get("/women", (req, res) => {
    let women = database.collections.filter(
        (product) => product.gender == "women"
    );
    res.json(women);
});

router.get("/:id", isAuthenticated, (req, res) => {
    console.log(req.cookies);
    let data = database.collections;
    res.json(data.filter((product) => product.id == req.params.id)[0]);
});

*/
export default router;
