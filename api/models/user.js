import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
});

const User = mongoose.model("User", userSchema);

export default User
