const mongoose = require("mongoose");

const neftSchema = new mongoose.Schema({
    coldId: {
        type: String,
        require: true,
        minLength: 8,
        index: true,
    },
    date: {
        type: Date,
        index: true,
        default: Date.now(),
    },
    branch: {
        type: String,
    },
    accNo: {
        type: Number
    },
    bankName: {
        type: String,
    },
    accName: {
        type: String,
        index: true,
    },
    ifsc: {
        type: String,
        required: true,
    },
    partyBranch: {
        type: String,
    },
    partyAccNo: {
        type: Number,
        trim: true,
    },
    partyIfsc: {
        type: String,
        trim: true,
    },
    partyBankName: {
        type: String,
        trim: true,
    },
    partyAccName: {
        type: String,
        trim: true,
        required: true,
    },
    patyName: {
        type: String,
        trim: true,
    },
    village: {
        type: String,
        trim: true,
        index: true,
    },
    amount: {
        type: Number,
    },
    amountInWords: {
        type: String,
        trim: true,
    },
    chqNo: {
        type: Number
    },
    remark: {
        type: String,
        trim: true,
    }

}, { collection: "neft" })

module.exports = mongoose.model("Neft", neftSchema)