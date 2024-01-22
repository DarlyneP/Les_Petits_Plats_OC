import { recipes } from "../../data/recipes.js";

function loadAllRecipes() {
    const sections = ["RECETTE, INGRÉDIENTS"]
    const recipesSection = document.querySelector('.results')
    for (const recipe of recipes) {

        const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe

        //~ Creating card
        const recipeCard = document.createElement('div')
        recipeCard.classList.add('recipe-card')
        recipesSection.appendChild(recipeCard)

        //~ Creating card image
        const recipePicture = document.createElement('img')
        recipePicture.classList.add('recipe-img')
        recipePicture.setAttribute('src', `./img/recipes/${image}`)
        
        //~ Creating elements to fill the card
        const duration = document.createElement('p')
        duration.classList.add('recipe-time')
        duration.textContent = `${time}min`;
        
        const recipeName = document.createElement('h4')
        recipeName.textContent = `${name}`;
        
        for (const section of sections) {
            const recipeSection = document.createElement('h5')
            recipeSection.textContent = `${section}`;
        } //! pas sur.. a supprimer maybe
        
        const recipeDescription = document.createElement('p')
        recipeDescription.textContent = `${description}`;
        
        //~ Adding
        recipeCard.appendChild(recipePicture)
        recipeCard.appendChild(duration)
        recipeCard.appendChild(recipeName)
        //todo : add RECETTE here
        recipeCard.appendChild(recipeDescription)
        //todo : add INGREDIENTS here


        //~ Adding card to page
        console.log('Card is ready');
        console.log(recipeCard);
        recipesSection.appendChild(recipeCard)

        //~
    }
}

export { loadAllRecipes }