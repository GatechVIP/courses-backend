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
var url = "http://critique.gatech.edu/course.php?id=CS1331"

download(url, function(data) {
  if (data) {
    //console.log(data);

    var $ = cheerio.load(data);
    var json = {};
    // $("div.artSplitter > img.blkBorder").each(function(i, e) {
    //     console.log($(e).attr("src"));
    // });
    var tdArr = [];
    $('td').each(function() {

    //tdArr = $(this).text();
    tdArr.push($(this).text());

    });

    //var tdArr = $('td').$(this).text().toArray();
    //json.gpa = tdArr[0];
    console.log(tdArr);

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