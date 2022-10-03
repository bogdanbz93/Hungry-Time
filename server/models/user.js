import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Numele este un câmp obligatoriu."
    },
    email: {
      type: String,
      trim: true,
      required: "Email-ul este un câmp obligatoriu.",
      unique: true
    },
    password: {
      type: String,
      trim: true,
      min: 6,
      max: 64,
      required: "Parola contului este un câmp obligatoriu."
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {}
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  // hash password if it s changin or first time

  // be sure to use this otherwise each time user.save() is exectued, password
  // will get auto updated and you can't login with original password
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT are o eroare: ", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else return next();
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("Compare password error: ", err);
      return next(err, false);
    }
    // if not error, obtinem null
    console.log("MATCH PASSWORD", match);
    return next(null, match); // returns true
  });
};

export default mongoose.model("User", userSchema);
