import { recipes } from '../data/recipes.js';
import { recipeTemplate } from './template/recipe-template.js';
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
})