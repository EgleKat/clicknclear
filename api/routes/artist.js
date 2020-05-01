var express = require('express');
var router = express.Router();
var tracksModule = require('../modules/tracks-module');

router.get('/:artist',tracksModule.getTracksByArtist);

module.exports = router;