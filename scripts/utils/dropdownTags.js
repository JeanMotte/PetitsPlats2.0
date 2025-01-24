export const handleTags = () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest(".dropdown_item");

        if (item) {
            item.classList.toggle("item-active");
            const activeItems = document.querySelectorAll(".item-active");
            const tags = Array.from(activeItems).map((tag) => tag.textContent);
            console.log(tags);

            const tagsContainer = document.querySelector(".tags-container");
            tags.forEach((tag) => {
                const tagElement = document.createElement("div");
                tagElement.classList.add("tag");
                tagElement.innerHTML = `
                <span>${tag}</span>
                <button class="tag-close">
                    <img src="assets/cross.svg" alt="close icon">
                </button>
                `;
                tagsContainer.appendChild(tagElement);
            })

        }
    });
};