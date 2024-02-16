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
    const tagList = event.srcElement.nextElementSibling
    //console.log(taglist); // prints undefined
    console.log(tagList);
    for (const tag of tagList) {
        if (!tag.textContent.includes(tagSearchInput)) {
            tagList.remove(tag)
        }
    }
}

export { recipeTagSorting, sortRecipes, tagSearchClear };