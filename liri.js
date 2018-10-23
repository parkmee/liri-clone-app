require("dotenv").config();
const keys = require("./key.js");

const logFile = "./log.txt";

// include API keys from .env file
//var spotify = new Spotify(keys.spotify);

// label arguments in input array
const command = process.argv[2];
const nodeArgs = process.argv;

// define search term string from process.argv input
let input = "";
for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length){
        input = `${input}+${nodeArgs[i]}`;
    } else {
        input += nodeArgs[i];
    }
}

switch(command) {
    case "concert-this":
        searchBands(input);
        break;
    case "spotify-this-song":
        searchSpotify(input, "");
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

function searchBands(input){
    logMsg(`Searching Bands in Town for ${input}`);

    const request = require("request");
    const moment = require("moment");
    const queryUrl = `https://rest.bandsintown.com/artists/${input}/events?app_id=${keys.bands.apikey}`;
    
    const options = {
        url: queryUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        }
    }

    request(options, function(error, response, body){
        if(error != null){
            console.log("error: "+error);
            logMsg(`Error: ${error}`);
        } else {
            const bandInfo = JSON.parse(body);
            for (event in bandInfo) {
                const eventInfo = bandInfo[event];
                const date = moment(eventInfo.datetime).format("MM/DD/YYYY");
                console.log(`********************${date}********************`);
                console.log(`Artist: ${eventInfo.lineup[0]}`);
                console.log(`Venue: ${eventInfo.venue.name}`);
                console.log(`Location: ${eventInfo.venue.city}, ${eventInfo.venue.region}`);
                console.log("\n");
            }
        }
    })
}

function searchSpotify(input, artists){

}

function searchMovies(input){

}

function searchFile(){

}

function seeError(command, input){

}

function logMsg(message) {

}