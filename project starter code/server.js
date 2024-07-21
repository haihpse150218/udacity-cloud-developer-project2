import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';



// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
app.get('/filteredimage', async (req, res) => {
  const { image_url } = req.query;

  // Validate the image_url query
  if (!image_url) {
    return res.status(400).send({ message: 'image_url is required' });
  }

  try {
    // Call filterImageFromURL(image_url) to filter the image
    const filteredpath = await filterImageFromURL(image_url);
    console.log(filteredpath)
    // Send the resulting file in the response
    res.sendFile(filteredpath, (err) => {
      if (err) {
        return res.status(500).send({ message: 'Something wrong when send the image' });
      }
      // Delete any files on the server on finish of the response
      deleteLocalFiles([filteredpath]);
    });
  } catch (error) {
    return res.status(422).send({ message: 'Something wrong with the image at the provided URL' });
  }
});
//! END @TODO1


// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
