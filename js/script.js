/************************************************
Gurbakhash Sandhu

Project 8 - Connect to and Use a Public API

v1 - 02-07-22

v2 - ???
*************************************************/

const directory = document.getElementById('directory');
const model = document.getElementById('model-window');
const form = document.getElementById('searchStudents');
const search = document.getElementById('search');
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
    return Promise.all(profiles);
}

/**
 * `displayProfiles` function that takes the data from an array of objects and 
 *  uses that data to create and display and simple directory with those users
 * @param {array} data - an array of object with info about users
 * @returns - returns the array of objects that was passed into it as an arguement
 */
function displayProfiles(data){
    directory.innerHTML = '';
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
    const profiles = document.getElementsByClassName('profile');
    for(let i=0; i < profiles.length;i++){
        const input = profiles[i]
        input.addEventListener('click',(e) =>{
            const target = e.target.parentElement.parentElement;
            const imgParent = e.target.parentElement;
            const profileDiv = e.target;
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
            <p>${i.location.street.number} ${i.location.street.name}, ${i.location.city}, ${i.location.state}, ${i.location.postcode}</p>
            <p>Birthday<strong>:</strong> ${dobFormat(i.dob.date)}</p>
        </div>
    </div>
    <img src="/imgs/icons/right_arrow.png" id="right_arrow" class="both_arrow" alt="right arrow">`
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


/**
 * runs the `searchResults` function anytime the enter is pressed in the search bar or if the 
 *  search icon is clicked
 */
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    searchResults();
})

/**
 * runs the `searchResults` function anytime a key is press on your keyboard
 */
search.addEventListener('keyup',() =>{
    searchResults();
})

/**
 *`searchResults` function takes the value of the search bar and checks if it matches any 
 *  first or last names for the users that are on the page and if so then it stores those users in an array 
 *  and and calls the `displayProfiles()` function on that array and displays those specfic users
 * If the value in the search bar does not match a first or last name of any user it displays and h2 element
 *  saying that there was no user found
 */
function searchResults () {
    const searchInput = search.value;
    let searchDisplays = [];
    for(let i = 0; i < dataArray.length; i++){
        if(dataArray[i].name.first.toLowerCase().includes(searchInput.toLowerCase()) || dataArray[i].name.last.toLowerCase().includes(searchInput.toLowerCase())){
            searchDisplays.push(dataArray[i]);
            console.log(searchInput);
        }
    }
    if(searchDisplays.length){
        displayProfiles(searchDisplays);
        eventListener(searchDisplays);
    }
    else{
        directory.innerHTML = '<h2>USER NOT FOUND...</h2>'
    }
}