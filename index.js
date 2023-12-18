//express.js for creating the application
const express = require("express");
const morgan = require("morgan");
const uuid = require("uuid");

const app = express();

app.use(morgan("common"));

const users = {
  id: 1,
  name: "Sally",
  favoriteMovie: "The Hunger Games",

  id: 2,
  name: "Rodney",
  favoriteMovie: "Pride and Predjudice",
};

const movies = [
  {
    Title: "127 Hours",
    Release: "2010",
    Genre: {
      Name: "Biography",
      Name: "Drama",
      Description:
        "A mountain climber becomes trapped under a boulder while canyoneering alone near Moab, Utah and resorts to desperate measures in order to survive.",
    },
    Rating: "R",
    Length: "1h 34m",
    Director: {
      Name: "Danny Boyle",
      Age: "25",
      Bio: "xxx...",
    },
  },
  {
    Title: "100 Rifles",
    Release: "1969",
    Genre: {
      Name: "Adventure",
      Name: "Drama",
      Name: "War",
      Description:
        "In 1912 Sonora, Mexico, native revolutionary Yaqui Joe (Burt Reynolds) robs a bank to buy arms for his oppressed people, but finds himself sought by an American lawman and the Mexican Army.",
    },
    Rating: "R",
    Length: "1h 50m",
    Director: {
      Name: "Tom Gries",
      Age: "33",
      Bio: "xxx",
    },
  },
  {
    Title: "The Hunger Games",
    Release: "2012",
    Genre: {
      Name: "Adventure",
      Name: "Action",
      Name: "Sci-Fi",
      Description:
        "Katniss Everdeen voluntarily takes her young sister's place in teh Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.",
    },
    Rating: "PG-13",
    Length: "2h 22m",
    Director: {
      Name: "Gary Ross",
      Age: "45",
      Bio: "xxx...",
    },
  },
];

// CREATE USER
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Information needed.");
  }
});

//UPDATE USER
app.post("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("Error updating information.");
  }
});

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the Reel Club!");
});

//express.static to serve 'documentation.html'
app.use(express.static("public"));

//READ MOVIES
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Inconceivable! An error has occurred.");
});

//READ TITLE
app.get("/movies/:Title", (req, res) => {
  const { Title } = req.params;
  const movie = movies.find((movie) => movie.Title === Title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Title not found.");
  }
});

//READ GENRE
app.get("/movies/Genre/:GenreName", (req, res) => {
  const { GenreName } = req.params;
  const Genre = movies.find((movie) => movie.Genre.Name === GenreName).Genre;

  if (Genre) {
    res.status(200).json(Genre);
  } else {
    res.status(400).send("Genre not found.");
  }
});

//READ DIRECTOR
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director information not found.");
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
