// tirst line of file turns on "Strict Mode" interpretation
"use strict";

// this is a comment
/* this is a block comment */

console.log("Hello world!");

// ask user their name and greet them
// let name = prompt("Enter your name");
// console.log(`Hello, ${name}`);

// function declaration (hoisted)
function square(x) {
    return x * x;
}

const data = parseInt(prompt("Enter a number"))
console.log(square(data));

// function expression bound to variable
const double = function(x) {
    return 2 * x;
};

console.log(double(56));

// arrow function expression
let triple = (x) => {
    return 3 * x;
};

console.log(triple(56));

// simplified arrow function expression
triple = x => 3 * x;