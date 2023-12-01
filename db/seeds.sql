-- Insert sample data into the department table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Marketing'),
('Human Resources');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 60000, 1),
('Salesperson', 40000, 1),
('Lead Engineer', 80000, 2),
('Software Engineer', 60000, 2),
('Marketing Manager', 70000, 3),
('Marketing Coordinator', 50000, 3),
('HR Manager', 65000, 4),
('HR Coordinator', 45000, 4);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Johnson', 3, NULL),
('Sarah', 'Clark', 4, 3);