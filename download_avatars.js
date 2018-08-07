var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'secret.GITHUB_TOKEN'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
    var json = JSON.parse(body);
    for (var i in json) {
      var filePath = "avatars/" + json[i].login + ".jpg";
      // avatarURL.push(json[i].avatar_url);
      var avatarURL = json[i].avatar_url;
      downloadImageByURL(avatarURL, filePath);
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Downloading image ' + filePath);
    })
    .pipe(fs.createWriteStream(filePath))
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err);
  // console.log("Result: ", result);
});