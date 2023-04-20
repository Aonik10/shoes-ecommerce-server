import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    addToCart,
    createUser,
    getUserCart,
    modCartUnitByOne,
    modifyCartUnitByValue,
    removeFromCart,
} from "../controllers/userCtrl.js";

const router = Router();

router.post("/create", createUser);

router.get("/cart", isAuthenticated, getUserCart);

router.post("/addtocart/:id", isAuthenticated, addToCart);

router.put("/modify-cart-unit-by-one", isAuthenticated, modCartUnitByOne);

router.put(
    "/modify-cart-unit-by-value",
    isAuthenticated,
    modifyCartUnitByValue
);

router.delete("/remove-from-cart", removeFromCart);

export default router;
