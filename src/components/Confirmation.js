import React, { useEffect, useState } from 'react'
import NavBars from './NavBars'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { confirmAccount } from '../API/userAuthApi'

const Confirmation = () => {
    const {token} = useParams()
    const [message , setMessage] = useState()


    useEffect(()=>{
        confirmAccount(token).then((res)=>{
            console.log(res)
        },[token])
    })
    const showError = ()=>{
        return toast("Enter book name 📖", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
    
    
        const showSuccess = ()=>{
            return toast("Enter book name 📖", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
  return (
    <>
    <NavBars />
    <ToastContainer
    position="top-center"
    autoClose={3000}
    theme="light"
  />
    </>
    

  )
}

export default Confirmation