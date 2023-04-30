import axios from "axios";
import {API} from "../config";


// to search books and shows result on binary search
export const searchBook = async (name)=>{
    try{
        return await axios.get(`${API}/browse/${name}`)
    }catch(err){
        console.log(err);
    }
}



// to show books according to recommendation algorithm on the basis of rating
export const recommendedBooks = async(userId)=>{
    try{
        return await axios.get(`${API}/recommend/${userId}`)
    }catch(err){
        console.log(err);
    }
}


// to get all the books 
export const getAllBooks = async()=>{
    try{
        return await axios.get(`${API}/books`)
    }catch(err){
        console.log(err)
    }
}



// to get generes/ book category
export const getGenre = async()=>{
    try{
        return await axios.get(`${API}/category`)
    }catch(err){
        console.log(err)
    }
}


// to get single book details
export const getBookDetails = async(id)=>{
    try{
        return await axios.get(`${API}/single/${id}`)
    }catch(err){
        console.log(err)
    }
}


// get books by category
export const getBookbyCategory = async(cat)=>{
    try{
        return await axios.get(`${API}/books/${cat}`)
    }catch(err){
        console.log(err)
    }
}


// get books by userChoosed category (recommendation)
export const getUserRecommendation = async(id)=>{
    try{
        return await axios.get(`${API}/categoryrecommendation/${id}`)
    }catch(err){
        console.log(err)
    }
}


// get/show books related to category (on recommendation section)
export const listBooks = async(id)=>{
    try{
        return await axios.get(`${API}/listcatbooks/${id}`)
    }catch(err){
        console.log(err)
    }
}