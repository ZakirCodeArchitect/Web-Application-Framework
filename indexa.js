const path = require('node:path')
const os = require('os')

const fileName = __filename;
const dirName = __dirname;
const baseName = path.basename(__filename);
const file = path.parse(__filename); // parse[pathconvert path to format] and 

console.log("File path : ", fileName)
console.log("File Directory : ", dirName)
console.log("File Base Name : ", baseName)
console.log("File Extension : ", file.ext) // getting the extension of the file

console.log("Object to path format : ", path.format(file)) // format [ then format converts that information into path ]

console.log("Join different paths : ", path.join("folder1", "folder2", "home.html")) // .. IS USED to jump the folder.

// resolve method   -- converts sequence of path into absolute path means from the start
console.log("Absolute Path : ", path.resolve(__dirname, "xyz.txt"))

const localMemory = os.totalmem(); // total memory
const freeMemory = os.freemem(); // free memory

console.log("Local Memory: ", localMemory)
console.log("Free Memory : ", freeMemory)

/* Events */


console.log("\nEVENTS : ")

const EventEmitter = require("events")

const myEmitter = new EventEmitter()

// First listner
myEmitter.on("FileLoaded", () => {
    console.log("File is loaded")
})

// First listner
// File loaded is file name
myEmitter.on("FileLoaded", function() {
        console.log("Second File is loaded")
    }) // when that event is occued execute particular function.

// third listner
myEmitter.on("FileLoaded", () => {
    console.log("Contact provided")
})

myEmitter.emit("FileLoaded") // Raising event -- to broadcast

/// First comment