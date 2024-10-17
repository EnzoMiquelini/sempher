const form = document.querySelector('.form-container')
const fotoButton = document.querySelector('#foto-button')
const closeButton = document.querySelector('.close-button')
const video = document.getElementById('video')
const takePhoto = document.getElementById('take-photo-btn')
const canvas = document.getElementById('canvas')
const tirarOutraFoto = document.querySelector('.photo-button-container > img')

const btn = document.createElement('button')
const btnTirarFoto = document.createElement('button')
const submitButton = document.querySelector(".formulario")


let isLoading

const setLoading = (state) => {
    isLoading = state
}
const disableButton = () => {
    submitButton.disabled = true
    submitButton.innerHTML = `Enviando... <div class="loader"></div>`
}

const enableButton = () => {
    submitButton.disabled = false
    submitButton.innerHTML = 'Enviar'
}

let stream
let image_data_url

const getUserMedia = navigator.getUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia;

const ras = [
    "000457",
    "000802",
    "000609",
    "000918",
    "000395",
    "000372",
    "000345",
    "000789",
    "000494",
    "300663",
    "298195",
    "294354",
    "296514",
    "292695",
    "292534",
    "294925",
    "300742",
    "295064",
    "000226",
    "293164",
    "298144",
    "297796",
    "293013",
    "294915",
    "292485",
    "301602",
    "301242",
    "296905",
    "294665",
    "293413",
    "299686",
    "295003",
    "293223",
    "294213",
    "293814",
    "299425",
    "298596",
    "293143",
    "298825",
    "288565",
    "283094",
    "298414",
    "294274",
    "295244",
    "294765",
    "296103",
    "294655",
    "294395",
    "301272",
    "294414",
    "292675",
    "293865",
    "297504",
    "297987",
    "296414",
    "294886",
    "297365",
    "301301",
    "292814",
    "301902",
    "299235",
    "294264",
    "294595",
    "293354",
    "293565",
    "287185",
    "293655",
    "295365",
    "293675",
    "286365",
    "286755",
    "283765",
    "291153",
    "283624",
    "287625",
    "283485",
    "284174",
    "282554",
    "286925",
    "286655",
    "289776",
    "283002",
    "285203",
    "284575",
    "282904",
    "285714",
    "290374",
    "288866",
    "290674",
    "290734",
    "282775",
    "282513",
    "282885",
    "283274",
    "285264",
    "282413",
    "289345",
    "283213",
    "289966",
    "284233",
    "286404",
    "283603",
    "271924",
    "276264",
    "275845",
    "277123",
    "275624",
    "280353",
    "281384",
    "276996",
    "275413",
    "279756",
    "268095",
    "279576",
    "181248",
    "281423",
    "281173",
    "276955",
    "274814",
    "275565",
    "276714",
    "277825",
    "277735",
    "276364",
    "275303",
    "277745",
    "280594",
    "279175",
    "277395",
    "280543",
    "280674",
    "281212",
    "275704",
    "259324",
    "256904",
    "272403",
    "273433",
    "256313",
    "272875",
    "273323",
    "271774",
    "271333",
    "271895",
    "262764",
    "270964",
    "270975",
    "272063",
    "270995",
    "256413",
    "256423",
    "272094",
    "273233",
    "274063",
    "272433",
    "271222",
    "274395",
    "271053"
]

document.querySelector('.foto-form > img').style.display = 'none'

fotoButton.addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (image_data_url) {
        canvas.style.display = 'block'
        video.style.display = 'none'
        document.querySelector('.foto-form > img').style.display = 'block'
    } else {
        video.srcObject = stream;
        canvas.style.display = 'none'
        tirarOutraFoto.style.display = 'none'
        if (takePhoto) {
            takePhoto.remove()
            if (btn) {
                btn.remove()
            }
            btnTirarFoto.id = 'take-photo-btn'
            btnTirarFoto.innerText = 'Tirar foto'
            btnTirarFoto.addEventListener('click', tirarFoto)
            document.querySelector('.photo-button-container').append(btnTirarFoto)
        }
    }
})

