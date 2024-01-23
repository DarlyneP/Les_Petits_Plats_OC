//* Search with NATIVE LOOPS
import { recipes } from "../../../data/recipes.js";

const recipeNames = [] //~ Storing every recipe name here

for (const recipe of recipes) {
    recipeNames.push(recipe.name)
}