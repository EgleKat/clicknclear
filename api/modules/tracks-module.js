//read JSON, if another process edits the file, it won't be updated
const fs = require('fs');

let rawdata = fs.readFileSync('tracks.json');
let tracks = JSON.parse(rawdata).tracks;
console.log(tracks);


exports.getTrack = function (req, res) {

    //check if req data is a number
    let trackIdReq = parseInt(req.params.track_id, 10);
    if (isNaN(trackIdReq)) {
        res.send({err:'ERR, invalid ID'});
        return;
    }
    let track = tracks.find((track) => {
        return (track.id === trackIdReq);
    });
    if (!track) {
        res.send({ err: 'ERR, track ' + req.params.track_id + ' not found' });
        return;
    }
    res.send(track);
}

exports.getAllTracks = function (req, res) {
    res.send(tracks);
}

exports.getTracksByArtist = function (req, res) {
    let reqArtist = req.params.artist;
    if (!reqArtist) {
        res.send({ err: 'Err, invalid Artist' });
        return;
    }

    let artistTracks = tracks.filter((track) => (track.artist === reqArtist));

    res.send(artistTracks);
}