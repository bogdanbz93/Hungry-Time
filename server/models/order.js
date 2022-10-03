import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: String
    },
    hour: {
      type: String
    },
    chairs: {
      type: Number
    },
    phone: {
      type: String
    },
    paid: {
      type: Boolean,
      default: false
    },
    restaurant: {
      type: ObjectId,
      ref: "Restaurant"
    },
    session: {},
    orderedBy: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
