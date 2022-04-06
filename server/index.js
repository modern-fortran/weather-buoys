import 'dotenv/config';
import cors from 'cors';
import express from 'express';

// useful links:
// https://github.com/gretzky/noaa-buoys
// 
// We created some construct objects to store our geolocation data in Buoys.js
import { locationSuccess, locationError } from './Buoys';

// If we can retrieve browser location we can pass the data to findNearestBuoys to give us a list of nearby buoys

import buoys, { findNearestBuoys, Buoy } from "noaa-buoys";
import navigator from 'navigator';

// PORT is defined in our .env file as PORT=8081. The dotenv/config module lets us import env vars

// We need the child_process module if we want to execute our executables
const { exec } = require("child_process");

const app = express();
// Use the cross-origin request module to prevent dumb stuff from happening

app.use(cors());

// Check if geolocation is available so we aren't insane

if('geolocation' in navigator) {
  console.log("INFO: Found geolocation!");
} else {
  console.log("ERROR: no geolocation found!");
}

// see if we can get the user's browser geolocated so we can pass lat and long to findNearestBuoys
app.get('/location', function (req, res) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
  } else {
    res.send("Your browser is bootleg, there's no geolocation!");
  }
})

app.get('/local_buoys', function (req, res) {
  if (navigator.geolocation) {
    console.log("INFO: Supposedly I can get geolocation.");
    var loc = navigator.geolocation.getCurrentPosition(locationSuccess, locationError); 
    console.log(loc);
    const localBuoys = findNearestBuoys({
      location: {
        latitude: locationSuccess.latitude,
        longitude: locationSuccess.longitude,
      },
      units: "metric",
      numBuoys: 1,
      stations: buoys.filter((buoy, Buoy) => buoy.isActive), // optional, defaults to the entire list of buoys
    });
    res.send(localBuoys);
  } else {
    console.log("WARNING: I can't get geolocation.");
    res.send("Your browser is so bootleg, there's no geolocation so I can't find any buoys!");
  };
})

app.get('/', (req, res) => {
  res.send("Hey, it's a nodejs server doing nothing yet.");
});

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`),
);

app.get('/weather_stats', function (req, res) {
  exec("./weather_stats_parallel", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          res.end( `error: ${error.message}` );
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          res.end( `error: ${stderr}` );
      }
      console.log(`stdout: ${stdout}`);
      res.end( `${stdout}` );
  });
})
