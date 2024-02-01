const { Schema, default: mongoose } = require("mongoose");

const agencySchema = new Schema({
  code: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  details: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Agency = mongoose.model("Agency", agencySchema);
