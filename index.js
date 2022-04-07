
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');
const util = require('util');

//Don't need these classes
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'wildcat123',
        //   rowsAsArray: true,
        database: 'company_db'
    },
);
const query = util.promisify(db.query).bind(db);

console.log(`Connected to the company_db database.`)

async function queryDept() {
    await query('SELECT * FROM departments', (err, result) => {
        if (err) throw err;
        console.table(result);
        initialQuestion();
    });
}

async function queryRoles() {
    await query('SELECT * FROM roles', (err, result) => {
        if (err) throw err;
        console.table(result);
        initialQuestion();
    });
}

async function queryEmployees() {
    await query('SELECT * FROM employees', (err, result) => {
        console.table(result);
        initialQuestion();
    });
}

const initialQuestion = async () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to view or update?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }
    ]).then(response => {
        // console.log(response);

        if (response.action === 'View all departments') {
            queryDept()
        }
        else if (response.action === 'View all roles') {
            queryRoles()
        }
        else if (response.action === 'View all employees') {
            queryEmployees()
        }
        else if (response.action === 'Add a department') {
            addDept();
        }
        else if (response.action === 'Add a role') {
            addRole();
        }
        else if (response.action === 'Add an employee') {
            addEmployee();
        }
        else if (response.action === 'Update an employee') {
            updateEmployee();
        };
    });
};

async function insertDept(response){

        let queryText = 'INSERT INTO departments (department) VALUES (?)'

        await query(queryText, response.department, (err, results) => {

            if (err) throw err;

            console.log('The department has been added');
            initialQuestion();
        })
}

const addDept = async () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department',
            message: "What is the name of the department?"
        }
    ).then(response => {

        insertDept(response);
    });
};


const addRole = async () => {

    //query db for depts and store in variable. make it an array (connection - rows as array: true)
    let deptTable = 'SELECT department FROM departments'
    let deptChoices = await query(deptTable) //, (err, result) => console.log(result);
    console.log(deptChoices[0].department);
    let deptArr = deptChoices.map(choice => choice.department);
    // console.log(deptArr);

    inquirer.prompt([
        {
            type: 'input',
            name: 'job',
            message: "What is the primary role for this job?"
        },
        {
            type: 'list',
            name: 'department',
            message: "In which department does this role belong?",
            choices: deptArr
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?"
        }
    ]).then (response => {
        insertRole(response);
    })
}


const addEmployee = async () => {

    let rolesTable = 'SELECT job FROM roles'
    let rolesChoices = await query(rolesTable)
    console.log(rolesChoices[0].job);
    let rolesArr = rolesChoices.map(choice => choice.job);
    // console.log(rolesArr);

    let employeesTable = 'SELECT lastName FROM employees'
    let employeesChoices = await query(employeesTable)
    console.log(employeesChoices[0].lastName);
    let employeesArr = employeesChoices.map(choice => choice.lastName);
    // console.log(employeesArr);

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is this employee's first name?"
        },
        {
            type: 'list',
            name: 'lastName',
            message: "What is this employee's last name?"
        },
        {
            type: 'list',
            name: 'job',
            message: "What is this employee's role?",
            choices: rolesArr
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is this employee's salary?"
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is this employee's manager?",
            choices: employeesArr
        },
    ]).then (response => {
        console.log(response);
    })
}


//TODO updateEmployee()
const updateEmployee = async () => {

    let employeesTable = 'SELECT lastName FROM employees'
    let employeesChoices = await query(employeesTable)
    console.log(employeesChoices[0].lastName);
    let employeesArr = employeesChoices.map(choice => choice.lastName);
    // console.log(employeesArr);

    let rolesTable = 'SELECT job FROM roles'
    let rolesChoices = await query(rolesTable)
    console.log(rolesChoices[0].job);
    let rolesArr = rolesChoices.map(choice => choice.job);
    // console.log(rolesArr);

    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee do you need to update?",
            choices: employeesArr
        },
        {
            type: 'list',
            name: 'newRole',
            message: "What is their new role in the company?",
            choices: rolesArr
        }
    ]).then (response => {
        console.log(response);
    })
}



async function insertRole(response){
    let queryText = 'SELECT id FROM departments WHERE department = (?)'
    await query(queryText, response.department, (err, results) => {

        if (err) throw err;

        console.log(results[0].id);
        let tempResult = results[0].id;

        finalRoles(response, tempResult);
        console.log('The role has been added');
    })
}
async function finalRoles(response, tempResult){
    let insertText = 'INSERT INTO roles (job, salary, dept_id) VALUES (?, ?, ?)'
    await query(insertText, [response.job, response.salary, tempResult])
    initialQuestion()
}   




initialQuestion()