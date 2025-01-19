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
    populateDropdown('ingredient_list', ingredientItems);

    const applianceList = recipes.map(recipe => recipe.appliance);
    const applianceItems = new Set(applianceList);
    populateDropdown('appliance_list', applianceItems);

    const ustensilsList = recipes.flatMap(recipe => recipe.ustensils);
    const ustensilsItems = new Set(ustensilsList);
    populateDropdown('ustensil_list', ustensilsItems);
})