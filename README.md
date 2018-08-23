# Robot Movement

There is three folders included. Frontend development is called `client` and its linked to `server`. For online test case , I prefer `lambda` folder. It's included 5 seconds offline mode. For code checking, please use `server` and `lambda` folders. For `client`, I didn't code and folder structure optimization.

To test online, I've integrated API Gateway, Lambda, DynamoDb and S3.
http://robotmovement.s3-website-ap-southeast-1.amazonaws.com

For backend api,
https://5sb06hqgnf.execute-api.ap-southeast-1.amazonaws.com/prod?x=0&y=0&f=north&d=move



Stack
=============
* Node.js (v7.0.0)
* Angular.js
* yarn
* bower

## Information
As it's for nodejs project, I didn't effort to optimize client angularjs application by the way of separation files, minify, gulp and so on.

## Installation
1. To run NodeJS locally, you must have to install `yarn` first and install all dependencies
```
    yarn install
```
2. Run `Bower` for frontend dependencies
```
    sudo npm install -g bower
```
3. Install application dependencies
```
 bower install & npm install
```


## Build and run
Run locally for server, go to `server` folder and run, `node index.js`

Run locally for client, go to `client` folder and run, `http-server`


## Lambda integration
https://5sb06hqgnf.execute-api.ap-southeast-1.amazonaws.com/prod?x=0&y=0&f=north&d=move

## S3
To test that Project, click on following link and its explanation is included.
http://robotmovement.s3-website-ap-southeast-1.amazonaws.com/

## Output
![alt text](https://preview.ibb.co/cAO9xe/Screen_Shot_2018_08_22_at_10_21_16_AM.png)
