// practice with higher order functions
// forEach, map, filter, reduce
// sort, sum, every

const nums = [-3, 5, 89.7, 11, -67, 0.45, 0, 900];
const names = ["Danial", "Olivia", "Tom", "James", "Xavier", "Cody", "Daniel", "Charlie", "Jonah", "Catya", "Nini", "KP", "Christian"];

/*
1. Filter out all the odd numbers
2. Sort numbers in ascending order
3. Sort numbers in descending order
4. Sort all odd numbers followed by even numbers
5. Double all the numbers
6. Get sum of all numbers
7. Get all even lenghth names
8. Sort all names alphabetically
9. Say "hello" to all names
10. Create a string of comma-seperated names (reduce)
11. Find if at least one name has a "1"
12. Find if all names have an "a"
*/

// 1
console.log(nums.filter( (element) => {
    return element % 2 === 0;
}));

// 2
console.log(nums.sort( (a, b) => {
    return a - b;
}));

// 3
console.log(nums.sort( (a, b) => {
    return b - a;
}));

// 4
console.log(nums.sort( (a, b) => {
    return parseInt(Math.abs(b)) % 2 - parseInt(Math.abs(a)) % 2;
}));

// 5
console.log(nums.map( (element, nums) => {
    return element * 2;
}));

// 6
console.log(nums.reduce( (acc, n) => {
    return acc + n;
}, 0));

// 7
console.log(names.filter( (element) => {
    return element.length % 2 === 0;
}));

// 8
console.log(names.sort());

// 9
names.forEach((element) => {
    console.log("hello " + element);
});

// 10
// In real world, use join
console.log(names.reduce((acc, name, idx) => {
    if (idx === 0) return name;
    else return `${acc}, ${name}`;
}, ""));

// 11

document.querySelectorAll("img").forEach((node) => {
    const alt = document.createTextNode(node.alt);
    node.parentNode.replaceChild(alt, node);
})

Array.from(document.querySelectorAll("table table")). filter( (table) => {
    return table.querySelector("tr td").textContent.indexOf("Marine") === -1
})

Array.from(document.querySelectorAll("table table")). filter( (table) => {
    return table.querySelector("tr td").textContent.indexOf("Marine") === -1
}).map( (table) => {
    return Array.from(table.querySelectorAll("tr")).slice(2).map( (row) => {
        const city = row.childNodes[0].textContent;
        const temp = parseInt(row.childNodes[2].textContent);
        return {
            city: city, 
            temperature: temp
        };
    })
}).flat().filter( a => !isNaN(a.temperature)).sort((a,b) => a.temperature - b.temperature).forEach( town => console.log(`${town.city}: ${town.temperature}`));