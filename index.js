// Include the required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Replace with your MySQL password
  database: 'employee_tracker_db'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  employeeTracker();
});

// Main function to prompt user actions
const employeeTracker = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'prompt',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add A Department',
        'Add A Role',
        'Add An Employee',
        'Update An Employee Role',
        'Log Out'
      ]
    }
  ]).then((answers) => {
    switch (answers.prompt) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add A Department':
        addDepartment();
        break;
      case 'Add A Role':
        addRole();
        break;
      case 'Add An Employee':
        addEmployee();
        break;
      case 'Update An Employee Role':
        updateEmployeeRole();
        break;
      case 'Log Out':
        console.log('Logging out');
        db.end();
        break;
    }
  });
};

// Function to view all departments
const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.log('\n');
    console.table(results);
    employeeTracker();
  });
};

// Function to view all roles
const viewAllRoles = () => {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.log('\n');
    console.table(results);
    employeeTracker();
  });
};

// Function to view all employees
const viewAllEmployees = () => {
  db.query(`
    SELECT
    employees_with_managers.id AS employee_id,
    employees_with_managers.first_name,
    employees_with_managers.last_name,
    employee_info.title,
    employee_info.salary,
    employee_info.department_name,
    employees_with_managers.manager_name
    FROM employee_info
    JOIN employees_with_managers on employee_info.role_id = employees_with_managers.role_id;
    `, (err, results) => {
    if (err) throw err;
    console.log('\n');
    console.table(results);
    employeeTracker();
  });
};

// Function to add a department
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'name'
    }
  ]).then((data) => {
    db.query('INSERT INTO department (name) VALUES (?)', data.name, (err, result) => {
      if (err) throw err;
      console.log(`\nNew department added: ${data.name}`);
      viewAllDepartments();
    });
  });
};

// Function to add a role
const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the title of the new role:',
      name: 'title'
    },
    {
      type: 'input',
      message: 'Enter the salary for the new role:',
      name: 'salary'
    },
    {
      type: 'input',
      message: 'Enter the department ID for the new role:',
      name: 'department_id'
    }
  ]).then((data) => {
    db.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [data.title, data.salary, data.department_id],
      (err, result) => {
        if (err) throw err;
        console.log(`\nNew role added: ${data.title}`);
        viewAllRoles();
      }
    );
  });
};

// Function to add an employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the first name of the new employee:',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'Enter the last name of the new employee:',
      name: 'last_name'
    },
    {
      type: 'input',
      message: 'Enter the role ID for the new employee:',
      name: 'role_id'
    },
    {
      type: 'input',
      message: 'Enter the manager ID for the new employee:',
      name: 'manager_id'
    }
  ]).then((data) => {
    db.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [data.first_name, data.last_name, data.role_id, data.manager_id],
      (err, result) => {
        if (err) throw err;
        console.log(`\nNew employee added: ${data.first_name} ${data.last_name}`);
        viewAllEmployees();
      }
    );
  });
};

// Function to update an employee role
const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the ID of the employee whose role you want to update:',
      name: 'employee_id'
    },
    {
      type: 'input',
      message: 'Enter the new role ID for the employee:',
      name: 'new_role_id'
    }
  ]).then((data) => {
    db.query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [data.new_role_id, data.employee_id],
      (err, result) => {
        if (err) throw err;
        console.log(`\nEmployee role updated successfully`);
        viewAllEmployees();
      }
    );
  });
};

