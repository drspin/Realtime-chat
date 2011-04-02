(function() {
  var everyone, fs, http, server;
  fs = require('fs');
  http = require('http');
  server = http.createServer(function(req, res) {
    if (req.url === "/" || req.url === "/index.html" || req.url === "") {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      return res.end(fs.readFileSync('index.html'));
    } else if (req.url === "/blueprint/screen.css") {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      return res.end(fs.readFileSync('blueprint/screen.css'));
    } else if (req.url === "/blueprint/print.css") {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      return res.end(fs.readFileSync('blueprint/print.css'));
    } else if (req.url === "/chat.css") {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      return res.end(fs.readFileSync('chat.css'));
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      return res.end("No such page");
    }
  });
  server.listen(8080);
  console.log("Listening on 8080");
  everyone = require('now').initialize(server);
  everyone.now.distributeMessage = function(msg) {
    return everyone.now.receiveMessage(this.now.name, msg);
  };
}).call(this);
