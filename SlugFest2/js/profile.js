"use strict";

//
// fetch methods
//

/**
 * Fetches user JSON to generate profile page based on username (who is logged in).
 * @param {string} username a string representing the user username
 */
async function get_user(username){
    const resp = await fetch(`api/user/get/${username}.json`);
    const userData = await resp.json();

    // adds profile image
    const profileImage = document.createElement("img");
    document.querySelector("#userThumb").appendChild(profileImage);
    let image = document.querySelector("#userThumb > img");
    image.classList.add("img-thumbnail");
    image.src = userData.profile_img_url || userData.profile_image_url
    image.alt = `Profile image of user ${userData.name}`;
    image.setAttribute("style", "max-width: 300px;");

    // adds name
    document.querySelector("#headName").innerHTML = `${userData.name}`;

    // adds username
    document.querySelector("#headUsername").innerHTML = `${userData.screen_name}`;
    
    // adds user description/bio
    document.querySelector("#headDesc").innerHTML = `${(userData.description === null) ? `${userData.name} hasn't set their bio!` : userData.description}`;

    // adds following and followers numbers
    document.querySelector("#following").innerHTML = ` Following`;
    document.querySelector("#followers").innerHTML = `${userData.followers_count} Followers`;

    // adds date joined
    document.querySelector("#dateJoined").innerHTML = ` Joined ${getDate(new Date(userData.created))}`;

    // adds user slime timeline
    get_timeline(username);
    get_favorites(username);
}

/**
 * Fetches user timeline JSON to fill user Slimes tab
 * @param {string} username a string representing the user username
 */
 async function get_timeline(username) {
    const resp = await fetch(`api/statuses/user_timeline/${username}.json`);
    const data = await resp.json();

    data.forEach(slimeData => {
        if (!slimeData.in_reply_to_status_id_str) createSlime(slimeData, "#slimes");
        //if (slimeData.in_reply_to_status_id_str) get_replies(slimeData.in_reply_to_status_id_str);
        createSlime(slimeData, "#replies");
    });
}

// async function get_replies(og_id) {
//     const resp = await fetch(`api/statuses/replies/${og_id}.json`);    
//     const repliesData = await resp.json();

//     repliesData.forEach(slimeData => {
//         createSlime(slimeData, "#replies");
//     });
// }

/**
 * Fetches user favorites JSON to fill user Favorites tab
 * @param {string} username a string representing the user username
 */
async function get_favorites(username) {
    const resp = await fetch(`api/favorites/${username}.json`);
    const data = await resp.json();

    data.forEach(slimeData => {
        createSlime(slimeData, "#favorites");
    });
}

/**
 * Takes a username and grabs the user name from correct JSON
 * @param {string} username string representing the user username
 * @returns name of user
 */
async function get_reply_to_user(username){
    const resp = await fetch(`api/user/get/${username}.json`);
    const userData = await resp.json();

    return userData.name;
}