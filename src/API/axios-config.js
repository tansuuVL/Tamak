import axios from "axios"

export const API = "http://localhost:8000/data"

export const $api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
})