import mongoose from "mongoose";

// export interface Item {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   discount: number;
//   availability: string;
//   sizes: string[];
//   colors: string[];
//   image: string;
// }

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
  { timestamps: true, collection: "items" },
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
