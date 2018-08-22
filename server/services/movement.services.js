'use strict'

const Promise = require('bluebird');

exports.moveDirection = (commandar) => {

    /* define promises */
    const q = Promise.defer();

    /* define init movement */
	const movementOfRebot = {
		x: parseInt(commandar.x),
		y: parseInt(commandar.y),
        f: commandar.f,
        d: commandar.d
    };

    /* define direction name */
    const directions = {
        orientation: [
            { orientation: 'left', degree: -90 },
            { orientation: 'right', degree: 90 },
        ],
        degrees: [
            { degree: 0, direction: 'north' },
            { degree: 90, direction: 'east' },
            { degree: 180, direction: 'south' },
            { degree: 270, direction: 'west' }
        ]
    };

    /* add error handling */
    try {
        if (commandar.d === 'move') {
            movementOfRebot.f = movementCalculation(commandar, movementOfRebot);
        } else {
            const direction = directions.degrees.filter((e) => e.direction === commandar.f)[0];
            const orientation = directions.orientation.filter((e) => e.orientation === commandar.d)[0];
            movementOfRebot.f = getDirection(parseInt(direction.degree) + parseInt(orientation.degree));
        }
        q.resolve(movementOfRebot);
    } catch (e) {
        q.reject(e);
    }
    return q.promise;
}

/* 
    create separate function
    it's just for direction function 
*/
function movementCalculation(commandar, movementOfRebot) {
    var nextStep = 0;
    if (commandar.d === 'move' && commandar.f === 'north') {
        parseInt(commandar.y) + 1 > 4 ? movementOfRebot.y : movementOfRebot.y += 1;
		nextStep = commandar.f;
    } else if (commandar.d === 'move' && commandar.f === 'east') {
        parseInt(commandar.x) + 1 > 4 ? movementOfRebot.x : movementOfRebot.x += 1;
        nextStep = commandar.f;
    } else if (commandar.d === 'move' && commandar.f === 'west') {
        parseInt(commandar.x) - 1 < 0 ? movementOfRebot.x : movementOfRebot.x -= 1;
        nextStep = commandar.f;
    } else if (commandar.d === 'move' && commandar.f === 'south') {
        parseInt(commandar.y) - 1 < 0 ? movementOfRebot.y : movementOfRebot.y -= 1;
        nextStep = commandar.f;
    }
    return nextStep;
}

/* 
    it's to convert angle to direction
    if angle = 0, that function will convert 0 to north
*/
function getDirection(angle) {
    /* clockwise direction */
    var directions = ['north', 'east', 'south', 'west'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 90) % 4];
}