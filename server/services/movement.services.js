'use strict'

exports.moveDirection = (directionOfRebot) => {
	var movementOfRebot = {
		x: parseInt(directionOfRebot.x),
		y: parseInt(directionOfRebot.y),
        m: directionOfRebot.f
    };

    if (directionOfRebot.d === 'move') {
        movementOfRebot.m = movementCalculation(directionOfRebot, movementOfRebot);
    }

    /*
    else if (directionOfRebot.d === 'left' && directionOfRebot.f === 'north') {
		  movementOfRebot.m = 'west';
    } else if (directionOfRebot.d === 'right' && directionOfRebot.f === 'north') {
		  movementOfRebot.m = 'east';
    } else if (directionOfRebot.d === 'left' && directionOfRebot.f === 'east') {
		  movementOfRebot.m = 'north';
    } else if (directionOfRebot.d === 'right' && directionOfRebot.f === 'east') {
		  movementOfRebot.m = 'south';
    } else if (directionOfRebot.d === 'left' && directionOfRebot.f === 'west') {
		  movementOfRebot.m = 'south';
    } else if (directionOfRebot.d === 'right' && directionOfRebot.f === 'west') {
		  movementOfRebot.m = 'north';
    } else if (directionOfRebot.d === 'left' && directionOfRebot.f === 'south') {
		  movementOfRebot.m = 'east';
    } else if (directionOfRebot.d === 'right' && directionOfRebot.f === 'south') {
		  movementOfRebot.m = 'west';
    }
    */
    return movementOfRebot;
}

function movementCalculation(directionOfRebot, movementOfRebot) {
    var nextStep = 0;
    if (directionOfRebot.d === 'move' && directionOfRebot.f === 'north') {
        parseInt(directionOfRebot.y) + 1 > 4 ? movementOfRebot.y : movementOfRebot.y += 1;
		nextStep = directionOfRebot.f;
    } else if (directionOfRebot.d === 'move' && directionOfRebot.f === 'east') {
        parseInt(directionOfRebot.x) + 1 > 4 ? movementOfRebot.x : movementOfRebot.x += 1;
        nextStep = directionOfRebot.f;
    } else if (directionOfRebot.d === 'move' && directionOfRebot.f === 'west') {
        parseInt(directionOfRebot.x) - 1 < 0 ? movementOfRebot.x : movementOfRebot.x -= 1;
        nextStep = directionOfRebot.f;
    } else if (directionOfRebot.d === 'move' && directionOfRebot.f === 'south') {
        parseInt(directionOfRebot.y) - 1 < 0 ? movementOfRebot.y : movementOfRebot.y -= 1;
        nextStep = directionOfRebot.f;
    }
    return nextStep;

}