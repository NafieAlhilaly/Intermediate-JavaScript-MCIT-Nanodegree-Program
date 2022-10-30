require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls
const API_KEY = process.env.API_KEY;
const API_BASE_URL = process.env.API_BASE_URL;

app.get("/rovers", async (req, res) => {
  try {
    let rovers = await fetch(
      `${API_BASE_URL}/api/v1/rovers?api_key=${API_KEY}`
    ).then((res) => res.json());

    res.status(200).json({
      statusCode: 200,
      key: "rovers",
      message: "Rovers found",
      data: rovers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      key: "server_error",
      message: "ops! its from our side this time",
    });
  }
});

app.get("/:rover/photos", async (req, res) => {
  try {
    const { rover } = req.params;
    const roverName = rover.toLowerCase();
    const roverPhotos = await fetch(
      `${API_BASE_URL}/api/v1/rovers/${roverName}/photos?sol=800&api_key=${API_KEY}`
    ).then((res) => res.json());

    res.status(200).json({
      statusCode: 200,
      key: "rover_photos",
      message: "Rovers photos found",
      photos: roverPhotos?.photos ?? [],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      statusCode: 500,
      key: "server_error",
      message: "ops! its from our side this time",
    });
  }
});

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
