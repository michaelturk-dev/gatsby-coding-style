const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    school: String,
    externalIds: [
      {
        externalId: String,
      },
    ],
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
