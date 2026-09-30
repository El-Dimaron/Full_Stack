import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
    },

    availability: {
      type: String,
      required: true,
    },

    sizes: {
      type: [String],
      default: [],
    },

    colors: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "items",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  },
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
