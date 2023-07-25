import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import NavBars from "./NavBars";
import { getGenre } from "../API/bookAPI";
import Select from "react-select";
import { createAccount } from "../API/userAuthApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LabelComp from "./LabelComp";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [genre, setGenre] = useState([]);

  useEffect(() => {
    getGenre().then((res) => {
      console.log(res);
      setGenre(res?.data.category);
    });
  }, []);

  const options = genre?.map((data) => ({
    value: data?.category_name,
    label: data?.category_name,
  }));

  const initialValues = {
    fullName: "",
    email: "",
    address: "",
    mobileNumber: "",
    categories: [],
    password: "",
    confirmPassword: "",
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    values,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .min(2, "Name must be atleast of two characters")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      address: Yup.string().required("Address is required"),
      mobileNumber: Yup.string()
        .length(10)
        .required("Mobile Number is required"),
      categories: Yup.array()
        .min(1, "Select at least one category")
        .required("Categories are required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character with a minimum length of 8 characters."
        )
        .required("Password is required."),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      createAccount({
        fullname: values.fullName,
        email: values.email,
        address: values.address,
        mobilenum: values.mobileNumber,
        password: values.password,
        choosedCatgoeirs: values.categories,
      }).then((res) => {
        if (res.success === true) {
          toast.success(res.message, { position: "top-center" });
          resetForm();
        } else {
          toast.error(res.error, { position: "top-center" });
        }
      });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <NavBars />
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/3847620/pexels-photo-3847620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-md w-full space-y-8">
          <p className="text-white"></p>
          <div>
            <h2 className="mt-6 text-center  text-3xl font-extrabold text-white tracking-widest">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <LabelComp labelForhtml="Full name"/>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.fullName && touched.fullName
                      ? "border-red-700"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Full Name"
                />
                {errors.fullName && touched.fullName && (
                  <p className="mt-2 text-lg text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
              <LabelComp labelForhtml="Email Address"/>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.email && touched.email
                      ? "border-red-700"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-lg text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
              <LabelComp labelForhtml="Address"/>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.email && touched.email
                      ? "border-red-700"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your address"
                />
                {errors.address && touched.address && (
                  <p className="mt-2 text-lg text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
              <LabelComp labelForhtml="Mobile number"/>
                <input
                  id="mobileNumber"
                  type="number"
                  name="mobileNumber"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.mobileNumber && touched.mobileNumber
                      ? "border-red-700"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your mobileNumber"
                />
                {errors.mobileNumber && touched.mobileNumber && (
                  <p className="mt-2 text-lg text-red-500">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
              <LabelComp labelForhtml="Password"/>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.password && touched.password
                      ? "border-red-700"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <p className="mt-2 text-lg text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
              <LabelComp labelForhtml="Confirm password"/>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-2 text-lg text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="Categories">
                  Categories
                </label>
                <Select
                  isMulti
                  name="categories"
                  onChange={(e) =>
                    setFieldValue(
                      "categories",
                      e.map((obj) => obj.value)
                    )
                  }
                  options={options}
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                    errors.categories && touched.categories
                      ? "border-red-700"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                />
                {errors.categories && touched.categories && (
                  <p className="mt-2 text-lg text-red-500">
                    {errors.categories}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="showPassword"
                  name="showPassword"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  onChange={togglePasswordVisibility}
                />
                <label
                  htmlFor="showPassword"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Show Password
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="light"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
