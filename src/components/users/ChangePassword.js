import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabelComp from "./LabelComp";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "../../API/userAuthApi";

const ChangePassword = () => {
  const { userid } = useSelector((state) => state.users);

  const validationSchema = Yup.object({
    password: Yup.string().required("Current password is required"),
    new_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("New password is required"),
    repeat_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Repeat password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      repeat_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      changePassword(values, userid).then((res) => {
        if (res?.error && res.success === false) {
          toast.error(res?.error, { position: "top-right" });
        } else {
          formik.resetForm();
          toast.success(res?.message, { position: "top-center" });
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-wrap">
        <h3 className="text-white text-xl font-serif font-bold tracking-widest">
          Change your Password
        </h3>
      </div>
      <div>
        <LabelComp labelForhtml="current password:" />
        <input
          id="password"
          className="w-full px-3 py-2 border-none rounded bg-white focus:outline-none focus:border-blue-500"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <LabelComp labelForhtml="new password:" />
        <input
          id="new_password"
          className="w-full px-3 py-2 border-none rounded bg-white focus:outline-none focus:border-blue-500"
          type="password"
          value={formik.values.new_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.new_password && formik.errors.new_password ? (
          <div className="text-red-500">{formik.errors.new_password}</div>
        ) : null}
      </div>
      <div>
        <LabelComp labelForhtml="repeat password:" />
        <input
          id="repeat_password"
          className="w-full px-3 py-2 border-none rounded bg-white focus:outline-none focus:border-blue-500"
          type="password"
          value={formik.values.repeat_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.repeat_password && formik.errors.repeat_password ? (
          <div className="text-red-500">{formik.errors.repeat_password}</div>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 tracking-wide text-white rounded bg-blue-500 hover:bg-blue-600 focus:outline-none"
        >
          <span className="flex items-center gap-3">
            Update password
            <FaSave />
          </span>
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
