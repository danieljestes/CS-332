"use strict";

const prompt = require("prompt-sync")({
    sigint: true // ctrl + c: quit program
});

console.log("howdy fellow Earthlings");

let user_input = prompt("Enter some data: ");
console.log(user_input);