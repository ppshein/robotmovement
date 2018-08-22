'use strict'

const winston = require('winston');

/* we will configure all validation rules here */
exports.validationData = (axis) => {
    /* 3 = init, 2 = out of table, 1 = able to move */
    var isValid = 3;

    try {
        if (axis) {
            if ((axis.x && axis.x >= 0 && axis.x <= 4) && (axis.y && axis.y >= 0 && axis.y <= 4)) {
                isValid = 1;
            } else {
                isValid = 2;
            }
        } else {
            isValid = 3;
        }
    } catch(err) {
        isValid = 3;
        winston.error('validationData error: %s', err);
    }
    
    return isValid;
}