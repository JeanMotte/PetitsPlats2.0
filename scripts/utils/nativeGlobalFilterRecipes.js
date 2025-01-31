import { escapeHtml } from "./escapeHtml.js";
import { recipesCounter } from "./recipe-counter.js";

export const nativeFilterRecipes = (recipeContainer) => {
    const searchbar = document.querySelector('.main-search');
    const tagsContainer = document.querySelector(".tags-container");
    const noRecipeMessage = document.querySelector('.no-recipe');

    const ingredientList = document.getElementById('ingredient_list');
    const applianceList = document.getElementById('appliance_list');
    const ustensilList = document.getElementById('ustensil_list');

    const filter = () => {
        const rawSearchValue = searchbar.value.trim().toLowerCase();
        const searchValue = escapeHtml(rawSearchValue); // Sanitize input

        const selectedTags = [];
        const tagElements = tagsContainer.children;
        for (let i = 0; i < tagElements.length; i++) {
            selectedTags.push(tagElements[i].querySelector('span').textContent.toLowerCase().trim());
        }

        let visibleRecipes = 0;
        const recipeCards = recipeContainer.querySelectorAll('.recipe-card');

        const filteredIngredients = new Set();
        const filteredAppliances = new Set();
        const filteredUstensils = new Set();

        for (let i = 0; i < recipeCards.length; i++) {
            const card = recipeCards[i];
            const recipeTitle = (card.querySelector('.recipe-name')?.textContent.trim().toLowerCase()) || '';
            const recipeDescription = (card.querySelector('.recipe-description.text-card')?.textContent.trim().toLowerCase()) || '';

            let recipeIngredients = '';
            const ingredientElements = card.querySelectorAll('.text-card');
            for (let j = 0; j < ingredientElements.length; j++) {
                recipeIngredients += ingredientElements[j].textContent.trim().toLowerCase() + ' ';
            }

            const searchableText = `${recipeTitle} ${recipeDescription} ${recipeIngredients}`.trim();
            const matchesSearch = searchValue.length < 3 || searchableText.includes(searchValue);

            let matchesTags = selectedTags.length === 0;
            if (!matchesTags) {
                matchesTags = true;
                for (let j = 0; j < selectedTags.length; j++) {
                    if (!searchableText.includes(selectedTags[j])) {
                        matchesTags = false;
                        break;
                    }
                }
            }

            if (matchesSearch && matchesTags) {
                card.style.display = 'block';
                visibleRecipes++;

                const ingredients = [];
                for (let j = 0; j < ingredientElements.length; j++) {
                    ingredients.push(ingredientElements[j].textContent.trim().toLowerCase());
                }

                const appliance = card.getAttribute('data-appliance')?.toLowerCase();
                const ustensils = card.getAttribute('data-ustensils')?.split(',');

                for (let j = 0; j < ingredients.length; j++) {
                    filteredIngredients.add(ingredients[j]);
                }

                if (appliance) {
                    filteredAppliances.add(appliance);
                }

                if (ustensils) {
                    for (let j = 0; j < ustensils.length; j++) {
                        filteredUstensils.add(ustensils[j].trim().toLowerCase());
                    }
                }
            } else {
                card.style.display = 'none';
            }
        }

        noRecipeMessage.style.display = visibleRecipes === 0 ? 'block' : 'none';
        recipesCounter(visibleRecipes);

        nativeUpdateDropdown(ingredientList, filteredIngredients);
        nativeUpdateDropdown(applianceList, filteredAppliances);
        nativeUpdateDropdown(ustensilList, filteredUstensils);
    };

    searchbar.addEventListener('input', filter);

    const observer = new MutationObserver(filter);
    observer.observe(tagsContainer, { childList: true, subtree: true });

    filter();
};

const nativeUpdateDropdown = (dropdown, filteredItems) => {
    const items = dropdown.querySelectorAll('li');

    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent.trim().toLowerCase();
        if (filteredItems.has(itemText)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
};
