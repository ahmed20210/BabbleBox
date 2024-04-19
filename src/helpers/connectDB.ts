import mongoose from "mongoose";


const MONGODB_URI = process.env.DB_URL

// Connect to MongoDB
const startConnection = () => {
mongoose
  .connect(MONGODB_URI, )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

}

export default startConnection;
