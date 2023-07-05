const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  password: { type: String, required: true ,minLength:[6 , 'should be atleat  6 digit']},
  email: {
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid  Email-ID!`,
    },
  },
  token:String
});

exports.User = mongoose.model("User", userSchema);
