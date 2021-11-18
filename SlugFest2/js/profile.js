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

//
// other methods
//

/**
 * Create a Slime DOM and return it
 * @param {object} slimeData all of the data needed to create a slime
 */
async function createSlime(slimeData, tab) {
    const slimeText = document.createElement("div");
    if (slimeData.reslimed_status){
        slimeText.innerHTML = `
        <div class="card mx-auto my-3" style="max-width: 700px;">
            <div class="card-body">
                <div class="row mb-1">
                    <div class="col text-start ms-5 text-muted ms-3">
                        <span class="d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle my-auto" viewBox="0 0 16 16">
                                <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                            </svg>
                            <strong>&nbsp &nbsp ${slimeData.user.name} reslimed</strong>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-auto">
                        <img class="img-thumbnail d-flex" src="${slimeData.reslimed_status.user.profile_img_url || slimeData.reslimed_status.user.profile_image_url}" alt="Profile image of user ${slimeData.reslimed_status.user.name}" style="max-width: 70px;">
                    </div>
                    <div class="col text-start">
                        <p>
                            <span><a href="${slimeData.reslimed_status.user.screen_name.split("@")[1]}.html" style="text-decoration: None; color: inherit;"><strong>${slimeData.reslimed_status.user.name}</strong></a></span><span class="text-muted"> ${slimeData.reslimed_status.user.screen_name} &middot; ${timeElapsed(slimeData.reslimed_status.created_at)}</span></br>
                            ${add_slime_text_links(slimeData.reslimed_status, slimeData.reslimed_status.text)}
                        </p>
                        <div class="row align-items-center text-muted">
                            <div class="col">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                    </svg>
                                    &nbsp &nbsp ${slimeData.reslimed_status.reply_count}
                                </span>
                            </div>
                            <div class="col">
                                <span ${(slimeData.reslimed_status.reslime_count > 0) ? "class='text-success'" : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                        <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                    </svg>
                                    &nbsp &nbsp ${slimeData.reslimed_status.reslime_count}
                                </span>
                            </div>
                            <div class="col">
                                <span ${(slimeData.reslimed_status.favorite_count > 0) ? "class='text-danger'" : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                        ${(slimeData.reslimed_status.favorite_count > 0) ? "<path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'/>" : "<path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'/>"}
                                    </svg>
                                    &nbsp &nbsp ${slimeData.reslimed_status.favorite_count}
                                </span>
                            </div>
                            <div class="col">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    } else if (slimeData.in_reply_to_user_id_str) {
        slimeText.innerHTML = `
            <div class="card mx-auto my-3" style="max-width: 700px;">
                <div class="card-body">
                    <div class="row mb-1">
                        <div class="col text-start ms-5 text-muted ms-3">
                            <span class="d-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-fill my-auto" viewBox="0 0 16 16">
                                    <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                </svg>
                                <strong>&nbsp &nbsp ${slimeData.user.name} replied to ${await get_reply_to_user(slimeData.entities.user_mentions[0].split("@")[1])}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <img class="img-thumbnail d-flex" src="${slimeData.user.profile_img_url || slimeData.user.profile_image_url}" alt="Profile image of user ${slimeData.user.name}" style="max-width: 70px;">
                        </div>
                        <div class="col text-start">
                            <p>
                                <span><a href="${slimeData.user.screen_name.split("@")[1]}.html" style="text-decoration: None; color: inherit;"><strong>${slimeData.user.name}</strong></a></span><span class="text-muted"> ${slimeData.user.screen_name} &middot; ${timeElapsed(slimeData.created_at)}</span></br>
                                ${add_slime_text_links(slimeData, slimeData.text)}
                            </p>
                            <div class="row align-items-center text-muted">
                                <div class="col">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                                            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                        </svg>
                                        &nbsp &nbsp ${slimeData.reply_count}
                                    </span>
                                </div>
                                <div class="col">
                                    <span ${(slimeData.reslime_count > 0) ? "class='text-success'" : ""}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                            <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                        </svg>
                                        &nbsp &nbsp ${slimeData.reslime_count}
                                    </span>
                                </div>
                                <div class="col">
                                    <span ${(slimeData.favorite_count > 0) ? "class='text-danger'" : ""}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                            ${(slimeData.favorite_count > 0) ? "<path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'/>" : "<path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'/>"}
                                        </svg>
                                        &nbsp &nbsp ${slimeData.favorite_count}
                                    </span>
                                </div>
                                <div class="col">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    } else {
        slimeText.innerHTML = `
        <div class="card mx-auto my-3" style="max-width: 700px;">
            <div class="card-body">
                <div class="row">
                    <div class="col-auto">
                        <img class="img-thumbnail d-flex" src="${slimeData.user.profile_img_url || slimeData.user.profile_image_url}" alt="Profile image of user ${slimeData.user.name}" style="max-width: 70px;">
                    </div>
                    <div class="col text-start">
                        <p>
                            <span><a href="${slimeData.user.screen_name.split("@")[1]}.html" style="text-decoration: None; color: inherit;"><strong>${slimeData.user.name}</strong></a></span><span class="text-muted"> ${slimeData.user.screen_name} &middot; ${timeElapsed(slimeData.created_at)}</span></br>
                            ${add_slime_text_links(slimeData, slimeData.text)}
                        </p>
                        <div class="row align-items-center text-muted">
                            <div class="col">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                    </svg>
                                    &nbsp &nbsp ${slimeData.reply_count}
                                </span>
                            </div>
                            <div class="col">
                                <span ${(slimeData.reslime_count > 0) ? "class='text-success'" : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                        <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                    </svg>
                                    &nbsp &nbsp ${slimeData.reslime_count}
                                </span>
                            </div>
                            <div class="col">
                                <span ${(slimeData.favorite_count > 0) ? "class='text-danger'" : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                        ${(slimeData.favorite_count > 0) ? "<path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'/>" : "<path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'/>"}
                                    </svg>
                                    &nbsp &nbsp ${slimeData.favorite_count}
                                </span>
                            </div>
                            <div class="col">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    }
    document.querySelector(tab).appendChild(slimeText);
}

/**
 * Takes a Date object and converts to the correct date format
 * @param {object} created Date object
 * @returns formatted date string
 */
function getDate(created) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return `${months[created.getMonth() - 1]} ${created.getFullYear()}`;
}

/**
 * Calculates how much time has passed since a Slime was first posted
 * @param {string} created_at a string representing the time the slime was created
 * @return a string representing the amount of time that has elapsed
 */
 function timeElapsed(created_at){
    const currentTime = new Date();
    const timePosted = new Date(created_at);
    if (Math.floor((currentTime - timePosted) < 3600000)){
        return "less than " + Math.floor((currentTime - timePosted) / 3600000) + "H"
    } else if (Math.floor((currentTime - timePosted) <= 86400000)){
        return Math.floor((currentTime - timePosted) / 3600000) + "H"
    } else if (Math.floor((currentTime - timePosted) <= 31536000000)){
        return Math.floor((currentTime - timePosted) / 86400000) + "D"
    } else {
        return Math.floor((currentTime - timePosted) / 31536000000) + "Y"
    }
}

/**
 * Finds @s and #s in slime text and replaces it with a (semi) functional link in HTML
 * @param {object} slimeData 
 * @param {string} text 
 * @returns modified slime text containing links
 */
 function add_slime_text_links(slimeData, text) {
    if (slimeData.entities.hashtags.length > 0){
        for (let i = 0; i < slimeData.entities.hashtags.length; i++){
            text = text.replace(slimeData.entities.hashtags[i], `<a href="#">${slimeData.entities.hashtags[i]}</a>`);
        }
    }
    if (slimeData.entities.user_mentions.length > 0){
        for (let i = 0; i < slimeData.entities.user_mentions.length; i++){
            text = text.replace(slimeData.entities.user_mentions[i], `<a href="${slimeData.entities.user_mentions[i].split("@")[1]}.html">${slimeData.entities.user_mentions[i]}</a>`);
        }
    }
    return text;
}