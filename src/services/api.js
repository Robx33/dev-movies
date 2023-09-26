import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '76d0eb273b723ae4a7759cf792907faf',
        language: 'pt-BR',
        page: 1
    }
})

export default api