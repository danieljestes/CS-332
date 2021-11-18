"use slime";

//
// fetch methods
//

/**
 * Takes slime _id and adds slime trail main slime
 * @param {string} _id string representing slime _id string
 */
async function get_main_slime(_id) {
    const resp = await fetch(`api/statuses/show/${_id}.json`);
    const userData = await resp.json();

    const mainSlimeText = document.createElement("div");
    mainSlimeText.innerHTML = `
        <div class="card mx-auto my-3" style="max-width: 700px;">
            <div class="card-body">
                <div class="row">
                    <div class="col-auto">
                        <img class="img-thumbnail d-flex" src="${userData.user.profile_img_url || userData.user.profile_image_url}" alt="Profile image of user ${userData.user.name}" style="max-width: 70px;">
                    </div>
                    <div class="col text-start">
                        <p>
                            <span><a href="${userData.user.screen_name.split("@")[1]}.html" style="text-decoration: None; color: inherit;"><strong>${userData.user.name}</strong></a></span><br><span class="text-muted">${userData.user.screen_name}</span></br>
                        </p>
                    </div>
                </div>
                <p class="py-3 h5">${addTextLinks(userData, userData.text)}</p>
                <p><span class="text-muted">10:24 AM &middot; ${timeElapsed(userData.created_at)}</span></p>
                <hr>
                <div class="row text-muted text-center">
                    <div class="col">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                            </svg>
                            &nbsp &nbsp ${userData.reply_count}
                        </span>
                    </div>
                    <div class="col">
                        <span ${(userData.reslime_count > 0) ? "class='text-success'" : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                            </svg>
                            &nbsp &nbsp ${userData.reslime_count}
                        </span>
                    </div>
                    <div class="col">
                        <span ${(userData.favorite_count > 0) ? "class='text-danger'" : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                ${(userData.favorite_count > 0) ? "<path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'/>" : "<path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'/>"}
                            </svg>
                            &nbsp &nbsp ${userData.favorite_count}
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
    `
    document.querySelector("#main").appendChild(mainSlimeText);

    get_replies(_id);
}

/**
 * Takes an _id and grabs the JSON containing all replies from statuses/replies
 * @param {string} in_reply_to the _id to check for ids of
 */
async function get_replies(og_id) {
    const resp = await fetch(`api/statuses/replies/${og_id}.json`);    
    const repliesData = await resp.json();

    repliesData.forEach(slimeData => {
        createSlime(slimeData, "#replies");
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