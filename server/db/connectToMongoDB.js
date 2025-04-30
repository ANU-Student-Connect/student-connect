import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const con1 = await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB:", con1.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectToMongoDB;