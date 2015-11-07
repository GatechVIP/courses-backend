var request = require('request');
var Q = require("q");
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  var deferred = Q.defer()

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      
      deferred.resolve(callback(html)) // fulfills the promise with `data` as the value

    } else { deffered.reject(err)}
  });
  return deferred.promise // the promise is returned

}

var cheerio = require("cheerio");
var url = "http://critique.gatech.edu/course.php?id=CS2050"

function handleData(data) {
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
    json.CRN = url.split("=")[1];
    json.pInfo = professorInfo;
    return json;
  }
  else console.log("error");  
}


var Query = {};
  Query.url = "http://critique.gatech.edu/course.php?id=";
  Query.fetchCourse = function(id) {

    var newUrl = Query.url + id;
    return download(newUrl, handleData);
  }

module.exports = Query;