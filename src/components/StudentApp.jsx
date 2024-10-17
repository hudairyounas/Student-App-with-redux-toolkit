import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  updateStudent,
  deleteStudent,
} from "../features/studentsSlice";
import * as Yup from "yup";

const StudentApp = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: {
      city: "",
      province: "",
      zip: "",
    },
    password: "",
    about: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.object().shape({
      city: Yup.string().required("City is required"),
      province: Yup.string().required("Province is required"),
      zip: Yup.string().required("Zip code is required"),
    }),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    about: Yup.string(),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      const fieldErrors = {};
      err.inner.forEach((error) => {
        fieldErrors[error.path] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const isValid = await validate();
    if (isValid) {
      if (formData.id) {
        dispatch(updateStudent(formData));
      } else {
        dispatch(addStudent({ ...formData, id: Date.now() }));
      }
      resetForm();
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: "",
      address: {
        city: "",
        province: "",
        zip: "",
      },
      password: "",
      about: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Student Management
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName}</div>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName}</div>
            )}
          </div>
          <div>
            <label htmlFor="gender" className="block mb-1">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" label="Select gender" />
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <div className="text-red-500">{errors.gender}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">
              Phone No:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
          </div>
          <div>
            <label htmlFor="address.city" className="block mb-1">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.address?.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address?.city && (
              <div className="text-red-500">{errors.address.city}</div>
            )}
          </div>
          <div>
            <label htmlFor="address.province" className="block mb-1">
              Province:
            </label>
            <input
              type="text"
              id="province"
              name="address.province"
              value={formData.address.province}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.address?.province ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address?.province && (
              <div className="text-red-500">{errors.address.province}</div>
            )}
          </div>
          <div>
            <label htmlFor="address.zip" className="block mb-1">
              Zip Code:
            </label>
            <input
              type="text"
              id="zip"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.address?.zip ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address?.zip && (
              <div className="text-red-500">{errors.address.zip}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div>
            <label htmlFor="about" className="block mb-1">
              About:
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              rows="4"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          {formData.id ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2 className="text-xl font-semibold">Student List</h2>
      <ul className="list-disc pl-5">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center mb-2"
          >
            <span>{`${student.firstName} ${student.lastName} (${student.gender}, ${student.phone})`}</span>
            <div>
              <button
                onClick={() => handleEdit(student)}
                className="bg-yellow-500 text-white px-2 mx-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-500 text-white px-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentApp;