function tirarFoto() {
    tirarOutraFoto.style.display = 'block'

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const getOrientation = window.innerHeight > innerWidth ? "portrait" : "landscape"

    if(isMobile && getOrientation == "portrait"){
        canvas.width = 240
        canvas.height = 320
    }
    else{
        canvas.width = 320
        canvas.height = 240
    }


    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width = isMobile ? 240 : 320, canvas.height = isMobile ? 320 : 240);
    
    video.style.display = 'none'
    canvas.style.display = 'block'
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }
    takePhoto.remove()
    if (btnTirarFoto) {
        btnTirarFoto.remove()
    }
    btn.innerText = 'Salvar'
    btn.setAttribute('data-bs-dismiss', 'modal')
    document.querySelector('.photo-button-container').append(btn)
    btn.addEventListener('click', () => {
        image_data_url = canvas.toDataURL('image/jpeg', 0.9)
        document.querySelector('.foto-form > img').style.display = 'block'
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
        }
    })

}

takePhoto.addEventListener('click', tirarFoto)

tirarOutraFoto.addEventListener('click', async () => {
    if (stream) {
        if (btn) {
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
        image_data_url = ''
    } else {
        stream.getTracks().forEach(track => track.stop())
    }
})

closeButton.addEventListener('click', () => {
    canvas.style.display = 'none'
    video.style.display = 'block'
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    setLoading(true)
    const nasc = e.target.dt_nascimento.value
    const date = nasc.split('-')
    const nascimento = `${date[2]}-${date[1]}-${date[0]}`
    const senha = `${date[2]}${date[1]}`
    const matricula = e.target.matricula.value
    const check = e.target.check.checked
    
    function ValidarEmail (email) {
        const emailPatternAluno =  /^[_a-z]+(\.[_a-z]+)*@sou.fae.br$/;
        const emailPatternProf =  /^[_a-z]+(\.[_a-z]+)*@prof.fae.br$/;
        return emailPatternAluno.test(email) ||  emailPatternProf.test(email); 
    }
    
    if (isLoading) {
        disableButton()
    }

    if (!e.target.nome.value || !e.target.email.value || !e.target.matricula.value || !e.target.dt_nascimento.value) {
        setLoading(false)
        enableButton()
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Preencha todos os campos!",
        });
        return
    }

    if (!image_data_url) {
        setLoading(false)
        enableButton()
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Tire uma foto!",
        });
        return
    }
    
    if (!ValidarEmail(e.target.email.value)) {
        setLoading(false)
        enableButton()
        Swal.fire({
            icon: "error",
            title: "E-mail inválido",
            text: "Digite o e-mail institucional!",
        });

        return
    }

    if (!ras.includes(matricula.replaceAll('-', ''))) {
        setLoading(false)
        enableButton()
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Matricula/RA inválido!",
        });
        return
    }
        
    if(!check){
        setLoading(false)
        enableButton()
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Concorde com os termos de uso!",
        });
        return
    }

    fetch('https://api-teste.safetowork.com.br/api/storePessoas/equipamento', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            EquipmentToken: '1708|rcKKJDAm4eyJpdiI6InZrdk5sMldhUFIycGs2bHlENU44MWc9PSIsInZhbHVlIjoia1JYWEtiM1hLZ2JLOTFoUmV6SElvdz09IiwibWFjIjoiOWNmZmNiOGZhOTg3NTBhMDcwNzRjNDYwZWM1OGQwYzMyNzExMTljMzNhMmE2MGE3Nzc2N2UzOGI2NDFjNDc0MSIsInRhZyI6IiJ9vGKb5KErBs3WSFHtyXdrmMwNAA2AD9j1ec1fc79',

        },
        body: JSON.stringify({
            nome: e.target.nome.value,
            email: e.target.email.value,
            matricula: matricula.replaceAll('-', ''),
            dt_nascimento: nascimento,
            senha,
            bio_face_identifier: image_data_url.replaceAll('data:image/jpeg;base64,', ''),
            id_funcao: 311,
            id_setor: 75,
            estado_naturalidade: 'sp',
            nacionalidade: 'brasileira',
            status: 1,
            id_grupo: 65,
            id_empresa: 20,
            tipo_usuario: 'colaborador',
            primeiro_acesso: 0
        })

    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then(errors => {
                throw errors
            })
        })
        .then(() => {
            setLoading(false)
            enableButton()
            location.replace('success.html')
        })
        .catch(error => {
            setLoading(false)
            enableButton()
            if (error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: error.message,
                });
                return
            }
            if (error.error) {
                document.querySelector('.foto-form > img').style.display = 'none'
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: error.error,
                });
                return
            }
        })
})
