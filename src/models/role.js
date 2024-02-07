import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
    {
        name: String,
        permissions: [String]
    }
)
export const Role = mongoose.model("Role", roleSchema)
