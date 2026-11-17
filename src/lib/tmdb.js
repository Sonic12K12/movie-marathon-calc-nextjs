"use server";

// Base URL for all TMDB API endpoints
const BASE_URL = "https://api.themoviedb.org/3";

// Retrieve the token securely from the server environment
const API_TOKEN = process.env.TMDB_API_TOKEN;

// Reusable fetch configuration with authorization headers
const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

// Fetches the TMDB search endpoint and returns the first collection ID
async function getCollectionId(query) {
  const url = BASE_URL + `/search/collection?query=${query}`; // query

  const results = await fetch(url, fetchOptions);
  const data = await results.json();
  const collectionID = data.results[0].id;
  //console.log(collectionID);

  return collectionID;
}

// Fetches the collection details and returns an array of movie IDs
async function getMoviesFromCollection(query) {
  const collectionID = await getCollectionId(query);
  const url = BASE_URL + `/collection/${collectionID}`;

  const results = await fetch(url, fetchOptions);
  const data = await results.json();

  // Map over the "parts" array to create a new array containing only the movie IDs
  const movieIDs = data.parts.map((movie) => movie.id);
  //console.log(movieIDs);

  return movieIDs;
}

// Fetches the needed details of the moies
async function getMoviesDetails(movieIDs) {
  // Create an array of fetch promises using .map()
  const fetchPromises = movieIDs.map(async (id) => {
    const url = BASE_URL + `/movie/${id}`;

    // Fetch the data for this specific movie
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    // Extract and return exactly whats needed
    return {
      id: data.id,
      title: data.title,
      runtime: data.runtime,
      poster_path: data.poster_path,
    };
  });

  // Execute all promises concurrently and wait for all to resolve
  const moviesDetails = await Promise.all(fetchPromises);
  //console.log(moviesDetails);

  // Return the final array containing the detailed movie objects
  return moviesDetails;
}

export async function calculateMarathon(query) {
  try {
    // Get the array of movie IDs
    const movieIDs = await getMoviesFromCollection(query);

    // Fetch exact runtimes etc. for each individual movie
    const moviesDetails = await getMoviesDetails(movieIDs);

    const totalRuntimeCollection = moviesDetails
      .map((moviesDetails) => moviesDetails.runtime)
      .reduce((sum, number) => sum + number, 0);

    const totalRuntimeFormatted = {
      hours: Math.floor(totalRuntimeCollection / 60),
      minutes: totalRuntimeCollection % 60,
    };

    return {
      success: true,
      movies: moviesDetails,
      totalTime: totalRuntimeFormatted,
    };
  } catch (error) {
    // Error handling for the frontend
    console.error("Failed to fetch TMDB data:", error);
    return {
      success: false,
      error: "Could not calculate marathon data.",
    };
  }
}
