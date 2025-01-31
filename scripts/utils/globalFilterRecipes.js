import { recipesCounter } from "./recipe-counter.js";

export const filterRecipes = (recipeContainer) => {
    const searchbar = document.querySelector('.main-search');
    const tagsContainer = document.querySelector(".tags-container");
    const noRecipeMessage = document.querySelector('.no-recipe');

    const filter = () => {
        const searchValue = searchbar.value.trim().toLowerCase();
        const selectedTags = Array.from(tagsContainer.children).map(tag => tag.querySelector('span').textContent.toLowerCase().trim());

        let visibleRecipes = 0;
        const recipeCards = recipeContainer.querySelectorAll('.recipe-card');

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
            } else {
                card.style.display = 'none';
            }
        });

        noRecipeMessage.style.display = visibleRecipes === 0 ? 'block' : 'none';
        recipesCounter(visibleRecipes);
    };

    // Attach event listeners for both search input and tag updates
    searchbar.addEventListener('input', filter);

    // Init a watcher and tells it to run the filter function whenever a change occurs in tagsContainer
    const observer = new MutationObserver(filter);
    observer.observe(tagsContainer, { childList: true, subtree: true });

    // Initial filter when page loads
    filter();
};
