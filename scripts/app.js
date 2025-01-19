import { recipes } from '../data/recipes.js';
import { recipeAttributes, recipeTemplate } from './template/recipe-template.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = recipeTemplate(recipe);

        recipesContainer.appendChild(recipeCard);
    });
})