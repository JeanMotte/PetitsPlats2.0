export const triggerDropdown = () => {
    const dropdowns = document.querySelectorAll('.filter-button');
    dropdowns.forEach(btn => {
        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown-content');
        btn.appendChild(dropdownContent);
        btn.addEventListener('click', () => {
            dropdownContent.classList.toggle('active');
        })
    })
}
