import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Trip } from "../models/trip.js";
import { TripSchedule } from "../models/tripschedule.js";
import { Ticket } from "../models/ticket.js";
import { User } from "../models/user.js";
import { ApiResponce } from "../utils/ApiResponce.js"
import { Stop } from "../models/stop.js"

const createTicket = asyncHandler(async (req, res) => {
  const { start, stop, date, seatNo } = req.body;
  if (!start && !stop && !date) {
    throw new ApiError(404, "All fileds are required ");
  }
  const Source = await Stop.findOne({ code: start });
  const Destination = await Stop.findOne({ code: stop });
  const foundTrip = await Trip.findOne({ sourceStop: Source._id, desStop: Destination._id })
  if (!foundTrip) {
    throw new ApiError(404, "Trip not found");
  }
  const foundTripSchedule = await TripSchedule.findOne({
    tripDetails: foundTrip._id,
    tripDate: date,
  }).populate({
    path: "tripDetails"
  });
  const Seat = foundTripSchedule.availableSeat
  if (!foundTripSchedule) {
    throw new ApiError(404, "No Trip schedule is found")
  }
  const user = await User.findById(req.user._id).select("-password -email -username -role -__v -refreshToken ")
  if (!user) {
    throw new ApiError(500, "user not found")
  }
  const session = await Ticket.startSession();
  session.startTransaction()
  const opts = {session}
  const ticket = await Ticket.create({
    seatNumber:seatNo,
    cancellable: true,
    journeyDate: date,
    passenger:user,
    tripSchedule:foundTripSchedule
  },opts)
  const A = await TripSchedule.findOneAndUpdate(
    {_id:foundTripSchedule._id},{$set:{availableSeat:Seat-1}}
  ).save(opts)
  await session.commitTransaction()
  session.endSession()
  if (!ticket) {
    throw new ApiError(404, "Ticket not found")
  }
  return res.status(200)
  .json(new ApiResponce(200, ticket, "Ticket created successfully"))
});


export{ createTicket }