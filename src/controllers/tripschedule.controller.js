import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Trip } from "../models/trip.js";
import { TripSchedule } from "../models/tripschedule.js";
import { Stop } from "../models/stop.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const createTripSchedule = asyncHandler(async (req, res) => {
  const { sourceStop, desStop, date } = req.body;
  if (!sourceStop && !desStop && !date) {
    throw new ApiError(404, "All fileds are required");
  }
  const foundTripSchedule = await TripSchedule.findOne({tripDate:date})
  if(foundTripSchedule){
    throw new ApiError(404, "Trip Schedule of given date is allready created..")
  }
  const Source = await Stop.findOne({ code: sourceStop });
  const Destination = await Stop.findOne({ code: desStop });
  if (!Source && !Destination) {
    throw new ApiError(404, "Stop not found")
  }
  const foundTrip = await Trip.findOne({
    sourceStop: Source._id,
    desStop: Destination._id,
  })
  .populate({
    path: "sourceStop",
    select: ["code", "name", "-_id"],
  })
  .populate({
    path: "desStop",
    select: ["code", "name", "-_id"],
  })
  .populate({
    path: "bus",
    select: ["code", "capacity", "-_id"],
  });
  if(!foundTrip){
    throw new ApiError(404, "Trip not found")
  }
  const tripscheduleCreated = await TripSchedule.create({
    tripDate: date,
    availableSeat: 50,
    tripDetails: foundTrip,
  });
  if (!tripscheduleCreated) {
    throw new ApiError(404, "Trip Schedule not created....")
  }
  return res.status(200)
  .json(new ApiResponce(200, tripscheduleCreated, "Trip Schedule created successfully"))
});

export { createTripSchedule };
