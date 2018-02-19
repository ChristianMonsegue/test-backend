const express = require("express"),
    http = require("http"),
    url = require("url"),
    methodOverride = require("method-override"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    mongoose = require("mongoose"),
    compress = require("compression"),
    logger = require("morgan"),

    routes = require("./routes");

const app = express(),
    server = http.createServer(app);

app.use(logger("tiny"));
app.use(compress());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

app.all("/*", setCORS);
app.use("/", routes);

/* Connects the server to the mongo database */
// connectToDatabase({
//   hostname: "localhost",
//   port: "27017",
//   database: "test"
// });

let port =  process.env.PORT || 8888;
server.listen(port, () => console.log(`Express server listening on port ${port}`));

function setCORS (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-User");
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
}

function connectToDatabase (dbConfig) {
  let connectionUrl = `mongodb://${dbConfig.user || ""}:${dbConfig.password || ""}@${dbConfig.hostname}:${dbConfig.port}/${dbConfig.database}`;

  const db = mongoose.connect(connectionUrl, { useMongoClient: true });

  db.once("open", () => {
    console.log(`Connected to mongo database: ${dbConfig.database}`);
    console.log(`HOSTNAME: ${dbConfig.hostname}:${dbConfig.port}`);
    if (dbConfig.user) console.log(`USERNAME: ${dbConfig.user}`);
  });
}
