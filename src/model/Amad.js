const mongoose = require("mongoose");
const amadSchema = new mongoose.Schema(
  {
    coldId: {
      type: String,
      require: true,
    },
    amadNo: {
      type: Number,
      require: true,
    },
    entryDate: {
      type: Date,
      require: true,
    },
    party: {
      type: String,
      require: true,
    },
    village: {
      type: String,
      require: true,
    },
    packets: {
      type: Number,
      require: true,
    },
    commodity: {
      type: String,
      require: false,
      default: "",
    },
    kism: {
      type: String,
      require: false,
      default: " ",
    },
    lotNo: {
      type: String,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    chamberNo: {
      type: Number,
      require: true,
    },
    chatta: {
      type: Number,
      require: false,
      default: 0,
    },
    gulla: {
      type: Number,
      require: false,
      default: 0,
    },
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
