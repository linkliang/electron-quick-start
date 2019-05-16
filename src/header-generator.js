const SHA256 = require("crypto-js/sha256");
const path = require('path');
const fs = require('fs');
var querystring = require('querystring');

var uid = "74665";
var token = "3000ca1bdf8d9441ae20833b9a5df246";
var timeStamp = Math.floor(Date.now() / 1000);
var hash = SHA256(token+":"+timeStamp);
var b64 = new Buffer.from(uid+":"+hash).toString('base64');
//console.log(timeStamp);
//console.log(b64);

var projectURL = "https://www.quantconnect.com/api/v2/projects/read";
var fileURL = "https://www.quantconnect.com/api/v2/files/read";
var projectIDs = [];
var homedir = require('os').homedir();
var homdPath = path.join(homedir,'QuantConnect');
var userPath = homdPath;

var request = require('request');
request({
	url: projectURL,
	headers: {
		'Authorization' : "Basic "+b64,
		'Timestamp': timeStamp
	}
}, function (err, res, body){
	content = JSON.parse(body);
	userPath += "\\"+content["projects"][0]["ownerId"];
	JSON.parse(body)["projects"].forEach(function(project){
		projectIDs.push(project["projectId"]);
	});
	projectIDs.forEach(function(projectId){
		var projectPath = userPath+"\\"+projectId;
		var bodyContent = new FormData();
		bodyContent.append("projectId",projectId);
		request({
			url: fileURL,
			headers: {
				'Authorization' : "Basic "+b64,
				'Timestamp': timeStamp
			},
			Body: bodyContent
		}, function(err, res, body){
			console.log(body);
			if (err){
				console.log(err);
				return;
			}
			var filesContent = JSON.parse(body);
			filesContent["files"].forEach(function(file){
				fs.writeFileSync(path.join(projectPath,file["name"]),file["content"]);
			});
		})
	});
}
);

