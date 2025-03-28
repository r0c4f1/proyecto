// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu li');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remover la clase 'active' de todos los elementos li
            menuItems.forEach(li => li.classList.remove('active'));
            
            // Agregar la clase 'active' al li clicado
            this.classList.add('active');
        });
    });
});