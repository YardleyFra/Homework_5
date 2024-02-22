// Yardley Francois 
// 2/21/204
// IT302002-Advanced Internet Applications
// yf239@njit.edu

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
// MongoDB connection URL (replace with your MongoDB connection string)
const mongoUrl = 'mongodb+srv://yf239:1qaz2wsx!QAZ%40WSX*mongo@cluster0.gzq1w7q.mongodb.net/IT302';
// Define a function to connect to MongoDB and return the database object
async function connectToMongo() {
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
  try {
    await client.connect();
    return client.db('IT302');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
// Route to get films from MongoDB and return them as JSON
app.get('/films_Yf239', async (req, res) => {
  try {
    const db = await connectToMongo();
    // Remove the filter query
    const query = {};
    // Use the query object to find all films
    const films_Yf239 = await db.collection('films_Yf239').find(query).toArray();
    res.json(films_Yf239);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching films from the database' });
  }
});
// Route to get films from MongDB and handle filtering based on the "title" field
app.get('/films_title_Yf239', async (req, res) => {
  try {
    const db = await connectToMongo();
   
    // Get the "title" and "genreFilter" filter from the query parameters
    const propertyTypeFilter = req.query.title;
    const genreFilter = req.query.genre;
    // Define a query object based on the filter, or an empty query if no filter is provided
    const query = propertyTypeFilter ? { title: propertyTypeFilter, genre: genreFilter } : {};
    // Use the query object to find films that match the filter
    const films_Yf239 = await db.collection('films_Yf239').find(query).toArray();
    res.json(films_Yf239);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching filtered films from the database' });
  }
});
// TODO Route to get films from MongoDB and handle filtering based on the "genre" field
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use(express.json())
app.post('/films_Yf239', async (req, res) => {
    // Step 1: Initialize a variable for the MongoClient using the connectToMongo function
    
    // Step 2: initialize 4 (or more) variables to extract the title, year, genre and actors from the req.body JSON (the request body)
    const {tile, year,genre, actors,rating} = req.body;
      if (!tile || !year || !genre || !actors || !rating){
        return res.status(400).json ({error:'Missing required fields'})
      };
    
    // Step 3: Call the "insertOne" function with these parameters to the films collection
    const YF = await collection.insertOne({
        tile, year,genre, actors,rating
      });
    // Step 4: If the "acknowledged" field from the results is true, respond with status 201 and an appropriate "message" field and value, otherwise status 500 with an appropriate "error" field and value
    if (YF.acknowledged){
      res.status(201).json ({ message: 'Film created successfully.'});
        }else{
          res.status(500).json ({e: 'failed to create the movie'});
        }catch(error){    
    // Step 5: Remember to include a try-catch block inside the entire function that returns a status 500 with an appropriate "error" field and value
        }
});