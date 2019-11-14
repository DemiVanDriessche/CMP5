/*
 * npm init
 * npm install express --save
 * npm install request --save
 * npm install ejs --save
 *
 * node(mon) index.js
 */

var express = require('express');
var request = require('request');
var path = require('path');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.listen(5500, function() {
  console.log('Node luistert op poort 5500');
});

console.log("Webserver draait");

var data;
request('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=OBJECTID,GISID,locatie_adres_ID,bloso_id,type,categorie,naam,straat,huisnr,busnr,postcode,gemeente,toegankelijk,email,telefoon&outSR=4326&f=json',
  function(error, response, body){
    data = JSON.parse(body);

    for(var i=0; i < data.features.length; i++) {
        /*console.log("naam: " + data.features[i].attributes.naam);
        console.log("coord: " + data.features[i].geometry.x + ", " + data.features[i].geometry.y);
        console.log("");*/
        console.log(data.features[i].attributes);
    }

  }
);

app.get('/', function(req, res){
  res.render('locaties', {
    cultuurlocaties: data
  });
});





