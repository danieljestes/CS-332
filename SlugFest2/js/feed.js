"use strict";

//
// fetch methods
//

/**
 * Fetches timelines JSON to generate feed page contents. Calls get_user to place the correct user icon at top (who is logged in).
 * @param {string} username a string representing the user username 
 */
async function get_timeline(){
    const resp = await fetch(`api/statuses/home_timeline.json`);
    const data = await resp.json();

    data.forEach(slimeData => {
        createSlime(slimeData, "#slime_cards");
    });

    get_user('kevinaangstadt');
}

/**
 * Fetches the correct slime from api/statuses/show according to _id string
 * @param {string} slimeID string representing a slime _id
 */
async function get_show_slime(slimeID){
    const resp = await fetch(`api/statuses/show/${slimeID}.json`);
    const data = await resp.json();

    data.forEach(slimeData => {
        if (slimeData._id === slimeID){
            return slimeData;
        } else {
            console.log("ID match not found.")
        }
    });
}

/**
 * Fetches the user API for the correct user (who is logged in). Places user icon at the top of the feed page
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
    image.setAttribute("style", "max-width: 80px;");
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