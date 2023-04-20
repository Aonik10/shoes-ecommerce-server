import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import pkg from "../package.json" assert { type: "json" };

// import routes
import productRoutes from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Settings
app.set("pkg", pkg);
app.set("port", 4000);
app.set("case sensitive routing", true);

// Middlewares

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(
    session({
        secret: "password_loco",
        resave: false,
        domain: "localhost",
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use("/api/collections", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
