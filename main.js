

document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const age = parseInt(document.getElementById('age').value);
  const salary = parseInt(document.getElementById('salary').value);

  try {
    const response = await axios.post("http://localhost:3000/addEmployee", {
      name,
      department,
      age,
      salary,
    });
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert('Error adding employee.');
  }
});

// מחיקת עובדים מעל גיל מסוים
document.getElementById('deleteEmployeesForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const ageLimit =parseInt(document.getElementById('ageLimit').value)

  try {
    const response = await axios.delete("http://localhost:3000/deleteEmployeesAboveAge", {
      data: { age: ageLimit },
    });
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert('Error deleting employees.');
  }
});

// שינוי שם מחלקה
document.getElementById('updateDepartmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const oldDepartment = document.getElementById('oldDepartment').value;
  const newDepartment = document.getElementById('newDepartment').value;

  try {
    const response = await axios.put("http://localhost:3000/department", {
      oldDepartment,
      newDepartment,
    });
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert('Error updating department.');
  }
});