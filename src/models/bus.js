import mongoose, { Schema } from "mongoose";

const busSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  capacity: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "Agency",
  },
});
export const Bus = mongoose.model("Bus", busSchema);
