const password = document.getElementById("password")
const matchList = document.getElementById("match-list")
const btn = document.querySelector("button")
const authenLayer = document.querySelector('.local')
const authBtn = document.querySelector('.badge-success')



//simple authentication
authBtn.addEventListener('click', () => {
    if (password.value === "iqra") {
        authenLayer.style.display = "none"
    } else {
        authenLayer.innerHTML = "This is not the agreed password!!! Try again..."
    }
})

const searchStates = async searchText =>{
   try {
         const res = await fetch("data/names.json");
     const states = await res.json();

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
        ${match.name} (${match.nickname})
        <span class="text-primary">${match.Class}</span> 
    </h4>
    <small>
         Status: ${match.Status} / Stay:${match.left} / Course Studied/studying:${match.course}
    </small>
</div>
        `).join("")
        matchList.innerHTML =`<h5>Number of matches is ${matches.length} </h5>` 
        matchList.innerHTML += html

           

    }
    
search.addEventListener('input', () => searchStates(search.value))