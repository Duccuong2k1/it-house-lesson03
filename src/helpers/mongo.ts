import mongoose from "mongoose";
import config from "config";


const mongoUri = config.get<string>("mongo.url");
const connection = mongoose.createConnection(mongoUri);

connection.on("connected", () => {
    console.log("Mongoose connected");
});

export const Mongo = connection;