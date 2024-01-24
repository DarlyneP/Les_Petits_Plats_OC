//* Search with NATIVE LOOPS
import { recipes } from "../../../data/recipes.js";


function findRecipes(searchInput) {
    const results = []
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const ingredients = recipe.ingredients
        for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
            const ingredient = ingredients[ingredientIndex].ingredient;
            if (ingredient.toLowerCase().includes(searchInput.toLowerCase()) && recipe.name.toLowerCase().includes(searchInput.toLowerCase())) {
                results.push(recipe)
                continue;
            } else if (recipe.name.toLowerCase().includes(searchInput.toLowerCase())) {
                if (results.includes(recipe)) {
                    continue;
                } else {
                    results.push(recipe)
                }
            } else if (ingredient.toLowerCase().includes(searchInput.toLowerCase())) {
                if (results.includes(recipe)) {
                    continue;
                } else {
                    results.push(recipe)
                }
            }
        }
    }
    return results
}

export { findRecipes };