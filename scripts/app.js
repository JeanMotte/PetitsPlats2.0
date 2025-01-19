import { recipes } from '../data/recipes.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" />
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        `;
        recipesContainer.appendChild(recipeCard);
    });
})