document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
  
    // Load students from localStorage
    loadStudents();
  
    // Add event listener to the form
    studentForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get form data
      const name = document.getElementById('name').value;
      const studentId = document.getElementById('studentId').value;
      const email = document.getElementById('email').value;
      const contact = document.getElementById('contact').value;
      const address = document.getElementById('address').value;
  
      // Validate fields
      if (!name || !studentId || !email || !contact || !address) {
        alert("All fields must be filled!");
        return;
      }
  
      if (isNaN(studentId) || isNaN(contact)) {
        alert("Student ID and Contact must be numbers.");
        return;
      }
  
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Add new student record
      const student = {
        name,
        studentId,
        email,
        contact,
        address
      };
  
      addStudent(student);
      studentForm.reset();  // Reset form after submission
    });
  
    // Function to add student record to localStorage and table
    function addStudent(student) {
      let students = JSON.parse(localStorage.getItem('students')) || [];
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));
      loadStudents();
    }
  
    // Function to load students into the table
    function loadStudents() {
      let students = JSON.parse(localStorage.getItem('students')) || [];
      studentTable.innerHTML = ""; // Clear existing table data
  
      students.forEach((student, index) => {
        let row = studentTable.insertRow();
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.studentId}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
          <td>${student.address}</td>
          <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        `;
      });
    }
  
    // Function to edit student
    window.editStudent = function(index) {
      let students = JSON.parse(localStorage.getItem('students')) || [];
      const student = students[index];
  
      document.getElementById('name').value = student.name;
      document.getElementById('studentId').value = student.studentId;
      document.getElementById('email').value = student.email;
      document.getElementById('contact').value = student.contact;
      document.getElementById('address').value= student.address;
  
      deleteStudent(index);  // Delete the record and allow for editing
    };
  
    // Function to delete student
    window.deleteStudent = function(index) {
      let students = JSON.parse(localStorage.getItem('students')) || [];
      students.splice(index, 1);  // Remove student at index
      localStorage.setItem('students', JSON.stringify(students));
      loadStudents();
    };
  
    // Validate email format
    function validateEmail(email) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    }
  });
  