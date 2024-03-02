console.log('Welcome to Les Petits Plats')

import { loadAllRecipes, loadResults, loadNoResultsFound, loadRecipeCount } from "./utils/recipes.js";
//import { findRecipes } from "./utils/search/search1.js"
import { findRecipes } from "./utils/search/search2.js"
//import { recipeTagSorting } from "./utils/search/tagSearch.js";
import { sortRecipes, tagSearchClear, setupUsedTag, deleteTagConfirm, deleteUsedTag, deleteUsedTag2 } from "./utils/search/tagSearch.js";

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
            
            /*
            const tagList = event.currentTarget.parentElement.parentElement.parentElement.children[1].children[1]
            let foundTags;
            if (event.currentTarget.classList[0] == 'ingredients') {
                console.log(event.currentTarget.parentElement.parentElement.parentElement.children[1].children[1])
                console.log(tagList);
                foundTags = JSON.parse(localStorage.allIngredients)
                for (const tag of foundTags) {
                    const tagListElement = document.createElement('li')
                    tagListElement.textContent = `${tag}`;
                    tagList.appendChild(tagListElement)
                }
            }*/
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
    if (eventKey.toLowerCase().match(/^[a-z]$/) /*&& eventKey !== 'Backspace'*/) { //checking eventKey is only a letter
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
            let allAppliances = JSON.parse(localStorage.allAppliances)
            let foundAppliances = [];
            for (const appliance of allAppliances) {
                if (appliance.toLowerCase().includes(tagSearchInput.toLowerCase())) {
                    if (!foundAppliances.includes(appliance)) {
                        foundAppliances.push(appliance)
                        
                    }
                }
            }
            break;
        case "ustensils":
            let allUstensils = JSON.parse(localStorage.allUstensils)
            let foundUstensils = [];
            for (const ustensil of allUstensils) {
                if (ustensil.toLowerCase().includes(tagSearchInput.toLowerCase())) {
                    if (!foundUstensils.includes(ustensil)) {
                        foundUstensils.push(ustensil)
                        
                    }
                }
            }
            localStorage.setItem("foundUstensils", JSON.stringify(foundUstensils))
            displaySuggestions(foundUstensils, type)
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
    // ~ Setting up suggestions & verifying each only shows up once
    let suggestions;
    let availableSuggestions = [...taglist.children]
    if (type === 'ingredients') {
        suggestions = JSON.parse(localStorage.foundIngredients)
        console.log(suggestions)
        for (const suggestion of suggestions) {
            if (availableSuggestions.length > 0) {
                if (availableSuggestions.filter( element => element.firstChild.data /* equals element.textContent*/ == suggestion ).length > 0) {
                    continue;
                } else {
                    const liElement = document.createElement('li')
                    liElement.classList.add(`${type}`)
                    liElement.classList.add('suggestion')
                    liElement.textContent = `${suggestion}`;
                    taglist.append(liElement)
                    //liElement.addEventListener("click", recipeTagSorting)
                    liElement.addEventListener("click", recipeTagSorting2)
                }  
            } else {
                const liElement = document.createElement('li')
                liElement.classList.add(`${type}`)
                liElement.classList.add('suggestion')
                liElement.textContent = `${suggestion}`;
                taglist.append(liElement)
                //liElement.addEventListener("click", recipeTagSorting)
                liElement.addEventListener("click", recipeTagSorting2)
            }
        }

    } else if (type === 'appliances') {
        suggestions = JSON.parse(localStorage.foundAppliances)
        console.log(suggestions)
        for (const suggestion of suggestions) {
            if (availableSuggestions.length > 0) {
                if (availableSuggestions.filter( element => element.firstChild.data /* equals element.textContent*/ == suggestion ).length > 0) {
                    continue;
                } else {
                    const liElement = document.createElement('li')
                    liElement.classList.add(`${type}`)
                    liElement.classList.add('suggestion')
                    liElement.textContent = `${suggestion}`;
                    taglist.append(liElement)
                    //liElement.addEventListener("click", recipeTagSorting)
                    liElement.addEventListener("click", recipeTagSorting2)
                }
            } else {
                const liElement = document.createElement('li')
                liElement.classList.add(`${type}`)
                liElement.classList.add('suggestion')
                liElement.textContent = `${suggestion}`;
                taglist.append(liElement)
                //liElement.addEventListener("click", recipeTagSorting)
                liElement.addEventListener("click", recipeTagSorting2)
            }
        }
        
    } else if (type === 'ustensils') {
        suggestions = JSON.parse(localStorage.foundUstensils)
        console.log(suggestions)
        for (const suggestion of suggestions) {
            if (availableSuggestions.length > 0) {
                if (availableSuggestions.filter( element => element.firstChild.data /* equals element.textContent*/ == suggestion ).length > 0) {
                    continue;
                } else {
                    const liElement = document.createElement('li')
                    liElement.classList.add(`${type}`)
                    liElement.classList.add('suggestion')
                    liElement.textContent = `${suggestion}`;
                    taglist.append(liElement)
                    //liElement.addEventListener("click", recipeTagSorting)
                    liElement.addEventListener("click", recipeTagSorting2)
                }
            } else {
                const liElement = document.createElement('li')
                liElement.classList.add(`${type}`)
                liElement.classList.add('suggestion')
                liElement.textContent = `${suggestion}`;
                taglist.append(liElement)
                //liElement.addEventListener("click", recipeTagSorting)
                liElement.addEventListener("click", recipeTagSorting2)
            }
        }
    }
    // ~ Removing suggestions that no longer align with user input
    const userInput = tagSearchElement.value
    console.log(userInput);
    for (const availableSuggestion of availableSuggestions) {
        if (!availableSuggestion.textContent.toLowerCase().includes(userInput.toLowerCase())) {
            taglist.removeChild(availableSuggestion)
        }
    }
}
//& Sorting remaining recipes
function recipeTagSorting(event) {
    //~ Adding tag to used tags list
    //const usedTagsList = document.querySelector('.used_tags')
    const usedTagsList = event.currentTarget.parentElement.parentElement.nextElementSibling
    const tagToAdd = document.createElement('li')
    tagToAdd.classList.add('used_tag')
    tagToAdd.textContent = `${event.currentTarget.textContent}`;
    const deleteTagSpan = document.createElement('svg')
    //setupUsedTag(deleteTagSpan)
    tagToAdd.appendChild(deleteTagSpan)
    usedTagsList.appendChild(tagToAdd)
    //deleteTagSpan.innerHTML = `<path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"></path>`
    deleteTagSpan.outerHTML = "<svg width=\"14\" height=\"13\" viewBox=\"0 0 14 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"path\"></path>\n</svg>"
    //deleteTagSpan.outerHTML = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
    //deleteTagSpan.classList.add('delete--tag') //! n'ajoute pas la classe sur l'élément, semble être overridé par outerHTML
    setupUsedTag(deleteTagSpan)
    deleteTagSpan.addEventListener("mouseover", deleteTagConfirm)
    deleteTagSpan.addEventListener("click", deleteUsedTag2)
    // deleteTagSpan.addEventListener("click", deleteUsedTag)

    //! Recreating the svg element to add event listeners on it because ever since outerHTML has been added to the former svg element, adding events is impossible & this, regardless of if events are added before or after outerHTML is used.
    const sameTagElement = tagToAdd.getElementsByClassName('delete--tag')
    sameTagElement[0].addEventListener("mouseover", deleteTagConfirm)
    sameTagElement[0].addEventListener("mouseout", deleteTagConfirm)
    sameTagElement[0].addEventListener("click", deleteUsedTag2)
    //sameTagElement[0].addEventListener("click", deleteUsedTag)
    //deleteTagSpan.addEventListener("mouseover", deleteTagConfirm())
    //deleteTagSpan.addEventListener("click", deleteUsedTag())

    //~ Sorting recipes based upon tag selection
    const selected = event.currentTarget.textContent
    const selectedType = event.currentTarget.classList[0]
    const results = sortRecipes(selected, selectedType)

    emptyResultSection()
    loadResults(results)
    loadRecipeCount(results)
}

