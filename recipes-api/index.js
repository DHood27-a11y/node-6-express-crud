// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import fs from "fs/promises";

const app = express();

const port = 3000; // Defining the port number

app.use(express.json()); // Declaring that this server will be receiving and responding to requests in JSON

// Turn on the server so that it can listen for requests and respond to them at the port number
app.listen(port, () => {
  console.log(`The server is listening on port: ${port}`);
});

// ---------------------------------
// Helper Functions

// ---------------------------------

// 1. getAllRecipes()
async function getAllRecipes() {
  //we want to read data from the recipes-data.json file
  //the fs.readFile() method takes in 2 parameters: the file path to the file we want to read from, and the encoding("utf8")
  const data = await fs.readFile("./recipes-data.json", "utf8");
  //parse the books data to turn it from JSON to JS format
  const parsedRecipes = JSON.parse(data);
  //return the data we're looking for: the one book at the specified index (passing in index which equals a number)
  //in the browser at the end of the endpoint you would put index number you want to access
  return parsedRecipes;
}

// 2. getOneRecipe(index) - (Follows same structure as above except we are using index to target specific recipe based on input)

async function getOneRecipe(index) {
  //read recipes data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf8");
  //parse the recipes data to turn it from JSON to JS format
  const parsedRecipes = JSON.parse(data);
  //return the data we are looking for- one recipe at specified index
  //in browser we will include index number at end of endpoint
  return parsedRecipes[index];
}

// 3. getAllRecipeNames()

async function getAllRecipeNames() {
  //read recipes data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf8");
  //parse recipe data and turn JSON into JS format
  const parsedRecipes = JSON.parse(data);
  //map through recipes and return ONLY recipe names
  const recipeNames = parsedRecipes.map((recipe) => recipe.name);
  //return array of names
  return recipeNames;
}

// 4. getRecipesCount()
async function getRecipesCount() {
  //read the recipe data from recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf8");
  //parse the recipes data to turn it from JSON to JS format
  const parsedRecipes = JSON.parse(data);
  //return total number of recipes
  return parsedRecipes.length;
}
// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
//Start with this to get info from api endpoint

app.get("/get-all-recipes", async (req, res) => {
  //lastly since it has been refactored we need to call the functions () and save its return value in a variable
  const recipes = await getAllRecipes();

  //res.send() sends text data in the response
  //res.json() sends JSON data in the response
  //so for this instance because we are parsing JSON we will will use res.json and then pass in our created variable because that is what holds the data we are sending
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
  const index = req.params.index;
  //here I called my helper function and passed in the index
  const recipe = await getOneRecipe(index);
  //send the JSON data
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  //call helper function
  const recipeNames = await getAllRecipeNames();

  //send JSON data
  res.json(recipeNames);
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  //call helper function
  const count = await getRecipesCount();

  //send text data
  res.send(count);
});
