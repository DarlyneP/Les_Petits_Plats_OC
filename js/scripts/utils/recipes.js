import { recipes } from "../../data/recipes.js";

function createRecipeCard(recipe) {
    // console.log('We are creating recipe cards'); //~ Validity check OK
    //~ Extracting data from recipe
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe

    //~ 
    const sections = ["RECETTE", "INGRÉDIENTS"]
    const recipesSection = document.querySelector('.results')

    //~ Creating card
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')
    recipesSection.appendChild(recipeCard)

    //~ Creating card image
    const recipePicture = document.createElement('img')
    recipePicture.classList.add('recipe-img')
    recipePicture.setAttribute('src', `./img/recipes/${image}`)
    recipeCard.appendChild(recipePicture)

    //~ Creating card content section
    const recipeContent = document.createElement('div')
    recipeContent.classList.add('recipe-content')
    recipeCard.appendChild(recipeContent)
    
    //~ Creating elements to fill the card
    const duration = document.createElement('p')
    duration.classList.add('recipe-time')
    duration.textContent = `${time}min`;
    
    const recipeName = document.createElement('h4')
    recipeName.textContent = `${name}`;
    
    
    const recipeSection = document.createElement('h5')
    recipeSection.textContent = `${sections[0]}`;
    const recipeDescription = document.createElement('p')
    recipeDescription.classList.add('recipe-description')
    recipeDescription.textContent = `${description}`;


    const ingredientsSection = document.createElement('h5')
    ingredientsSection.textContent = `${sections[1]}`;
    const ingredientsTable = document.createElement('div')
    ingredientsTable.classList.add('ingredients-table')

    for (const ingredient of ingredients) {
        const ingredientSlot = document.createElement('div')
        ingredientSlot.classList.add('ingredient')
        ingredientsTable.appendChild(ingredientSlot)
        const ingredientName = document.createElement('p')
        ingredientName.textContent = `${ingredient.ingredient}`
        const ingredientQuantity = document.createElement('p')
        ingredientQuantity.classList.add('ingredient-quantity')
        if (!ingredient.unit) {
            ingredientQuantity.textContent = `${ingredient.quantity}`  
        } else if (ingredient.quantity) {
            ingredientQuantity.textContent = `${ingredient.quantity}${ingredient.unit}`
        }
        ingredientSlot.appendChild(ingredientName)
        ingredientSlot.appendChild(ingredientQuantity)
    }
    
    
    
    //~ Adding
    // recipeCard.appendChild(recipePicture)
    recipeContent.appendChild(duration)
    recipeContent.appendChild(recipeName)
    recipeContent.appendChild(recipeSection)
    recipeContent.appendChild(recipeDescription)
    recipeContent.appendChild(ingredientsSection)
    recipeContent.appendChild(ingredientsTable)


    //~ Adding card to page
    console.log('Card is ready');
    console.log(recipeCard);
    recipesSection.appendChild(recipeCard)
}

function loadAllRecipes() {
    //~ Creating variables for the tag search
    let allIngredients = [];
    let allAppliances = [];
    let allUstensils = [];
    let foundRecipes = [];
    for (const recipe of recipes) {
        const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe
        //~ Creating recipe card & saving the recipe
        createRecipeCard(recipe)
        foundRecipes.push(recipe)

        //~ Storing data for the tag search
        //allIngredients.push(ingredients)
        for (const ingredient of ingredients) {
            /*if (allIngredients.filter((element) => element.toLowerCase().includes(ingredient.ingredient.toLowerCase())).length < 1) {
                allIngredients.push(ingredient.ingredient)
                
            }*/
            if (allIngredients.filter((element) => element.toLowerCase() == ingredient.ingredient.toLowerCase()).length < 1) {
                allIngredients.push(ingredient.ingredient)
                
            }

        }

        allAppliances.push(appliance)

        //allUstensils.push(ustensils)
        for (const ustensil of ustensils) {
            allUstensils.push(ustensil)
        }

    }
    //~ Making the data accessible
    localStorage.setItem("foundRecipes", JSON.stringify(foundRecipes))
    localStorage.setItem("allIngredients", JSON.stringify(allIngredients))
    localStorage.setItem("allAppliances", JSON.stringify(allAppliances))
    localStorage.setItem("allUstensils", JSON.stringify(allUstensils))
}

function loadResults(results) {
    for (const result of results) {
        createRecipeCard(result)
    }
}

export { loadAllRecipes, loadResults }