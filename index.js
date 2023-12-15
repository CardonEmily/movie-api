//express.js for creating the application
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const movies = [
  {
    title: "127 Hours",
    director: "Danny Boyle",
    release: "2010",
    genre: "Biography, Drama",
    rating: "R",
    length: "1h 34m",
    description:
      "A mountain climber becomes trapped under a boulder while canyoneering alone near Moab, Utah and resorts to desperate measures in order to survive.",
  },
  {
    title: "100 Rifles",
    director: "Tom Gries",
    release: "1969",
    genre: "Adventure, Drama, War",
    rating: "R",
    length: "1h 50m",
    description:
      "In 1912 Sonora, Mexico, native revolutionary Yaqui Joe (Burt Reynolds) robs a bank to buy arms for his oppressed people, but finds himself sought by an American lawman and the Mexican Army.",
  },
  {
    title: "The Hunger Games",
    director: "Gary Ross",
    release: "2012",
    genre: "Adventure, Action, Sci-Fi",
    rating: "PG-13",
    length: "2h 22m",
    description:
      "Katniss Everdeen voluntarily takes her young sister's place in teh Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the Reel Club!");
});

//express.static to serve 'documentation.html'
app.use(express.static("public"));

//READ
app.get("/movies", (req, res) => {
  res.json(movies);
});

//READ
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Inconceivable! An error has occurred.");
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Title not found.");
  }
});

//READ
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Inconceivable! An error has occurred.");
// });

// app.get("/movies/:title", (req, res) => {
//   const { title } = req.params;
//   const movie = movies.find( movie => movie.Title === title);

//   if (movie) {
//     res.status(200).json(movie);
//   } else {
//     res.status(400).send("Title not found.");
//   }
// });

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
