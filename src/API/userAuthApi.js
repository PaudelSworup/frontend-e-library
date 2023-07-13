import axios from "axios";
import { API } from "../config";




// register api

export const createAccount = async(userInfo)=>{
    return await fetch(`${API}/users`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userInfo)
    }).then(res=>{
        return res.json()
    }).catch(err=>{
        return console.log(err)
    })
}

export const confirmAccount = async(token)=>{
    console.log(token)
    return await fetch(`${API}/confirmation/${token}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            // "Content-Type":"application/json"
        },
        body:JSON.stringify(token)
    }).then(res=>{
        return res.json()
    }).catch(err=>{
        return console.log(err)
    })
}

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


// get history of the books issued/rejected/accepted
export const getHistory = async()=>{
    try{
        return await axios.get(`${API}/history`)
    }catch(err){
        console.log(err)
    }
}


export const getApprovalStatus = async (userid)=>{
    try{
        return await axios.post(`${API}/approve/${userid}`)
    }catch(err){
        console.log(err)
    }
}


// forgot password 
export const forgotPassword = async(email)=>{
    console.log(email)
    // console.log(token)
    return await fetch(`${API}/forgot`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(email)
    }).then(res=>{
        return res.json()
    }).catch(err=>{
        return console.log(err)
    })
}



