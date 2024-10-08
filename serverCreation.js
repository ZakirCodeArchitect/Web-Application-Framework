const http = require('http')

// http.createServer((req,res) => {
//     res.write("Nodejs Server")
//     res.end();
// }).listen(3000)
const fs = require('fs')

function dataControl(req,res)
{   
    console.log("server is running")
    const log = `\n ${new Date().getHours().toString()}\t ${req.url} \t New request recieved`;
    fs.appendFile("text.txt", log, (err) => {})
    
    res.write("Nodejs Server Running")
    res.end();
}

http.createServer(dataControl).listen(3000);




