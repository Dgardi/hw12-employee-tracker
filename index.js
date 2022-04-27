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
            case "AddDept":
                addDept();
                break;
            case "AddRole":
                addRole();
                break;
            case "AddEmp":
                addEmp();
                break;
            case "UpdateEmpRole":
                updateEmpRole();
                break;
            default:
                end();            

        }
    })
}


// View Departments 

function viewDepartments() {
    db.getDepartments()
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



// Add Department 

function addDept() {
    prompt([
        {
            name: "name",
            message: "What department is this?"
        }
    ]).then (res => {
        let dept = res;
        db.createDepartment(dept)
            .then(() => console.log(`Added ${dept.name} to the database`)
            .then(() => employeeTracker()));
    })

}

// Add Role 

function addRole() {
    db.getDepartments()
    .then(([res]) => {
        let departments = res;
        const depts = departments.map(({ id, name}) =>
        ({
            name: name,
            value: id
        }));

        prompt([
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
                choices: depts
            }
        ]).then(role => {
            db.createRole(role)
                .then(() => console.log(`Added ${role.title} to database`))
                .then(() => employeeTracker())
                })
        })
    
}

// Add Employee
function addEmp() {
    prompt([
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
            const roleChoices = roles.map(({ id, title}) => ({
                name: title,
                value: id
            }));

            prompt({
                type: "list",
                name: "roleId",
                message: "What is their role?",
                choices: roleChoices
            }).then (res=> {
                let roleId = res.roleId;

            }).then(() => console.log(`Added ${first} ${last} to the database`))
            .then(() => employeeTracker)
        })
    })

}
// Update Employee
function updateEmpRole() {
    db.getEmployees()
    .then(([res]) => {
        let emp = res;
        const empChoices = emp.map(({ id, first_name, last_name}) =>
        ({ 
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
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

                    prompt([
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
    process.exit();
}