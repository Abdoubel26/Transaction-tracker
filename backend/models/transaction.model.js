import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String, 
        required: true,
        enum: ['income', 'expenses']
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currentTotal: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

const Transaction = mongoose.model('transactions', transactionSchema)

export default Transaction;