import { Router } from "express";
import { login, logout, sendEmailMessage } from "../controllers/authCtrl.js";

const router = Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/send-email", sendEmailMessage);

export default router;
