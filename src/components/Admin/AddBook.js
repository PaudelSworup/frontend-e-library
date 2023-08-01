import React, { useEffect, useState } from "react";
import { FaFilePdf, FaFileImage, FaCheckCircle } from "react-icons/fa";
import LabelAdmin from "./LabelAdmin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addBooks, getGenre } from "../../API/bookAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  useEffect(() => {
    getGenre()
      .then((res) => {
        setCategories(res?.data?.category);
      })
      .catch((err) => console.log(err));
  }, []);

  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [stock, setStock] = useState(10);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [category, setCategory] = useState();
  const [publicationDate, setPublicationDate] = useState(null);
  const [publisher, setPublisher] = useState("");
  const [categories, setCategories] = useState("");

  const handleDateChange = (date) => {
    setPublicationDate(date);
  };

  const className = "block font-semibold tracking-widest mb-1";

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("isbn", isbn);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", image);
    formData.append("pdf", pdf);
    formData.append("desc", description);
    formData.append("publisher", publisher);
    formData.append("yearofpublication", publicationDate);
    addBooks(formData).then((res) => {
      if (res?.error && res.success === false) {
        return toast.error(res?.error, { position: "top-right" });
      } else {
        setTitle("");
        setIsbn("");
        setImage(null);
        setPdf(null);
        setDescription("");
        setCategory("")
        setPublisher("");
        setPublicationDate(null);
        return toast.success(res?.message, { position: "top-center" });
      }
    });
  };
  return (
    <div className="min-h-screen px-2 py-2 sm:px-5 bg-gray-400 flex justify-center items-center">
      <form className="w-full max-w-4xl bg-gray-200 shadow-md rounded-lg px-8 pt-6 pb-8">
        <h2 className="text-2xl font-semibold mb-6">Add Book Description</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="h-96 w-full border  border-gray-300 rounded-lg overflow-hidden">
              <div className="flex p-3 items-center justify-center">
                {!image && (
                  <FaFileImage
                    title="upload book image"
                    className="text-9xl text-gray-600 cursor-pointer mt-16"
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                )}
              </div>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Book Cover"
                  className="object-cover h-auto w-full"
                />
              )}
             
            </div>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                // style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
              />

            <div className="h-64 w-full border  border-gray-300 rounded-lg overflow-hidden">
              <div className="flex p-3 items-center justify-center">
                {!pdf && (
                  <FaFilePdf
                    title="upload book file/pdf"
                    className="text-9xl text-gray-600 cursor-pointer mt-16"
                    onClick={() => document.getElementById("pdf").click()}
                  />
                )}
              </div>
              {pdf && (
                <div className="flex items-center justify-center">
                  <FaCheckCircle
                    title="file uploaded"
                    className="text-9xl cursor-pointer text-green-600"
                  />
                </div>
              )}
              
            </div>
            
            <input  
                type="file"
                id="pdf"
                // style={{ display: "none" }}
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
              />
           
           
          </div>
          <div>
            <div>
              <LabelAdmin labelForhtml="Title:" className={className} />
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <LabelAdmin labelForhtml="ISBN:" className={className} />
              <input
                type="number"
                id="number"
                className="w-full no-number-spin  px-3 py-2 border rounded-lg"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>

            <div>
              <LabelAdmin
                labelForhtml="Category/Genre:"
                className={className}
              />
              <select
                id="category"
                className="w-full bg-white px-3 py-2 border rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories &&
                  categories?.map((c, i) => (
                    <option value={c._id} key={i}>
                      {c.category_name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <LabelAdmin labelForhtml="Publisher:" className={className} />
              <input
                type="text"
                id="publisher"
                className="w-full   px-3 py-2 border rounded-lg"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            <div>
              <LabelAdmin labelForhtml="Stock:" className={className} />
              <input
                type="number"
                id="stock"
                className="w-full no-number-spin  px-3 py-2 border rounded-lg"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <LabelAdmin
                labelForhtml="Year of publication:"
                className={className}
              />
              <DatePicker
                className="w-full px-3 py-2 border rounded-lg"
                selected={publicationDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={75}
                showMonthDropdown
                maxDate={new Date()}
              />
            </div>

            <div className="mt-4">
              <LabelAdmin labelForhtml="Description:" className={className} />
              <textarea
                id="description"
                className="w-full h-48 px-3 py-2 border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              theme="light"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
