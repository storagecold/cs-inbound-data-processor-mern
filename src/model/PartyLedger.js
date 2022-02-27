const mongoose = require("mongoose");
const partyLedgerSchema = new mongoose.Schema(
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
    vouchtype: {
      type: String,
      trim: true,
    },
    entryDate: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
    },
    acc: {
      type: String,
      trim: true,
    },
    loan: {
      type: Number,
    },
    rent: {
      type: Number,
    },
    interest: {
      type: Number,
    },
    oth: {
      type: Number,
    },
    bardana: {
      type: Number,
    },
    bardanaRate: {
      type: Number,
    },
    bardanaQtyIn: {
      type: Number,
    },
    bardanaQtyOut: {
      type: Number,
    },
    inWords: {
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
  { collection: "partyLedger" }
);

module.exports = mongoose.model("PartyLedger", partyLedgerSchema);
