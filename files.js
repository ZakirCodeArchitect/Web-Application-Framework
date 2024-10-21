const fs = require('fs')
    // Asyncronous code --> non-blocking
    // For Synchronous code , add Sync with writeFile and remove (err) arrow function.
fs.writeFile("text.txt", "Nodejs - WAF", (err) => {
    if (err) {
        throw new Error("Something went wrong")
    } else {
        console.log("Data written into the file successfully");
    }
    // also reading the content from the same file
    fs.readFile("text.txt", "utf-8", (err, data) => {
        if (err) {
            throw new Error(err);
        } else {
            console.log("\nData in the File : ", data)
        }
    });
})

// $(new Date().getHours().toString()) --> used with in the write file if i want to write the time in the file

// async cannot be saved in a variable, thats why it'll return undefined
const result = fs.readFile("text.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("error")
    } else {
        console.log(data)
    }
})

console.log(result);



/* Append File */

// sync
fs.appendFileSync("text.txt", "\n" + new Date().getDate().toString() + "/" + new Date().getMonth().toString() + "/" + new Date().getFullYear().toString() + "toba toba ")
    // async (to preserve order of events)
fs.appendFile("text.txt", "\n" + new Date().getDate().toString() + "/" + new Date().getMonth().toString() + "/" + new Date().getFullYear().toString() + "toba toba ", (err, data) => {})

// Copying File -- always overwrite

//sync
fs.cpSync("text.txt", "CopyFile.txt")

//async
fs.cp("text.txt", "CopyAsync.txt", (sheety2) => {})

/* Delete File */

//sync
fs.unlinkSync("text.txt");

//async
fs.unlink("text.txt", (err) => {
    if (err) {
        console.log("File Doesnot exist")
    } else {
        console.log("File Deleted")
    }
})

// Stats of file

//sync
const stat = fs.statSync("text.txt")
console.log(stat)

//async
fs.stat("text.txt", (err, data) => {
    if (err) {
        console.log("error")
    } else {
        console.log(data)
    }
})


// fs.mkdirSync("sheety/sheety2/khairullah", { recursive:true });