const http = require('http');
const fs = require('fs');

function dataControl(req, res) {
    console.log("Server is running");

    // Log the request details to text.txt
    const log = `\n ${new Date().getHours().toString()}\t ${req.url} \t New request received`;
    fs.appendFile("text.txt", log, (err) => {
        if (err) {
            console.error("Failed to write to file");
        }
    });

    // Routing logic
    switch (req.url) {
        case '/':
            res.write("HomePage"); // what we are displaying on the web-browser
            break;

        case '/dashboard':
            res.write("Dashboard");
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