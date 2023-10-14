const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  }
})

const fav = mongoose.model("favorite", favoriteSchema);
module.exports = fav;