const mongoose = require("mongoose");
//"mongo://localhost:27017/Ecommerce"

const connectDatabase = () => {
  mongoose
    .connect(
      process.env.DB_URI
      // {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true, useFindAndModify:false}
    )
    .then((data) => {
      console.log(`Mongo DB Connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;

//37:56
