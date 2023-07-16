// export const API = "http://localhost:8000/api"
export let API
export let image

if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
    API = "http://localhost:8000/api"
    image = "http://localhost:8000"
} else{
    API = "http://192.168.1.73:8000/api"
    image="http://192.168.1.73:8000"
} 



