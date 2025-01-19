export const populateDropdown = (dropdown, items) => {
    const list = document.getElementById(dropdown)
    items.forEach(item => {
        const option = document.createElement('li')
        option.textContent = item
        list.appendChild(option)
    })
}

// Toggle dropdowns
const ingredientButton = document.getElementById('ingredient_button')
const dropdownContentIngredients = document.querySelector('.dropdown_content_ingredient')
ingredientButton.addEventListener('click', () => {
    dropdownContentIngredients.classList.toggle('active')
})

const applianceButton = document.getElementById('appliance_button')
const dropdownContentAppliances = document.querySelector('.dropdown_content_appliance')
applianceButton.addEventListener('click', () => {
    dropdownContentAppliances.classList.toggle('active')
})

const ustensilsButton = document.getElementById('ustensil_button')
const dropdownContentUstensils = document.querySelector('.dropdown_content_ustensil')
ustensilsButton.addEventListener('click', () => {
    dropdownContentUstensils.classList.toggle('active')
})