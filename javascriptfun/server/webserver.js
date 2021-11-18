"use strict";

// we use object destructuring to access one property
// returned by requiring HTTP module
const {createServer} = require("http");

// create server and pass in function for handling HTTP requests
// this function gets access to both the resquest object and the response object
let server = createServer((req, res) => {
    if(req.url === "/hello.html"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(`
            <html>
                <body>
                    Hello, world!
                </body>
            </html>
        `)
        res.end();
    } else {
        res.writeHead(404, {"Content-Type": "text/json"});
        res.write(JSON.stringify({
            message: "File not found",
            url: req.url,
            mehtod: req.method
        }));
        res.end();
    }
});

// instruct server to listen for incoming HTTP connections on some port
server.listen(8000);
console.log("Listening on port 8000");