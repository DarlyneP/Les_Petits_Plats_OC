// TODO : Sorting recipes based on tag input
//import { recipes } from "../../../data/recipes.js";

function recipeTagSorting(event) {
    const selected = event.currentTarget.textContent
    const selectedType = event.currentTarget.classList[0]
    sortRecipes(selected, selectedType)
}

function sortRecipes(selected, selectedType) {
    const recipes = JSON.parse(localStorage.foundRecipes)
    let results;
    results = recipes.map(function(recipe) {
        //const ingredients = recipe.ingredients
        switch (selectedType) {
            case "ingredients":
                const ingredients = recipe.ingredients
                /*for (const ingredient of ingredients) {
                    if (ingredient.toLowerCase().includes(selected.toLowerCase())) {
                        return recipe
                    }
                }*/
                if (ingredients.filter((element) => element.ingredient.toLowerCase().includes(selected.toLowerCase())).length > 0) {
                    return recipe
                }
                break;
            case "appliance":
                const appliance = recipe.appliance
                if (appliance.toLowerCase().includes(selected.toLowerCase())) {
                    return recipe
                }
                break;
            case "ustensils":
                const ustensils = recipe.ustensils
                for (const ustensil of ustensils) {
                    if (ustensil.toLowerCase().includes(selected.toLowerCase())) {
                        return recipe
                    }
                }
                break;
            default:
                break;
        }
    }).filter((recipe) => recipe !== undefined)

    console.log(results);
    localStorage.foundRecipes = JSON.stringify(results);

    return results
}

function tagSearchClear(tagSearchInput, event) {
    //const taglist = tagSearchInput.nextElementSibling
    const tagList = [...event.srcElement.nextElementSibling.children]
    //console.log(taglist); // prints undefined
    console.log(tagList);
    for (const tag of tagList) {
        if (!tag.textContent.toLowerCase().includes(tagSearchInput.toLowerCase())) {
            tagList.removeChild(tag)
        }
    }
    //~ Handling empty input field when backspace has erased everything
    if (tagSearchInput.length == 0 || !tagSearchInput) {
        for (const tag of tagList) {
            tagList.removeChild(tag)
        } 
    }
}

function setupUsedTag(tagElement) {
    //tagElement.classList.add('delete--tag') //! n'ajoute pas la classe sur l'élément, semble être overridé par outerHTML
    tagElement.addEventListener("mouseover", deleteTagConfirm)
    tagElement.addEventListener("mouseout", deleteTagConfirm)
    tagElement.addEventListener("click", deleteUsedTag2)
    // tagElement.addEventListener("click", deleteUsedTag)
}

