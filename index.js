//express.js for creating the application
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

let topMovies = [
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

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the Reel Club!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

//express.static to serve 'documentation.html'
app.use(express.static("public"));

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
