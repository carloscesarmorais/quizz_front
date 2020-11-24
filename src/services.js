import axios from 'axios';

const getManchetes = axios.create({
    baseURL: 'https://59mj4amdhi.execute-api.us-east-1.amazonaws.com/quizz/manchetes',
})

const savePerfil = axios.create({
    baseURL: 'http://ec2-54-209-43-99.compute-1.amazonaws.com:8080/quizz/salvar/perfil'
})

export default { getManchetes, savePerfil };

