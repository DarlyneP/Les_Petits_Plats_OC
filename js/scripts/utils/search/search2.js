//* Search with FUNCTIONNAL PROGRAMMING
import { recipes } from "../../../data/recipes.js";

function findRecipes(searchInput) {
    //const results = []
    let results;
    /*for (const recipe of recipes) {

    }*/

    /*recipes.forEach(recipe => {
        console.log(recipe);

    });*/

    results = recipes.map(  function(recipe) {
        const ingredients = recipe.ingredients
        if(recipe.name.includes(recipe.name.toLowerCase().includes(searchInput.toLowerCase())) && ingredients.filter((element) => element.ingredient.includes(searchInput.toLowerCase())).length > 0) {
            return recipe 
        }  else if (recipe.name.includes(recipe.name.toLowerCase().includes(searchInput.toLowerCase()))) {
            return recipe
        } else if (ingredients.filter((element) => element.ingredient.toLowerCase().includes(searchInput.toLowerCase())).length > 0) {
            console.log(recipe);
            return recipe
        }
    }).filter((recipe) => recipe !== undefined)
    console.log(results)

    localStorage.foundRecipes = JSON.stringify(results)

    return results
}

export { findRecipes };

// Testing
/*
const map2 = recipes.map(  function(recipe) { if(recipe.name.includes('h')) { return recipe }  }   )
console.log(map2)

const map2 = recipes.map(  function(recipe) { if(recipe.name.includes('h')) { return recipe }  }   ).filter((recipe) => recipe !== undefined)
console.log(map2)


~Tests made in the console of the filter() page on MDN
const result2 = words.filter((word) => word.length > 18);
if (result2.length > 0 ) { console.log('yes') } else { console.log('no') } //! 'no'
if (result2.length == 0 ) { console.log('yes') } else { console.log('no') } //! 'yes'
if (words.filter((word) => word.length > 18).length == 0 ) { console.log('yes') } else { console.log('no') } //! 'yes'
if (words.filter((word) => word.length > 18).length > 0 ) { console.log('yes') } else { console.log('no') } //! 'no'

~Tests made in the console of the map() page on MDN
const map2 = recipes.map(  function(recipe) { if(recipe.name.includes('i')) { return recipe }  }   ).filter((recipe) => recipe !== undefined)
console.log(map2) //! prints the array with found recipe & "undefined" in places of recipes that do not fit
const ingredients = recipes.map((recipe) => recipe.ingredients)
const test = map2.filter((element) => element.ingredient) //! removes all "undefined" & prints a clean array
console.log(test)
*/