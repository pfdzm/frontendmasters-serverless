const { URL } = require("url");
const fetch = require("node-fetch");
const movies = require("../data/movies.json");

// require("dotenv").config();

exports.handler = async () => {
  const api = new URL("https://www.omdbapi.com/");

  api.searchParams.set("apikey", process.env.OMDB_API_KEY);

  const promises = movies.map((movie) => {
    // use IMDB id to lookup details
    api.searchParams.set("i", movie.id);

    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.Ratings;

        return {
          ...movie,
          scores,
        };
      });
  });

  const moviesWithRatings = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  };
};
