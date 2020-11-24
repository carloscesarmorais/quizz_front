import axios from 'axios';

const getManchetes = axios.create({
    baseURL: 'https://59mj4amdhi.execute-api.us-east-1.amazonaws.com/quizz/manchetes',
})

const savePerfil = axios.create({
    baseURL: 'https://59mj4amdhi.execute-api.us-east-1.amazonaws.com/quizz/perfil'
})

export default { getManchetes, savePerfil };

