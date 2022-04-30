const connection = require("./server.js");

class DB {
    constructor(connection) { 
        this.connection = connection;
    }


// GET 

// Get Departments 

getDepartment() {return this.connection.promise().query("SELECT department.id, department.name FROM department;");}

// Get Roles 
getRoles() {return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");}

// Get Employees

getEmployees() {return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary;");}

// CREATE 

// Create Department
addDept() {return this.connection.promise().query("INSERT INTO department SET ?", department);}

// Create Role 
createRole(role) {return this.connection.promise().query("INSERT INTO role SET?", role);}


// UPDATE
// Prepared statments use the '?' in MySQL to allow for binding params to the statement. Highly regarded as more secure against SQL injections if used properly.
// This also allows for quicker SQL queries as the request only has to be compiled once and can be reused.
updateEmpRole(employeeId, roleId) {return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);}


}

module.exports = new DB(connection);