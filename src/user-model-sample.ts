import { Mongo } from './mongo';
import { Schema } from 'mongoose';

const UserModel = Mongo.model('User', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    active: { type: Boolean, default: false },
    age: { type: Number, default: 18 },
    foods: { type: [String], default: [] }


}, { timestamps: true }));

// them timestamps de moi khi khoi tao nos se tao ra 2 truong la createdAt va updatedAt

async function run() {
    await UserModel.remove({});

    await UserModel.insertMany([
        { name: "Nguyen Van A", email: "vanA@gmail.com", password: "123123 ", },
        { name: "Ho Van B", email: "vanB@gmail.com ", password: "123456 ", },

    ]);

    const users = await UserModel.find();
    console.log("users", users);

}
export default run;