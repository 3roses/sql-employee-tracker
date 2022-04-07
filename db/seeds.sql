
USE company_db;

INSERT INTO departments (department)
VALUES
    ('Metal'),
    ('Wood'),
    ('Installation'),
    ('Design'),
    ('Human Resources');


INSERT INTO roles (job, salary, dept_id)
VALUES
    ('Welder', 60000, 1),
    ('Carpenter', 60000, 2),
    ('Installation Tech', 45000, 3),
    ('Designer', 68000, 4);


INSERT INTO employees (firstName, lastName, role_id)
VALUES
    ('Justin', 'Miller', 1),
    ('Redhawk', 'Lucas', 2),
    ('Holden', 'Stoner', 3);
    
    UPDATE employees
    SET manager_id = 1
    WHERE role_id IN(2,3);