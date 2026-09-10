const inputField = document.getElementById("searchMovies")

secondHalf = document.getElementById("secondHalf")



document.addEventListener("click", async (e) => {
    switch (e.target.dataset.action) {
        case "search":
            const response = await fetch(`https://www.omdbapi.com/?s=${inputField.value}&apikey=8aa081d0`)

            const data = await response.json()

            const detailedMovies = await Promise.all(
                data.Search.map(async movie => {
                    const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=8aa081d0`)
                    return await response.json()
                })
            )
            console.log(detailedMovies)
            const moviesList = detailedMovies.map(detailedMovie => (
                `<div class="movie-box" id="movieId-${detailedMovie.imdbID}">
                <img src="${detailedMovie.Poster}"
                    alt="">
                <div class="title-and-rating" id="titleAndRating">
                    <h2 id="movieTitle">${detailedMovie.Title}</h2>
                    <p>⭐</p>
                    <p id="movieRating-">${detailedMovie.imdbRating}</p>
                </div>
                <div class="misc" id="misc">
                    <p>${detailedMovie.Runtime}</p>
                    <p>${detailedMovie.Genre}</p>
                    <button class="add-to-watchlist" id="addToWatchlist" data-add="${detailedMovie.imdbID}">
                        <svg class="add-svg" id="addSvg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z"
                                fill="#111827" />
                        </svg>
                        <svg class="remove-svg" id="removeSvg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H5Z"
                                fill="#111827" />
                        </svg>
                        <p>Watchlist</p>
                    </button>
                </div>
                <div class="desc">
                    <p>
                        ${detailedMovie.Plot}
                    </p>
                </div>
            </div>`
            ))
            secondHalf.innerHTML = moviesList.join("")
            secondHalf.style.justifyContent = "start"
            secondHalf.style.paddingTop = "50px"
            console.log(moviesList)
            break;
        case "":
            break;
    }

    const watchlistButton = e.target.closest(".add-to-watchlist")

    if (!watchlistButton) return

    addSvg = watchlistButton.querySelector(".add-svg")
    removeSvg = watchlistButton.querySelector(".remove-svg")

    if (addSvg.style.display === "none") {
        addSvg.style.display = "block"
        removeSvg.style.display = "none"
    } else {
        addSvg.style.display = "none"
        removeSvg.style.display = "block"
    }

})

/*
            */