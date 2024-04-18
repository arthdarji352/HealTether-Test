import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
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
      const res = await fetch("http://localhost:8000/api/v1/employee", {
        method: "POST",
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
      <h1 className="text-3xl text-center font-semibold my-10">Add Employee</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg"
          id="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="phone"
          className="border p-3 rounded-lg"
          id="phone"
          placeholder="phone"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default AddEmployee;
