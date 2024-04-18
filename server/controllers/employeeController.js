import EmployeeModel from "../models/employee.js";

//add employee
export const addEmployeeController = async (req, res) => {
  try {
    const { name, email, phone, id } = req.body;
    // const id = req.userId;

    if (!name || !email || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const newUser = await EmployeeModel.create({
      name,
      email,
      phone,
      userId: id,
    });

    res.status(201).send({
      success: true,
      message: "user added successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "error while addinguser" });
  }
};

//get employee list
export const getEmployeeController = async (req, res) => {
  try {
    // const employees = await EmployeeModel.find();
    const getData = await EmployeeModel.find({ userId: req.params.id });

    res.status(200).send({
      success: true,
      getData,
    });
  } catch (error) {
    res.status(500).json({ message: "error while getting employeelist" });
  }
};
//get single employee list
export const getSingleEmployeeController = async (req, res) => {
  try {
    // const employees = await EmployeeModel.find();
    const getData = await EmployeeModel.find({ _id: req.params.id });

    res.status(200).send({
      success: true,
      getData,
    });
  } catch (error) {
    res.status(500).json({ message: "error while getting employeelist" });
  }
};

//update
export const updateEmployeeController = async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    // console.log(req.params.id);
    //valdiatiuon
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "employee not found",
      });
    }

    const { name, email, phone } = req.body;
    // validate and update
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (phone) employee.phone = phone;

    await employee.save();
    res.status(200).send({
      success: true,
      message: "employee details updated",
    });
  } catch (error) {
    res.status(500).json({ message: "error while updateing employee" });
  }
};

//delete

export const deleteEmployeeController = async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "employee deleted successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: "error while deleting employee" });
  }
};
