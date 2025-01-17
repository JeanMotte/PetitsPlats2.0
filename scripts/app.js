import { recipes } from '../data/recipes.js';
import { recipeTemplate } from './template/recipe-template.js';
import { populateDropdown } from './utils/dropdown.js';
import { recipesCounter } from './utils/recipe-counter.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = recipeTemplate(recipe);

        recipesContainer.appendChild(recipeCard);

    });

    // Number of recipes displayed 
    recipesCounter(recipes);

    // Populate dropdowns
    const ingredientList = recipes.flatMap(recipe => recipe.ingredients);
    const ingredientItems = new Set(ingredientList.map(ingredient => ingredient.ingredient));
    const finalIngredientItems = [...ingredientItems].map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1));
    finalIngredientItems.sort();
    populateDropdown('ingredient_list', finalIngredientItems);

    const applianceList = recipes.map(recipe => recipe.appliance);
    const applianceItems = new Set(applianceList);
    const finalApplianceItems = [...applianceItems].map(appliance => appliance.charAt(0).toUpperCase() + appliance.slice(1));
    finalApplianceItems.sort();
    populateDropdown('appliance_list', finalApplianceItems);

    const ustensilsList = recipes.flatMap(recipe => recipe.ustensils);
    const ustensilsItems = new Set(ustensilsList);
    const finalUstensilsItems = [...ustensilsItems].map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
    finalUstensilsItems.sort();
    populateDropdown('ustensil_list', finalUstensilsItems);
})