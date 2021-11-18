"use-strict";

const prompt = require("prompt-sync")({
    sigint: true
});

/*
* Prompt user for grades....one at a time
* keep prompting until the user types a negative number
* 
* compute: mean
*          median
*          max
*          min
*
* Print data at end
*/

function median(data) {
    // sort data and get the middle element
    let med = data.sort((a, b) => a - b) [ Math.floor(data.length/2) ];
    // if there is an odd length, average with the other middle value
    if (data.length % 2 == 0) {
        med += data[Math.floor(data.length / 2) + 1];
        med /= 2.0;
    }
    return med;
}

let data = [];

// don't forget to parse as a number!
let num = parseFloat(prompt("Enter number: "));

while (num >= 0) {
    data.push(num);
    num = parseFloat(prompt("Enter number: "));
}

let average = data.reduce((a, b) => a + b) / data.length;
let med = median(data);

// the spread operator (...) takes the contents of an array
// and uses the values as the arguments to the functions
let max = Math.max(...data);
let min = Math.min(...data);

console.log(average, med, max, min);