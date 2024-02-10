import mongoose, { Schema } from "mongoose";

const stopSchema = new Schema({
  code: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});
export const Stop = mongoose.model("Stop", stopSchema);
