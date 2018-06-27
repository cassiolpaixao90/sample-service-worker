const express = require('express'),
      app = express(),
      dist = 'dist',
      fs = require('fs'),
      http = require('http'),
      path = require('path'),
      chalk =require('chalk'),
      https = require('https');

app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(`./${dist}/index.html`);
});

app.get('/node_modules/workbox-sw/build/importScripts/:version', (req, res) => {
  res.sendFile(`${__dirname}/node_modules/workbox-sw/build/importScripts/${req.params.version}`);
});

app.get('/manifest.json', (req, res) => {
  res.json({
    "gcm_sender_id": "653317226796"
  });
});

var pkey = fs.readFileSync('proxy/key.pem');
var pcert = fs.readFileSync('proxy/cert.pem');
var options = {
    key: pkey,
    cert: pcert
};
https.createServer(options, app).listen(8080, function(){
  console.log( chalk.green.bold(`Express server listening on https://localhost:${8080}`));
});


