export const handleTags = () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest(".dropdown_item");

        if (item) {
            const tagsContainer = document.querySelector(".tags-container");
            item.classList.toggle("item-active");

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
            }
            else {
                existingTag.remove();
            }

            const closeButtons = document.querySelectorAll(".tag-close");
            closeButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    button.closest(".tag").remove();
                    item.classList.remove("item-active");
                });
            });
        }
    });
};