const form = document.querySelector('.form-container')
const fotoButton = document.querySelector('#foto-button')
const closeButton = document.querySelector('.close-button')
const dialog = document.querySelector('dialog')
const video = document.getElementById('video')
const takePhoto = document.getElementById('take-photo-btn')
const canvas = document.getElementById('canvas')
const tirarOutraFoto = document.querySelector('.photo-button-container > img')

const btn = document.createElement('button')
const btnTirarFoto = document.createElement('button')
let stream
let image_data_url

document.querySelector('.foto-form > img').style.display = 'none'

fotoButton.addEventListener('click', async () => {
    dialog.showModal()
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (image_data_url) {
        canvas.style.display = 'block'
        video.style.display = 'none'
    } else {
        video.srcObject = stream;
        canvas.style.display = 'none'
        tirarOutraFoto.style.display = 'none'
    }
})

function tirarFoto(){
    tirarOutraFoto.style.display = 'block'
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    video.style.display = 'none'
    canvas.style.display = 'block'
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }
    takePhoto.remove()
    if(btnTirarFoto){
        btnTirarFoto.remove()
    }
    btn.innerText = 'Salvar'
    document.querySelector('.photo-button-container').append(btn)
    btn.addEventListener('click', () => {
        dialog.close()
        image_data_url = canvas.toDataURL('image/jpeg')
        document.querySelector('.foto-form > img').style.display = 'block'
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
        }
        console.log(image_data_url);
    })

}

takePhoto.addEventListener('click', tirarFoto)

tirarOutraFoto.addEventListener('click', async () => {
    if (stream) {
        if(btn){
            btn.remove()
        }
        btnTirarFoto.id = 'take-photo-btn'
        btnTirarFoto.innerText = 'Tirar foto'
        btnTirarFoto.addEventListener('click', tirarFoto)
        document.querySelector('.photo-button-container').append(btnTirarFoto)
        canvas.style.display = 'none'
        video.style.display = 'block'
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        document.querySelector('.foto-form > img').style.display = 'none'
    } else {
        stream.getTracks().forEach(track => track.stop())
    }
})

closeButton.addEventListener('click', () => {
    dialog.close()
    canvas.style.display = 'none'
    video.style.display = 'block'
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const nasc = e.target.dt_nascimento.value
    const date = nasc.split('-')
    const senha = `${date[2]}${date[1]}`
    fetch('https://api-teste.safetowork.com.br/api/storePessoas/equipamento', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            EquipmentToken: '1708|rcKKJDAm4eyJpdiI6InZrdk5sMldhUFIycGs2bHlENU44MWc9PSIsInZhbHVlIjoia1JYWEtiM1hLZ2JLOTFoUmV6SElvdz09IiwibWFjIjoiOWNmZmNiOGZhOTg3NTBhMDcwNzRjNDYwZWM1OGQwYzMyNzExMTljMzNhMmE2MGE3Nzc2N2UzOGI2NDFjNDc0MSIsInRhZyI6IiJ9vGKb5KErBs3WSFHtyXdrmMwNAA2AD9j1ec1fc79',

        },
        body: JSON.stringify({
            nome: e.target.nome.value,
            email: e.target.email.value,
            matricula: e.target.matricula.value,
            dt_nascimento: e.target.dt_nascimento.value,
            senha,
            bio_face_identifier: image_data_url,
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




