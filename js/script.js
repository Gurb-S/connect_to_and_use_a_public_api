const directory = document.getElementById('directory');

async function getProfiles(){
    const response = await fetch('https://randomuser.me/api/?results=12');
    const data = await response.json();
    const profiles = data.results;
    console.log(profiles);
    return Promise.all(profiles);
}


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

getProfiles()
    .then(displayProfiles);

