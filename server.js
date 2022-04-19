var express = require('express')
var app = express();

require('dotenv').config();

// useful links:
// https://github.com/gretzky/noaa-buoys
// 
// import res from 'express/lib/response';
// import { stderr } from 'process';

// PORT is defined in our .env file as PORT=8081. The dotenv/config module lets us import env vars but we set a default in case there is no env file
const port = process.env.PORT || 9090;

// We need the child_process module if we want to execute our executables
const { exec } = require("child_process");

//const app = express();
// Use the cross-origin request module to prevent dumb stuff from happening

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send("<html><head><b>Hey, it's a nodejs server doing nothing yet.</b></head></html>");
});

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

// This lets us pass the values in the url line as part of the get request query. Eg: URL/inputvals?buoy1=10001&buoy2=10002&buoy3=10003
// The key names are not important in our case as we are stripping them out and only passing the values along to the weather_stats fortran app

app.get('/inputvals', function(req, res){
  console.log(req.query);
  const buoys = Object.values(req.query);
  console.log(buoys);
  exec("./weather_stats_parallel " + buoys.join(" "), (error, stdout, stderr) => {
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
  console.log(buoys.join(" "));
})

// This allows us to do a POST to the url and pass in a JSON to the api: {"buoys":["42002"]}

app.post('/api/buoys', function(req, res) {
  const data = (req.body.buoys);
  data.forEach(element => {
    console.log(element);
  });
  exec("./weather_stats_parallel " + data.join(" "), (error, stdout, stderr) => {
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
