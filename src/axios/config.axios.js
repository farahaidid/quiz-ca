import axios from "axios"

export const QUESTIONS_API = axios.create({
   baseURL: "https://opentdb.com/api.php"
})