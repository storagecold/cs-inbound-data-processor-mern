const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema(
  {
    coldId: {
      type: String,
      require: true,
      minLength: 8,
      index: true,
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
    accountName: {
      type: String,
      require: true,
      minLength: 3,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      trim: true,
    },
    subGroup: {
      type: String,
      trim: true,
    },
    open: {
      type: Number,
    },
    dr: {
      type: Number,
    },
    close: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    nature: {
      type: String,
      trim: true,
    },
    openOTHER: {
      type: Number,
    },
    AccName: {
      type: String,
      trim: true,
    },
    kName: {
      type: String,
      trim: true,
    },
    fName: {
      type: String,
      trim: true,
    },
    fRelation: {
      type: String,
      trim: true,
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
  { collection: "account" }
);

module.exports = mongoose.model("Account", accountSchema);
