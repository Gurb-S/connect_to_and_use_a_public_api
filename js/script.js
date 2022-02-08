/************************************************
Gurbakhash Sandhu

Project 8 - Connect to and Use a Public API

v1 - 02-07-22

v2 - ???
*************************************************/

const directory = document.getElementById('directory');


/**
 * `getProfiles` function
 * async/await function that uses the fetchAPI to request data from the random
 *  user api and convert the returned data into and array of objects 
 * @returns a promise promise that holds the profile data of 12 random users
 */
async function getProfiles(){
    const response = await fetch('https://randomuser.me/api/?results=12&nat=us');
    const data = await response.json();
    const profiles = data.results;
    console.log(profiles);
    return Promise.all(profiles);
}

/**
 * `displayProfiles` function that takes the data from an array of objects and 
 *  uses that data to create and display and simple directory with those users
 * @param {array} data - an array of object with info about users
 */
function displayProfiles(data){
    console.log(data);
    data.map(person => {
        directory.innerHTML += `<div class="profile">
        <img src="${person.picture.medium}" class="user_img" alt="user">
        <div class="user_info">
            <h3 class="name">${person.name.first} ${person.name.last}</h3>
            <p class="email">${person.email}</p>
            <p class="address">${person.location.city}, ${person.location.country}</p>
        </div>    
        </div>`;
    })
}
/**
 * calls the `getProfiles` function and returns a promise that holds an array of objects
 * Since it return a promise the .then() method can be called passing the returned 
 *  promise as data for the `displayProfiles` function 
 */
// getProfiles()
//     .then(displayProfiles);


function getModel(e) {
    directory.style.backgroundColor = '#464646';
}

