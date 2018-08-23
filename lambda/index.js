/* Services */
const validationServices = require('./validation.services'),
    movementServices = require('./movement.services'),
    cacheServices = require('./cache.services');

exports.handler = (event, context, callback) => {
    
    // declare response
    var response = {
        statusCode: 200,
        headers: { 
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    try {
        
        // get query param object from Lambda
        const x = event['queryStringParameters']['x'];
        const y = event['queryStringParameters']['y'];
        const f = event['queryStringParameters']['f'];
        const d = event['queryStringParameters']['d'];
        
        // create bot Direction Object
        var directionOfRebot = {
            x: x,
            y: y,
            f: f,
            d: d
        }
        
        validationServices.checkLastMoveInside().then((data) => {
            if (data) {
                if (!validationServices.checkOffline(data)) {
                    const nextMove = movementDirection(directionOfRebot);
                    // lastMove is over 5 seconds, hence move to Next and save it.
                    cacheServices.createCache();
                    callback(null, nextMove);
                } else {
                    // bot is now offline, don't move anywhere
                    callback(null, directionOfRebot);
                }
            } else {
                console.log('no data found in validationServices.checkLastMoveInside');
                // error found, don't move Robot
                callback(null, directionOfRebot);
            }
           
        }).catch((err) => {
            console.log('error found in validationServices.checkLastMoveInside ' + err);
            // error found, don't move Robot
            callback(null, directionOfRebot);
        });
    } catch (err) {
        // if no query string found, show error message.
        console.log('no query string found ' + err);
        response.body = 'missing required information';
        callback(null, response);
    }
    
};

function movementDirection(directionOfRebot) {
    
    // declare response
    var response = {
        statusCode: 200,
        headers: { 
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    // validation rules added
	if (validationServices.validationData(directionOfRebot) === 1) {
	    response.body = JSON.stringify({
            message: movementServices.moveDirection(directionOfRebot)
        });
	    return response;
	} else if (validationServices.validationData(directionOfRebot) === 3) {
		response.body = JSON.stringify({
            message: {
                x: 0,
                y: 0
            }
        });
		return response;
	} else {
		// if robot reach out of table, leave as current position
		response.body = JSON.stringify({
            message: {
                x: parseInt(directionOfRebot.x),
    			y: parseInt(directionOfRebot.y),
    			f: directionOfRebot.f,
    			d: directionOfRebot.d
            }
        });
		return response;
	}
}