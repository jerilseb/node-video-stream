const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/video", function(req, res) {
  const path = "sample.mp4";
  const stat = fs.statSync(path);
  const fileSize = stat.size;

  const head = {
    "Content-Length": fileSize,
    "Content-Type": "video/mp4"
  };
  res.writeHead(200, head);
  fs.createReadStream(path).pipe(res);
});

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
