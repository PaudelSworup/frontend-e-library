import axios from "axios";
import {API} from "../config";


export const searchBook = async (name)=>{
    try{
        return await axios.get(`${API}/browse/${name}`)
    }catch(err){
        console.log(err);
    }
}


export const recommendedBooks = async(userId)=>{
    try{
        return await axios.get(`${API}/recommend/${userId}`)
    }catch(err){
        console.log(err);
    }
}