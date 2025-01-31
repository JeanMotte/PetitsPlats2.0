import { escapeHtml } from "./escapeHtml.js"

const applianceInput = document.getElementById('appliance_input')
const ingredientInput = document.getElementById('ingredient_input')
const ustensilInput = document.getElementById('ustensil_input')

const dropdownInputs = [applianceInput, ingredientInput, ustensilInput]

export const dropdownReactiveSearch = () => {
    dropdownInputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const rawValue = e.target.value.toLowerCase();
            const value = escapeHtml(rawValue); // Sanitize input

            const dropdownContent = e.target.closest('.dropdown_content')
            const dropdown = dropdownContent.querySelector('.dropdown_list')
            const dropdownItems = dropdown.querySelectorAll('li')
            dropdownItems.forEach((item) => {
                (item.textContent.toLowerCase().includes(value))
                    ? item.style.display = 'block'
                    : item.style.display = 'none'
            })
        })
    })
}