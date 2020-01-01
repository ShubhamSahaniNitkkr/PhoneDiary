const mongooose = require("mongoose");
const ContactSchema = mongooose.Schema({
  user: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: "Personal"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongooose.model("contact", ContactSchema);
