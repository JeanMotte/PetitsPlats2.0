import { recipes } from '../data/recipes.js';
import { recipeTemplate } from './template/recipe-template.js';
import { handleDropdowns, populateDropdown } from './utils/dropdownBehaviour.js';
import { dropdownReactiveSearch } from './utils/dropdownSearch.js';
import { handleTags } from './utils/dropdownTags.js';
import { filterRecipes } from './utils/globalFilterRecipes.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = recipeTemplate(recipe);

        recipeCard.setAttribute('data-ingredients', recipe.ingredients.map(i => i.ingredient.toLowerCase()).join(','));
        recipeCard.setAttribute('data-appliance', recipe.appliance.toLowerCase());
        recipeCard.setAttribute('data-ustensils', recipe.ustensils.map(u => u.toLowerCase()).join(','));

        recipesContainer.appendChild(recipeCard);
    });

    // Populate dropdowns
    const ingredientList = recipes.flatMap(recipe => recipe.ingredients.map(i => i.ingredient.toLowerCase()));
    const uniqueIngredients = [...new Set(ingredientList)].map(i => i.charAt(0).toUpperCase() + i.slice(1));
    uniqueIngredients.sort();
    populateDropdown('ingredient_list', uniqueIngredients);

    const applianceList = recipes.map(recipe => recipe.appliance.toLowerCase());
    const uniqueAppliances = [...new Set(applianceList)].map(a => a.charAt(0).toUpperCase() + a.slice(1));
    uniqueAppliances.sort();
    populateDropdown('appliance_list', uniqueAppliances);

    const ustensilList = recipes.flatMap(recipe => recipe.ustensils.map(u => u.toLowerCase()));
    const uniqueUstensils = [...new Set(ustensilList)].map(u => u.charAt(0).toUpperCase() + u.slice(1));
    uniqueUstensils.sort();
    populateDropdown('ustensil_list', uniqueUstensils);

    handleDropdowns()
    dropdownReactiveSearch()
    handleTags()

    filterRecipes(recipesContainer)
})