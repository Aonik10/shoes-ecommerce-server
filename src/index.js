import app from "./app.js";
import "./database.js";

app.listen(app.get("port"));

console.log(`Server ${app.get("pkg").name} on port ${app.get("port")}`);
