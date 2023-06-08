//Synchronous code:

const name = "Miriam";
const greeting = `Hello, my name is ${name}!`;
console.log(greeting);
// "Hello, my name is Miriam!"

/**
 *
 * makeGreeting() is a synchronous function
 * because the caller has to wait for the function
 * to finish its work and return a value before the caller can continue.
 *
 */
function makeGreeting(name) {
  return `Hello, my name is ${name}!`;
}

const name2 = "Miriam";
// because the program is synchronous we have to wait
// until the function call makeGreeting returns a result.
const greeting2 = makeGreeting(name2);
//once we have the result, we print it out.
console.log(greeting2);
// "Hello, my name is Miriam!"

/**
 *
 *
 * INTRO TO PROMISES
 */

//we use fetch to make a get request,
// all requests are by default asynchronous in javascript
//promises allow us to execute code when the time is right

// ex1. ----------------------------------

const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

// print out 1.
console.log(fetchPromise);

// print out 3.
fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});

//print out 2.
console.log("Started request…");

// ex2. ----------------------------------

//prints out 1.
console.log("Started request…");

const fetchPromise2 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise2.then((response) => {
  const jsonPromise = response.json();
  //prints out 3.
  console.log("request finished, now getting json()");
  jsonPromise.then((data) => {
    //prints out 4.
    console.log(data[0].name);
  });
});
//prints out 2.
console.log("Waiting for the request to finish");

// ex2. (improved version using promise chaining
// -----------------------------------------------

const fetchPromise3 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

// does the same exact thing as above
// we now are using arrow functions

// prints out 1.
console.log("Started request…");

fetchPromise3
  .then((response) => {
    response.json();
    //prints out 3.
    console.log("request finished, now getting json()");
  })
  .then((data) => {
    //prints out 4.
    console.log(data[0].name);
  });

// one drawback of the improved version,
// is it can be harder to debug.

//prints out 2.
console.log("waiting for a response");
