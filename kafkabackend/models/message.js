const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    messages: {
      type: [],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports.messageSchema = messageSchema;
module.exports.Messages = Message;
