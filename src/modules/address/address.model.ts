import { Schema } from 'mongoose';
import { Mongo } from '../../helpers/mongo';
const addressSchema = new Schema({
    provinceId: { type: String },
    province: { type: String },
    districtId: { type: String },
    district: { type: String },
    warnId: { type: String },
    warn: { type: String }

});

export const AddressSchema = Mongo.model("Address", addressSchema);