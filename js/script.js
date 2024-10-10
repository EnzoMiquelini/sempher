const form = document.querySelector('.form-container')
const fotoButton = document.querySelector('#foto-button')
const dialog = document.querySelector('dialog')
fotoButton.addEventListener('click', () => {
    dialog.showModal()
})
