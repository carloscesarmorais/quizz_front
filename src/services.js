import axios from 'axios';

const getManchetes = axios.create({
    baseURL: 'https://h6fqs3qigl.execute-api.us-east-2.amazonaws.com/quizz/manchetes',
})

const savePerfil = axios.create({
    baseURL: 'https://h6fqs3qigl.execute-api.us-east-2.amazonaws.com/quizz/perfil'
})

export default { getManchetes, savePerfil };

