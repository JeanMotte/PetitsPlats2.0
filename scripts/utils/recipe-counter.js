export const recipesCounter = (recipes) => {
    const recipeCounter = document.querySelector('.nb-recettes-detailed');
    recipeCounter.textContent = recipes.length;
}