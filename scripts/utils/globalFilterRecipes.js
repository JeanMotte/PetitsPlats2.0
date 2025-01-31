import { escapeHtml } from "./escapeHtml.js";
import { recipesCounter } from "./recipe-counter.js";

export const filterRecipes = (recipeContainer) => {
    const searchbar = document.querySelector('.main-search');
    const tagsContainer = document.querySelector(".tags-container");
    const noRecipeMessage = document.querySelector('.no-recipe');

    // select dropdown lists
    const ingredientList = document.getElementById('ingredient_list');
    const applianceList = document.getElementById('appliance_list');
    const ustensilList = document.getElementById('ustensil_list');

    const filter = () => {
        const rawSearchValue = searchbar.value.trim().toLowerCase();
        const searchValue = escapeHtml(rawSearchValue); // Sanitize input

        const selectedTags = Array.from(tagsContainer.children).map(tag => tag.querySelector('span').textContent.toLowerCase().trim());

        let visibleRecipes = 0;
        const recipeCards = recipeContainer.querySelectorAll('.recipe-card');

        // Store unique ingredients, appliances, and utensils in the filtered recipes
        const filteredIngredients = new Set();
        const filteredAppliances = new Set();
        const filteredUstensils = new Set();

        recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('.recipe-name')?.textContent.trim().toLowerCase() || '';
            const recipeDescription = card.querySelector('.recipe-description.text-card')?.textContent.trim().toLowerCase() || '';
            const recipeIngredients = Array.from(card.querySelectorAll('.text-card')).map(ingredient => ingredient.textContent.trim().toLowerCase()).join(' ') || '';

            const searchableText = `${recipeTitle} ${recipeDescription} ${recipeIngredients}`;
            const matchesSearch = searchValue.length < 3 || searchableText.includes(searchValue);
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => searchableText.includes(tag));

            if (matchesSearch && matchesTags) {
                card.style.display = 'block';
                visibleRecipes++;

                // Extract the ingredient, appliance, and ustensil from this recipe card
                const ingredients = Array.from(card.querySelectorAll('.text-card')).map(ingredient =>
                    ingredient.textContent.trim().toLowerCase()
                );
                const appliance = card.getAttribute('data-appliance')?.toLowerCase();
                const ustensils = card.getAttribute('data-ustensils')?.split(',').map(u => u.trim().toLowerCase());

                ingredients.forEach(ingredient => filteredIngredients.add(ingredient));
                if (appliance) filteredAppliances.add(appliance);
                ustensils?.forEach(ustensil => filteredUstensils.add(ustensil));
            } else {
                card.style.display = 'none';
            }
        });

        noRecipeMessage.style.display = visibleRecipes === 0 ? 'block' : 'none';
        recipesCounter(visibleRecipes);

        // Update dropdown lists
        updateDropdown(ingredientList, filteredIngredients);
        updateDropdown(applianceList, filteredAppliances);
        updateDropdown(ustensilList, filteredUstensils);
    };

    // Attach event listeners for both search input and tag updates
    searchbar.addEventListener('input', filter);

    // Init a watcher and tells it to run the filter function whenever a change occurs in tagsContainer
    const observer = new MutationObserver(filter);
    observer.observe(tagsContainer, { childList: true, subtree: true });

    // Initial filter when page loads
    filter();
};

const updateDropdown = (dropdown, filteredItems) => {
    const items = dropdown.querySelectorAll('li');

    items.forEach(item => {
        const itemText = item.textContent.trim().toLowerCase();
        if (filteredItems.has(itemText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};