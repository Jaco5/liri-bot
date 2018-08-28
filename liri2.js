
//declare all global variables, to handle requires and terminal input
require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var arg = process.argv.slice(3).join('+');
var doThis = process.argv[2];

//switch cases based on terminal input
        switch (doThis) {
            case 'spotify-this-song':
                spotifyThis();
                break;
            case 'movie-this':
                movieThis();
                break;
            case 'concert-this':
                concertThis();
                break;
            case "do-what-it-says":
                doItThis();
                break;
        }

  //funcitons to make requests to APIs and print desired info from the results  

function spotifyThis() {
    
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret,
        });
        var queryURL = 'https://api.spotify.com/v1/search?query=' + arg + '&type=track&offset=2&limit=2'
        spotify
            .request(queryURL)
            .then(function (data) {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Sample: " + data.tracks.items[0].uri);
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });}
    
function movieThis() {
        var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&plot=short&type=movie&t=' + arg;
        var request = require('request');
        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var parseBody = JSON.parse(body)
                console.log("Title: " + parseBody.Title + "\nYear: " + parseBody.Year + "\nIMDB: " + parseBody.imdbRating + "\nCountry: " + parseBody.Country + "\nLanguage: " + parseBody.Language + "\nPlot: " + parseBody.Plot + "\nActors: " + parseBody.Actors)
            }//+ "\nRotten Maters:" +body.Ratings[1].Value
             //need to figure out why I can't get into this ratings array. Probably the same reason I can't get concert this to print
        });}
    

function concertThis() {
    var appID = 'codingbootcamp';
    var queryURL = 'https://rest.bandsintown.com/artists/' + arg + '/events?app_id=' + appID;

    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var parseBodyArr = JSON.parse(body);

                for (var i = 0; i < 3; i++) {
                        
                        var date = moment(parseBodyArr[i].datetime, "YYYY-MM-DDTHH:mm:ss");
                        var convertedDate = moment(date).format("MM/DD/YYYY");

                        console.log("Venue: " + parseBodyArr[i].venue.name + "\nVenue location: " + parseBodyArr[i].venue.city + ", " + parseBodyArr[i].venue.region + "\nDate of event: " + convertedDate + "\n");
                } 
            }})}
        

function doItThis() {

        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            }
            
            var dataArr = data.split(",");
            doThis = dataArr[0];
            arg = dataArr[1];

            switch (doThis) {
                case 'spotify-this-song':
                    spotifyThis();
                    break;
                case 'movie-this':
                    movieThis();
                    break;
                case 'concert-this':
                    concertThis();
                    break;
                case "do-what-it-says":
                    doItThis();
                    break;
            }
          })}