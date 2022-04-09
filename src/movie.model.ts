import { Mongo } from './mongo';
import { Schema } from "mongoose";

const movieModel = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    duration:{type:Number,required:true},
    rate:{type:Number,required:true},
    actors:{type:[String],required:true},
    releaseAt:{type:Date,required:true},
    country:{type:String,required:true},
});

export const MovieModel = Mongo.model("Movie", movieModel);

