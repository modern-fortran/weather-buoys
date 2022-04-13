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
import res from 'express/lib/response';
import { stderr } from 'process';

// PORT is defined in our .env file as PORT=8081. The dotenv/config module lets us import env vars but we set a default in case there is no env file
const port = process.env.PORT || 9090;

// We need the child_process module if we want to execute our executables
const { exec } = require("child_process");

const app = express();
// Use the cross-origin request module to prevent dumb stuff from happening

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.get('/', (req, res) => {
  res.send("<html><head><b>Hey, it's a nodejs server doing nothing yet.</b></head></html>");
});

app.post('/api/buoys', function(req, res) {
  const data = (req.body.buoys);
  data.forEach(element => {
    console.log(element);
  });
  exec("./weather_stats " + data.join(" "), (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.end( `error: ${error.message}` );
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.end( `error: ${stderr}` );
    }
    res.end( `${stdout}` );
  })
  console.log(data.join(" "));
});

app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`),
);

var execWeatherStats = function(appres, callback) {

}

app.get('/weather_stats', function (req, res) {
  exec("./weather_stats", (error, stdout, stderr) => {
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
