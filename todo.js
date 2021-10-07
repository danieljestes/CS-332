// code for the to do app
"use strict";

/**
 * Add a to do item to our list
 * Create the list if there is none yet
 * @param {string} dueDate 
 * @param {string} description 
 * @param {string} priority 
 */
function insertTodo(description, dueDate, priority) {
    // access to the div for storing the todo list
    const todo = document.querySelector("#todo");

    // check if table exists
    if (!todo.querySelector("#todo-table")) {
        // Add the table in the first
        // create a dom parser object to convert table string to DOM nodes
        const parser = new DOMParser();
        // parser.parseFromString takes string and a format
        // and converts/parses that string into a tree of DOM nodes
        const table = parser.parseFromString(`
            <table class="table" id="todo-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Due</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="todo-body">
                </tbody>
            </table>
        `, "text/html");

        // add this in as a child of the todo DOM node
        // when we parse a string of html, we only care about the "body"
        todo.appendChild(table.body);

    } // if

    // grab the table body to manipulate
    const tableBody = todo.querySelector("#todo-body");

    // Add the event (table row)
    // Alternate way to add a chunck of HTML to the DOM
    // Note: "old school" way of doing this (prefer DOMParser)
    // Create a DOM Element
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${description}</td>
        <td>${priority}</td>
        <td class="todo-date">${dueDate}</td>
        <td><a href="" class="remove"><i class="bi bi-x-lg"></i></a></td>
    `;

    // append to table body
    tableBody.appendChild(row);

    row.querySelector(".remove").addEventListener("click", (evt) => {
        evt.preventDefault(); // stops browser from opening link
        // tell tableBody to remove the row node
        tableBody.removeChild(row);
    });
    
}

// set a timeout function to check all due dates every second
setInterval( () => {
    document.querySelectorAll(".todo-date").forEach((item) => {
        // are we overdue
        const date = new Date(item.innerText);
        const now = new Date();
        // date came closer to 1970
        if (date < now) {
            // we are overdue!
            // text-danger bg-danger
            // select the row that contains this date
            item.closest("tr").classList.add("bg-danger", "text-light");
        }
    })
}, 1000);

// Register a function to run once the DOM has finished loading
// Wait to run some code until we know the page has loaded
// register an event on a dom node by using the addEventListener method
window.addEventListener("load", () => {
    // this code will run once the web page is fully loaded

    // add a click event listener
    document.querySelector("#add").addEventListener("click", (evt) => {
        // tell web browser not to do any of the default actions
        // with this event
        evt.preventDefault();
        
        // grab the DOM nodes that are relevant 
        const form = document.querySelector("form");
        const desc = form.querySelector("#description");
        const due = form.querySelector("#due");
        const priority = form.querySelector("#priority");

        const dueDateValue = (new Date(due.value)).valueOf();

        // Check if the due date is actually a date
        if(isNaN(dueDateValue)) {
            due.setCustomValidity("Must be a valid date");
        } else {
            // reset the validation on the form item
            due.setCustomValidity("");
        }

        // validate form input
        if(!form.checkValidity()) {
            // add bootstrap class for validity check
            form.classList.add("was-validated");
            // leave function
            return;
        }

        // add todo item!
        insertTodo(desc.value, new Date(due.value), priority.value);
    });
});