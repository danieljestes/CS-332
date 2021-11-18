"use strict";

//
// fetch methods
//

/**
 * Fetches activity JSON to generate notifications page contents. Calls get_user to place the correct user icon at top (who is logged in).
 */
async function get_timeline(){
    const resp = await fetch(`api/statuses/activity.json`);
    const data = await resp.json();

    data.forEach(slimeData => {
        createSlime(slimeData);
    });
}

//
// other methods
//

/**
 * Create a Slime DOM and return it
 * @param {object} slimeData all of the data needed to create a slime
 */
function createSlime(slimeData) {
    const slimeText = document.createElement("div");
    if (slimeData.reslimed_status){
        slimeText.innerHTML = `
            <div class="row mt-3">
                <div class="col-auto my-4 text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentcolor" class="bi bi-recycle" viewBox="0 0 16 16">
                        <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                    </svg>
                </div>
                <div class="col-9">
                    <img class="img-thumbnail" src="${slimeData.reslimed_status.user.profile_img_url || slimeData.reslimed_status.user.profile_image_url}" alt="Profile image of user ${slimeData.reslimed_status.user.name}" style="max-width: 90px;">
                    <div class="row mt-0">
                        <p class="mb-2">
                            <a href="${slimeData.reslimed_status.user.screen_name.split("@")[1]}.html" style="text-decoration: None; color: inherit;"><strong>${slimeData.reslimed_status.user.name}</strong></a> reslimed you
                            <div class="mt-0">
                                <span class="text-muted">${add_slime_text_links(slimeData.reslimed_status, slimeData.reslimed_status.text)}</span><a href="#"></a>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <hr class="mx-auto mt-0" style="max-width: 1000px;">
        `
    } else {
        slimeText.innerHTML = `
            <div class="row mt-3">
                <div class="col-auto my-4 text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentcolor" class="bi bi-chat-right-fill" viewBox="0 0 16 16">
                        <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                    </svg>
                </div>
                <div class="col-9">
                    <img class="img-thumbnail" src="${slimeData.user.profile_img_url || slimeData.user.profile_image_url}" alt="Profile image of user ${slimeData.user.name}" style="max-width: 90px;">
                    <div class="row mt-0">
                        <p class="mb-2">
                            <a href="${slimeData.user.screen_name.split("@")[1]}.html" style="text-decoration: None; color: inherit;"><strong>${slimeData.user.name}</strong></a> replied to your Slime
                            <div class="mt-0">
                                <span class="text-muted">${add_slime_text_links(slimeData, slimeData.text)}</span><a href="#"></a>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <hr class="mx-auto mt-0" style="max-width: 1000px;">
        `
    }
    document.querySelector("#slime_cards").appendChild(slimeText);
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