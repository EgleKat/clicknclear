var express = require('express');
var router = express.Router();
var tracksModule = require('../modules/tracks-module');

router.get('/:track_id', tracksModule.getTrack);

module.exports = router;