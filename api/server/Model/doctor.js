const mongoose = require("mongoose");

var Doctor = mongoose.model("doccollections", {
  docid: Number,
  docname: String,
  speciality: String,
  age: Number,
  education: [String],
  address: {
    permanent: {
      flatno: Number,
      street: String,
      city: String,
      state: String,
      pincode: Number
    },
    current: {
        flatno: Number,
        street: String,
        city: String,
        state: String,
        pincode: Number
    }
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      require: true
    },
    coordinates: {
      type: [Number],
      require: true
    }
  }
});

module.exports = { Doctor };
