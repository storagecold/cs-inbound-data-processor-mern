const mongoose = require("mongoose");
const amadSchema = new mongoose.Schema(
  {
    coldId: String,
    amadNo: Number,
    date: Date,
    party: String,
    village: String,
    commodity: String,
    kism: String,
    lotNo: String,
    year: Number,
    chamberNo: Number,
    chatta: Number,
    gulla: Number,
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { collection: "amad" }
);

module.exports = mongoose.model("Amad", amadSchema);
