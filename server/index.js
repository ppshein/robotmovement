'use strict'

/* Dependencies */
const express = require('express'),
	app = express(),
	cors = require('cors'),
	winston = require('winston');

/* CORS configuration */
/* as testing purpose, allow all incoming requests. */
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

/* Services */
const validationServices = require('./services/validation.services');
const movementServices = require('./services/movement.services');

app.set('port', (process.env.PORT || 5000))

// index
app.get('/', cors(corsOptions), function (req, res) {
	var directionOfRebot = req.query;
	if (validationServices.validationData(directionOfRebot) === 1) {
		movementServices.moveDirection(directionOfRebot).then((directionOfRebot) => {
			res.json(directionOfRebot);
		}).catch(function (err) {
			winston.error('movementServices.moveDirection error: %s', err);
			/* if error found, leave as current position */
			res.json({
				x: parseInt(directionOfRebot.x),
				y: parseInt(directionOfRebot.y),
				f: directionOfRebot.f,
				d: directionOfRebot.d
			});
		});
	} else if (validationServices.validationData(directionOfRebot) === 3) {
		/* init position */
		res.json({
			x: 0,
			y: 0
		});
	} else {
		/* if robot reach out of table, leave as current position */
		res.json({
			x: parseInt(directionOfRebot.x),
			y: parseInt(directionOfRebot.y),
			f: directionOfRebot.f,
			d: directionOfRebot.d
		});
	}
});

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
