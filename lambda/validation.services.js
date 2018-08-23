'use strict'

/* Services */
const cacheServices = require('./cache.services');

exports.validationData = (axis) => {
    /* 3 = init, 2 = out of table, 1 = able to move */
    var isValid = 3;
    try {
        if (axis) {
            if ((axis.x >= 0 && axis.x <= 4) && (axis.y >= 0 && axis.y <= 4)) {
                isValid = 1;
            } else {
                isValid = 2;
            }
        } else {
            isValid = 3;
        }
    } catch(err) {
        isValid = 3;
        console.log('error found in validationData:' + err);
    }
    return isValid;
}

exports.checkLastMoveInside = () => {
    // check lastMove is inside DynamoDb or not
    return cacheServices.getCacheFromDynamoDb().then((lastMove) => {
        if (lastMove && lastMove.Items[0]) {
            // if lastMove is exist, get it.
            return lastMove.Items[0].lastMove;
        } else {
            // if lastMove is not exist, return current date and don't need to wait response from added one.
            cacheServices.createCache();
            return new Date().toString();
        }
    }).catch((err) => {
        console.log('Error found in checkLastMoveInside:' + err);
        return err;
    });
}

exports.checkOffline = (lastMove) => {
    // define default variable to set yes
    var isCache = true;
    
    // check Bot is offline
    try {
        const currentMoveDate = new Date();
        const lastMoveDate = new Date(lastMove);
        const difference = (currentMoveDate.getTime() - lastMoveDate.getTime()) / 1000;
        return difference < 5;
    } catch (err) {
        console.log('error found in checkOffline:' + err);
        return true;
    }
}