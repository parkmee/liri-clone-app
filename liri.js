require("dotenv").config();

// installed npm packages and external files
const request = require("request");
const moment = require("moment");
const keys = require("./key.js");
const fs = require('fs');

// label arguments in input array
const command = process.argv[2];
const nodeArgs = process.argv;

// define search term string from process.argv input
let input = "";
let connector = "";

// use different search term connector depending on type of search
if (command === "concert-this"){
    connector = "+";
} else {
    connector = " ";
}

for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length){
        input = `${input}${connector}${nodeArgs[i]}`;
    } else {
        input += nodeArgs[i];
    }
}

runLiri(command, input);

function runLiri(command, input) {
    // run API search function depending on command given
    switch(command) {
    case "concert-this":
        searchBands(input);
        break;
    case "spotify-this-song":
        searchSpotify(input);
        break;
    case "movie-this":
        searchMovies(input);
        break;
    case "do-what-it-says":
        searchFile();
        break;
    default:
        seeError(command, input);
        break;
    }
}

// search for events by artist using Bands in Town
function searchBands(input){

    // log message to text file
    logMsg(`Searching Bands in Town for ${input}`);

    // set API search paramters
    const queryUrl = `https://rest.bandsintown.com/artists/${input}/events?app_id=${keys.bands.apikey}`;
    const options = {
        url: queryUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        }
    }

    // use request npm to retrieve event info for a given input (artist)
    request(options, function(error, response, body){

        // if error exists, log error
        if(error != null){
            console.log(`Error: ${error}`);
            logMsg(`Error: ${error}`);
        } else {
            const bandInfo = JSON.parse(body);

            // for each scheduled concert
            for (event in bandInfo) {

                const eventInfo = bandInfo[event];
                
                // set date format
                const date = moment(eventInfo.datetime).format("MM/DD/YYYY");

                // log event info
                msgTxt = [date, eventInfo.lineup[0], eventInfo.venue.name, eventInfo.venue.city, eventInfo.venue.region, eventInfo.venue.country]
                logMsg(msgTxt);

                // print event info in console log
                console.log(`********************${date}********************`);
                console.log(`Artist: ${eventInfo.lineup[0]}`);
                console.log(`Venue: ${eventInfo.venue.name}`);

                // set location format for domestic (city, region) and international (city, country) events
                if (eventInfo.venue.region === ""){
                    console.log(`Location: ${eventInfo.venue.city}, ${eventInfo.venue.country}`);
                } else {
                    console.log(`Location: ${eventInfo.venue.city}, ${eventInfo.venue.region}`);
                }               
                console.log(`**************************************************\n`);
            }
        }
    })
}

// Search for songs using Spotify npm package
function searchSpotify(input){

    if(input === "") {
        // if no song/artist information is entered, search using a default song
        searchSpotify("The Sign Ace of Base")
    } else {
        // log message to text file
        logMsg(`Searching for ${input} on Spotify`);
        
        // setup spotify npm package for use
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });

        spotify // search spotify using promise and log resopnse
            .search({ type: "track", query: `${input}`})
            .then(function(response){
                for (song in response.tracks.items){
                    const songInfo = response.tracks.items[song];

                    const msgTxt = [songInfo.artists[0].name, songInfo.name, songInfo.album.name, songInfo.preview_url];
                    logMsg(msgTxt);

                    console.log(`***********************************************`);
                    console.log(`Artist(s): ${songInfo.artists[0].name}`);
                    console.log(`Song: ${songInfo.name}`);
                    console.log(`Album: ${songInfo.album.name}`);
                    console.log(`Preview: ${songInfo.preview_url}`);
                    console.log(`***********************************************`);
                }
            })
            .catch(function(err){
                console.log(err);
                logMsg(`Error: ${err}`); // log error if it occurs
            });
    }
}

// search OMDB for movie info
function searchMovies(input){

    // define search parameters
    const queryUrl = `http://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=${keys.omdb.apikey}`
    request(queryUrl,function(error, response, body){

        // log message to text file
        logMsg(`Searching OMDB for ${input}`);

        if(input === "") {
            searchMovies("Mr.+Nobody"); // if no input, run default search using Mr Nobody
        } else if (error != null) {
            console.log(error);
            logMsg(`Error: ${error}`); // log an error message if an error is returned
        } else {
            // print movie info to log and console
            const movieInfo = JSON.parse(body);
            const msgTxt1 = [movieInfo.Title, movieInfo.Year, movieInfo.Country, movieInfo.Language, movieInfo.Actors]
            const msgTxt2 = [movieInfo.Ratings[0].Value, movieInfo.Ratings[1].Value, movieInfo.Plot]
            logMsg(msgTxt1);
            logMsg(msgTxt2);
            console.log(`Title: ${movieInfo.Title}`);
            console.log(`Year: ${movieInfo.Year}`);
            console.log(`IMDB Rating: ${movieInfo.Ratings[0].Value}`);
            console.log(`Rottom Tomatoes Rating: ${movieInfo.Ratings[1].Value}`);
            console.log(`Country: ${movieInfo.Country}`);
            console.log(`Language: ${movieInfo.Language}`);
            console.log(`Plot: ${movieInfo.Plot}`);
            console.log(`Actors: ${movieInfo.Actors}`);
        }
    });
}

function searchFile(){
    // setup fs package for use
    fs.readFile("random.txt", "utf8", function(err, data) {
        const fileInfo = data.split(",");
        runLiri(fileInfo[0], fileInfo[1]);
    })
}

// output an error message if an invalid command has been entered
function seeError(command, input){
    logMsg("You've entered an invalid command.");
    console.log("You've entered an invalid command.");
    console.log("Enter one of the following commands, replacing the text with a search string (no brackets or quotation marks needed):");
    console.log("node liri.app concert-this [artist name]");
    console.log("node liri.app spotify-this-song [song and/or artist name]");
    console.log("node liri.app movie-this [movie name]");
    console.log("node liri.app do-what-it-says");
}

function logMsg(message) {
    const logFile = "./log.txt";
    fs.appendFile(logFile, message + "\n", function(err) {
        if (err != null) {
            console.log("Error logging message to file");
        }
    });
}