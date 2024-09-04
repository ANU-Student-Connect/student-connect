import express from "express";
import db from "../db/connection.js";
const router = express.Router();

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";
router.get("/dbconnect", function(req, res, next) {
    res.send(databaseConnection);
});

export default router;