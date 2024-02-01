import mongoose, { Schema } from "mongoose";
import { Ticket } from "./ticket.js";

const tripScheduleSchema = new Schema({
  tripDate: {
    type: String,
    required: true,
  },
  availableSeat: {
    type: Number,
    required: true,
  },
  tripDetails: {
    type: Schema.Types.ObjectId,
    ref: "trip",
  },
  ticketSold: {
    type: [Ticket],
    default: undefined,
  },
});
export const TripSchedule = mongoose.model("TripSchedule", tripScheduleSchema);
