# liri-clone-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _=Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Getting Started
*Note: You must have your own API keys to Bands in Town, OMDB, and Spotify saved to a .env file on your computer to run this program.*

Use the following command line entries in your terminal to search for concerts, movie info, and song info using this LIRI bot. Names of artists, songs, or movies do not need to be in quotes.

Search Type | Command Line Entry | Search Results
----------- | ------------------ | --------------
Concert | node liri.app concert-this [artist name] | Date, Venue, Location
Song | node liri.app spotify-this-song [song name] [artist name(optional)] | Artist, Song, Album, Preview
Movie | node liri.app movie-this [movie name] | Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors
From File | node liri.app do-what-it-says

## Built With

* Javascript
* jQuery
* NodeJS
* NPM Packages
    * MomentJS
    * Request
    * Node-Spotify-API
* APIs
    * Bands in Town
    * Spotify
    * OMDB

## Links

https://parkmee.github.io/liri-clone-app/

## Authors

* **Meeyoung Park** - [parkmee](https://github.com/parkmee)