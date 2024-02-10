import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Trip } from "../models/trip.js";
import { TripSchedule } from "../models/tripschedule.js";
import { Ticket } from "../models/ticket.js";
import { User } from "../models/user.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Stop } from "../models/stop.js";

const createTicket = asyncHandler(async (req, res) => {
  const { start, stop, date, seatNo } = req.body;
  if (!start && !stop && !date) {
    throw new ApiError(404, "All fileds are required ");
  }
  const Source = await Stop.findOne({ code: start });
  const Destination = await Stop.findOne({ code: stop });
  const foundTrip = await Trip.findOne({
    sourceStop: Source._id,
    desStop: Destination._id,
  });
  if (!foundTrip) {
    throw new ApiError(404, "Trip not found");
  }
  const foundTripSchedule = await TripSchedule.findOne({
    tripDetails: foundTrip._id,
    tripDate: date,
  }).populate({
    path: "tripDetails",
  });
  if (!foundTripSchedule) {
    throw new ApiError(404, "No Trip schedule is found");
  }
  const user = await User.findById(req.user._id).select(
    "-password -email -username -role -__v -refreshToken "
  );
  if (!user) {
    throw new ApiError(500, "user not found");
  }
  const ticket = await Ticket.create({
    seatNumber: seatNo,
    cancellable: true,
    journeyDate: date,
    passenger: user,
    tripSchedule: foundTripSchedule,
  });
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }
  return res
    .status(200)
    .json(new ApiResponce(200, ticket, "Ticket created successfully"));
});

const bookTicket = asyncHandler(async (req, res) => {
  const { start, stop, date, seatNo } = req.body;
  if (!start && !stop && !date) {
    throw new ApiError(404, "All fileds are required ");
  }
  const Source = await Stop.findOne({ code: start });
  const Destination = await Stop.findOne({ code: stop });
  const foundTrip = await Trip.findOne({
    sourceStop: Source._id,
    desStop: Destination._id,
  });
  if (!foundTrip) {
    throw new ApiError(404, "Trip not found");
  }
  const findTripSchedule = await TripSchedule.findOne({
    tripDetails: foundTrip._id,
    tripDate: date,
  }).populate({
    path:"tripDetails"
  });
  const user = await User.findById(req.user._id).select("-email -username -password -refreshToken -role");
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const session = await TripSchedule.startSession();
  session.startTransaction();
    const opts = { session };
    const A = await TripSchedule.findOneAndUpdate(
      { _id: findTripSchedule._id },
      { $set: { availableSeat: findTripSchedule.availableSeat - 1 } },
      opts
    );
    const BookedTicket = await Ticket({
      seatNumber: seatNo,
      cancellable: true,
      journeyDate: date,
      passenger: user,
      tripSchedule: findTripSchedule,
    }).save(opts);
    await session.commitTransaction()
    session.endSession()
    if (!BookedTicket) {
      throw new ApiError(404, "Ticket Booking Failled")
    }
    return res.status(200)
    .json(new ApiResponce(200, BookedTicket, "Ticket Booked successfully"))
  
});

export { createTicket, bookTicket };
