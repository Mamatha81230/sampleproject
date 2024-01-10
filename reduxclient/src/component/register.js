// Register.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addData } from '../Actions/registerAction';
import { useNavigate } from 'react-router-dom';

const Register = ({ addData }) => {
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
  
    try {
      const res = await fetch("http://localhost:5000/register", {
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
  
      // Log the entire response
      console.log("Full response:", res);
  
      if (!res.ok) {
        // Handle the 404 response separately
        if (res.status === 404) {
          console.error("Endpoint not found");
          alert("Endpoint not found. Check server configuration.");
        } else {
          const data = await res.json();
          console.error("Error:", data);
          alert("All fields are mandatory");
        }
      } else {
        alert("Data added successfully");
        navigate('/');
        const data = await res.json();
        console.log("Data added", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Check the console for details.");
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

const mapDispatchToProps = {
  addData,
};

export default connect(null, mapDispatchToProps)(Register);
