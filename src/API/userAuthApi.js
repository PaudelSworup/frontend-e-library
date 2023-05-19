import axios from "axios";
import { API } from "../config";

// login API
export const login = async(user)=>{
    return await fetch(`${API}/login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(res=>{
        return res.json()
    }).catch(err=>{
        return console.log(err)
    })
}


// upload profile Image
export const upload = async(data)=>{
    return await fetch(`${API}/profile`,{
        method:"POST",
        headers: {
            Accept: "application/json",
        },
        body: data,
    })
    .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
}


// get profile Image
export const getProfile = async()=>{
    try{
        return await axios.get(`${API}/profile`)
    }catch(err){
        console.log(err)
    }
}
