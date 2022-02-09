/************************************************
Gurbakhash Sandhu

Project 8 - Connect to and Use a Public API

v1 - 02-07-22

v2 - ???
*************************************************/

const directory = document.getElementById('directory');
const model = document.getElementById('model-window');


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
    return data;
}
/**
 * calls the `getProfiles` function and returns a promise that holds an array of objects
 * Since it return a promise the .then() method can be called passing the returned 
 *  promise as data for the `displayProfiles` function 
 */
getProfiles()
    .then(displayProfiles)
    .then(data => console.log(data));



function eventLister(){
    const profiles = document.getElementsByClassName('profile');

    console.log(profiles);
    
    for(let i=0; i < profiles.length;i++){
        const input = profiles[i]
        input.addEventListener('click',(e) =>{
            const target = e.target;
            console.log(target);
            
        })
    }
}

function getModel(e) {
    model.innerHTML += `<div id="model">
        <img src="/imgs/user.jpg" class="model_img" alt="user1">
        <img src="/imgs/x_btn.jpg" id="x_btn" alt="close_btn">
        <div class="contact">
            <h3>Sergio Moore</h3>
            <p>sergio.moore@example.com</p>
            <p class="city">8638 Hickory Creek Dr</p>
        </div>
        <div class="other">
            <p>(098)-720-9977</p>
            <p>7859 Central St 7859 Central St 7859 Central St</p>
            <p>Birthday<strong>:</strong> 12/3/1968</p>
        </div>
    </div>`
}

