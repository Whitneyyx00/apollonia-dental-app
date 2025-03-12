const employeeList = document.getElementById('employee-list');
const departmentList = document.getElementById('department-list');
const addEmployeeForm = document.getElementById('add-employee-form');
const addDepartmentForm = document.getElementById('add-department-form');
const departmentSelect = document.getElementById('department');

// Function to handle errors during API calls
async function handleResponse(response) {
    if (!response.ok) {
        const message = `An error occurred: ${response.status}`;
        throw new Error(message);
    }
    return response.json();
}

let addEmployeeSubmit;

// Add a new employee
addEmployeeSubmit = async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;

    try {
        const response = await fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                birthDate,
                position,
                department
            }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`Failed to add employee: ${response.status} - ${errorBody.message || 'No details provided'}`);
        }

        addEmployeeForm.reset();
        fetchEmployees();
    } catch (error) {
        console.error('Add employee failed', error);
        alert('Failed to add employee. See console for details.');
    }
};

let addDepartmentSubmit;

// Add a new department
addDepartmentSubmit = async (e) => {
    e.preventDefault();

    const departmentName = document.getElementById('departmentName').value;
    const departmentDescription = document.getElementById('departmentDescription').value;

    try {
        const response = await fetch('/departments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: departmentName,
                description: departmentDescription
            }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`Failed to add department: ${response.status} - ${errorBody.message || 'No details provided'}`);
        }

        addDepartmentForm.reset();
        fetchDepartments();
    } catch (error) {
        console.error('Add department failed', error);
        alert('Failed to add department. See console for details.');
    }
};

// Fetch all employees
async function fetchEmployees() {
    try {
        const employees = await fetch('/employees').then(handleResponse);
        employeeList.innerHTML = employees.map(employee => `
            <div class="employee-item">
                ${employee.firstName} ${employee.lastName} - ${employee.position} (${employee.department ? employee.department.name : 'No Department'})
                <div class="button-group">
                    <button onclick="updateEmployee('${employee._id}')">Update</button>
                    <button onclick="deleteEmployee('${employee._id}')">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Fetch employees failed', error);
        employeeList.innerHTML = '<p>Error fetching employees.</p>';
    }
}

// Fetch all departments
async function fetchDepartments() {
    try {
        const departments = await fetch('/departments').then(handleResponse);
        departmentList.innerHTML = departments.map(department => `
            <div class="department-item">
                ${department.name} - ${department.description}
                <div class="button-group">
                    <button onclick="updateDepartment('${department._id}')">Update</button>
                    <button onclick="deleteDepartment('${department._id}')">Delete</button>
                </div>
            </div>
        `).join('');

        departmentSelect.innerHTML = '<option value="">Select Department</option>' +
                                     departments.map(department => `
                                         <option value="${department._id}">${department.name}</option>
                                     `).join('');
    } catch (error) {
        console.error('Fetch departments failed', error);
        departmentList.innerHTML = '<p>Error fetching departments.</p>';
    }
}

async function updateEmployee(employeeId) {
    // Fetch the employee data
    const response = await fetch(`/employees/${employeeId}`);
    const employee = await response.json();

    // Populate the form with the employee data
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('birthDate').value = employee.birthDate ? employee.birthDate.substring(0, 10) : ''; // Format date
    document.getElementById('position').value = employee.position;
    document.getElementById('department').value = employee.department ? employee.department._id : '';

    // Change the form submission to update instead of add
    const addEmployeeForm = document.getElementById('add-employee-form');
    addEmployeeForm.onsubmit = async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const birthDate = document.getElementById('birthDate').value;
        const position = document.getElementById('position').value;
        const department = document.getElementById('department').value;

        try {
            const response = await fetch(`/employees/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    birthDate,
                    position,
                    department
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`Failed to update employee: ${response.status} - ${errorBody.message || 'No details provided'}`);
            }

            // Reset the form
            addEmployeeForm.reset();
            // Revert the form submission to create mode
            addEmployeeForm.onsubmit = addEmployeeSubmit;
            fetchEmployees();
        } catch (error) {
            console.error('Update employee failed', error);
            alert('Failed to update employee. See console for details.');
        }
    };
}

async function updateDepartment(departmentId) {
    // Fetch the department data
    const response = await fetch(`/departments/${departmentId}`);
    const department = await response.json();

    // Populate the form with the department data
    document.getElementById('departmentName').value = department.name;
    document.getElementById('departmentDescription').value = department.description;

    // Change the form submission to update instead of add
    const addDepartmentForm = document.getElementById('add-department-form');
    addDepartmentForm.onsubmit = async (e) => {
        e.preventDefault();

        const departmentName = document.getElementById('departmentName').value;
        const departmentDescription = document.getElementById('departmentDescription').value;

        try {
            const response = await fetch(`/departments/${departmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: departmentName,
                    description: departmentDescription
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`Failed to update department: ${response.status} - ${errorBody.message || 'No details provided'}`);
            }

            // Reset the form
            addDepartmentForm.reset();
            // Revert the form submission to create mode
            addDepartmentForm.onsubmit = addDepartmentSubmit;
            fetchDepartments();
        } catch (error) {
            console.error('Update department failed', error);
            alert('Failed to update department. See console for details.');
        }
    };
}

// Initial data loading
document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();
    fetchDepartments();

    const addEmployeeForm = document.getElementById('add-employee-form');
    addEmployeeForm.onsubmit = addEmployeeSubmit;

    const addDepartmentForm = document.getElementById('add-department-form');
    addDepartmentForm.onsubmit = addDepartmentSubmit;
});