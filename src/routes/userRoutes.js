import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    getUsers,
    addToCart,
    createUser,
    getUserCart,
    removeFromCart,
    modifyCartUnits,
    updateUser,
    createPurchase,
    getUserPurchases,
} from "../controllers/userCtrl.js";

const router = Router();

router.get("/", getUsers);

router.post("/create", createUser);

router.put("/update/:id", updateUser);

router.get("/cart", isAuthenticated, getUserCart);

router.post("/addtocart/:id", isAuthenticated, addToCart);

router.put("/modify-cart-units", isAuthenticated, modifyCartUnits);

router.delete("/remove-from-cart", isAuthenticated, removeFromCart);

router.post("/create-purchase", isAuthenticated, createPurchase);

router.get("/purchases", isAuthenticated, getUserPurchases);

export default router;
