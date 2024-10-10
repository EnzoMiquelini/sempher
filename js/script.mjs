const form = document.querySelector('.form-container')
const fotoButton = document.querySelector('#foto-button')
const closeButton = document.querySelector('.close-button')
const dialog = document.querySelector('dialog')
fotoButton.addEventListener('click', () => {
    dialog.showModal()
})
closeButton.addEventListener('click', () => {
    dialog.close()
})
form.addEventListener('submit', (e)=> {
    e.preventDefault()
    fetch('https://api-teste.safetowork.com.br/api/storePessoas/equipamento', {
        method : 'POST',
        headers : {
            Accept: 'application/json',
            EquipmentToken: '1708|rcKKJDAm4eyJpdiI6InZrdk5sMldhUFIycGs2bHlENU44MWc9PSIsInZhbHVlIjoia1JYWEtiM1hLZ2JLOTFoUmV6SElvdz09IiwibWFjIjoiOWNmZmNiOGZhOTg3NTBhMDcwNzRjNDYwZWM1OGQwYzMyNzExMTljMzNhMmE2MGE3Nzc2N2UzOGI2NDFjNDc0MSIsInRhZyI6IiJ9vGKb5KErBs3WSFHtyXdrmMwNAA2AD9j1ec1fc79',

        },
        body : JSON.stringify({
            nome: e.target.nome.value,
            email: e.target.email.value,
            matricula: e.target.matricula.value,
            dt_nascimento: e.target.dt_nascimento.value,
            senha: 'nascSenha',
            bio_face_identifier: 'img',
            id_funcao: 311,
            id_setor: 75,
            estado_naturalidade: 'sp',
            nacionalidade: 'brasil',
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
})




