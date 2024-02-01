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
    ref: "stop",
  },
  desStop: {
    type: Schema.Types.ObjectId,
    ref: "stop",
  },
  bus: {
    type: Schema.Types.ObjectId,
    ref: "bus",
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "agency",
  },
});
export const Trip = mongoose.model("Trip", tripSchema);
