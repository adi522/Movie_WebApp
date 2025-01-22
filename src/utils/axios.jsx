import axios from "axios";

const apiToken = import.meta.env.VITE_REACT_APP_TOKEN;

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
    },
});

export default instance;

