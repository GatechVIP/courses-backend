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
    var Pclass = {};
    $('td').each(function() {
      //tdArr = $(this).text();
      tdArr.push($(this).text());
      console.log($(this).text());
    });

    //var tdArr = $('td').$(this).text().toArray();
    json.gpa = tdArr[1] + " A:" + tdArr[2] + "%" + " B:" + tdArr[3] + "%"+ " C:" + tdArr[4] + "%"+ " D:" + tdArr[5] + "%"+ " F:" + tdArr[6] + "%";
    json.CRN = url.split("=")[1];

    json.pInfo = professorInfo;
    //console.log(tdArr);
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