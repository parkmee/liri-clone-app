console.log("this is loaded");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.bands = {
    apikey: process.env.BANDS_API_KEY
};

exports.omdb = {
    id: process.env.OMDB_ID,
    apikey: process.env.OMDB_API_KEY
}