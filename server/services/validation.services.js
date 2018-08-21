'use strict'

/*
var moveDirection = exports.listDirection = () => {
    return ['east', 'west', 'north', 'south'];
};

var headingDirection = exports.listDirection = () => {
    return ['move', 'left', 'right'];
};
*/

exports.validationData = (axis) => {
    /* 3 = init, 2 = out of table, 1 = able to move */
    var isValid = 3;
    if (axis) {
        if ((axis.x >= 0 && axis.x <= 4) && (axis.y >= 0 && axis.y <= 4)) {
            isValid = 1;
        } else {
            isValid = 2;
        }
    } else {
        isValid = 3;
    }
    return isValid;
}