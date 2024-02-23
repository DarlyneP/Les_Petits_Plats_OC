console.log('Welcome to Les Petits Plats')

import { loadAllRecipes, loadResults, loadNoResultsFound, loadRecipeCount } from "./utils/recipes.js";
//import { findRecipes } from "./utils/search/search1.js"
import { findRecipes } from "./utils/search/search2.js"
//import { recipeTagSorting } from "./utils/search/tagSearch.js";
import { sortRecipes, tagSearchClear } from "./utils/search/tagSearch.js";

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
    emptyResultSection()
    if (results.length != 0) {
        loadResults(results)
        
    } else {
        loadNoResultsFound(searchInput)
    }
    loadRecipeCount(results)
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
    for (const arrow of displayArrows) {
        console.log(arrow)
        arrow.addEventListener("click", (event) => {
            const h3Area = event.currentTarget.parentElement.parentElement
            const tagSearchArea = event.currentTarget.parentElement.parentElement.parentElement.children[1]
            if (tagSearchArea.style.display === "none" || tagSearchArea.style.display === "" || tagSearchArea.style.display === undefined) {
                console.log('none')
                tagSearchArea.style.display = "flex"
                h3Area.style.borderRadius = "11px 11px 0 0"
            } else if (tagSearchArea.style.display === "flex") {
                tagSearchArea.style.display = "none"
                h3Area.style.borderRadius = "11px"
            }
        })
    }
}

displayTagSearch()
// todo : activate keydown search
const tagSearchInputs = document.querySelectorAll('.filter--search__unroll input')
for (const input of tagSearchInputs) {
    input.addEventListener("keydown", tagSearch)
}
function eventKeyCheck(eventKey) { //! start again from here to fix display of tag suggestion issue
    if (eventKey.toLowerCase().match(/^[a-z]{1}/) && eventKey !== 'Backspace') {
        return true
    } else {
        return false
    }
}
function tagSearch(event) {
    console.log(event.currentTarget) //* control check
    const tagSearchInput = event.currentTarget.value
    const type = event.currentTarget.name
    console.log(tagSearchInput)

    const check = eventKeyCheck(event.key)

    if (tagSearchInput.length >= 3) {
        if (event.key === 'Backspace') {
            tagSearchClear(tagSearchInput, event)
        } else if (check === true) {
            launchTagSearch(tagSearchInput, type)
        }
        
    } else if (tagSearchInput.length >= 1 && event.key === 'Backspace') {
        tagSearchClear(tagSearchInput, event)
    }
}
function launchTagSearch(tagSearchInput, type) {
    console.log(tagSearchInput)
    switch (type) {
        case "ingredients":
            let allIngredients = JSON.parse(localStorage.allIngredients)
            let foundIngredients = [];
            for (const ingredient of allIngredients) {
                if (ingredient.toLowerCase().includes(tagSearchInput.toLowerCase())) {
                    if (!foundIngredients.includes(ingredient)) {
                        foundIngredients.push(ingredient)
                        
                    }
                }
            }
            localStorage.setItem("foundIngredients", JSON.stringify(foundIngredients))
            displaySuggestions(foundIngredients, type)
            break;
            case "appliance":
                break;
            case "ustensils":
                break;
        default:
            break;
    } 
}
function displaySuggestions(result, type) {
    //const taglist = document.querySelector(`.filter--search__unroll ${type} ul`);
    const tagSearchElement = document.querySelector(`.filter--search__unroll #${type}`);
    const taglist = tagSearchElement.nextElementSibling
    console.log(tagSearchElement)
    console.log(taglist)
    if (type === 'ingredients') {
        const suggestions = JSON.parse(localStorage.foundIngredients)
        console.log(suggestions)
        for (const suggestion of suggestions) {
            const liElement = document.createElement('li')
            liElement.classList.add(`${type}`)
            liElement.classList.add('suggestion')
            liElement.textContent = `${suggestion}`;
            taglist.append(liElement)
            liElement.addEventListener("click", recipeTagSorting)
        }
    }
}
//& Sorting remaining recipes
function recipeTagSorting(event) {
    const selected = event.currentTarget.textContent
    const selectedType = event.currentTarget.classList[0]
    const results = sortRecipes(selected, selectedType)

    emptyResultSection()
    loadResults(results)
}