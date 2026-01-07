import mongoose from "mongoose";

const tableDataSchema = new mongoose.Schema(
  {
    tableName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    columns: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    rows: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const tableDataModel = mongoose.model("table_data", tableDataSchema);
