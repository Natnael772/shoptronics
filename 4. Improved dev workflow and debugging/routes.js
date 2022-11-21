const fs = require("fs");
const { Module } = require("module");

// http.createServer(requestListener);
//createserver method creates server returns server

//createserver callback function executes whenever there is request

const requestHandler = (req, res) => {
  // console.log(req);
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers.host);
  // console.log(req.headers.connection);

  // console.log(req.method)
  // console.log(req.method);
  // console.log(req.headers);

  //res.setHeder(name, value)
  //Sets a single header value for headers object
  res.setHeader("Content-Type", "text/html");
  //res.write() sendss a chunk of response body

  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='post'><input type='text' name='msg'><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");

    //quit the function execution
    return res.end();
  }

  if (req.url == "/message" && req.method == "POST") {
    //listen for event
    //fires when it gets request- data
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(body);
    });

    //fires once it is done parsing the data
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("Done parsing");

      //returns key-value pairs
      //input name = input value
      //msg = input

      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      console.log(message);

      //writefilesync is synchronous and blocking
      //writefile is asynchronous
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my Node.js server</h1></body>");
  res.write("</html>");

  //res.end();
  //This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete.
  //so node sends to the client.
  //we can't write anything after end.
  res.end();

  //process.exit() hard-exits event loop so the program shuts down.
  // process.exit();
};

// module.exports = requestHandler;
//module.exports.handler = requestHandler
module.exports = {
  handler: requestHandler,
  someText: "Some hard coded text",
};
// exports.someText = "some hard coded text"
