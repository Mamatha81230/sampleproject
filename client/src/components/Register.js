import React, { useContext, useState } from 'react';
import { adddata } from './context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUdata } = useContext(adddata);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sname: '',
    course: '',
    email: '',
    phoneNo: '',
    CGPA: '',
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Addinputdata = async (e) => {
    e.preventDefault();

    const { sname, course, email, phoneNo, CGPA } = formData;
    let res; // Declare res here so that it's accessible outside the try block

    try {
      res = await fetch("https://student2app.azurewebsites.net/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sname,
          course,
          email,
          phoneNo,
          CGPA,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data);
        alert("All fields are mandatory");
      } else {
        alert("Data added successfully");
        navigate('/');
        console.log("Data added", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Check the console for details.");

      // Check if res is defined before using it
      if (res) {
        // Log the response text to the console
        console.log("Response text:", await res.text());
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://wallpapers.com/images/hd/hd-school-chalkboard-pusmapkdfdbpwzeb.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <form
        style={{
          backgroundColor: 'rgba(200, 200, 200, 0.8)',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
        }}
      >
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            
            name="sname"
            value={formData.sname}
            onChange={setdata}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <input
            type="text"
            
            name="course"
            value={formData.course}
            onChange={setdata}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
           
            name="email"
            value={formData.email}
            onChange={setdata}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
        
            name="phoneNo"
            value={formData.phoneNo}
            onChange={setdata}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CGPA</label>
          <input
            type="text"
          
            name="CGPA"
            value={formData.CGPA}
            onChange={setdata}
            className="form-control"
          />
        </div>
        <button type="submit" onClick={Addinputdata} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