function recipeTagSorting2(event) {
    //~ Adding tag to used tags list, 2nd method
    const usedTagsList = document.querySelector('.unique--Ut_list')
    const tagToAdd = document.createElement('li')
    tagToAdd.classList.add('used_tag')
    tagToAdd.textContent = `${event.currentTarget.textContent}`;
    const deleteTagSpan = document.createElement('svg')
    tagToAdd.appendChild(deleteTagSpan)
    usedTagsList.appendChild(tagToAdd)
    deleteTagSpan.outerHTML = "<svg width=\"14\" height=\"13\" viewBox=\"0 0 14 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"path\"></path>\n</svg>"
    setupUsedTag(deleteTagSpan)
    deleteTagSpan.addEventListener("mouseover", deleteTagConfirm)
    deleteTagSpan.addEventListener("click", deleteUsedTag)

    const sameTagElement = tagToAdd.getElementsByClassName('delete--tag')
    sameTagElement[0].addEventListener("mouseover", deleteTagConfirm)
    sameTagElement[0].addEventListener("mouseout", deleteTagConfirm)
    sameTagElement[0].addEventListener("click", deleteUsedTag)

    //~ Sorting recipes based upon tag selection
    const selected = event.currentTarget.textContent
    const selectedType = event.currentTarget.classList[0]
    const results = sortRecipes(selected, selectedType)

    emptyResultSection()
    loadResults(results)
    loadRecipeCount(results)
}