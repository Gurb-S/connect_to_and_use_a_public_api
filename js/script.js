/************************************************
Gurbakhash Sandhu

Project 8 - Connect to and Use a Public API

v1 - 02-07-22

v2 - ???
*************************************************/

const directory = document.getElementById('directory');
const model = document.getElementById('model-window');
//array that holds the data recieved from the fetchAPI
let dataArray;

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
 * @returns - returns the array of objects that was passed into it as an arguement
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
    .then(eventListener)
    .then(data => dataArray = data);

/**
 *`eventListner` function that takes in an array of objects and adds an eventlistener for every
 *  user profile displayed 
 * When that user profile is clicked on it passes the user's array of data to the `getModel` function
 * @param {array} data - an array of object with info about users
 */
function eventListener(data){
    console.log(data);
    const profiles = document.getElementsByClassName('profile');
    for(let i=0; i < profiles.length;i++){
        const input = profiles[i]
        input.addEventListener('click',(e) =>{
            const target = e.target.parentElement.parentElement;
            const imgParent = e.target.parentElement;
            const profileDiv = e.target;
            console.log(target);
            for(let i = 0; i < profiles.length; i++){
                if(profiles[i] === target || profiles[i] === imgParent || profiles[i] === profileDiv){
                    modelTemplate(data[i],data);
                }
            }
        })
    }
    return data;
}

/**
 * `dobFormat` function that takes in a string and converts it to the MM/DD/YYYY format
 * @param {string} string - takes in a string that holds a date of birth in a specific format
 * @returns - a string with the dob formatted as MM/DD/YYYY
 */
function dobFormat (string) {
    const bdaySplit = string.split('T')[0].split('-');
    const dobString = [bdaySplit[1],bdaySplit[2],bdaySplit[0]];
    return dobString.join('/');
}

/**
 *`getModel` function that takes an array of objects and runs a creates a popup model
 *  window for the user that was clicked on with various infomation about that user
 * @param {array} i - an array of objects with info about a specificed user
 */

function modelTemplate(i){
    console.log(i);
    model.innerHTML = `
    <img src="/imgs/icons/left_arrow.png" id="left_arrow" class="both_arrow" alt="left arrow">
    <div id="model">
        <img src="${i.picture.large}" class="model_img" alt="user1">
        <img src="/imgs/icons/x_btn.jpg" id="x_btn" alt="close_btn">
        <div class="contact">
            <h3>${i.name.first} ${i.name.last}</h3>
            <p>${i.email}</p>
            <p class="city">${i.location.city}, ${i.location.country}</p>
        </div>
        <div class="other">
            <p>${i.phone}</p>
            <p>${i.location.street.number} ${i.location.street.name}</p>
            <p>Birthday<strong>:</strong> ${dobFormat(i.dob.date)}</p>
        </div>
    </div>
    <img src="/imgs/icons/right_arrow.png" id="right_arrow" class="both_arrow" alt="right arrow">`
    console.log(model);
    model.className = 'model-on';
    const x_btn = document.getElementById('x_btn');
    const left_arrow = document.getElementById('left_arrow');
    const right_arrow = document.getElementById('right_arrow');
    clickableBtns();
    
}

/**
 * `clickableBtns` function adds functionality to the close btn as well as the left and right arrows
 *  when a model window is open
 */
function clickableBtns (){

    x_btn.addEventListener('click',() =>{
        model.className = 'model-off';
    })
    left_arrow.addEventListener('click',(e) =>{
        const arrowModel = e.target.nextElementSibling;
        const profiles = document.getElementsByClassName('profile');
        for(let i = 0; i < profiles.length; i++){
            const profileName = profiles[i].children[1].children[0].textContent;
            const arrowBtns = arrowModel.children[2].children[0].textContent;
            if(profileName === arrowBtns){
                modelTemplate(dataArray[i-1]);
            }
        }
    })
    right_arrow.addEventListener('click',(e) =>{
        const arrowModel = e.target.previousElementSibling;
        const profiles = document.getElementsByClassName('profile');
        for(let i = 0; i < profiles.length; i++){
            const profileName = profiles[i].children[1].children[0].textContent;
            const arrowBtns = arrowModel.children[2].children[0].textContent;
            if(profileName === arrowBtns){
                modelTemplate(dataArray[i+1]);
            }
        }
    })
}
