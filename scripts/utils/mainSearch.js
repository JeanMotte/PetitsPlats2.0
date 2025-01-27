
export const mainSearch = (recipeContainer) => {

    const searchbar = document.querySelector('.main-search');

    searchbar.addEventListener('input', () => {
        const searchValue = searchbar.value.trim().toLowerCase();
        let visibleRecipes = 0;

        if (searchValue === '') {
            recipeContainer.querySelectorAll('.recipe-card.recipe-active')
                .forEach(card => card.style.display = 'block');
            visibleRecipes = 0;
        }
        if (searchbar.value.trim().length < 3) return


        const recipeCards = recipeContainer.querySelectorAll('.recipe-card');


        recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('.recipe-name')?.textContent.trim().toLowerCase() || '';
            const recipeDescription = card.querySelector('.recipe-description.text-card')?.textContent.trim().toLowerCase() || '';
            const recipeIngredients = Array.from(card.querySelectorAll('.text-card')).map(ingredient => ingredient.textContent.trim().toLowerCase()).join(' ') || '';

            const searchableText = `${recipeTitle} ${recipeDescription} ${recipeIngredients}`;

            if (searchableText.includes(searchValue)) {
                card.style.display = 'block';
                visibleRecipes++;
            }
            else {
                card.style.display = 'none';
            }
        });
        return visibleRecipes;
    })
}