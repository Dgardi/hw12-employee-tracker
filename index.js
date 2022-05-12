const inquirer = require("inquirer");
const db = require("./db");
require("console.table"); 


employeeTracker();


function employeeTracker() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "choice",
            message: "Please make a selection",
            choices: [
                {
                    name:  "View All Departments",
                    value: "ViewDepartments"
                },
                {
                    name:  "View All Roles",
                    value: "ViewRoles"
                },
                {
                    name:  "View All Employees",
                    value: "ViewEmployees"
                },
                {
                    name:  "Add A Department",
                    value: "AddDept"
                },
                {
                    name:  "Add A Role",
                    value: "AddRole"
                },
                {
                    name: "Add An Employee",
                    value: "AddEmp"
                },
                {
                    name:  "Update Employee Role",
                    value: "UpdateEmpRole"
                },
                {
                    name:  "End",
                    value: "End"
                }
            ]
        }
    ]).then
    (response => {
        let selection = response.choice;
        switch (selection) {
            case "ViewDepartments":
                viewDepartments();
                 break;
            case "ViewRoles":
                viewRoles();
                break;
            case "ViewEmployees":
                viewEmployees();
                break;
            case "AddDept":
                newDept();
                break;
            case "AddRole":
                newRole();
                break;
            case "AddEmp":
                newEmp();
                break;
            case "UpdateEmpRole":
                modifyEmpRole();
                break;
            default:
                end();            

        }
    })
}


// View Departments 

function viewDepartments() {
    db.getDepartment()
    .then(([res]) => {
        let departments = res;
        console.log ("\n");
        console.table(departments)
    })
    .then(() => employeeTracker());
}

// View Roles

function viewRoles() {
    db.getRoles()
    .then(([res]) => {
        let roles = res;
        console.log("\n");
        console.table(roles)

    })
    .then(() => employeeTracker());
}

// View Employees

function viewEmployees() {
    db.getEmployees()
    .then(([res]) => {
        let emps = res;
        console.log("\n");
        console.table(emps)
    })
    .then(() => employeeTracker());
}




// Add Department 

function newDept() {
    inquirer.prompt([
        {
            name: "name",
            message: "What department is this?"
        }
    ]).then (res => {
        let nuDept = res;
        db.addDept(nuDept)
            .then(() => console.log(`Added the ${nuDept.name} department`))
            .then(() => employeeTracker());
    })

}

// Add Role 

function newRole() {
    db.getDepartment()
    .then(([res]) => {
        let departments = res;
        const deptOptions = departments.map(({ id, name}) =>
        ({
            name,
            value: id
        }));

        inquirer.prompt([
            {
                name: "title",
                message: "What role is this?"
            },
            {
                name: "salary",
                message: "What is the salary?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department is this in?",
                choices: deptOptions
            }
        ]).then(role => {
            db.addRole(role)
                .then(() => console.log(`Added ${role.title} role`))
                .then(() => employeeTracker())
                })
        })
    
}

// Add Employee
function newEmp() {
    inquirer.prompt([
        {
            name: "first",
            message: "What is their first name?"
        },
        {
            name: "last",
            message: "What is their last name?"
        }
    ]).then(res => {
        let firstName = res.first;
        let lastName = res.last;

        db.getRoles()
        .then(([response]) => {
            let roles = response;
            const roleOptions = roles.map(({ id, title}) => ({
                name: title,
                value: id
            }));

           inquirer.prompt({
                type: "list",
                name: "roleId",
                message: "What is their role?",
                choices: roleOptions
            }).then (data=> { 
                let roleId = data.roleId;
                let employee = {
                    role_id: roleId,
                    first_name: firstName,
                    last_name: lastName
                }
                db.addEmp(employee);
                })
             
            .then(() => console.log(`${firstName} ${lastName} has been added to the database`))
            .then(() => employeeTracker())
        })
    })

}

// Update Employee
function modifyEmpRole() {
    db.getEmployees()
    .then(([res]) => {
        let employees = res;
        const empChoices = employees.map(({ id, first_name, last_name}) =>
        ({ 
            name: `${first_name} ${last_name}`,
            value: id
        }));

        inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Who do you want to update?",
                choices: empChoices
            }
        ]).then(result => {
            let employeeId = result.employeeId;
            db.getRoles()
                .then(([res]) => {
                    let roles = res;
                    const roleChoices = roles.map(({ id, title}) =>
                    ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt([
                        {
                            type:"list",
                            name: "roleId",
                            message: "What role do you want to reassign?",
                            choices: roleChoices
                        }
                    ])
                    .then(res => db.updateEmpRole(employeeId, res.roleId))
                    .then(() => console.log("Updated Role"))
                    .then(() => employeeTracker())
                });
        })
    })

}

// End Application
function end() {
    console.log('Have a great day!')
    process.exit();
}