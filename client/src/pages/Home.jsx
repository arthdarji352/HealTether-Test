import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../redux/user/userSlice";

const Home = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const employeeList = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/employee/${currentUser._id}`
    );

    const data = await res.json();
    setEmployee(data.getData);
  };

  useEffect(() => {
    employeeList();
  }, []);

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("api/auth/signout");
      if (res.ok) {
        dispatch(signOutUserSuccess());
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/v1/employee/${id}`, {
      method: "DELETE",
    });
    employeeList();
  };
  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <div>
          <h1 className="text-xl font-bold mt-5">
            User Name: {currentUser?.name}
          </h1>
        </div>
        <div>
          <button
            onClick={handleAddEmployee}
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Add Employee
          </button>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            {employee.length === 0 && (
              <>
                <h1 className="text-center font-bold my-4 text-red-600">
                  Please Add Employee
                </h1>
              </>
            )}
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {employee.length &&
                  employee?.map((emp) => {
                    return (
                      <tbody key={emp._id} className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {emp.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {emp.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {emp.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              onClick={() =>
                                navigate(`/update-employee/${emp._id}`)
                              }
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Update
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              onClick={() => handleDelete(emp._id)}
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
