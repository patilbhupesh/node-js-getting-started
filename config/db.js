const mongoose = require("mongoose");
const Logger = require('mongodb').Logger;
// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://vecta_ankit:vFGRxO0ZbUIrFciF@billing.nxrf2.mongodb.net/billing";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      // logger: console.log,
      // loggerLevel: 'debug'
    });
    // mongoose.set('debug', true)
    // mongoose.pluralize(null);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
