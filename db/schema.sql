
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL,
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    job VARCHAR(30) NOT NULL,
    salary INT NOT NULL
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    job VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(30) NOT NULL,
    --FOREIGN KEY manager,
    --REFERENCES managers.name
);

CREATE TABLE managers(
    id INT PRIMARY KEY
    name VARCHAR(30)
);

INSERT INTO departments (department)
VALUES
    ('Metal'),
    ('Wood'),
    ('Installation'),
    ('Design'),
    ('Human Resources');


INSERT INTO roles (job, salary)
VALUES
    ('Welder', 60000),
    ('Carpenter', 60000),
    ('Installation Tech', 45000),
    ('Designer', 68000);


INSERT INTO employees (firstName, lastName, job, department, salary, manager)
VALUES
    ('Justin', 'Miller', 'Welder', 'Metal', 60000, 'Jacob Gillian'),
    ('Redhawk', 'Lucas', 'Carpenter', 'Wood', 60000, 'Victor Carmona'),
    ('Holden', 'Stoner', 'Installation Tech', 60000, 'Mark Ermis')