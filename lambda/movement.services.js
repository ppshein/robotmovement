'use strict'

exports.moveDirection = (commandar) => {
    /* define init movement */
	var movementOfRebot = {
		x: parseInt(commandar.x),
		y: parseInt(commandar.y),
        f: commandar.f,
        d: commandar.d
    };

    /* define direction name */
    var directions = {
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

    try {
        if (commandar.d === 'move') {
            movementOfRebot.f = movementCalculation(commandar, movementOfRebot);
        } else {
            var direction = directions.degrees.filter((e) => e.direction === commandar.f)[0];
            var orientation = directions.orientation.filter((e) => e.orientation === commandar.d)[0];
            movementOfRebot.f = getDirection(parseInt(direction.degree) + parseInt(orientation.degree));
        }
    } catch (err) {
        
    }

    return movementOfRebot;
}

/* create separate function */
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

function getDirection(angle) {
    var directions = ['north', 'east', 'south', 'west'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 90) % 4];
}

/* calculation orientation for 90% */
function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
}

/* calculation orientation for 360% */
function angle360(cx, cy, ex, ey) {
    var theta = angle(cx, cy, ex, ey);
    if (theta < 0) theta = 360 + theta;
    return theta;
}