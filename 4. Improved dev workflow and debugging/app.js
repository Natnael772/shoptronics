//core modules
//http: launch a server, send requests
//https(secure): launch ssl server. the data transferred is encrypted
//fs:
//path: constructs paths to files. mac and windows have different paths.
//os: to get relevant info about os...

// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log(req);
//   console.log(res);
// });
// server.listen(8080);

//require (path or module) imports module
// ./ look for local file
//we can instead look for global module
const http = require("http");

//importing module
const routes = require("./routes.js");

//create server
const server = http.createServer(routes.handler);

//use npm start for just default script defined
//use npm run name for my custom script names

server.listen("8080");

//we can also write like this
// const server = http.createServer();
// server.on("req", (req, res) => {
//   server.on("request", (request, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(
//       JSON.stringify({
//         data: "Hello World!",
//       })
//     );
//   });
// });
// server.listen(8080);
// exports.myDateTime = function () {
//   return Date();
// };
// myDateTime();
