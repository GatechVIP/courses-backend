var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");
var url = "http://critique.gatech.edu/course.php?id=CS2050"

download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);
    var json = {};
    var tdArr = [];
    var professorInfo = [];
    //var Pclass = {};
    $('td').each(function() {
      //tdArr = $(this).text();
      tdArr.push($(this).text());
      //console.log($(this).text());
    });
    json.gpa = tdArr[1] + " A:" + tdArr[2] + "%" + " B:" + tdArr[3] + "%"+ " C:" + tdArr[4] + "%"+ " D:" + tdArr[5] + "%"+ " F:" + tdArr[6] + "%";
    json.CRN = url.split("=")[1];
    json.pInfo = professorInfo;


    //console.log((tdArr.length - 7) / 9);
    for (var i = 0; i < ((tdArr.length - 7) / 9); i++) {
      var Pclass = {};
      //Pclass.pName = "";
      professorInfo[i] = Pclass;
    }

    //console.log(tdArr);
    for (var i = 7; i < tdArr.length; i++) {
      //console.log(tdArr[i]);
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

    console.log(json);
    console.log("done");

    // var fs = require('fs');
    // var stream = fs.createWriteStream("info.json");
    // stream.once('open', function(fd) {
    //   stream.write(data);
    //   stream.end();
    // });
  }
  else console.log("error");  
});