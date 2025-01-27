import { recipesCounter } from "./recipe-counter.js";

export const reactiveTagsandRecipes = (recipeContainer) => {
    const tagsContainer = document.querySelector(".tags-container");
    const tags = Array.from(tagsContainer.children).map((tag) => tag.querySelector('span').textContent.toLowerCase().trim());

    const totalRecipes = document.querySelectorAll('.recipe-card')

    const noRecipeMessage = document.querySelector('.no-recipe');
    let hasVisibleRecipes = false;




    totalRecipes.forEach(recipe => {
        if (tags.length === 0 && recipeContainer.children.length === 0) {
            recipe.classList.add('recipe-active');
            hasVisibleRecipes = true;
            return;
        }

        const hasAllTags = tags.every(tag => recipe.textContent.toLowerCase().trim().includes(tag));
        if (hasAllTags) {
            recipe.classList.add('recipe-active');
            hasVisibleRecipes = true
        } else {
            recipe.classList.remove('recipe-active');
        }

        hasVisibleRecipes
            ? noRecipeMessage.style.display = 'none'
            : noRecipeMessage.style.display = 'block';
    });

    const nbVisibleRecipes = document.querySelectorAll('.recipe-active').length;
    const nbRecipeLabel = document.querySelector('.nb-recettes-label');

    recipesCounter(nbVisibleRecipes);
    nbRecipeLabel.textContent = nbVisibleRecipes > 1 ? 'recettes' : 'recette';

    console.log('tags', tags);
}