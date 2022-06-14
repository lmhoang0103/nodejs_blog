const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");

const app = express();
const port = 3000;

//Go~ thu muc route -> tu dong nap file index.js trong route vao`
const route = require("./routes");

//File static
app.use(express.static(path.join(__dirname, "public")));
//console.log("Path:  " + path.join(__dirname, "public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource/views"));

//route init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
