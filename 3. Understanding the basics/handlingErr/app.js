const http = require("http");
const url = require("url");
const fs = require("fs");
const server = http.createServer(function (req, res) {
  console.log(req.url);
  let adr = "http://localhost:8080/default.htm?year=2017&month=february";
  let urlInfo = url.parse(adr, true);
  console.log(urlInfo.path);
  console.log(urlInfo.host);
  console.log(urlInfo.port);
  console.log(urlInfo.pathname);

  const filename = `.${urlInfo.pathname}`;
  console.log(filename);
  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      return res.end("404 not found");
    }
  });

  res.writeHead(200, { "Content-Type": "text/html" });
  console.log(res);
  res.write("200 OK");
  return res.end();
});
server.listen("8000");
