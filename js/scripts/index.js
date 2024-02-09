console.log('Welcome to Les Petits Plats')

import { loadAllRecipes, loadResults } from "./utils/recipes.js";
//import { findRecipes } from "./utils/search/search1.js"
import { findRecipes } from "./utils/search/search2.js"

//~ Initializing homepage (filling it with all recipes)
loadAllRecipes()

//~ Emptying result section to display new results after
function emptyResultSection() {
    const main = document.querySelector('main')
    //^ removing old result section
    const oldResultSection = main.querySelector('.results')
    main.removeChild(oldResultSection)
    //^adding new result section
    const newResultSection = document.createElement('section')
    newResultSection.classList.add('results')
    main.appendChild(newResultSection)
}

//~ Lauching a recipe search
//^ With the search button
const searchButton = document.querySelector('.button--wrapper button')
searchButton.addEventListener("click", launchSearch)
function launchSearch(event) {
    if (event != undefined) {
        event.preventDefault()   
    }
    console.log('Launching a recipe search right now');
    const searchBar = document.querySelector('.searchbar')
    const searchInput = searchBar.value
    //findRecipes(searchInput)
    const results = findRecipes(searchInput)
    /*if (results) {
        
    }*/
    emptyResultSection()
    loadResults(results)
}

//^ With typing only
const searchBar = document.querySelector('.searchbar')
searchBar.addEventListener("keydown", () => {
    const searchInput = searchBar.value
    if (searchInput.length >= 3) {
        launchSearch()
    }
})

//~ Tag search
// todo : display on click
function displayTagSearch() {
    const displayArrows = document.querySelectorAll('h3 span img')
    for(const arrow of displayArrows) {
        console.log(arrow)
        console.log(arrow.parentElement.parentElement.parentElement.childNodes)
        console.log(arrow.parentElement.parentElement.parentElement.children)
        console.log(arrow.parentElement.parentElement.parentElement.children[1])
        arrow.addEventListener("click", () => {
            arrow.style.display = "flex"
        })
    }
}

displayTagSearch()
// todo : activate keydown search