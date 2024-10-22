// Let’s break this task down step by step as you requested. We will define the functions in three different ways: callbacks, promises, and async/await. The functions are SignUp(), SendEmail(), Login(), GetData(), and DisplayData(). Each will just log a message to the console, and we’ll add delays to simulate asynchronous behavior, with the most delay added to SignUp().

// We’ll also implement error handling in all three approaches.

// 1. Using Callbacks:

// In this approach, each function will call the next function in its callback, ensuring they run in sequence even though SignUp() takes the longest time.

// Code Using Callbacks:
/*
function SignUp(callback) {
    setTimeout(() => {
        console.log('Sign Up');
        callback();
    }, 5000); // Simulate delay (5 seconds)
}

function SendEmail(callback) {
    setTimeout(() => {
        console.log('Send Email');
        callback();
    }, 1000); // Simulate delay (1 second)
}

function Login(callback) {
    setTimeout(() => {
        console.log('Login');
        callback();
    }, 2000); // Simulate delay (2 seconds)
}

function GetData(callback) {
    setTimeout(() => {
        console.log('Get Data');
        callback();
    }, 1000); // Simulate delay (1 second)
}

function DisplayData() {
    setTimeout(() => {
        console.log('Display Data');
    }, 1000); // Simulate delay (1 second)
}

// Execute the tasks using callbacks
SignUp(() => {
    SendEmail(() => {
        Login(() => {
            GetData(() => {
                DisplayData();
            });
        });
    });
});

*/

// Explanation:

// 	•	Each function is called one after the other in a callback chain.
// 	•	The delay is simulated using setTimeout(), and SignUp() has the most delay (5 seconds).
// 	•	The next function is called only after the current function finishes.

// 2. Using Promises:

// In this approach, each function will return a Promise, and we’ll use .then() to chain the functions together. We’ll handle errors using .catch().

// Code Using Promises:
/*
function SignUp() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Sign Up');
            resolve();
        }, 5000); // Simulate delay (5 seconds)
    });
}

function SendEmail() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Send Email');
            resolve();
        }, 1000); // Simulate delay (1 second)
    });
}

function Login() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Login');
            resolve();
        }, 2000); // Simulate delay (2 seconds)
    });
}

function GetData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Get Data');
            resolve();
        }, 1000); // Simulate delay (1 second)
    });
}

function DisplayData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Display Data');
            resolve();
        }, 1000); // Simulate delay (1 second)
    });
}

// Execute the tasks using Promises and chaining
SignUp()
    .then(() => SendEmail())
    .then(() => Login())
    .then(() => GetData())
    .then(() => DisplayData())
    .catch((error) => console.error("Error caught:", error));
*/
// Explanation:

// 	•	Each function returns a Promise that resolves after the delay.
// 	•	The functions are chained together using .then() to ensure they execute in order.
// 	•	If any function encounters an error, the .catch() will handle it.

// 3. Using Async/Await:

// This approach uses async/await for more readable code, where each function is awaited. We’ll also use try/catch for error handling.

// Code Using Async/Await:

function SignUp() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Sign Up');
            resolve();
        }, 5000); // Simulate delay (5 seconds)
    });
}

function SendEmail() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Send Email');
            resolve();
        }, 1000); // Simulate delay (1 second)
    });
}

function Login() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Login');
            resolve();
        }, 2000); // Simulate delay (2 seconds)
    });
}

function GetData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Get Data');
            resolve();
        }, 1000); // Simulate delay (1 second)
    });
}

function DisplayData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Display Data');
            resolve();
        }, 1000); // Simulate delay (1 second)
    });
}

// // Execute tasks using async/await with try/catch for error handling
async function executeTasks() {
    try {
        await SignUp();
        await SendEmail();
        await Login();
        await GetData();
        await DisplayData();
    } catch (error) {
        console.error('Caught an error:', error);
    }
}

// // Run the tasks
executeTasks();

// Explanation:

// 	•	Each function is awaited in sequence.
// 	•	Errors are caught using a global try/catch block in the executeTasks() function.
// 	•	If any function throws an error, the execution stops, and the error is caught.

// Error Handling:

// In each case:

// 	•	Callback approach: Error handling would need to be done inside each callback.
// 	•	Promises approach: .catch() handles any promise rejections.
// 	•	Async/await approach: try/catch handles errors across the entire flow.

// How to Execute:

// 	1.	Save each code snippet in separate files (e.g., callbacks.js, promises.js, asyncAwait.js).
// 	2.	Open the terminal and run them using:

// node callbacks.js
// node promises.js
// node asyncAwait.js



// This ensures that you can observe the functions executing in sequence with proper delays and error handling.

// Let me know if you have any further questions!