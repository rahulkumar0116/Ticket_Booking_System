import mongoose, { Schema } from "mongoose";

const tripSchema = new Schema({
  fare: {
    type: Number,
    required: true,
  },
  journeyTime: {
    type: String,
    required: true,
  },
  sourceStop: {
    type: Schema.Types.ObjectId,
    ref: "Stop",
  },
  desStop: {
    type: Schema.Types.ObjectId,
    ref: "Stop",
  },
  bus: {
    type: Schema.Types.ObjectId,
    ref: "Bus",
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "Agency",
  },
});
export const Trip = mongoose.model("Trip", tripSchema);
