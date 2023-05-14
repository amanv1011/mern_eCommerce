const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//Handling Uncought Rxception
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting Down the Server due to UNHANDLED PROMISE REJECTION");
  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" });

//connected to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// console.log(Youtube);
//unhandled Promice rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting Down the Server due to UNHANDLED PROMISE REJECTION");
  server.close(() => {
    process.exit(1);
  });
});
