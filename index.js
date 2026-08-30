const inputField = document.getElementById("searchMovies")

document.addEventListener("click", (e) => {
    switch (e.target.dataset.action){
        case "search":
            fetch(`https://www.omdbapi.com/?s=${inputField.value}&apikey=8aa081d0`)
            .then(res => res.json())
            .then(data => {console.log(data)
                
            })
            break;
        case "s":
        break; 
    }
})