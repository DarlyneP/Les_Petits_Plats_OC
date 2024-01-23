//* Search with NATIVE LOOPS
import { recipes } from "../../../data/recipes.js";


function findRecipes(searchInput) {
    const results = []
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const ingredients = recipe.ingredients
        if (recipe.name.includes(searchInput)) {
            results.push(recipe)
        }
        for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
            const ingredient = ingredients[ingredientIndex].ingredient;
            if (ingredient.includes(searchInput)) {
                results.push(recipe)
            }
        }
    }
    return results
}

export { findRecipes };