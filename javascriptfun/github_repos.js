"use strict";

/**
 * Return array of repos for a user
 * @param {string} username
 * @param Promise to array of names
 */
async function get_repos(username) {
    const resp = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await resp.json();

    get_user();

    const outText = document.createElement("p");
    outText.innerHTML = `
    Listing repositories for ${username}...<br>
    `;
    document.querySelector("#output").appendChild(outText);

    data.forEach(repo => {
        insertRepo(repo);
    });
}

async function get_user(username){
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const data = await resp.json();

    const avatar = document.createElement("p");
    avatar.innerHTML = `
    <img src="${data.avatar_url}"></img><br>
    `;
    document.querySelector("#output").appendChild(avatar);
}

function insertRepo(repo){
    const outText = document.createElement("p");
    outText.innerHTML = `${repo.name} is found at ${repo.html_url}<br>`;
    document.querySelector("#output").appendChild(outText);
};

document.querySelector("button").addEventListener("click", (evt) => {
    evt.preventDefault();
    
    const username = document.querySelector("#username").value;

    get_repos(username).then(data => console.log(data));
});