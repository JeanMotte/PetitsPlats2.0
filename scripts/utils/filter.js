export const triggerDropdown = () => {
    const dropdowns = document.querySelectorAll('.dropdown-title');
    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');

    dropdowns.forEach(btn => btn.addEventListener('click', () => {
        dropdownContent.classList.toggle('.active');
    }))
}