function deleteTagConfirm(event) {
    console.log(event.currentTarget)
    console.log(event.srcElement)
    if (event.type == "mouseover") {
        //event.currentTarget.innerHTML = "\n<circle cx=\"8.5\" cy=\"8.5\" r=\"8.5\" fill=\"black\"></circle>\n<path d=\"M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11\" stroke=\"#FFD15B\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n"
        //event.currentTarget.innerHTML = "\n<path d=\"M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11\" stroke=\"#FFD15B\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n"
        //event.currentTarget.outerHTML = "<svg width=\"17\" height=\"17\" viewBox=\"0 0 17 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<circle cx=\"8.5\" cy=\"8.5\" r=\"8.5\" fill=\"black\"></circle>\n<path d=\"M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11\" stroke=\"#FFD15B\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //?event.currentTarget.outerHTML = "<svg width=\"17\" height=\"17\" viewBox=\"0 0 17 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11\" stroke=\"#FFD15B\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //event.currentTarget.outerHTML = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<circle cx=\"8.5\" cy=\"8.5\" r=\"8.5\" fill=\"black\"></circle>\n<path d=\"M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11\" stroke=\"#FFD15B\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //event.currentTarget.parentElement.style.fontWeight = "700"

        //! .currentTarget doesn't let us access the parent element here, so "relatedTarget", as well as "fromElement" can/will be used here instead
        event.fromElement.style.fontWeight = "700"
        // todo : add events listeners again because outerHTML suppresses them
        //const sameTagElement = event.fromElement.getElementsByClassName('delete--tag')
        const sameTagElement = event.fromElement.querySelector('.delete--tag')
        console.log(sameTagElement)
        event.srcElement.addEventListener("mouseover", deleteTagConfirm)
        //sameTagElement.addEventListener("mouseover", deleteTagConfirm)
        //event.currentTarget.addEventListener("mouseover", deleteTagConfirm)
        sameTagElement.addEventListener("mouseout", deleteTagConfirm)
        //event.currentTarget.addEventListener("mouseout", deleteTagConfirm)
        sameTagElement.addEventListener("click", deleteUsedTag2)
        // sameTagElement.addEventListener("click", deleteUsedTag)
        //event.currentTarget.addEventListener("click", deleteUsedTag)
        //sameTagElement[0].addEventListener("mouseout", deleteTagConfirm)
        //sameTagElement[0].addEventListener("click", deleteUsedTag)
        //event.currentTarget.classList.add('delete--tag') //! n'ajoute pas la classe sur l'élément, semble être overridé par outerHTML   
    } else if (event.type == "mouseout") {
        //event.currentTarget.innerHTML = `<path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"></path>`
        //event.currentTarget.outerHTML = "<svg width=\"14\" height=\"13\" viewBox=\"0 0 14 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //event.fromElement.style.fontWeight = "initial"

        //
        event.currentTarget.parentElement.style.fontWeight = "initial"
        const saveParentElement = event.currentTarget.parentElement
        //event.currentTarget.parentElement.outerHTML = "<svg width=\"14\" height=\"13\" viewBox=\"0 0 14 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //?event.currentTarget.outerHTML = "<svg width=\"14\" height=\"13\" viewBox=\"0 0 14 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //event.currentTarget.outerHTML = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete--tag\">\n<path d=\"M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5\" stroke=\"#1B1B1B\" stroke-width=\"2.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>"
        //event.currentTarget.parentElement.parentElement = event.currentTarget.parentElement
        //?event.currentTarget.parentElement = saveParentElement
        // todo : add events listeners again because outerHTML suppresses them
        //const sameTagElement = event.fromElement.getElementsByClassName('delete--tag')
        //const sameTagElement = event.fromElement.querySelector('.delete--tag')
        const sameTagElement = saveParentElement.lastChild
        sameTagElement.addEventListener("mouseover", deleteTagConfirm)
        sameTagElement.addEventListener("mouseout", deleteTagConfirm)
        sameTagElement.addEventListener("click", deleteUsedTag2)
        // sameTagElement.addEventListener("click", deleteUsedTag)
        //event.srcElement.addEventListener("mouseover", deleteTagConfirm)
        //event.srcElement.addEventListener("mouseout", deleteTagConfirm)
        //event.srcElement.addEventListener("click", deleteUsedTag)
        //event.currentTarget.classList.add('delete--tag') //! n'ajoute pas la classe sur l'élément, semble être overridé par outerHTML
    }
}

function deleteUsedTag(event) {
    const deleteLiElement = event.srcElement
    console.log(deleteLiElement);
    const liElement = deleteLiElement.parentElement.parentElement // deleteLiElement.parentNode also works
    const usedTagsList = liElement.parentElement // deleteLiElement.parentNode also works
    console.log(liElement);
    console.log(usedTagsList);
    usedTagsList.removeChild(liElement)
}

function deleteUsedTag2(event) {
    const deleteLiElement = event.srcElement
    console.log(deleteLiElement);
    const liElement = deleteLiElement.parentElement // deleteLiElement.parentNode also works
    const usedTagsList = liElement.parentElement // deleteLiElement.parentNode also works
    console.log(liElement);
    console.log(usedTagsList);
    usedTagsList.removeChild(liElement)
}

export { recipeTagSorting, sortRecipes, tagSearchClear, setupUsedTag, deleteTagConfirm, deleteUsedTag, deleteUsedTag2 };