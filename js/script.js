const buttons = document.querySelectorAll('.btn-outline');
const sections = document.querySelectorAll('.tab-section');

function switchTab(sectionId) {
            // 1. Hide all tab sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // 2. Remove 'active' class from all buttons
            buttons.forEach(button => {
                button.classList.remove('active');
            });

            // 3. Show the targeted section
            document.getElementById(sectionId).classList.add('active');

            // 4. Mark the clicked button as active
            event.currentTarget.classList.add('active');
}