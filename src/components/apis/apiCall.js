import axios from "axios";

export function GetAllUser(){
    return axios.get(' https://jsonplaceholder.typicode.com/users')
}
export function GetPosts(){
    return axios.get(' https://jsonplaceholder.typicode.com/posts')
}
export function GetCountries(){
    return axios.get('http://worldtimeapi.org/api/timezone')
}
export function GetTimeZone(data){
    return axios.get(' http://worldtimeapi.org/api/timezone/'+data)
}