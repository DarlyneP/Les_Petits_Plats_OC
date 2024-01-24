//* Search with NATIVE LOOPS
import { recipes } from "../../../data/recipes.js";


function findRecipes(searchInput) {
    const results = []
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const ingredients = recipe.ingredients
        /*if (recipe.name.includes(searchInput)) {
            results.push(recipe)
        }*/
        for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
            const ingredient = ingredients[ingredientIndex].ingredient;
            if (ingredient.includes(searchInput) && recipe.name.includes(searchInput)) {
                results.push(recipe)
                continue;
            } else if (recipe.name.includes(searchInput)) {
                if (results.includes(recipe)) {
                    continue;
                } else {
                    results.push(recipe)
                }
            } else if (ingredient.includes(searchInput)) {
                if (results.includes(recipe)) {
                    continue;
                } else {
                    results.push(recipe)
                }
            }

            //! remplacer le if précédent par un if else dont la première étape fait && avec recipe name + un exit si concluant, & le else if prend en charge recipe name le cas échéant
        }
    }
    return results
}

export { findRecipes };