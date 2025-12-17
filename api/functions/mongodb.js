import mongoose from "mongoose";

export async function connectMongo() {
  try {
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB disconnected"),
    );
    mongoose.connection.on("close", () => console.log("MongoDB close"));
    await mongoose.connect(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@database:27017/${process.env.MONGO_DATABASE}`,
    );
  } catch (error) {
    throw error;
  }
}
