import http from "./http";

export function fetchEmployees() {
  return http.get("/tasks");
}

export function fetchEmployeeById(id) {
  return http.get(`/tasks/${id}`);
}

export function addEmployee(employee) {
  const employeeClone = { ...employee };
  Object.keys(employeeClone).forEach((key) => {
    if (
      employeeClone[key] === "" ||
      employeeClone[key] === null ||
      employeeClone[key] === undefined
    ) {
      delete employeeClone[key];
    }
  });

  return http.post("/tasks", employeeClone);
}

export function updateEmployee(id, employee) {
  const employeeClone = { ...employee };
  Object.keys(employeeClone).forEach((key) => {
    if (
      employeeClone[key] === "" ||
      employeeClone[key] === null ||
      employeeClone[key] === undefined
    ) {
      delete employeeClone[key];
    }
  });
  return http.put(`/tasks/${id}`, employeeClone);
}

export function deleteEmployee(id) {
  return http.delete(`/tasks/${id}`);
}
