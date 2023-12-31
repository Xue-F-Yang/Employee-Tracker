// Include the required packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Sohappy4Life', 
  database: 'employee_tracker'
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
        'Delete A Department',
        'Delete A Role',
        'Delete An Employee',
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
      case 'Delete A Department':
        deleteDepartment();
        break;
      case 'Delete A Role':
        deleteRole();
        break;
      case 'Delete An Employee':
        deleteEmployee();
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
  db.query('SELECT * FROM employee', (err, results) => {
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
    db.query('INSERT INTO department (name) VALUES (?)', [data.name], (err, result) => {
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

// Function to delete a department
const deleteDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the ID of the department you want to delete:',
      name: 'department_id'
    }
  ]).then((data) => {
    db.query('DELETE FROM department WHERE id = ?', [data.department_id], (err, result) => {
      if (err) throw err;
      console.log(`\nDepartment with ID ${data.department_id} deleted successfully`);
      viewAllDepartments();
    });
  });
};

// Function to delete a role
const deleteRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the ID of the role you want to delete:',
      name: 'role_id'
    }
  ]).then((data) => {
    db.query('DELETE FROM role WHERE id = ?', [data.role_id], (err, result) => {
      if (err) throw err;
      console.log(`\nRole with ID ${data.role_id} deleted successfully`);
      viewAllRoles();
    });
  });
};

// Function to delete an employee
const deleteEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the ID of the employee you want to delete:',
      name: 'employee_id'
    }
  ]).then((data) => {
    db.query('DELETE FROM employee WHERE id = ?', [data.employee_id], (err, result) => {
      if (err) throw err;
      console.log(`\nEmployee with ID ${data.employee_id} deleted successfully`);
      viewAllEmployees();
    });
  });
};
