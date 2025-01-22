import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjA5NDM1MjkwMGU0Zjc2ZWJmMWUwNWJkZTAyNWNiZCIsIm5iZiI6MTczNjg1MjkxOS4zNjksInN1YiI6IjY3ODY0NWI3YWJhYmJiYTA0MGJiOWI4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g5Al3-zsQz2mb_npXMhy25oqeR-HVaXRJFDwCOm2rvg',
    }
})

export default instance