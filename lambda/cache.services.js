/* AWS services */
const AWS = require('aws-sdk'),
    docClient = new AWS.DynamoDB.DocumentClient();

/* ENV variable */
const CacheTable = process.env.CACHE_TABLE;

// add Cache to DynamoDb
var createCache = exports.createCache = () => {
    var params = {
        TableName: CacheTable,
        Key: {
            'lastMove': new Date().toString()
        }
    };
    return docClient.put(params).promise();
}

// update Cache to DynamoDb
var updateCache = exports.createCache = () => {
    var params = {
        TableName: CacheTable,
        Key: {
            'lastMove': new Date().toString()
        }
    };
    return docClient.update(params).promise();
}

// fetch Cache from DyanmoDb
var getCacheFromDynamoDb = exports.getCacheFromDynamoDb = () => {
    var params = {
        TableName: CacheTable,
        Limit: 1,
        ScanIndexForward : false
    };
    return docClient.scan(params).promise();
}