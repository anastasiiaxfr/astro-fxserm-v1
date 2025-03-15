import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const froms = document.querySelectorAll('form');
froms.forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();
    });
});
