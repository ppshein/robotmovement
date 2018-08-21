'use strict'

/* Dependencies */
const express = require('express')
const app = express()
const cors = require('cors')

/* CORS configuration */
var corsOptions = {
	origin: 'http://127.0.0.1:8080',
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
		res.json(movementServices.moveDirection(directionOfRebot));
	} else if (validationServices.validationData(directionOfRebot) === 3) {
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
