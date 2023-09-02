import express from "express";
import dbconnect from "./mongodb/mongo.js";
import configure from "./user-auth-service/router/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { processRequest } from "./middleware/correlationid.js";
import { expressWinstonLogger, logError } from "./middleware/expressWinston.js";
const app = express();
const port = 5000;
app.use(express.json());
app.use(processRequest)
app.use(expressWinstonLogger)

//db cunneckt
dbconnect()

// all Routers configure
configure(app)

//error handelers
app.use(logError)
app.use(errorHandler)
// app raning
app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
});

