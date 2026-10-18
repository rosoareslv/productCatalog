import mongoose from "mongoose";

const CONNECTION_URL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@database:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`

export async function connect() {

  try {

    mongoose.connection.on('connected', () => console.log('MongoDB OK'));

    mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"));

    mongoose.connection.on('error', (err) => console.log(`MongoDB error: ${err}`));

    mongoose.connection.on("close", () => console.log("MongoDB close"));

    await mongoose.connect(
      CONNECTION_URL,
      {
        maxPoolSize: 100,
        minPoolSize: 10,
        maxIdleTimeMS: 30000,
        waitQueueTimeoutMS: 5000, //waiting time if the pool is fully used
      }

    );

  } catch (error) {
    throw error;
  }
}
