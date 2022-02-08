const directory = document.getElementById('directory');

async function getProfiles(){
    const response = await fetch('https://randomuser.me/api/?results=12');
    const data = await response.json();
    const profiles = data.results;

    //const completeProfiles = profiles.map( profile => profile);
    console.log(profiles);
    return Promise.all(profiles);
}


function displayProfiles(data){
    console.log(data);
    data.map(person => {
        directory.innerHTML += `<div class="profile">
        <img src="${person.picture.thumbnail}" class="user_img" alt="user">
        <div class="user_info">
            <h3 class="name">${person.name}${person.name}</h3>
            <p class="email">${person.email}</p>
            <p class="address">${person.email}${person.location.country}</p>
        </div>    
        </div>`;
    })
    
}

// function mapProfiles (data) {
//     return data.map( profile => console.log(displayProfiles(data)));
// }

getProfiles()
    .then(displayProfiles);

