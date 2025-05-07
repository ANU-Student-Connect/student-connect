import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB:", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectToMongoDB;