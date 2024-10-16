require("dotenv").config();
const mongoose = require("mongoose");

class Database {
  private mongoURL;

  constructor() {
    this.mongoURL = `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`;
  }

  // Handle Database Connection
  public sync(): void {
    // Connect to MongoDB
    mongoose.connect(this.mongoURL);

    // Handling successful connection
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB successfully");
    });

    // Handling connection errors
    mongoose.connection.on("error", (err: any) => {
      console.log("Connection error: ", err);
    });
  }
}

export default Database;
