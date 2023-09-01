import express from "express";
import userModels from "./user-auth-service/models/index.js";
const app = express();
const port = 5000;
app.use(express.json());

const log = (msg) => console.log(msg); // Corrected the syntax here

app.get("/", (req, res) => {
    res.status(200).send("This server is running successfully");
});

app.post("/", (req, res) => {
    res.status(200).send("This is a POST request to the user");
});

app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
});

log(userModels);
