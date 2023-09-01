import express from "express";
import dbconnect from "./mongodb/mongo.js";
import configure from "./user-auth-service/router/index.js";
const app = express();
const port = 5000;
app.use(express.json());

//db cunneckt
dbconnect()

// all Routers configure
configure(app)


// app raning
app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
});

