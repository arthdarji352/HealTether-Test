import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: Number,
      required: [true, "Number is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export const employeeModel = mongoose.model("Employee", employeeSchema);
export default employeeModel;
