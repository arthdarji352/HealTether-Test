import { legacy_createStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  //   console.log(id);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const employeeData = async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/employee/single/${id}`
      );

      const data = await res.json();
      const { name, email, phone } = data?.getData[0];
      //   console.log(name, email, phone);
      setFormData((pre) => ({ ...pre, name, email, phone }));
    };
    // console.log(formData);
    employeeData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      id: currentUser._id,
    });
    // setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/v1/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-10">
        Update Employee
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg"
          id="name"
          placeholder="name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="phone"
          className="border p-3 rounded-lg"
          id="phone"
          placeholder="phone"
          onChange={handleChange}
          value={formData.phone}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default UpdateEmployee;
