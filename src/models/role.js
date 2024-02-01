import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
    {
        role:{
            type:String,
            required: true
        }
    }
)
export const Role = mongoose.model("Role", roleSchema)