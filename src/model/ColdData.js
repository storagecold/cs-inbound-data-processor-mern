const mongoose = require("mongoose");
const amadSchema = new mongoose.Schema({
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
});
const partyLedgerSchema = new mongoose.Schema({
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
});
const coldDataSchema = new mongoose.Schema(
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
    amads: [amadSchema],
    partyLedger: [partyLedgerSchema],
  },
  { collection: "coldDataSchema" }
);

module.exports = mongoose.model("ColdDataSchema", coldDataSchema);
