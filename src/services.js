import axios from 'axios';

const getManchetes = axios.create({
    baseURL: 'localhost:8080/quizz/manchetes',
})

const savePerfil = axios.create({
    baseURL: 'localhost:8080/quizz/perfil'
})

export default { getManchetes, savePerfil };

