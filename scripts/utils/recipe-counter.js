export const recipesCounter = (recipes) => {
    const recipeCounter = document.querySelector('.nb-recettes-detailed');
    recipeCounter.textContent = formatTotalRecipes(recipes.length);
}

const formatTotalRecipes = (recipes) => {
    return recipes < 10 ? `0${recipes}` : recipes;
}