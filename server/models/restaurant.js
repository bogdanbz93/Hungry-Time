import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required"
    },

    content: {
      type: String,
      required: "Desciereea restaurantului este necesară.",
      maxLength: 10000
    },

    location: {
      type: String,
      required: "Locația este necesară."
    },

    placeId: {
      type: String,
      required: "Locația este necesară."
    },

    city: {
      type: String,
      required: "Orașul este necesar."
    },

    lat: {
      type: Number,
      required: "Locația este necesară.",
      trim: true
    },

    lng: {
      type: Number,
      required: "Locația este necesară.",
      trim: true
    },

    tables: {
      type: Number,
      required: "Numărul meselor în locație este obligatorie.",
      trim: true
    },

    category: {
      type: String,
      required: "Categoria este necesară"
    },

    ytVideo: {
      type: String
    },

    website: {
      type: String
    },

    price: {
      type: Number,
      required: "Prețul este necesar.",
      trim: true
    },

    phone: {
      type: Number,
      required: "Numărul de telefon este necesar.",
      trim: true
    },

    price: {
      type: Number,
      required: "Prețul este necesar.",
      trim: true
    },

    email: {
      type: String,
      required: "Email-ul este un câmp obligatoriu.",
      trim: true
    },

    image: {
      data: Buffer,
      contentType: String
    },

    logo: {
      data: Buffer,
      contentType: String
    },

    drinksMenu: {
      type: Array,
      required: "Meniurile sunt obligatorii."
    },

    foodMenu: {
      type: Array,
      required: "Meniurile sunt obligatorii."
    },

    glovo: {
      type: String
    },

    foodpanda: {
      type: String
    },

    tazz: {
      type: String
    },

    postedBy: {
      type: ObjectId,
      ref: "User"
    },

    approved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
