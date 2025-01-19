import { recipes } from '../data/recipes.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
        <div class="recipe-img-container">
            <img src="../assets/recipes-assets/${recipe.image}" alt="${recipe.name}" />
            <p class="recipe-time">${recipe.time} min</p>
        </div>
       <div class="recipe-content">
            <h2 class="recipe-name">${recipe.name}</h2>
            <p class="recette-label">Recette</p>
            <p class="recette-description text-card">${recipe.description}</p>
            <p class="recette-label">Ingredients</p>
            <ul class="recette-ingredients">
                ${recipe.ingredients.map(ingredient => `<li><p class="text-card">${ingredient.ingredient}</p><p>${ingredient.quantity} ${ingredient.unit}</p></li>`).join('')}
        </div>
            `
        recipesContainer.appendChild(recipeCard);
    });
})