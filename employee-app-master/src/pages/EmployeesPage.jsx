import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeesTable from "../components/EmployeesTable";
import * as employeeService from "../services/employee";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    employeeService.fetchEmployees().then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleDeleteEmployee = async (id) => {
    const employeesClone = [...employees];

    try {
      setEmployees(employees.filter((employee) => employee.id !== id));
      await employeeService.deleteEmployee(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Data might have already been deleted");
      }
      setEmployees(employeesClone);
    }
  };
  const handleUpdateChanged = (id) => {
    const task = employees.find((task) => task.id === id);
    task.completed = !task.completed;
    employeeService.updateEmployee(id, task);
    setEmployees(
      employees.map((task) => {
        if (task.id === id) {
          return {
            ...task,
          };
        }
        return task;
      })
    );
  };

  return (
    <Grid container spacing={2} justifyContent="flex-end" textAlign="right">
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to="/employees/new"
        >
          Add Tasks
        </Button>
      </Grid>
      <Grid item xs={12}>
        <EmployeesTable
          onDeleteEmployee={handleDeleteEmployee}
          employees={employees}
        />
      </Grid>
      <Grid item xs={12}>
        <EmployeesTable
          onDeleteEmployee={handleDeleteEmployee}
          onUpdateChanged={handleUpdateChanged}
          employees={employees}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeesPage;
