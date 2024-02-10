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
    type: Date,
    required: true,
  },
  passenger: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tripSchedule: {
    type: Schema.Types.ObjectId,
    ref: "TripSchedule",
  },
},{timestamps: true});

export const Ticket = mongoose.model("Ticket", ticketSchema);
