"use strict";

// console.log("hello");
// let p1 = fetch("todo.json");
// let p2 = p1.then(r => r.json());
// let p3 = p2.then(d => console.log(d));
// console.log("world");

// make our own Promise
function wait(ms) {
    return new Promise(resolve => {
        // create delay then call function provided by the resolve parameter
        setTimeout(resolve, ms)
    });
}

// // example 2
// wait(1000).then(() => console.log("1 s passed"));
// wait(0).then(() => console.log("0 s passed"));
// wait(500).then(() => console.log(".5 s passed"));
// console.log("done");

// // example 3
// wait(1000).then(() => {
//     console.log("1 s passed");
//     return wait(0);
// }).then(() => {
//     console.log("0 s passed");
//     return wait(500);
// }).then(() => console.log(".5 s passed"));
// console.log("done");

async function main() {
    // call fetch and wait until we have response data
    let resp = await fetch("todo.json");
    // call json and wait until data is parsed
    let data = await resp.json();
    // return data object
    return data;
}

main().then(console.log(p1));