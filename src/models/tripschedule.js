import mongoose, { Schema } from "mongoose";
import { Ticket } from "./ticket.js";

const tripScheduleSchema = new Schema({
  tripDate: {
    type: Date,
    required: true,
  },
  availableSeat: {
    type: Number,
    required: true,
  },
  tripDetails: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
  },
});
export const TripSchedule = mongoose.model("TripSchedule", tripScheduleSchema);
