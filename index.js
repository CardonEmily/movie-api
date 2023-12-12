//express.js for creating the application
const express = require("express");
const morgan = require("morgan"),
  fs = require("fs"), // import built in node modules fs and path
  path = require("path");

const app = express();

app.use(morgan("common"));

const topMovies = [
  {
    title: "The Shawshank Redemtion",
    director: "Frank Darabont",
    release: "1994",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    release: "1972",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    release: "2008",
  },
  {
    title: "The Godfather Part II",
    director: "Francis Ford Coppola",
    release: "1974",
  },
  {
    title: "Angry Man",
    director: "Sydney Lumet",
    release: "1957",
  },
  {
    title: "Schindler's List",
    director: "Steven Spielberg",
    release: "1993",
  },
  {
    title: "The Lord of the Rings: Return of the King",
    director: "Peter Jackson",
    release: "2003",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Taratino",
    release: "1994",
  },
  {
    title: "The Lord of the Rings: Fellowship of the Rings",
    director: "Peter Jackson",
    release: "2001",
  },
  {
    title: "The Good, the Bad and the Ugly",
    director: "Sergio Leone",
    release: "1966",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    release: "1994",
  },
];

//morgan library log
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the Reel Club!");
});

//express.static to serve 'documentation.html'
app.use(express.static("public"));

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Inconceivable! An error has occurred.");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
