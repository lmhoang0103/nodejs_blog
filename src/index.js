const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");

const db = require("./config/db");
//Go~ thu muc route -> tu dong nap file index.js trong route vao`
const route = require("./routes");

//Connect DB
db.connect();

const app = express();
const port = 3000;

//File static
app.get(express.static(path.join(__dirname, "public")));
//console.log("Path:  " + path.join(__dirname, "public"));

app.get(express.urlencoded({ extended: true }));

app.get(express.json());

//HTTP logger
app.get(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

//route init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
