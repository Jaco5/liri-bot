require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var request = require('request');


inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["spotify-this-song", "movie-this", "concert-this", "do-what-it-says"],
            name: "choice",
        },

    ])
    .then(function (inquirerResponse) {

        switch (inquirerResponse.choice) {
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

    })

function spotifyThis() {
    inquirer.prompt([
        {
            type: "input",
            name: "song",
            message: "Search for what song?"
        }
    ]).then(function (response) {
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret,
        });
        var queryURL = 'https://api.spotify.com/v1/search?query=' + response.song + '&type=track&offset=2&limit=2'
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
            });
    })
}

function movieThis() {
    inquirer.prompt([
        {
            type: "input",
            name: "movie",
            message: "What movie?"
        }
    ]).then(function (response) {
        var request = require('request');
        request('http://www.omdbapi.com/?apikey=trilogy&plot=short&type=movie&t=' + response.movie, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB: " + JSON.parse(body).imdbRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors)
            }//+ "\nRotten Maters:" +body.Ratings[1].Value

        });
    })
}

function concertThis() {
    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "What artist?"
        }
    ]).then(function (response) {
        
        // var bandsintown = require('bandsintown')('codingbootcamp');

        // bandsintown
        //     .getArtistEventList(response.artist)
        //     .then(function (events) {
        //          console.log(events[0]);
        //     });
        // })}
            var request = require('request');
            request("https://rest.bandsintown.com/artists/" + response.artist + "/events?app_id=codingbootcamp", function(error, response, body){
                if (!error && response.statusCode === 200) {
                    console.log(JSON.parse(body))
                } 
            })
        })
    }

    function doItThis() {
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }
          
            // We will then print the contents of data
            console.log(data);
          
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
          
            // We will then re-display the content as an array for later use.
            console.log(dataArr);
          
          });
          
    }