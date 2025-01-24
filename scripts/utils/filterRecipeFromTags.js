export const reactiveTagsandRecipes = () => {
    const tagsContainer = document.querySelector(".tags-container");
    const tags = Array.from(tagsContainer.children).map((tag) => tag.querySelector('span').textContent.toLowerCase().trim());

    const totalRecipes = document.querySelectorAll('.recipe-card')

    totalRecipes.forEach(recipe => {
        if (tags.length === 0) {
            recipe.classList.add('recipe-active');
            return;
        }
        tags.forEach(tag => {
            if (recipe.textContent.toLowerCase().trim().includes(tag)) {
                recipe.classList.add('recipe-active');
            } else {
                recipe.classList.remove('recipe-active');
            }
        });
    });
    console.log('tags', tags);
}