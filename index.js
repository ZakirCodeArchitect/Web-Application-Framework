// const math = require('./node')
// console.log(math)

/* Lecture # 6 */


const EventEmitter = require("events")

const myEmitter = new EventEmitter()

const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const pathname = path.join(__dirname, "text.txt")

function dataControl(req, res) {
    console.log("Server is running ");

    // Log the request details to text.txt
    const log = `\n ${new Date().getHours().toString()}\t ${req.url} \t New request received`;
    fs.appendFile("text.txt", log, (err) => {
        if (err) {
            console.error("Failed to write to file");
        }
    });

    const myURL = url.parse(req.url);
    console.log(myURL)

    // Routing logic
    switch (req.url) {
        case '/':
            const home = fs.readFileSync("./home.html", "utf-8")
            res.end(home); // what we are displaying on the web-browser
            break;

        case '/dashboard':
            res.write("Dashboard");
            break;

        case '/contacts':
            res.write("Contacts")
                // const user = myURL.query.name;
                // const id = myURL.query.id;
                // console.log(user);
                // console.log(id)
                // res.write(`This is the userName ${user}`)
            myEmitter.on("FileLoaded", () => {
                console.log("Contact provided")
            })
            myEmitter.emit("FileLoaded")

            break;

        default:
            res.write("Nodejs Server Running");
            break;
    }

    res.end();
}

// Create the server
http.createServer(dataControl).listen(3000, () => {
    console.log("Server is listening on port 3000");
});