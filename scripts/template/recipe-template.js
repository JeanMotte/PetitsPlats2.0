export const recipeTemplate = (recipe) => {
    return `
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
                ${recipe.ingredients.map(ingredient =>
        `<li>
                <p class="text-card">${ingredient.ingredient ?? ''}</p>
                <p class="recipe-quantity">${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}</p>
        </li>`).join('')}
        </div>
            `
}

export const setRecipeAttributes = (recipeCard) => {
    const { ingredients, appliance, ustensils } = recipeCard.recipe;
    console.log(recipeCard.recipe);


    recipeCard.setAttribute('data-ingredients', ingredients.map(i => i.ingredient).join(','));
    recipeCard.setAttribute('data-appliance', appliance);
    recipeCard.setAttribute('data-ustentils', ustensils.join(','));
}