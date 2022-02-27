const mongoose = require("mongoose");
const amadSchema = new mongoose.Schema(
  {
    coldId: {
      type: String,
      require: true,
      minLength: 8,
      index: true,
    },
    amadNo: {
      type: Number,
      min: 0,
      require: true,
      index: true,
    },
    entryDate: {
      type: Date,
      require: true,
      default: () => Date.now(),
    },
    accountName: {
      type: String,
      require: true,
      minLength: 1,
      trim: true,
      index: true,
    },
    village: {
      type: String,
      minLength: 1,
      require: true,
      trim: true,
      index: true,
    },
    packets: {
      type: Number,
      require: true,
    },
    commodity: {
      type: String,
      require: false,
      trim: true,
      default: "",
    },
    kism: {
      type: String,
      require: false,
      trim: true,
      default: " ",
    },
    lotNo: {
      type: String,
      trim: true,
      require: true,
    },
    year: {
      type: Number,
      min: 1000,
      max: 9999,
      require: true,
      index: true,
      validate: {
        validator: function (val) {
          return val.toString().length === 4;
        },
        message: (val) => `${val.value} has to be 4 digits`,
      },
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
