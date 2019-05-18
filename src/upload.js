const SHA256 = require("crypto-js/sha256");
const path = require('path');
const fs = require('fs');
var querystring = require('querystring');
var FormData = require('form-data');

var uid = "74665";
var token = "3000ca1bdf8d9441ae20833b9a5df246";
var timeStamp = Math.floor(Date.now() / 1000);
var hash = SHA256(token+":"+timeStamp);
var b64 = new Buffer.from(uid+":"+hash).toString('base64');
//console.log(timeStamp);
//console.log(b64);

var projectURL = "https://www.quantconnect.com/api/v2/projects/read";
var fileURL = "https://www.quantconnect.com/api/v2/files/read";
var createURL = "https://www.quantconnect.com/api/v2/files/create";
var projectList = [];
var homedir = require('os').homedir();
var homePath = path.join(homedir,'QuantConnect');
var fileName = "test.py";
var userId = "74665";
var projectId = "2656859";
var request = require('request');
var fileContent = fs.readFileSync(path.join(homePath,userId, projectId, fileName)).toString();
request.post({
	url: createURL,
	headers: {
		'Authorization' : "Basic "+b64,
		'Timestamp': timeStamp
	},
	formData:{
		projectId: "2656859",
		name: "test.py",
		content: fileContent
	}
}, function (err, res, body){
	content = JSON.parse(body);
	console.log(content);
}
);