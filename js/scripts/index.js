console.log('Welcome to Les Petits Plats')

import { loadAllRecipes, loadResults } from "./utils/recipes.js";
import { findRecipes } from "./utils/search/search1.js"

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
const searchButton = document.querySelector('.button--wrapper button')
searchButton.addEventListener("click", launchSearch)
function launchSearch(event) {
    event.preventDefault()
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