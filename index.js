const inquirer = require("inquirer");

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
                    name: "View All Departments",
                    value: "ViewDepartments"
                },
                {
                    name: "View All Roles",
                    value: "ViewRoles"
                },
                {
                    name: "View All Employees",
                    value: "ViewEmployees"
                },
                {
                    name: "Add A Department",
                    value: "AddDept"
                },
                {
                    name: "Add A Role",
                    value: "AddRole"
                },
                {
                    name: "Update Employee Role",
                    value: "UpdateEmpRole"
                },
                {
                    name: "End",
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
            case "UpdateEmpRole"
                updateEmpRole();
                break;
            default:
                end(); 

            


        }
    })
}

