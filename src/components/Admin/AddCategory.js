import React, { useState } from "react";
import { addCategory } from "../../API/bookAPI";
import { ToastContainer, toast } from "react-toastify";
import LabelAdmin from "./LabelAdmin";


const AddCategory = () => {
  const [genre, setGenre] = useState("");
  const className = "block font-semibold tracking-widest mb-1";

  const handleSubmit = (e)=>{
    e.preventDefault()
    addCategory({category_name:genre}).then((res)=>{
      console.log(res)
        if(res?.error || res.success === false){
            return toast.error(res?.error,{position:"top-right"})
        }else return toast.success(res?.message,{position:"top-center"})
    })
  }
  return (
    <div className="min-h-screen px-10 bg-gray-400 flex justify-center items-center">
      <form className="w-full max-w-4xl bg-gray-200 shadow-md rounded-lg px-8 pt-6 pb-8">
        <h2 className="text-2xl font-semibold mb-6">Add Category/Genre</h2>
        <div>
          <LabelAdmin labelForhtml="Genre:" className={className} />
          <input
            type="text"
            id="genre"
            className="w-full   px-3 py-2 border rounded-lg"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Book
        </button>
        
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddCategory;
