
const Department = require('./Department');

class Employee {

    constructor (employeeId, firstName, lastName, job, department, salary, manager){
        super(department);

        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.salary = salary;
        this.manager = manager;
    };
};

modules.export = Employee;