"use strict";

function createGrid(width, height) {
    const grid = document.querySelector("#grid");

    for (let h = 0; h < height; h++){
        const row = document.createElement("div");
        row.className = "row";
        row.id = "row${h}";
        grid.append(row);
        for (let w = 0; w < width; w++){
            const cell = document.createElement("div");
            cell.style = `background-color: ${getRandomColor()}; height: 100px; width: 100px;`;
            row.append(cell);
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.addEventListener("load", () => {
    // this code will run once the web page is fully loaded
    
    // add a click event listener
    document.querySelector("#add").addEventListener("click", (evt) => {
        evt.preventDefault();

        const form = document.querySelector("form");
        const width = form.querySelector("#width");
        const height = form.querySelector("#height");

        createGrid(width.value, height.value);
    });
});