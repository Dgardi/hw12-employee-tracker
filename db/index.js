const server = require("./server.js");

class DB {
    constructor(server) { 
        this.server = server;
    }


// GET 

// Get Departments 

getDepartment() {return this.server.promise().query("SELECT department.id, department.name FROM department;");}

// Get Roles 
getRoles() {return this.server.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");}

// Get Employees

getEmployees() {return this.server.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;");}

// CREATE 

// Add Department
addDept(department) {return this.server.promise().query("INSERT INTO department SET ?", department);}

// Add Role 
addRole(role) {return this.server.promise().query("INSERT INTO role SET?", role);}

// Add Employee
addEmp(employee) { return this.server.promise().query("INSERT INTO employee SET ?", employee);}


// UPDATE
// Prepared statments use the '?' in MySQL to allow for binding params to the statement. Highly regarded as more secure against SQL injections if used properly.
// This also allows for quicker SQL queries as the request only has to be compiled once and can be reused.
updateEmpRole(employeeId, roleId) {return this.server.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);}


}

module.exports = new DB(server);