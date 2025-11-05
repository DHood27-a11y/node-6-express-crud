// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//the following can be put in terminal so you dont have to stop and restart server each time. Does automatically on save with this command in terminal: node -—watch index.js
//Importing all of our Node Modules
import express from "express"; // the framework that lets us build web servers //be sure to INSTALL IN NEW VSCODE IF USING, NOT JUST IMPORT
import fs from "fs/promises"; // the file system module lets us read and write data from files

// Creating an instance of express so we can use all of the methods, functions, properties of express
//which will be saved in app
const app = express();

// Defining our port number
//what port should our server listen to?
const port = 3000; //you can use other #'s but devs commonly use 3000 for testing/development.

// Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json());

// Turn on our server so that it can listen for requests and respond to them at the port number
app.listen(port, () => {
  console.log(`The server is listening on port: ${port}`);
});

//We will create the beginnings of a CRUD application: C-create R-read U-update D-delete

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
async function getAllBooks() {
  //we want to read data from the books-data.json file
  //the fs.readFile() method takes in 2 parameters: the file path to the file we want to read from, and the encoding("utf8")
  const data = await fs.readFile("./books-data.json", "utf8");
  //parse the books data to turn it from JSON to JS format
  const parsedBooks = JSON.parse(data);
  //return the data we're looking for: the one book at the specified index (passing in index which equals a number)
  //in the browser at the end of the endpoint you would put index number you want to access
  return parsedBooks;
}

// 2. getOneBook(index)

async function getOneBook(index) {
  //read the books data from the books-data.json file
  const data = await fs.readFile("./books-data.json", "utf8");
  //parse the books data to turn it from JSON to JS format
  const parsedBooks = JSON.parse(data);
  //return the data we're looking for: the one book at the specified index (passing in index which equals a number)
  //in the browser at the end of the endpoint you would put index number you want to access
  return parsedBooks[index];
}

//3. getOneBookTitle(index)

async function getOneBookTitle(index) {
  //read the books data from the books-data.json file
  const data = await fs.readFile("./books-data.json", "utf8");

  //parse the books data to turn it from JSON to JS
  const parsedBooks = JSON.parse(data);

  //return the data we're looking for: the title of the book at the specified index

  return parsedBooks[index].title;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books

//Start with this to get info from api endpoint

app.get("/get-all-books", async (req, res) => {
  //lastly since it has been refactored we need to call the functions () and save its return value in a variable
  const books = await getAllBooks();

  //res.send() sends text data in the response
  //res.json() sends JSON data in the response
  //so for this instance because we are parsing JSON we will will use res.json and then pass in our created variable because that is what holds the data we are sending
  res.json(books);
});

// 2. GET /get-one-book/:index(dynamic parameter)
app.get("/get-one-book/:index", async (req, res) => {
  //get the value of the index dynamic parameter
  const index = req.params.index;
  //call the helper function that gets the book from the file at the specified index
  const book = await getOneBook(index);

  //send the book as JSON data in the response
  res.json(book);
});

//3. GET /get-one-book-title/:index
app.get("/get-one-book-title/:index", async (req, res) => {
  //get the value of the index dynamic parameter
  const index = req.params.index;

  //call the helper function that gets the book's title at the specified index
  const bookTitle = await getOneBookTitle(index);

  //send the response as JSON- res.json would be considered improper in this instance because the bookTitle string result is not valid JSON. JSON always needs to be an object or array of objects
  //res.json(bookTitle)

  //Alternative replacement method #1: send the response as text
  //res.send(bookTitle)

  //Alternative replacement method #2: send the response as a valid JSON object (**THIS IS THE PREFERRED METHOD**)
  //here you are creating a key value pair as an object. The property is title(property should be whats already in your data object/what you are specifying) and the value is bookTitle(helper function).
  res.json({ title: bookTitle });
});
