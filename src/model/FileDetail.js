const mongoose = require("mongoose");
const fileDetailSchema = new mongoose.Schema(
  {
    coldId: {
      type: String,
      require: true,
      minLength: 8,
      index: true,
    },
    fileName: {
      type: String,
      require: true,
      minLength: 17,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      require: true,
      minLength: 8,
      index: true,
    },
    receivedDate: {
      type: Date,
      require: true,
      default: () => Date.now(),
    },
    completed: {
      type: Date,
      default: () => Date.now(),
    },
    error: {
      type: String,
      default: "",
    },
  },
  { collection: "fileDetail" }
);

module.exports = mongoose.model("FileDetail", fileDetailSchema);
