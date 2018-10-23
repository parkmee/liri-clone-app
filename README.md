# liri-clone-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _=Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Getting Started
*Note: You must have your own API keys to Bands in Town, OMDB, and Spotify saved to a .env file on your computer to run this program.*

Use the following command line entries in your terminal to search for concerts, movie info, and song info using this LIRI bot. Names of artists, songs, or movies do not need to be in quotes. An incorrect command will return command line entry syntax for you in the console.

Search Type | Command Line Entry | Search Results
----------- | ------------------ | --------------
Concert | node liri.app concert-this [artist name] | Date, Venue, Location
Song | node liri.app spotify-this-song [song and/or artist name] | Artist, Song, Album, Preview
Movie | node liri.app movie-this [movie name] | Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors
From File | node liri.app do-what-it-says | Song search results for "I want it that way"

Successfully executed searches will output results in the console and log.txt file. Sample outputs of each type of search and invalid responses can be seen in the below screenshots.

## Example Outputs
[Concert search using Bands in Town](/images/bands-in-town-search.png)
[Song search using Spotify](/images/spotify-search.png)
[Movie search using OMDB](/images/omdb-search.png)
[Search from file](/images/search-from/file.png)
[Invalid search](/images/invalid-command.png)

## Built With

* Javascript
* jQuery
* NodeJS
* NPM Packages
    * moment
    * request
    * node-spotify-api
    * fs
* APIs
    * Bands in Town
    * Spotify
    * OMDB

## Links

https://parkmee.github.io/liri-clone-app/

## Authors

* **Meeyoung Park** - [parkmee](https://github.com/parkmee)