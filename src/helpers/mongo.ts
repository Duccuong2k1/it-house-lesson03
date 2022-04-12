import mongoose from "mongoose";
import config from "config";


const mongoUrl = config.get<string>("mongo.url");
const connection = mongoose.createConnection(mongoUrl);

connection.on("connected", () => {
    console.log("Mongoose connected");
});

export const Mongo = connection;