export const populateDropdown = (dropdown, items) => {
    const list = document.getElementById(dropdown)
    items.forEach(item => {
        const option = document.createElement('li')
        option.innerHTML = `
        <button class="dropdown_item">${item}</button>`
        list.appendChild(option)
    })
}

// Toggle dropdowns
const ingredientButton = document.getElementById('ingredient_button')
const applianceButton = document.getElementById('appliance_button')
const ustensilsButton = document.getElementById('ustensil_button')
const dropdownsButtons = [ingredientButton, applianceButton, ustensilsButton]

export const handleDropdowns = () => dropdownsButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('dropdown-open')
        button.nextElementSibling.classList.toggle('active')
        const chevron = button.querySelector('.chevron-down')
        if (chevron) {
            if (button.classList.contains('dropdown-open')) {
                chevron.src = './assets/chevron-up.svg';
            } else {
                chevron.src = './assets/chevron-down.svg';
            }
        }


        // prevent multiple dropdowns simultaneously open
        dropdownsButtons.filter(btn => btn !== button).forEach(btn => {
            btn.classList.remove('dropdown-open')
            btn.nextElementSibling.classList.remove('active')

            const otherChevron = btn.querySelector('.chevron-down');
            if (otherChevron) {
                otherChevron.src = './assets/chevron-down.svg';
            }
        })
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            button.classList.remove('dropdown-open')
            button.nextElementSibling.classList.remove('active')

            const chevron = button.querySelector('.chevron-down');
            if (chevron) {
                chevron.src = './assets/chevron-down.svg';
            }
        }
    })
    // close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideDropdown = dropdownsButtons.some(button =>
            button.contains(event.target) || button.nextElementSibling.contains(event.target)
        );

        if (!isClickInsideDropdown) {
            dropdownsButtons.forEach(button => {
                button.classList.remove('dropdown-open');
                button.nextElementSibling.classList.remove('active');

                const chevron = button.querySelector('.chevron-down');
                if (chevron) {
                    chevron.src = './assets/chevron-down.svg';
                }
            });
        }
    });
})