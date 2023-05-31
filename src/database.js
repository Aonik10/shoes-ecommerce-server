import mongoose from "mongoose";
import { SECRETS } from "../config.js";

// mongoose
//     .connect("mongodb://127.0.0.1/shoesEcommerce", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then((db) => console.log("Db is connected"))
//     .catch((error) => console.log(error));

mongoose.set("strictQuery", true);

try {
    await mongoose.connect(SECRETS.MONGO_DB_URI, {
        dbName: "shoesEcommerce",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
} catch (error) {
    console.log(error);
}
