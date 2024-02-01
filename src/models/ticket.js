import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  seatNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  cancellable: {
    type: Boolean,
    default:true
  },
  journeyDate: {
    type: String,
    required: true,
  },
  passenger: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  tripSchedule: {
    type: Schema.Types.ObjectId,
    ref: "tripschedule",
  },
},{timestamps: true});

export const Ticket = mongoose.model("Ticket", ticketSchema);
