import { reactiveTagsandRecipes } from "./filterRecipeFromTags.js";

export const handleTags = () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest(".dropdown_item");

        if (item) {
            const tagsContainer = document.querySelector(".tags-container");
            item.classList.toggle("item-active");



            // display or remove tags wether it exists or not
            const tagText = item.textContent.trim();
            const existingTag = Array.from(tagsContainer.children).find((tag) => tag.querySelector('span').textContent.trim() === tagText);

            if (!existingTag) {
                const tagElement = document.createElement("div");
                tagElement.classList.add("tag");
                tagElement.innerHTML = `
                <span>${tagText}</span>
                <button class="tag-close">
                    <img src="assets/tag-close.svg" alt="close icon">
                </button>
                `;
                tagsContainer.appendChild(tagElement);
                reactiveTagsandRecipes();
            }
            else {
                existingTag.remove();
                reactiveTagsandRecipes();
            }

            // TODO: array to use to filter recipes
            // TODO: use recipes-container children to filter recipes
            // const aciveTags = document.querySelectorAll(".item-active");
            // const tagsArray = Array.from(aciveTags).map((tag) => tag.textContent.trim());
            // console.log(tagsArray);

            // remove tag and updates dropdown state
            const closeButtons = document.querySelectorAll(".tag-close");
            closeButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    button.closest(".tag").remove();
                    item.classList.remove("item-active");
                    reactiveTagsandRecipes();
                });
            });
        }
    });
};