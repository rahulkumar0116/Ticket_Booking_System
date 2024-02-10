import { asyncHandler } from "../utils/asyncHandler.js";
import { Trip } from "../models/trip.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Stop } from "../models/stop.js";
import { Bus } from "../models/bus.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Agency } from "../models/agency.js";

const createTrip = asyncHandler(async (req, res) => {
  const { fare, journeyTime, sourceStop, desStop, bus, agency } = req.body;
  if (!fare && !journeyTime && !sourceStop && !desStop && !bus && !agency) {
    throw new ApiError(500, "All fild are required");
  }
  const findSourceStop = await Stop.findOne({ code: sourceStop });
  if (!findSourceStop) {
    throw new ApiError(404, "Source Stop not found");
  }
  const findDesStop = await Stop.findOne({ code: desStop });
  if (!findDesStop) {
    throw new ApiError(404, "Destination Stop not found");
  }
  const findBus = await Bus.findOne({ code: bus });
  if (!findBus) {
    throw new ApiError(404, "Bus not found");
  }
  const findAency = await Agency.findOne({ code: agency });
  if (!findAency) {
    throw new ApiError(404, "Agency not found");
  }
  const tripCreated = await Trip.create({
    fare,
    journeyTime,
    sourceStop: findSourceStop,
    desStop: findDesStop,
    bus: findBus,
    agency: findAency,
  });
  if (!tripCreated) {
    throw new ApiError(404, "somthing went worng while creating trip");
  }
  return res
    .status(200)
    .json(new ApiResponce(200, tripCreated, "Trip created successfully"));
});

const getTrip = asyncHandler(async (req, res) => {
  const { sourceStop, desStop } = req.body;
  if (!sourceStop && !desStop) {
    throw new ApiError(400, "Both Stop Required");
  }
  const Source = await Stop.findOne({ code: sourceStop });
  const Destination = await Stop.findOne({ code: desStop });

  const foundTrip = await Trip.find({
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
    })
    .populate({
      path: "agency",
      select: ["code", "name", "-_id"],
    });
  if (!foundTrip) {
    throw new ApiError(400, "Trip not found");
  }
  return res
    .status(200)
    .json(new ApiResponce(200, foundTrip, "Found your Trip"));
});
export { createTrip, getTrip };
