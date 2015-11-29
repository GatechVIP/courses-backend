var request = require('request');
var Q = require("q");
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, id, callback) {
  var deferred = Q.defer()

  request(url, {qs:{id : id}}, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      
      deferred.resolve(callback(html, id)) // fulfills the promise with `data` as the value

    } else { deffered.reject(err)}
  });
  return deferred.promise // the promise is returned
}

var cheerio = require("cheerio");
//var url = "http://critique.gatech.edu/course.php?id=CS2050"

function handleData(data, id) {
  if (data) {

    var $ = cheerio.load(data);
    var json = {};
    var tdArr = [];
    var professorInfo = [];
    var Pclass = {};
    $('td').each(function() {
      tdArr.push($(this).text());
    });

    json.gpa = tdArr[1] + " A:" + tdArr[2] + "%" + " B:" + tdArr[3] + "%"+ " C:" + tdArr[4] + "%"+ " D:" + tdArr[5] + "%"+ " F:" + tdArr[6] + "%";
    json.CRN = id;
    json.pInfo = professorInfo;
    for (var i = 0; i < ((tdArr.length - 7) / 9); i++) {
      var Pclass = {};
      professorInfo[i] = Pclass;
    }
    for (var i = 7; i < tdArr.length; i++) {
      if ((i - 7) % 9 == 0) {
        professorInfo[Math.floor((i-7)/9)].pName = tdArr[i];
      }
      if ((i - 7) % 9 == 1) {
        professorInfo[Math.floor((i-7)/9)].classSize = tdArr[i];
      }
      if ((i - 7) % 9 == 2) {
        professorInfo[Math.floor((i-7)/9)].gpaOverall = tdArr[i];
      }
      if ((i - 7) % 9 == 3) {
        professorInfo[Math.floor((i-7)/9)].A = tdArr[i];
      }
      if ((i - 7) % 9 == 4) {
        professorInfo[Math.floor((i-7)/9)].B = tdArr[i];
      }
      if ((i - 7) % 9 == 5) {
        professorInfo[Math.floor((i-7)/9)].C = tdArr[i];
      }
      if ((i - 7) % 9 == 6) {
        professorInfo[Math.floor((i-7)/9)].D = tdArr[i];
      }
      if ((i - 7) % 9 == 7) {
        professorInfo[Math.floor((i-7)/9)].F = tdArr[i];
      }
      if ((i - 7) % 9 == 8) {
        professorInfo[Math.floor((i-7)/9)].W = tdArr[i];
      }
    }
    return json;
  }
  else console.log("error");  
}


var Query = {};
  Query.url = "http://critique.gatech.edu/course.php";
  Query.fetchCourse = function(id) {

    var newUrl = Query.url;
    return download(newUrl , id, handleData);
  }

module.exports = Query;