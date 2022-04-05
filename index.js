
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');

//Don't need these classes
const Department = require ('./lib/Department');
const Role = require ('./lib/Role');
const Employee = require ('./lib/Employee');

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
  console.log(`Connected to the company_db database.`)


const initialQuestion = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to view or update?', 
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }
    ]).then(response => {
        console.log(response);

        if (response.action === 'View all departments'){
            db.query('SELECT * FROM departments',(err, result) => {
                console.table(result);
            });
        } 
        else if (response.action === 'View all roles'){
            db.query('SELECT * FROM roles',(err, result) => {
                console.table(result);
            });
        } 
        else if (response.action === 'View all employees'){
            db.query('SELECT * FROM employees',(err, result) => {
                console.table(result);
            }); 
        } 
        else if (response.action === 'Add a department'){
            addDept();
        } 
        else if (response.action === 'Add a role'){
            addRole();
        } 
        else if (response.action === 'Add an employee'){
            addEmployee();
        } 
        else if (response.action === 'Update an employee'){
            updateEmployee();
        };;
    });
};


const addDept = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department',
            message: "What is the name of the department?"
        }
    ).then (response => {
        newDept = response;
        db.query(`INSERT ${newDept} INTO departments`, (err, result) => {
            console.log('The department has been added');
            console.log(result);
        })
    });
};


const addRole = () => {

    //query db for depts and store in variable. make it an array (connection - rows as array: true)

    inquirer.prompt([
        {
            type: 'input', // Dont need, does automatically
            name: 'roleId',
            message: "What is ID for this specific role?"
        },
        {
            type: 'input',
            name: 'job',
            message: "What is the primary role for this job?"
        },
        {
            type: 'list',
            name: 'department',
            message: "In which department does this role belong?",
            choices: []  //usersRows = JSON.parse(JSON.stringify(result));
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?"
        }
    ]) //.then add to db table, console.log role added, ask initial questions
}


const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input', // Dont need, does automatically
            name: 'employeeId',
            message: "What is ID for this specific employee?"
        },
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
            choices: [''] //these come from roles db
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
            choices: [''] //these come from manager db
        },
    ]) //.then add to db table, console.log employee added, ask initial questions
}


//TODO updateEmployee()


initialQuestion()