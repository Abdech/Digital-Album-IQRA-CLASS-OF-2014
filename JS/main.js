const password = document.getElementById("password")
const search = document.getElementById("search")
const matchList = document.getElementById("match-list")
const btn = document.querySelector("button")
const authenLayer = document.querySelector('.local')
const authBtn = document.querySelector('.badge-success')


//simple authentication
authBtn.addEventListener('click', () => {
    if (password.value === "iqra") {
        authenLayer.style.display = "none"
        search.focus()
    } else {
        authenLayer.innerHTML = "This is not the agreed password!!! Try again..."
        setTimeout(() => {
             location.reload();
        },2000)
    }
})

const searchStates = async searchText =>{
   try {
         const res = await fetch("data/names.json");
     const results = await res.json();

       const states = results.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
})
       
// Get matches to current text input
    let matches = states.filter(state =>{
        const regex = new RegExp(`^${searchText}`,`gi`)
        return state.name.match(regex)  || state.nickname.match(regex)

    })
   
    outputHtml(matches)
       
       
       
} catch (error) {
    console.error(error)
    matchList.innerHTML = error
    
   }
}

// show result in html

const outputHtml = matches =>{

        const html = matches.map(match => `
<div class="card card-body mb-1">
    <h4>
        ${match.name} (${match.nickname}) <br>
        <span class="text-primary">${match.number}</span> 
    </h4>
    <p class="status">
         Status: <span class="info"> ${match.Status} </span> <br>
         Stay: <span class="info"> ${match.left}  </span> <br>
         Course Studied or Studying: <span class="info"> ${match.course}</span>
    </p>
    <p> Address: <span class="address"> ${match.address} </span></p>
    <img class="" src="${match.path}" alt="${match.name}">
</div>
        `).join("")
        matchList.innerHTML =`<h5> Matches ${matches.length} </h5>` 
        matchList.innerHTML += html

           

    }
    
search.addEventListener('input', () => searchStates(search.value))